import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from "./Header";
import SearchBar from "./SearchBar";
import Button from "./Button";
import BoardList from "./BoardList";
import Footer from "./Footer";
import CreateForm from "./CreateForm";
import CardList from "./CardList";
import BoardPage from './BoardPage';

function App() {
  const [displayCreateForm, setDisplayCreateForm] = useState(false);
  const [displayBoardPage, setDisplayBoardPage] = useState(false);
  const [boards, setboards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredItems = selectedCategory === 'All' ? boards : boards.filter(item => item.category === selectedCategory);


  function handleDisplayBoardPage() {
    setDisplayBoardPage(!displayBoardPage);
  }

  function handleDisplayCreateForm() {
    setDisplayCreateForm(!displayCreateForm);
  }

  // async function handleFetch() {
  //   try{
  //     const url = userId
  //     ? `http://localhost:3001/boards/user/${userId}`
  //     : 'http://localhost:3001/boards'
  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: {

  //       },
  //     });
  //     const data = await response.json();
  //     setboards(data)
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }
  useEffect(() => {
    const getBoards = async () => {
      try{
        const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
        const response = await fetch(`${backendUrlAccess}/boards`);
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setBoards(data);
      }
      catch(error) {
        console.error(error);
      }
    };

    getBoards();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={
            <div>
              {displayCreateForm ? (
                <CreateForm addboard = {setboards} displayForm={handleDisplayCreateForm} />
              ) : null}




              <main>

                {/* <CardList/> */}

                <SearchBar />
                <div className="buttons">
                  <Button onClick={() => handleCategoryChange('All')} name="All" />
                  <Button onClick={() => handleCategoryChange('recent')} name="Recent" />
                  <Button onClick={() => handleCategoryChange('celebration')} name="Celebration" />
                  <Button onClick={() => handleCategoryChange('thank you')} name="Thank You" />
                  <Button onClick={() => handleCategoryChange('nspiration')} name="Inspiration" />
                </div>

                <div className="create-buttons">
                  <Button
                    name="Create New Board"
                    displayForm={handleDisplayCreateForm}
                  />
                </div>
                <BoardList removeboard = {setboards} boards = {filteredItems} handleDisplayBoardPage={handleDisplayBoardPage} />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/boardpage" element={<BoardPage />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App
