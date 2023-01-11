import { useParams, useNavigate } from "react-router-dom";
import useWebSocket from 'react-use-websocket';
import {React, useState } from "react";
const WS_URL = 'ws://localhost:3002/room/:roomName'


const Game = () => {

    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const navigate = useNavigate()
    const {gameRoomId} = useParams();
    useWebSocket(WS_URL, {
        onOpen: (evt) => {
            console.log('WebSocket connection established.');
            console.log('onOpen evt', evt)
        },
        onMessage: (evt) => {
            console.log('onMessage evt', evt)
            const parsedData = JSON.parse(evt.data)
            if(parsedData.type == "numberOfPlayers"){
                setNumberOfPlayers(parsedData.value)
            }
        },
        onClose: (evt) => {
            console.log('closing connection', evt)
            if(evt.code === 3000){
                alert('Room is full!')
                navigate('/')
            }
        }
    });

    return(
        <>
        <h1>Welcome to game {gameRoomId}</h1>
        <h1> Current players in rooom: {numberOfPlayers}</h1>
        </>
    )
}

export default Game