// import React, { useState, useEffect} from 'react';
// import './CardCreateForm.css';

// const CreateCardForm = ({boardId,  onClose, onCreate }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [owner, setOwner] = useState('');
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [gifs, setGifs] = useState([]);
// //   const [selectedGif, setSelectedGif] = useState('');

// //   const handleSearch = (searchQuery) => {
// //     fetch(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${searchQuery}&limit=7`)
// //       .then(response => response.json())
// //       .then(data => setGifs(data.data))
// //       .catch(error => console.error('Error fetching gifs:', error));
// //   };

// //   const handleSelectedGif = (gifUrl) =>{
// //     setSelectedGif(gifUrl);
// //     setGifs([]);
// //   }
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newCard = {
//         title:title,
//         description: description,
//         imageUrl:selectedGif,
//         author: owner,
//         upvote:0,
//         boardId: parseInt(boardId),
//     };
//     onCreate(newCard);
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal">
//         <button className="closeButton" onClick={onClose}>×</button>
//         <h2>Create a New Card</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Enter card title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Enter card description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//           {/* <input
//             type="text"
//             placeholder="Enter search query"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           /> */}
//           {/* <button type="button" onClick={()=> handleSearch(searchQuery)}>Search</button>
//           <div className="gifGrid">
//             {gifs.map(gif => (
//               <img
//                 key={gif.id}
//                 src={gif.images.fixed_height_small.url}
//                 alt={gif.title}
//                 onClick={() => handleSelectedGif(gif.images.fixed_height_small.url)}
//               />
//             ))}
//           </div> */}
//           {/* <input
//             type="text"
//             placeholder="Gifurl"
//             value={selectedGif}
//             onChange={(e) => setSelectedGif(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Enter owner (optional)"
//             value={owner}
//             onChange={(e) => setOwner(e.target.value)}
//           /> */}
//           <button type="submit">Create Card</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CardCreateForm;

import React, { useState } from 'react';

function CardCreateForm({ boardId, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [gifUrl, setGifUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      title,
      description,
      author,
      gifUrl,
      upvote: 0,
      boardId
    };
    onCreate(newCard);
    setTitle('');
    setDescription('');
    setAuthor('');
    setGifUrl('');
  };

  const fetchGifs = async (query) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=YOUR_GIPHY_API_KEY&q=${query}&limit=10`);
    const { data } = await response.json();
    return data.map(gif => gif.images.fixed_height.url);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
      <input type="text" placeholder="Author (optional)" value={author} onChange={e => setAuthor(e.target.value)} />
      <input type="text" placeholder="GIF URL" value={gifUrl} onChange={e => setGifUrl(e.target.value)} required />
      <button type="submit">Create Card</button>
    </form>
  );
}

export default CardCreateForm;
