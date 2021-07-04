import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div class = "p-5" >
      <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark p-2">
        <Link to="/" class="navbar-brand" href="#">
         XpeedStudio
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link to="/" class="nav-link" href="#">
                ListTable
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/getForm" class="nav-link" href="#">
                GetForm
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/updateForm/:userId" class="nav-link" href="#">
                UpdateForm
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
