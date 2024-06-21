import React from "react";

function Card({ card, onUpvote, onDelete }) {
    return (
      <div className="card">
        <h4>{card.title}</h4>
        <p>{card.description}</p>
        <img src={card.gifUrl} alt="Card GIF" />
        <p>Author: {card.author || "Anonymous"}</p>
        <button onClick={() => onUpvote(card.id)}>Upvote ({card.upvote})</button>
        <button onClick={() => onDelete(card.id)}>Delete</button>
      </div>
    );
  }

  export default Card;
