const axios = require("axios");
const JOI = require("joi");
const ParseResponse = require("./utils/ParseResponse");
const ResponseWrap = require("./utils/ResponseWrap");

const ValidateConfig = (config) => {

    const Schema = JOI.object({
        documentId: JOI.string().required(),
        server: JOI.any().required()
    })

    const data = Schema.validate(config);

    if (data.error) {
        throw data.error;
    }

    return data.value;
}

class Document {

    constructor(config) {
        this.config = ValidateConfig(config);
        this._server = this.config.server.create();

        this._server.defaults.baseURL += "document";
        this._server.defaults.method = "POST";
        this._server.defaults.headers = {
            "content-type": "application/json"
        }
        delete this.config.server;
    }

    async REQ(url, data = {}) {
        data.documentId = this.id;

        return await ResponseWrap(async () => {
            const Response = await this._server({
                url,
                data
            });

            return ParseResponse(Response);
        })
    }

    async set(data) {
        return await this.REQ("/set", data);
    }

    async get(data) {
        return await this.REQ("/get", data);
    }

    async getAll(data) {
        return await this.REQ("/getAll", data);
    }

    async remove(data) {
        return await this.REQ("/remove", data);
    }

    async removeAll(data) {
        return await this.REQ("/removeAll", data);
    }

    async setAll(data) {
        data = {
            data
        }
        return await this.REQ("/setAll", data);
    }

    get id() {
        return this.config.documentId;
    }

}


module.exports = exports = Document;