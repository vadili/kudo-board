import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardList from './CardList';
import CardCreateForm from './CardCreateForm';
import Modal from './Modal';
import './BoardPage.css';

const BoardPage = () => {
const { id } = useParams();
const [board, setBoard] = useState(null);
const [cards, setCards] = useState([]);
const [displayCardCreateModal, setDisplayCardCreateModal] = useState(false);

const fetchCards = () => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}/cards`)
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data)) {
            setCards([]);
        }
    })
    .catch (error => {
        console.error (`Error fetching cards:`, error);
        setCards([]);
    });

};

useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}`)
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Board data:', data);
        setBoard(data);
        fetchCards();
    })
    .catch(error => {
        console.error('Error fetching board:', error);
    });
    }, [id]);

    if (!board) {
    return <div>Loading...</div>;
    }

    const handleCreateCard = (newCard) => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}/cards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCard),
        })
        .then(response => response.json())
        .then(data => {
        setCards([...cards, data]);
        setDisplayCardCreateModal(false);
        })
        .catch(error => console.error('Error creating card:', error));
        };

        const handleDeleteCard = (cardId) => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}/cards/${cardId}`, {
        method: 'DELETE',
        })
        .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
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
        <button onClick={() => setDisplayCardCreateModal(true)}>Create Card</button>
        <Modal isOpen={displayCardCreateModal} onClose={() => setDisplayCardCreateModal(false)}>
        <CardCreateForm onCreate={handleCreateCard} />
        </Modal>
        <CardList
        cards={cards}
        onDelete={handleDeleteCard}
        />
        </div>
        );
        }

        export default BoardPage;
