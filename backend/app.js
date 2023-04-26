"use strict";
const express = require("express");
const app = express();
const wsExpress = require('express-ws')(app);
const Game = require('./models/game');
const Player = require('./models/player')

const ROOMS = {}

app.use(express.json());

app.ws('/room/:roomName', function (client, req, next) {
    try {
        const roomName = req.params.roomName;
        const player = new Player({webClient: client});
        
        console.log('in the app.ws /room/roomName', roomName)

        if (ROOMS[roomName] && ROOMS[roomName].players.length == 2) {
            console.log("full")

            client.close(3000, "Room is full")
            console.log("done closing")

            return
        }

        if (ROOMS[roomName]) {
            ROOMS[roomName].players.push(player)
            
        } else {

            ROOMS[roomName] = { players: [player] }
        }

        
        updateNumPlayers(roomName);

        console.log(`there are ${ROOMS[roomName].players.length} players in the room ${roomName}`)

        client.on('message', async function (msg) {
            console.log('Message received on room:', roomName)
            console.log('Message received from client (frontend):', msg)
            const parsedMsg = JSON.parse(msg)

            if (parsedMsg.type === 'startGame') {
                              
                ROOMS[roomName].game = await Game.start(ROOMS[roomName].players)
                console.log('Game is starting ->', ROOMS[roomName])
            }
        })

        client.on('close', function (data) {
            console.log('client getting ready to leave', ROOMS[roomName].players.length)
            const clientPosition = ROOMS[roomName].players.indexOf(player)
            ROOMS[roomName].players.splice(clientPosition, 1)
            console.log('client has left', ROOMS[roomName].players.length)
            updateNumPlayers(roomName)
        })
    } catch (err) {
        console.log(err)
    }
})


function updateNumPlayers(roomName) {
    
    const numberOfPlayers = ROOMS[roomName].players.length
    for (var i = 0; i < numberOfPlayers; i++) {
        ROOMS[roomName].players[i].send(JSON.stringify({ type: "numberOfPlayers", value: numberOfPlayers }));
    }
}


// app.use(function(req, res, next) {
//     const err = new ExpressError("Not Found", 404);

//     // pass the error to the next piece of middleware
//     return next(err);
//   });

/** general error handler */

app.use(function(err, req, res, next) {
res.status(err.status);

return res.json({
    status: err.status,
    message: err.message
});
});


app.listen('3002', function () {
    console.log(`Started on http://localhost:3002`);
});