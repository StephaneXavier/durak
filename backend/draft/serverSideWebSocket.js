// const app = require("../app")

var express = require('express');
var app = express();
const wsExpress = require("express-ws")(app);

var CLIENTS = [];

app.ws("/chat", function (client, req, next) {
    console.log('in app.ws chat')
    CLIENTS.push(client);
    client.send("You joined this conversation");
    sendExceptCurrent(client, 'New user joined this conversation')

    client.on('message', function (data) {
        console.log(data)
        sendAll(data)
    });

    client.on('close', function () {
        console.log('client closing')
        sendAll("user left")
    });
});

function sendAll (message) {
    for (var i=0; i<CLIENTS.length; i++) {
      CLIENTS[i].send(message);
    }
}

function sendExceptCurrent(client, message) {
    for (var i = 0; i < CLIENTS.length; i++) {
        if (CLIENTS[i] == client) { continue }

        CLIENTS[i].send(message);
    }
}

app.listen('3000', function () {
    console.log(`Started on http://localhost:3000`);
});