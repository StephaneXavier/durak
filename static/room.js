$(document).ready(function() {

    const urlParts = document.URL.split("/");
    const roomName = urlParts[urlParts.length -1]
    console.log(`room is ${roomName}`)

    var numberOfPlayers = $('#number-of-players')

    const socket = new WebSocket(`ws://localhost:3002/room/${roomName}`)

    socket.onopen = function(evt){
        console.log('open', evt)
    }

    socket.onmessage = function(event) { 
        console.log(event); /* {type: "numberOfPlayers", value: X} */
        console.log(JSON.parse(event.data))
        const parsedData = JSON.parse(event.data)
        if(parsedData.type == "numberOfPlayers") {
            numberOfPlayers.text(parsedData.value)
        }
    }

    socket.onclose = function(event){
        console.log('closing connection', event)
        if(event.code === 3000){
            alert('Room is full!')
            window.location.replace("http://localhost:3002")
        }
    }
})
