import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {Loader} from 'react-loader';
import {
  Row,
  Column,
  TopBar,
  TopBarTitle,
  TopBarRight,
  Menu,
  MenuItem
} from 'react-foundation';

const Navbar = () => (
  <TopBar className="navbar">
    <Row>
      <Column>
        <TopBarTitle className="navbar__title"><Link to="/">React starter</Link></TopBarTitle>
        <TopBarRight className="navbar__right">
          <Menu>
            <MenuItem>
              <Link to="/trains">Log in</Link>
            </MenuItem>
          </Menu>
        </TopBarRight>
      </Column>
    </Row>
  </TopBar>	
)

export default Navbar