import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer>
      <hr />
      <p className="pull-right">
        <i className="fab fa-github" /> Proudly built using React.js
      </p>
      <a href="https://quietevolver.github.io/wikicards/"><FontAwesomeIcon icon={faGithub} size="2x"/></a>
    </footer>
  );
}

export default Footer;
