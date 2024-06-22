import React, { useState } from 'react';
import './CreateForm.css';

const CreateForm = ({ onCreate, onClose }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBoard = { title, category, author };
        onCreate(newBoard);
        onClose();
    };

    return (
        <div className="create-form">
            <form onSubmit={handleSubmit}>
                <h3>Create a New Board</h3>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">All</option>
                    <option value="recent">Recent</option>
                    <option value="celebration">Celebration</option>
                    <option value="inspiration">Inspiration</option>
                    <option value="thank you">Thank You</option>
                </select>


                <label>Author:</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <button type="submit">Create Board</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default CreateForm;
