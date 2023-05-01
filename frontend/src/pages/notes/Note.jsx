import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Icon } from '@iconify/react';
import {
  showGreenMessage,
  showRedMessage,
} from "../../redux/features/toast/toastSlice";
import "../createNote/createNote.scss";

function Note() {
  const { noteid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [note, setNote] = useState('');

  useEffect(() => {
    fetch(`/api/notes/${noteid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNote(data);
      })
      .catch((err) => console.log(err));
  }, []);

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
    fetch(`/api/notes/${noteid}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        title: note.title,
        body: note.body,
        category: note.category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          dispatch(showRedMessage(data.message));
        } else {
          dispatch(showGreenMessage("updated note successfully"));
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
   
  }
  
  return (
    <div>
    <div className="form">
      <form className="create-note">
          <div className="select">
            <label htmlFor="category">Select a category:</label>
            <select
              name="category"
              id="category"
              value={note.category}
              onChange={handleChange}
            >
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
          name="body"
          onChange={handleChange}
          value={note.body}
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

export default Note;
