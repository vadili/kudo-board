import { useState } from "react";
import "./CreateForm.css";

function CreateForm({onCreate, displayForm, onClose}) {
  const [formfield, setformfield] = useState({"title": "", "category": "", "author": ""})
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setformfield({
      ...formfield,
      [name]: value
    });
  };
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [author, setAuthor] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    const newBoard = {
      title,
      category,
      author,
    };
    onCreate(newBoard);
    onClose();
  };

  return (
    <div id="create-form" className="modal-overlay">
        <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h1>Create a new post</h1>
            <form onSubmit={handleSubmit}>
                <input name="title" type="text" placeholder="Title"  value={title} onChange={(e) => setTitle(e.target.value)}/>
                <select name = "category" value = {category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="public">Select a category</option>
                    <option value="recent">Recent</option>
                    <option value="celebration">Celebration</option>
                    <option value="thank you">Thank You</option>
                    <option value="inspiration">Inspiration</option>
                </select>


                <input name = "author" type="text" placeholder="Author" value = {author} onChange={(e) => setAuthor(e.target.value)}/>
                <button className="create-button" >Create Board</button>
            </form>
        </div>

    </div>

  )
}

export default CreateForm;
