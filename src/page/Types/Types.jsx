import React from 'react';

function Types(props) {
    return (
        <div>
            2
            {Array.from({length:55}).map((item, i) => (
                <h1 key={i}>i</h1>
            ))}
        </div>
    );
}

export default Types;
