import React from "react";
import { Icon } from "@iconify/react";
import "./categoryCard.scss";

function CategoryCard({ border, background, name, handleClick }) {
  return (
    <div
    onClick={()=> handleClick(name)}
      className="cont"
      style={{ border: `2px solid ${border}`, background: background }}
    >
      <div className="icon" style={{ background: border }}>
        <Icon icon="el:bookmark" style={{ height: "45px", width: "100px", color:border, }} />
      </div>
      <div className="cont-inner">
        <h3>{name}</h3>
      </div>
    </div>
  );
}

export default CategoryCard;
