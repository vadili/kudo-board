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
import Board from './Board';

function App() {
  const [displayCreateForm, setDisplayCreateForm] = useState(false);
  const [boards, setBoards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();


  console.log("selected cat", selectedCategory)

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredItems = selectedCategory === 'All' ? boards : boards.filter(item => item.category === selectedCategory);

  console.log("filteredItems,", filteredItems)

 function handleOpenCreateForm() {
    setDisplayCreateForm(true);
  }

  function handleCloseCreateForm() {
    setDisplayCreateForm(false);
  }

  const handleBoardSelect = (board) => {
    navigate('/boardpage', { state: { board } });
  }

  const fetchBoards = () => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setBoards(data);
    })
    .catch(error => {
      console.error('Error fetching photo:', error);
    });
  };

  const handleCreateBoard = (newBoard) => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBoard),
      }
    )
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
      console.error('Error fetching photo:', error);
    });
  }

  function handleDeleteButton(id) {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type" : "application/json"
      }
    })
    .then(response => {
      if (response.ok){
        setBoards(boards.filter(board => board.id !== id))
      }else{
        cconsole.error("Error deleting board")
      }
    })
    .then(data => {fetchBoards()
    })
    .catch(error => {
      console.error('Error fetching photo: ', error)
    })


    // removeBoard(prevItems => prevItems.filter((index) => index !== id))
}
const kudoboard = filteredItems.map(board => {
  return(
    <Board
        key={board.id}
        id={board.id}
        board = {board}
        imageURL = {board.imageURL}
        onDelete={() => handleDeleteButton(board.id)}
        title={board.title}
        category={board.category}
        onBoardSelect={handleBoardSelect}
        boards={filteredItems}
              />

  )
})
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
                <CreateForm addBoard={setBoards} displayForm={handleOpenCreateForm} onCreate ={handleCreateBoard} onClose={handleCloseCreateForm}/>
              ) : null}
              <main>
                <SearchBar />
                <div className="buttons">
                  <Button onClick={() => handleCategoryChange('All')} name="All" />
                  <Button onClick={() => handleCategoryChange('recent')} name="Recent"/>
                  <Button onClick={() => handleCategoryChange('celebration')} name="Celebration" />
                  <Button onClick={() => handleCategoryChange('thank you')} name="Thank You" />
                  <Button onClick={() => handleCategoryChange('inspiration')} name="Inspiration" />
                </div>
                <div className="create-buttons">
                  <Button
                    name="Create New Board"
                    displayForm={handleOpenCreateForm}
                  />
                </div>
                {kudoboard}
                {/* <BoardList boards={filteredItems} onBoardSelect={handleBoardSelect} /> */}
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
