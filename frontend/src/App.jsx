import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Header from "./Header";
import SearchBar from "./SearchBar";
import Button from "./Button";
import Footer from "./Footer";
import CreateForm from "./CreateForm";
import BoardPage from './BoardPage';
import Board from './Board';

function App() {
  const [displayCreateForm, setDisplayCreateForm] = useState(false);
  const [boards, setBoards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
};

const filteredItems = selectedCategory === 'All' ? boards : boards.filter(item => item.category === selectedCategory);

const handleOpenCreateForm = () => {
  setDisplayCreateForm(true);
};

const handleCloseCreateForm = () => {
  setDisplayCreateForm(false);
};

const handleBoardSelect = (board) => {
  navigate(`/boards/${board.id}`);
};

const fetchBoards = () => {
  fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards`)
  .then(response => {
  if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
  })
  .then(data => {
  console.log('Boards fetched:', data);
  setBoards(data);
  })
  .catch(error => {
  console.error('Error fetching boards:', error);
});
};

const handleCreateBoard = (newBoard) => {
  fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards`, {
  method: "POST",
  headers: {
  "Content-Type": "application/json",
  },
  body: JSON.stringify(newBoard),
  })
  .then(response => {
  if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
  })
  .then(data => {
  fetchBoards();
  })
  .catch(error => {
  console.error('Error creating board:', error);
});
};

const handleDeleteButton = (id) => {
  fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}`, {
  method: "DELETE",
  headers: {
  "Content-Type": "application/json",
  },
  })
  .then(response => {
  if (response.ok) {
  setBoards(boards.filter(board => board.id !== id));
  } else {
  console.error("Error deleting board");
  }
  })
  .catch(error => {
  console.error('Error deleting board: ', error);
  });
};

const kudoboard = filteredItems.map(board => (
  <Board
  key={board.id}
  id={board.id}
  board={board}
  imageURL={board.imageURL}
  onDelete={() => handleDeleteButton(board.id)}
  title={board.title}
  category={board.category}
  onBoardSelect={handleBoardSelect}
  boards={filteredItems}
/>
));

useEffect(() => {
fetchBoards();
}, []);
console.log(filteredItems)
return (
<div className="App">
<Header />
<Routes>
<Route path='/' element={
<div>
{displayCreateForm ? (
<CreateForm onCreate={handleCreateBoard} onClose={handleCloseCreateForm} />
) : null}
<main>
<SearchBar />
<div className="buttons">
<Button onClick={() => handleCategoryChange('All')}><p className='all-button'>All</p></Button>
<Button onClick={() => handleCategoryChange('recent')}><p className='all-button'>Recent</p></Button>
<Button onClick={() => handleCategoryChange('celebration')}><p className='all-button'>Celebration</p></Button>
<Button onClick={() => handleCategoryChange('thank you')}><p className='all-button'>Thank you</p></Button>
<Button onClick={() => handleCategoryChange('inspiration')}><p className='all-button'>Inspiration</p></Button>
<Button onClick={handleOpenCreateForm}>Create New Board</Button>
</div>
<section className='kudo-board'>
{kudoboard}
</section>
</main>
</div>
} />
<Route path='/boards/:id' element={<BoardPage />} />
</Routes>
<Footer />
</div>
);
}

export default App;
