import React, { forwardRef, useImperativeHandle } from 'react';

const Cell = forwardRef(({ value, position }, ref) => {
    const cellRef = React.useRef(null);

    useImperativeHandle(ref, () => ({
        changeGridArea: (gridArea) => {
            cellRef.current.style.gridArea = gridArea;
        },
    }));

    return (
        <div ref={cellRef} style={position} className={`cell cell-${value}`}>
            {value}
        </div>
    );
});

export default Cell;
