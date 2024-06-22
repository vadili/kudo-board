import React from 'react';

function Card({ card}) {
  return (
    <div className='card-container'>
      <h2>{card.message}</h2>
      <img src={card.gifUrl} alt={card.message} />
      {card.textMessage && <p>{card.textMessage}</p>}
      <p>Signed: {card.isSigned ? 'Yes' : 'No'}</p>
      <p>Upvotes: {card.upvotes}</p>
    </div>
  );
}

export default Card;
