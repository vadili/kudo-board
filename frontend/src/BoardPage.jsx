// BoardPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardList from "./CardList";
import CardCreateForm from './CardCreateForm';
import "./BoardPage.css";

function BoardPage() {
    const { id } = useParams();
    const [board, setBoard] = useState(null);
    const [cards, setCards] = useState([]);

    const fetchCards = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}/cards`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Check if data is an array
            if (Array.isArray(data)) {
                setCards(data);
            } else {
                console.error('Expected an array of cards, but got:', data);
                setCards([]); // Set to empty array if response is not an array
            }
        })
        .catch(error => {
            console.error('Error fetching cards:', error);
            setCards([]); // Set to empty array in case of error
        });
    };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}`)
            .then(response => response.json())
            .then(data => {
                setBoard(data);
                fetchCards(); // Fetch cards when the board is loaded
            })
            .catch(error => console.error('Error fetching board:', error));
    }, [id]);

    const handleCreateCard = (newCard) => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}/cards`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCard),
        })
            .then(response => response.json())
            .then(data => {
                setCards([...cards, data]);
            })
            .catch(error => console.error('Error creating card:', error));
    };

    const handleDeleteCard = (cardId) => {
        const url = `${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}/cards/${cardId}`;
        console.log("Deleting card with URL:", url); // Log the URL to check correctness
        fetch(url, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Remove the card from state after successful deletion
            const updatedCards = cards.filter(card => card.id !== cardId);
            setCards(updatedCards);
        })
        .catch(error => console.error('Error deleting card:', error));
    };

    if (!board) {
        return <div>Loading...</div>;
    }

    return (
        <div className="board-page">
            <h2>{board.title}</h2>
            <p>{board.category}</p>
            <CardCreateForm onCreate={handleCreateCard} />

            {/* Ensure cards are rendered */}
            {cards.length > 0 ? (
                <CardList
                    cards={cards}
                    onDelete={handleDeleteCard}
                />
            ) : (
                <div>No cards found.</div>
            )}
        </div>
    );
}

export default BoardPage;
