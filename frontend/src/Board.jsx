import React, {useState} from 'react';
import "./Board.css";
const boardImg = 'https://picsum.photos/200';


function Board(props) {
    function handleDeleteButton(id) {
            props.removeboard(prevItems => prevItems.filter((item, index) => index !== id))

    }
    return (
        <div className="board">
            <img src={boardImg} alt='board'/>
            <h3>{props.title}</h3>
            <p>{props.category}</p>
            <div className="delete-and-view-buttons">
                <button className="view-button" onClick={props.displayBoard}>View Board</button>
                <button className="delete-button" onClick={() => handleDeleteButton(props.id)}>Delete Board</button>
            </div>
        </div>
    )
}

export default Board;
