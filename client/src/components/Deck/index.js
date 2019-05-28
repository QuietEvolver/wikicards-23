import React from "react";

export default function Deck({ icon, name, children }) {
  let r = parseInt(Math.random()*255);
  let b = parseInt(Math.random()*255);
  let g = parseInt(Math.random()*255);
  const style = { background: `rgba(${r},${g},${b},1)`} //a is alpha's opacity;
  return (
    <div className="deck mt-4" style={style}>
      <div className="card-header">
          <div className="deck-name">
            {name}
          </div>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}


