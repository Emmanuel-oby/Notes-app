import React from "react";
import './noteCard.scss';

function NoteCard({border, background, title, content, time}) {
  return (
    <div className="note" style={{border:`2px solid ${border}`, background:background}}>
      <div className="note-inner">
        <h3 className="title">{title}</h3>
        <p className="content">
         {content}
        </p>
        <p className="time">{time}</p>
      </div>
    </div>
  );
}

export default NoteCard;
