import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { useNavigate, useParams } from "react-router-dom";
import NoteCard from "../../components/noteCard/NoteCard";
import {
  showGreenMessage,
  showRedMessage,
} from "../../redux/features/toast/toastSlice";
import "./notesCategory.scss"

function NotesCategory() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  function createNote() {
    navigate("/createNote");
  }

  function getNotes() {
    fetch(`/api/notes/category/${category}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNotes(data);
      })
      .catch((err) => console.log(err));
  }

  function deleteNote(id) {
    fetch(`/api/notes/${id}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          dispatch(showRedMessage(data.message));
        } else {
          dispatch(showGreenMessage("deleted note successfully"));
          getNotes();
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getNotes();
  }, []);
  return (
    <div className="home">
      <div className="head">
      <Icon icon="material-symbols:arrow-back-rounded" className="icon" onClick={()=>navigate("/home")}/>
        <h3 className="note-category"><span>{category}</span> Notes</h3>
      </div>
      <div className="notes">
        {notes.map((note) => {
          return (
            <NoteCard
              onDelete={deleteNote}
              key={note._id}
              id={note._id}
              title={note.title}
              content={note.body}
              time={note.updatedAt}
              border={
                note.category === "important"
                  ? "#e10000"
                  : note.category === "general"
                  ? "#5403BA"
                  : note.category === "business"
                  ? "#00BF13"
                  : "#F9A400"
              }
              background={
                note.category === "important"
                  ? "rgba(225, 0, 0, 0.15)"
                  : note.category === "general"
                  ? "rgba(84, 3, 186, 0.15)"
                  : note.category === "business"
                  ? "rgba(0, 191, 19, 0.15)"
                  : "rgba(249, 164, 0, 0.15)"
              }
            />
          );
        })}
      </div>
      <div className="note-button">
        <div onClick={createNote}>
          <Icon
            icon="material-symbols:add"
            style={{ width: "40px", height: "40px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default NotesCategory;
