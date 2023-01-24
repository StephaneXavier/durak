import { useParams, useNavigate } from "react-router-dom";
import useWebSocket from 'react-use-websocket';
import {React, useState } from "react";
import CreateNewGameButton from './CreateNewGameButton'
const WS_URL = 'ws://localhost:3002/room/'


const Game = () => {

    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const navigate = useNavigate()
    const {gameRoomId} = useParams();
    
    const {sendJsonMessage} = useWebSocket(WS_URL + gameRoomId, {
        onOpen: (evt) => {
            console.log('WebSocket connection established.');
            
        },
        onMessage: (evt) => {
            console.log('onMessage evt')
            const parsedData = JSON.parse(evt.data)
           
            if(parsedData.type == "numberOfPlayers"){
                setNumberOfPlayers(parsedData.value)
            }
            if(parsedData.type ==="receivedCards"){
                console.log('here are your cards', parsedData.value)
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
        <CreateNewGameButton numberOfPlayers={numberOfPlayers} sendJsonMessage = {sendJsonMessage}/>
        
        </>
    )
}

export default Game