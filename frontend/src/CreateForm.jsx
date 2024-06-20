import { useState } from "react";
import "./CreateForm.css";

function CreateForm(props) {
  const [formfield, setformfield] = useState({"title": "", "category": "", "author": ""})
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setformfield({
      ...formfield,
      [name]: value
    });
  };
  function handleCreateBoard(e) {
    e.preventDefault()
    props.addboard((prev) => [...prev, formfield])
  }

  return (
    <div id="create-form" className="modal-overlay">
        <div className="modal-content">
            <span className="close" onClick={props.displayForm}>&times;</span>
            <h1>Create a new post</h1>
            <form>
                <input name="title" type="text" placeholder="Title"  value={formfield.title} onChange={handleInputChange}/>
                <select name = "category" value = {formfield.category} onChange = {handleInputChange}>
                    <option value="public">Select a category</option>
                    <option value="recent">Recent</option>
                    <option value="celebration">Celebration</option>
                    <option value="thank you">Thank You</option>
                    <option value="inspiration">Inspiration</option>
                </select>


                <input name = "author" type="text" placeholder="Author" value = {formfield.author} onChange = {handleInputChange}/>
                <button className="create-button" onClick = {(e) => handleCreateBoard(e)}>Create Board</button>
            </form>
        </div>

    </div>

  )
}

export default CreateForm;
