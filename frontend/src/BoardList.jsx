import React, {useState} from 'react';
import Board from './Board'
import "./BoardList.css";


function BoardList(props) {

    return (
        <div className="board-list">
            {props.boards.map((board, id) => (
                <Board
                    key={id}
                    id={id}
                    board={board}
                    removeBoard={props.removeBoard}
                    onBoardSelect={props.onBoardSelect}
                    title={board.title}
                    category={board.category}
                />


            ))}

        </div>
    );
}

export default BoardList;
