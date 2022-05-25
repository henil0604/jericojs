const axios = require("axios");
const JOI = require("joi");
const ParseResponse = require("./utils/ParseResponse");
const Document = require("./Document");
const ResponseWrap = require("./utils/ResponseWrap");


const ValidateConfig = (config) => {

    const Schema = JOI.object({
        host: JOI.string().required(),

    })

    const data = Schema.validate(config);

    if (data.error) {
        throw data.error;
    }

    return data.value;
}

const CreateAxios = (host) => {
    return axios.create({
        baseURL: `${host}/api/`,
        method: "POST",
        headers: {
            "content-type": "application/json"
        }
    });
}

class Jerico {

    constructor(config) {
        this.config = ValidateConfig(config);
        this._server = CreateAxios(config.host);
    }

    async create(data) {
        return await ResponseWrap(async () => {
            const Response = ParseResponse(await this._server({
                url: "/create",
                data
            }));

            if (Response.status === "error") {
                return Response;
            }

            return new Document({
                server: this._server,
                documentId: Response.id
            });
        });
    }

    async delete(documentId) {
        return await ResponseWrap(async () => {
            const Response = ParseResponse(await this._server({
                url: "/delete",
                data: {
                    documentId
                }
            }));

            return Response;
        });
    }

    async info(documentId) {
        return await ResponseWrap(async () => {
            const Response = ParseResponse(await this._server({
                url: "/info",
                data: {
                    documentId
                }
            }));

            return Response;
        });
    }

    async exists(documentId) {
        return await ResponseWrap(async () => {
            const Response = ParseResponse(await this._server({
                url: "/exists",
                data: {
                    documentId
                }
            }));

            return Response;
        });
    }

    async createIfNotExists(documentId, data) {
        const exists = await this.exists(documentId);

        if (exists === true) {
            return this.Document(documentId);
        }

        return await this.create(data)
    }

    Document(documentId) {
        return new Document({
            server: this._server,
            documentId: documentId
        });
    }

}


module.exports = exports = Jerico;