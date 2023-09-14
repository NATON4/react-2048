import React, {useEffect, useRef, useState} from 'react';
import Cell from './Cell';

const Board = ({size, boardData}) => {
    const gridTemplateColumns = `repeat(${size}, 1fr)`;
    const gridTemplateRows = `repeat(${size}, 1fr)`;
    const cellWith2 = useRef(null);
    const initialPosition = {row: 0, col: 0};
    const [currentPosition, setCurrentPosition] = useState(initialPosition);

    useEffect(() => {
        setCurrentPosition((prevPosition) => ({
            row: Math.min(size, prevPosition.row),
            col: Math.min(size, prevPosition.col),
        }));
    }, [size]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            const currentCell = cellWith2.current;

            if (currentCell) {
                let newRow = currentPosition.row;
                let newCol = currentPosition.col;

                switch (event.key) {
                    case 'ArrowLeft':
                        newCol = Math.max(1, newCol - 1);
                        break;
                    case 'ArrowRight':
                        newCol = Math.min(size, newCol + 1);
                        break;
                    case 'ArrowUp':
                        newRow = Math.max(1, newRow - 1);
                        break;
                    case 'ArrowDown':
                        newRow = Math.min(size, newRow + 1);
                        break;
                    default:
                        break;
                }

                setCurrentPosition({row: newRow, col: newCol});
                currentCell.changeGridArea(`${newRow} / ${newCol}`);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentPosition, size]);

    const cells = [];

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (row === initialPosition.row && col === initialPosition.col) {
                cells.push(<Cell ref={cellWith2} key={row * size + col} value={2} position={initialPosition}/>);
            } else {
                cells.push(<Cell key={row * size + col} value={0}/>);
                console.log(row * size + col);
            }
        }
    }

    return (
        <div className="board" style={{gridTemplateColumns, gridTemplateRows}}>
            {cells}
        </div>
    );
};

export default Board;
