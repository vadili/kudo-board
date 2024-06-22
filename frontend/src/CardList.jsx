import React from 'react';
import Card from './Card';

function CardList({ cards, onDelete }) {
    return (
        <div>
            {cards.map(card => (
                <div key={card.id}>
                    <p>{card.message}</p>
                    <img src={card.gifUrl} alt={card.message} />
                    <p>{card.textMessage}</p>
                    <button onClick={() => onDelete(card.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default CardList;
