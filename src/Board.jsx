import React, { useEffect, useRef } from 'react';
import Cell from './Cell';

const Board = ({ size, boardData }) => {
    const gridTemplateColumns = `repeat(${size}, 1fr)`;
    const gridTemplateRows = `repeat(${size}, 1fr)`;
    const cellWith2 = useRef(null);
    const initialPosition = { row: 0, col: 0 };
    const currentPosition = useRef(initialPosition);

    const moveElement = (direction) => {
        const currentCell = cellWith2.current;

        if (currentCell) {
            let newRow = currentPosition.current.row;
            let newCol = currentPosition.current.col;

            switch (direction) {
                case 'left':
                    newCol = Math.max(1, newCol - 1);
                    break;

                case 'right':
                    newCol = Math.min(size, newCol + 1);
                    break;

                case 'up':
                    newRow = Math.max(1, newRow - 1);
                    break;

                case 'down':
                    newRow = Math.min(size, newRow + 1);
                    break;

                default:
                    break;
            }

            currentPosition.current = { row: newRow, col: newCol };
            currentCell.changeGridArea(`${newRow} / ${newCol}`);
        }
    };

    const initializeCells = () => {
        const cells = [];

        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (row === initialPosition.row && col === initialPosition.col) {
                    cells.push(<Cell ref={cellWith2} key={row * size + col} value={2} position={initialPosition} />);
                } else {
                    cells.push(<Cell key={row * size + col} value={0} />);
                }
            }
        }

        return cells;
    };

    const handleKeyDown = (event) => {
        switch (event.key) {
            case 'ArrowLeft':
                moveElement('left');
                break;

            case 'ArrowRight':
                moveElement('right');
                break;

            case 'ArrowUp':
                moveElement('up');
                break;

            case 'ArrowDown':
                moveElement('down');
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="board" style={{ gridTemplateColumns, gridTemplateRows }}>
            {initializeCells()}
        </div>
    );
};

export default Board;
