"use strict";
const { v4: uuidv4 } = require('uuid');
const express = require("express");
const app = express();
const wsExpress = require('express-ws')(app);

const ROOMS = {}


app.use(express.json());

app.set('view engine', 'ejs')

app.use("/public", express.static('static'))

app.get('/', function (req, res, next) {
    console.log('On the home page')
    const roomName = uuidv4();
    res.render('createGame', { roomName })
})

app.ws('/room/:roomName', function (client, req, next) {
    const roomName = req.params.roomName;


    
    if (ROOMS[roomName] && ROOMS[roomName].length == 2) {
        console.log("full")
        
        client.close(3000, "Room is full")
        console.log("done closing")

        return 
    }

    if (ROOMS[roomName]) {
        ROOMS[roomName].push(client)
    } else {
        ROOMS[roomName] = [client]
    }

    updateNumPlayers(roomName);

    console.log(`there are ${ROOMS[roomName].length} players in the room ${roomName}`)

    client.on('close', function (data) {
        console.log('client getting ready to leave', ROOMS[roomName].length)
        const clientPosition = ROOMS[roomName].indexOf(client)
        ROOMS[roomName].splice(clientPosition, 1)
        console.log('client has left', ROOMS[roomName].length)
        updateNumPlayers(roomName)
    })

})

app.get('/room/:roomName', function (req, res, next) {
    const roomName = req.params.roomName
    res.render('room', { roomName })
})

function updateNumPlayers(roomName) {

    const numberOfPlayers = ROOMS[roomName].length
    for (var i = 0; i < numberOfPlayers; i++) {
        ROOMS[roomName][i].send(JSON.stringify({ type: "numberOfPlayers", value: numberOfPlayers }));
    }
}


// app.use(function(req, res, next) {
//     const err = new ExpressError("Not Found", 404);

//     // pass the error to the next piece of middleware
//     return next(err);
//   });

/** general error handler */

// app.use(function(err, req, res, next) {
// res.status(err.status || 500);

// return res.json({
//     status: err.status,
//     message: err.message
// });
// });


app.listen('3002', function () {
    console.log(`Started on http://localhost:3002`);
});