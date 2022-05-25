const JericoJS = require("../");

const Jerico = new JericoJS({
    host: "http://localhost:4001"
})

const Run = async () => {

    const document = await Jerico.createIfNotExists('1234567890123456789012345', {
        name: "Test"
    })

    let setAll = await document.setAll({
        hello: "world",
        hello2: "world2"
    })

    let set = await document.set({
        key: "hello",
        value: "world"
    })

    let get = await document.get({
        key: "hello"
    })

    let getAll = await document.getAll()

    let remove = await document.remove({
        key: "hello"
    })

    let removeAll = await document.removeAll()

    let exists = await Jerico.exists(document.id);

    let info = await Jerico.info(document.id);

    // let deleted = await Jerico.delete(document.id)

    // console.log(document, set, get, getAll, remove, removeAll, exists, info, deleted)

}

Run()