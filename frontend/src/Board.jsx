import React, {useState} from 'react';
import "./Board.css";

function Board({id, onDelete, imageURL, onBoardSelect, title, category, board, boards}) {

    const openBoardView = () => {
        onBoardSelect(board);
    }

    return (
        <div className='board-container'>
            <div className="board">
                <div>
                    <img src={imageURL} alt='board'/>
                </div>
                <h3>{title}</h3>
                <p>{category}</p>
                <div className="delete-and-view-buttons">
                    <button className="view-button" onClick={openBoardView}>View Board</button>
                    <button className="delete-button" onClick={onDelete}>Delete Board</button>
                </div>
            </div>
        </div>
    )
}

export default Board;
