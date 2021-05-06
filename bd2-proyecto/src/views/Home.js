import React, {Component} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Menu from './Menu'
import Instituciones from './Instituciones'
import Users from './Users'
import Rep1 from './Rep1'
import Rep2 from './Rep2'
import Rep3 from './Rep3'
import Login from './Login'
import Deposito from './Deposito'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"
import "./Home.css"


export default function Home() {
    return (
        <div>
            
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">
      <img
        alt=""
        src="https://firebasestorage.googleapis.com/v0/b/boxy-svg.appspot.com/o/artworks%2F-LZTbRDkQe2L2kWYhety.png?alt=media"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      Proyecto - BD2 - 201602916
    </Navbar.Brand>
  </Navbar>


  <Router>
  <div className="alineado">
  <Switch>
      <Route path="/users">
          <Users/>
      </Route>
      <Route path="/banks">
          <Instituciones/>
      </Route>
      <Route path="/Menu">
          <Menu/>
      </Route>
      <Route path="/Rep1">
          <Rep1/>
      </Route>
      <Route path="/Rep2">
          <Rep2/>
      </Route>
      <Route path="/Rep3">
          <Rep3/>
      </Route>
      <Route path="/deposito">
          <Deposito/>
      </Route>
      <Route path="/">
          <Login/>
      </Route>
  </Switch>
  </div>
  </Router>
        </div>
    )
}

