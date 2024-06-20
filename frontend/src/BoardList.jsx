import React, {useState} from 'react';
import Board from './Board'
import "./BoardList.css";


function BoardList(props) {
    return (
        <div className="board-list">

            {
                props.boards &&
                props.boards.map((board)=> {
                    return <Board title={board.title} category={board.category} displayBoard={props.handleDisplayBoardPage}/>
                })
            }


        </div>
    )
}

export default BoardList;
