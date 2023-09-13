import React, { useState } from 'react';
import Board from './Board';
import './App.css';

function App() {
    const [boardSize, setBoardSize] = useState(6);
    const [boardData, setBoardData] = useState([]);

    const handleSizeChange = (event) => {
        let newSize = parseInt(event.target.value, 10);

        newSize = Math.max(newSize, 0);

        newSize = Math.min(newSize, 20);

        setBoardSize(newSize);
        generateBoardData(newSize);
    };

    const generateBoardData = (size) => {
        const data = Array.from({ length: size * size }, () => 0);
        setBoardData(data);
    };

    return (
        <div className="App">
            <h1>2048 Game</h1>
            <div>
                <label htmlFor="boardSize">Enter board size:</label>
                <input
                    type="number"
                    id="boardSize"
                    value={boardSize || ''}
                    onChange={handleSizeChange}
                />
            </div>
            <Board boardData={boardData} size={boardSize} />
        </div>
    );
}

export default App;
