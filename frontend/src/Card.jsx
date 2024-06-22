import React from 'react';
import Button from './Button';

function Card({ card, onDelete, onUpvote}) {
  return (
    <div className='card-container'>
      <h2>{card.message}</h2>
      <img src={card.gifUrl} alt={card.message} />
      {card.textMessage && <p>{card.textMessage}</p>}
      <p>Signed: {card.isSigned ? 'Yes' : 'No'}</p>
      <Button onClick = {onUpvote}>Upvotes:{card.upvotes}</Button>
      <Button onClick = {onDelete}>Delete</Button>
    </div>
  );
}

export default Card;
