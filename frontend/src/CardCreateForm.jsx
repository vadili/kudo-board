import React, { useState } from 'react';
import './CardCreateForm.css';

function CardCreateForm({ onCreate }) {
    const [message, setMessage] = useState('');
    const [gifUrl, setGifUrl] = useState('');
    const [textMessage, setTextMessage] = useState('');
    const [isSigned, setIsSigned] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCard = { message, gifUrl, textMessage, isSigned };
        onCreate(newCard);
    };

    return (
        <form onSubmit={handleSubmit} className="create-card-form">
            <div>
                <label>Message:</label>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <div>
                <label>Gif URL:</label>
                <input
                    type="text"
                    value={gifUrl}
                    onChange={(e) => setGifUrl(e.target.value)}
                />
            </div>
            <div>
                <label>Text Message:</label>
                <input
                    type="text"
                    value={textMessage}
                    onChange={(e) => setTextMessage(e.target.value)}
                />
            </div>
            <div>
                <label>
                    Signed:
                    <input
                        type="checkbox"
                        checked={isSigned}
                        onChange={(e) => setIsSigned(e.target.checked)}
                    />
                </label>
            </div>
            <button type="submit">Create Card</button>
        </form>
    );
}

export default CardCreateForm;
