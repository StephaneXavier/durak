import { useParams, useNavigate } from "react-router-dom";
import useWebSocket from 'react-use-websocket';
import { React, useState} from "react";
import Card from "./Card";
import PlayerHand from "./PlayerHand";
import CreateNewGameButton from './CreateNewGameButton'
import Table from './Table'

const WS_URL = 'ws://localhost:3002/room/'


const Game = () => {

    const [numberOfPlayers, setNumberOfPlayers] = useState(0);
    const [playerHand, setPlayerHand] = useState([]);
    const [trumpCard, setTrumpCard] = useState({});
    const[gameStarted, setGameStarted] = useState(false);
    const [dealer, setDealer] = useState()
    const navigate = useNavigate()
    const { gameRoomId } = useParams();
    

    const { sendJsonMessage } = useWebSocket(WS_URL + gameRoomId, {
        onOpen: (evt) => {
            console.log('WebSocket connection established.');

        },
        onMessage: (evt) => {

            const parsedData = JSON.parse(evt.data)

            if (parsedData.type == "numberOfPlayers") {
                setNumberOfPlayers(parsedData.value)
            }
            if (parsedData.type === "receivedCards") {
                console.log('here are your cards', parsedData.value)
                setPlayerHand( prevPlayerHand => parsedData.value)             
            }
            if (parsedData.type === "trumpCard") {
                setTrumpCard(prevTrump => parsedData.value)
            }
            if (parsedData.type === "gameStarted") {
                setGameStarted(true)
                setDealer(parsedData.dealerId)
                console.log(`received "gameStarted. Dealer is ${dealer}`)
            }
        },
        onClose: (evt) => {
            console.log('closing connection', evt)
            if (evt.code === 3000) {
                alert('Room is full!')
                navigate('/')
            }
        }
    });


    return (
        <>
        {gameStarted? 
            <>
                <Table trumpCard={trumpCard} />
                <PlayerHand cards = {playerHand}></PlayerHand>
            </>
            
            :
            
            <>
                <h1>Welcome to game {gameRoomId}</h1>
                <h1> Current players in rooom: {numberOfPlayers}</h1>
                <CreateNewGameButton numberOfPlayers={numberOfPlayers} sendJsonMessage={sendJsonMessage}/>
            </>
        }
                       
            
        </>
            
    )
}

export default Game