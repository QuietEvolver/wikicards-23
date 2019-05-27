import React from "react";

function Form({ title, q, handleInputChange, handleFormSubmit}) {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="Query">
          <strong>{title}</strong>
        </label>
        <input
          className="form-control"
          id="Title"
          type="text"
          value={q}
          placeholder="Ready Player One"
          name="q"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="pull-right">
        <button
          onClick={handleFormSubmit}
          type="submit"
          className="btn btn-lg btn-danger float-right"
        >
          Form Submit
        </button>
      </div>
    </form>
  );
}

export default Form;
