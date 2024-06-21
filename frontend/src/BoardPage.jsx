import "./BoardPage.css"
import CardList from "./CardList";

function BoardPage({ board }) {
    if (!board) {
        return <div>No board selected.</div>;
    }


    return (
        <div className="board-page">
            <h2>{board.title}</h2>
            <p>{board.category}</p>
            <CardList />
        </div>
    );
 }

export default BoardPage;
