import React, {useState} from 'react';
import "./Board.css";

// import { useLocation, Navigate } from 'react-router-dom';

// const boardImg = 'https://picsum.photos/200';


function Board({id, onDelete, imageURL, onBoardSelect, title, category, board, boards}) {

    // const [openView, setOpenView] = useState(false)

    const openBoardView = () => {
        onBoardSelect(board);
        // setOpenView(true)
    }

    // function handleDeleteButton(id) {
    //     removeBoard(prevItems => prevItems.filter((index) => index !== id))
    // }
    return (
        <div className="board">
            <img src={imageURL} alt='board'/>
            <h3>{title}</h3>
            <p>{category}</p>
            <div className="delete-and-view-buttons">
                <button className="view-button" onClick={openBoardView}>View Board</button>
                <button className="delete-button" onClick={onDelete}>Delete Board</button>
            </div>
        </div>
    )
}

export default Board;
