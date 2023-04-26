import React from 'react';

const CreateNewGameButton = ({numberOfPlayers, sendJsonMessage}) => {
    const onClick = () => {
        console.log('clicked new game button')
        sendJsonMessage({type:'startGame'})
    }

    return (
        numberOfPlayers === 2? 
            <button onClick={onClick}> Start Game</button> 
            :
            null
    )
}

export default CreateNewGameButton