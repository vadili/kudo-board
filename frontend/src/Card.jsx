import React from 'react';

function Card({ card, onUpvote, onDelete }) {
  return (
    <div className='card-container'>
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <img src={card.gifUrl} alt={card.title} />
      <p>Author: {card.author || "Anonymous"}</p>
      <button onClick={() => onUpvote(card.id)}>Upvote ({card.upvotes})</button>
      <button onClick={() => onDelete(card.id)}>Delete</button>
    </div>
  );
}

export default Card;
