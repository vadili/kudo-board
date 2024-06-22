import Button from './Button';
import React, { useState } from 'react';
import "./Board.css";

function Card({ card, onDelete, onUpvote }) {
  return (
    <div className='board-container'>
      <div className="board">
        <div>
          <img src={card.gifUrl} alt={card.message} />
        </div>
        <h2>{card.message}</h2>
        {card.textMessage && <p>{card.textMessage}</p>}
        <p>Signed: {card.isSigned ? 'Yes' : 'No'}</p>
        <div className="delete-and-view-buttons">
          <Button onClick={onUpvote}>Upvotes:{card.upvotes}</Button>
          <Button onClick={onDelete}>Delete</Button>
        </div>
      </div>
    </div>
  )
}

export default Card;
