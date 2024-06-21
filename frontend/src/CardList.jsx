import { useState } from "react";
import Button from "./Button";
import "./CardList.css";

function CardList(props) {
    const [votecount, setvotecount] = useState(0)
    function handlevote() {
        setvotecount( (prev)=> prev + 1 )

    }
    return (
        <div className = "card-list">
            <h4>{props.title}</h4>
            <div className = "create-card">
            <Button name="Create a card"/>
            </div>
            <div>
                <p>Card Name</p>
                <img src="https://media4.giphy.com/media/3o85xKzvhRWSlOE7xC/giphy.gif?cid=72ae070coek11rqvv0lak5zd0kot76k8nlteot8rk0406dvy&ep=v1_gifs_search&rid=giphy.gif&ct=g"/>
                <div className = "upvote-delete">
                    <Button name={`Upvote: ${votecount}`} onClick = {handlevote} />
                    <Button name="delete"/>

                </div>

            </div>





        </div>


    )
}

export default CardList;
