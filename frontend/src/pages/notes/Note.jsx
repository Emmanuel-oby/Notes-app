import { useState, useRef, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  showGreenMessage,
  showRedMessage,
} from "../../redux/features/toast/toastSlice";
import "../createNote/createNote.scss";

function Note() {
  const { noteid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isExpanded, setExpanded] = useState(false);
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
        }
      })
      .catch((err) => console.log(err));
    navigate("/home");
  }

  function expand() {
    setExpanded(true);
  }
  function useOutside(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setExpanded(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutside(wrapperRef);
  return (
    <div ref={wrapperRef} className="form">
      <form className="create-note">
        <>
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
        </>

        <textarea
          name="body"
          onClick={expand}
          onChange={handleChange}
          value={note.body}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default Note;
