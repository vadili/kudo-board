// CardList.jsx
import React from 'react';

function CardList({ cards, onDelete }) {
    return (
        <div>
            {cards.map(card => (
                <div key={card.id}>
                    <p>{card.title}</p> {/* Assuming 'title' is the property you want to display */}
                    <button onClick={() => onDelete(card.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default CardList;
