import React from 'react';
import Card from './Card';

function CardList({ cards, onDelete, onUpvote }) {
    return (
        <div className='kudo-board'>
            {cards.map(card => (
                <Card card={card}
                    key={card.id}
                    onDelete={() => onDelete(card.id)}
                    onUpvote={() => onUpvote(card.id)}
                />
            ))}
        </div>
    );
}

export default CardList;
