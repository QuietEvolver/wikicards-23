import React from "react";

export default function Deck({ icon, name, children }) {
  return (
    <div className="card mt-4">
      <div className="card-header">
        <h3>
          <strong>
            <i className={`fa fa-${icon}`} aria-hidden="true" /> {name}
          </strong>
        </h3>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}


