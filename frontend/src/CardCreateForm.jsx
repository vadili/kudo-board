import React, { useEffect, useState } from 'react';
import './CardCreateForm.css';

function CardCreateForm({ onCreate }) {
    const [message, setMessage] = useState('');
    const [gifUrl, setGifUrl] = useState('');
    const [textMessage, setTextMessage] = useState('');
    const [isSigned, setIsSigned] = useState(false);
    const [searchURL, setsearchURL] = useState('');
    const [giphy, setgiphy] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCard = { message, gifUrl, textMessage, isSigned };
        onCreate(newCard);
    };

    useEffect(() => {
        async function loadGiphy() {
            // const apiKey = import.meta.env.GIPHY_API_KEY;
            // console.log(apiKey)
            const image = `https://api.giphy.com/v1/gifs/search?api_key=WCwyDczGY7JYevOksSE2WVrT6zDHewZ2&q=${searchURL}&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
            try {
                const response = await fetch(image);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setgiphy(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        if (searchURL) {
            loadGiphy();
        }
    }, [searchURL]);
    return (
        <form onSubmit={handleSubmit} className="create-card-form">
            <div>
                <label>Enter card title</label>
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
                    value={searchURL}
                    onChange={(e) => setsearchURL(e.target.value)}
                />
            </div>
            <div className="images">
                {giphy.map(item => (
                    <div className="images-original" key={item.images.original.url}>   <img className="image-item" src={item.images.fixed_width_small.url} onClick={() => { setGifUrl(item.images.original.url); setsearchURL(item.images.original.url) }} /> </div>
                ))}
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
