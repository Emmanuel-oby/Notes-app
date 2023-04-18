import React, { useEffect, useState } from "react";
import "./home.scss";
import NoteCard from "../../noteCard/NoteCard";
import CategoryCard from "../../categoryCard/CategoryCard";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const [notes, setNotes] = useState([]);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  function createNote() {
    navigate("/createNote");
  }
  useEffect(() => {
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
  }, []);

  return (
    <div className="home">
      <h2 className="greetings">Good Evening, {user.name}</h2>
      <div className="notes">
        {notes.map((note) => {
          return (
            <NoteCard
              key={note._id}
              title={note.title}
              content={note.body}
              time={note.updatedAt}
              border={note.category==="important" ? "#e10000" : note.category==="general" ? "#5403BA" : note.category==="business" ? "#00BF13" : "#F9A400"}
              background={note.category==="important" ? "rgba(225, 0, 0, 0.15)" : note.category==="general" ? "#E7D3FF" : note.category==="business" ? "rgba(0, 191, 19, 0.15)" : "rgba(249, 164, 0, 0.15)"}
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
