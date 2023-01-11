import React from 'react';

const CreateNewGameButton = ({numberOfPlayers, startGameMessageToServer}) => {

const onClick = () => {
    console.log('click in child')
    startGameMessageToServer()
}

return (
    numberOfPlayers === 2? 
        <button onClick={onClick}> Start Game</button> 
        :
        null
)
}

export default CreateNewGameButton