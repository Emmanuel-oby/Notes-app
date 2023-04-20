import React, { useEffect, useState } from "react";
import "./home.scss";
import NoteCard from "../../components/noteCard/NoteCard";
import CategoryCard from "../../components/categoryCard/CategoryCard";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  showGreenMessage,
  showRedMessage,
} from "../../redux/features/toast/toastSlice";

function Home() {
  const [notes, setNotes] = useState([]);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function createNote() {
    navigate("/createNote");
  }

  function getNotes() {
    fetch("/api/notes", {
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
      <h2 className="greetings">Good Evening, {user?.name}</h2>
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
      <div className="category">
        <h3>Categories</h3>
        <div className="categories">
          <CategoryCard
            border="#5403ba"
            background="rgba(84, 3, 186, 0.15)"
            name="General"
          />
          <CategoryCard
            border="#00BF13"
            background="rgba(0, 191, 19, 0.15)"
            name="Business"
          />
          <CategoryCard
            border="#e10000"
            background="rgba(225, 0, 0, 0.1)"
            name="Important"
          />
          <CategoryCard
            border="#f9a400"
            background="rgba(249, 164, 0, 0.15)"
            name="Others"
          />
        </div>
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

export default Home;
