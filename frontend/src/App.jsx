import { useState } from 'react'
import './App.css'
import Header from "./Header";
import SearchBar from "./SearchBar";
import Button from "./Button";
import BoardList from "./BoardList";
import Footer from "./Footer";
import CreateForm from "./CreateForm";
import CardList from "./CardList";

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

  return (
    <div className="App">

      {displayCreateForm ? (
        <CreateForm addboard = {setboards} displayForm={handleDisplayCreateForm} />
      ) : null}



      <Header />
      <main>

        {/* <CardList/> */}

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
        <BoardList removeboard = {setboards} boards = {filteredItems} handleDisplayBoardPage={handleDisplayBoardPage} />
      </main>
      <Footer />
    </div>

  )
}

export default App
