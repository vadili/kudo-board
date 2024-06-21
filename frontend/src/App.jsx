import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Header from "./Header";
import SearchBar from "./SearchBar";
import Button from "./Button";
import BoardList from "./BoardList";
import Footer from "./Footer";
import CreateForm from "./CreateForm";
import BoardPage from './BoardPage';

function App() {
  const [displayCreateForm, setDisplayCreateForm] = useState(false);
  const [boards, setBoards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredItems = selectedCategory === 'All' ? boards : boards.filter(item => item.category === selectedCategory);

  function handleDisplayCreateForm() {
    setDisplayCreateForm(!displayCreateForm);
  }

  const handleBoardSelect = (board) => {
    navigate('/boardpage', { state: { board } });
  }

  useEffect(() => {
    const getBoards = async () => {
      try {
        const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS || 'http://localhost:3002';
        const response = await fetch(`${backendUrlAccess}/boards`);
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setBoards(data);
      } catch (error) {
        console.error(error);
      }
    };

    getBoards();
  }, []);

  return (
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={
            <div>
              {displayCreateForm ? (
                <CreateForm addBoard={setBoards} displayForm={handleDisplayCreateForm} />
              ) : null}
              <main>
                <SearchBar />
                <div className="buttons">
                  <Button onClick={() => handleCategoryChange('All')} name="All" />
                  <Button onClick={() => handleCategoryChange('recent')} name="Recent" />
                  <Button onClick={() => handleCategoryChange('celebration')} name="Celebration" />
                  <Button onClick={() => handleCategoryChange('thank you')} name="Thank You" />
                  <Button onClick={() => handleCategoryChange('inspiration')} name="Inspiration" />
                </div>
                <div className="create-buttons">
                  <Button
                    name="Create New Board"
                    displayForm={handleDisplayCreateForm}
                  />
                </div>
                <BoardList boards={filteredItems} onBoardSelect={handleBoardSelect} />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/boardpage" element={<BoardPage />} />
        </Routes>
      </div>
  );
}

export default App;
