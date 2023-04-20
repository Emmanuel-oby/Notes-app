import { useState, useRef, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import "./createNote.scss";
import { useDispatch } from "react-redux";
import {
  showGreenMessage,
  showRedMessage,
} from "../../../redux/features/toast/toastSlice";
import { useNavigate } from "react-router-dom";

function CreateNote(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isExpanded, setExpanded] = useState(false);

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
        }
      })
      .catch((err) => console.log(err));
    setNote({
      title: "",
      content: "",
      category: "general",
    });
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
        {isExpanded && (
          <>
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
          </>
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
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

export default CreateNote;
