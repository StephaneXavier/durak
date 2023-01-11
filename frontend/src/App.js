import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import Game from './Game';
import './App.css';



function App() {
    

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game/:gameRoomId" element={<Game />} />
            </Routes>
        </div>
    );
}

export default App;
