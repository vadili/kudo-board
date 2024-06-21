import "./BoardPage.css";
import { useParams } from 'react-router-dom';
import CardList from "./CardList";
import { useState, useEffect } from "react";

function BoardPage() {
    const { id } = useParams();
    console.log("Board ID:", id);
    console.log("Location state:", location.state);
    const [board, setBoard] = useState(null);
    const [cards, setCards] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleCreateCard = (newCard) => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}/cards`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCard),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            fetchCards(); // Fetch cards after creating new card
        })
        .catch(error => console.error('Error creating card:', error));
        setShowCreateForm(false);
    };

    const fetchCards = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}/cards`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => setCards(data))
        .catch(error => console.error('Error fetching cards:', error));
    };

    useEffect(() => {
        console.log("Fetching board with ID:", id);
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setBoard(data))
            .catch(error => console.error('Error fetching board:', error));
    }, [id]);

    const handleDeleteCard = (cardId) => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/cards/${cardId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setCards(cards.filter(card => card.id !== cardId));
        })
        .catch(error => console.error('Error deleting card:', error));
    };

    if (!board) {
        return <div>Loading...</div>;
    }

    const allCards = cards.map(card => (
        <CardList
            key={card.id}
            id={card.id}
            boardId={card.boardId}
            imageUrl={card.imgUrl}
            description={card.description}
            title={card.title}
            author={card.author}
            upvote={card.upvote}
            onDelete={() => handleDeleteCard(card.id)}
        />
    ));

    return (
        <div className="board-page">
            <h2>{board.title}</h2>
            <p>{board.category}</p>
            <button className="createCard" onClick={() => setShowCreateForm(true)}>Create a card</button>

            {showCreateForm && (
                <form onSubmit={handleCreateCard}>
                    {/* Add your form inputs here */}
                    <button type="submit">Create</button>
                </form>
            )}

            {allCards}
        </div>
    );
}

export default BoardPage;
