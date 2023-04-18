import React, { useEffect, useRef, useState } from "react";
import "./noteCard.scss";
import { Icon } from "@iconify/react";

function NoteCard({ border, background, title, content, time }) {
  const [showOpt, setShowOpt] = useState(false);
  const [isHover1, setIsHover1] = useState(false);
  const [isHover2, setIsHover2] = useState(false);

  function deleteNote(event) {
    event.preventDefault();
  }

  function useOutside(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowOpt(false);
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
    <div
      className="note"
      style={{ border: `2px solid ${border}`, background: background }}
    >
      <div className="note-inner">
        <div className="top">
          <h3 className="title">{title}</h3>
          {showOpt && (
            <div
              className="option"
              ref={wrapperRef}
              style={{ border: `2px solid ${border}` }}
            >
              <Icon
                icon="ic:outline-delete-outline"
                className="icon"
                onClick={deleteNote}
                style={{ color: isHover1 ? border : "inherit" }}
                onMouseEnter={()=>{setIsHover1(true)}}
                onMouseLeave={()=>{setIsHover1(false)}}
              />
              <Icon
                icon="mdi:clipboard-edit-outline"
                className="icon"
                onClick={deleteNote}
                style={{ color: isHover2 ? border : "inherit" }}
                onMouseEnter={()=>{setIsHover2(true)}}
                onMouseLeave={()=>{setIsHover2(false);}}
              />
            </div>
          )}

          <div
            className="icon-cont"
            onClick={() => {
              setShowOpt(true);
            }}
          >
            <Icon icon="bi:three-dots-vertical" className="icon" />
          </div>
        </div>

        <p className="content">{content}</p>
        <p className="time">{time}</p>
      </div>
    </div>
  );
}

export default NoteCard;
