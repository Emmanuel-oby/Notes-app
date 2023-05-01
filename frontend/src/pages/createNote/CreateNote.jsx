import { useState, useRef, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import "./createNote.scss";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import {
  showGreenMessage,
  showRedMessage,
} from "../../redux/features/toast/toastSlice";
import { useNavigate } from "react-router-dom";

function CreateNote() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [note, setNote] = useState({
    title: "",
    content: "",
    category: "general",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    fetch("/api/notes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        title: note.title,
        body: note.content,
        category: note.category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          dispatch(showRedMessage(data.message));
        } else {
          dispatch(showGreenMessage("created note successfully"));
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
    setNote({
      title: "",
      content: "",
      category: "general",
    });
  }

  return (
    <div>
      <div className="form">
        <form className="create-note">
          <div className="select">
            <label htmlFor="category">Select a category:</label>
            <select name="category" id="category" onChange={handleChange}>
              <option value="general">General</option>
              <option value="business">Business</option>
              <option value="important">Important</option>
              <option value="others">Others</option>
            </select>
          </div>
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />

          <textarea
            name="content"
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows={3}
          />
        </form>
      </div>
      <div className="note-button">
        <div onClick={submitNote}>
          <Icon
            icon="material-symbols:check-small-rounded"
            style={{ width: "40px", height: "40px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateNote;
