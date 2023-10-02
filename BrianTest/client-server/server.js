const ws = require("ws")
const express = require("express")

const expressServer = express();

const wsServer = new ws.Server( {
    server: expressServer.listen(3000),
    host: "localhost",
    path: "/"
})

wsServer.on("connection", (w) => {
    console.log("someone connected")
    w.on("message", (msg) => {
        console.log("got mess", msg)
        w.send(msg)
    })
})

expressServer.listen(() => console.log("listening"))