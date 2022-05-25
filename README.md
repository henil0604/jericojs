# JericoJs SDK

This SDK provides a way to communicate with your Jerico-Server

## Installation

```
npm i jericojs
```

## Usage

### Jerico Instance
```js

const JericoJs = require("jericojs");

const Jerico = new JericoJs({
    host, // Host URL of Jerico-Server
});

```

### Creating Jerico Document

```js

const document = await Jerico.create({
    name: "Test",
    description: "Test Document"
})

```

### Document API

```js
await document.set({
    key,
    value,
})

await document.get({
    key
})

await document.getAll()

await document.remove({
    key
})

await document.removeAll()

await document.setAll({
    key1: value1,
    key2: value2
})
```

### Jerico API

```js
await Jerico.create({
    name
    description
})

await Jerico.createIfNotExists(documentId, {
    name,
    description
})

await Jerico.exists(documentId);

await Jerico.info(documentId);

await Jerico.delete(documentId);
```