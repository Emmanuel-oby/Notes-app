import React from "react";
import "./home.scss";
import NoteCard from "../../noteCard/NoteCard";
import CategoryCard from "../../categoryCard/CategoryCard";
import { Icon } from '@iconify/react';
import { Link, useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    function createNote (){
        navigate("/createNote")
    }

  return (
    <div className="home">
      <h2 className="greetings">Good Evening, Daniel</h2>
      <div className="notes">
        <NoteCard border="2px solid #e10000" background="rgba(225, 0, 0, 0.1)"/>
        <NoteCard border="2px solid #5403ba" background="rgba(84, 3, 186, 0.15)"/>
        <NoteCard border="2px solid #f9a400" background="rgba(249, 164, 0, 0.15)"/>
      </div>
      <div className="category">
        <h3>Categories</h3>
        <div className="categories">
            <CategoryCard border="#5403ba" background="rgba(84, 3, 186, 0.15)" name="General"/>
            <CategoryCard border="#00BF13" background="rgba(0, 191, 19, 0.15)" name="Business"/>
            <CategoryCard border="#e10000" background="rgba(225, 0, 0, 0.1)" name="Important"/>
            <CategoryCard border="#f9a400" background="rgba(249, 164, 0, 0.15)" name="Others"/>
        </div>
      </div>
      <div className="note-button">
        <div onClick={createNote}><Icon icon="material-symbols:add" style={{width:"40px", height:"40px"}}/></div>
      </div>
    </div>
  );
}

export default Home;
