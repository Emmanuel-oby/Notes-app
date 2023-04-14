import React from "react";
import './noteCard.scss';

function NoteCard({border, background}) {
  return (
    <div className="note" style={{border:border, background:background}}>
      <div className="note-inner">
        <h3 className="title">Lorem Ipsum</h3>
        <p className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          rhoncus tempor dolor, vitae venenatis nulla
        </p>
        <p className="time">March 3rd, 2023 11:20am</p>
      </div>
    </div>
  );
}

export default NoteCard;
