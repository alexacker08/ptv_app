import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {Loader} from 'react-loader';

const Navbar = () => (
  <div className="nav-container">
    <nav>
      <div className="nav-content">
        <div className="logo-bkg">
          <Link to={"/"} className="train-logo"></Link>
        </div>
        <ul className="nav-options">
          <li><Link to={"/favourites"}>Favourites</Link></li>
          <li><Link to={"/all-trains"}>All Trains</Link></li>
          <li><Link to={"/closest"}>Closest to Me</Link></li>
        </ul>
      </div>
    </nav>
  </div>
)

export default Navbar