import React, { useState, useEffect } from "react";
import Retorno from "../components/Retorno";
import { Table, Row, Col, FormControl, Button } from "react-bootstrap";
import {Link} from 'react-router-dom'
import axios from "axios";
const url = "http://192.168.1.18:3000";

export default function Login() {

  useEffect(() => {

  }, []);


  return (
    <div style={{align:"center"}}>
      <h1 style={{ marginTop: 30 }}> Iniciar Sesion</h1>
<br></br>
      <div>
        <Row>
          <Col md="4">
          <h3>Correo</h3>
          </Col>
          <Col md="4">
            <FormControl />
          </Col>
          <Col md="4">
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col md="4">
          <h3>Constraseña</h3>
          </Col>
          <Col md="4">
            <FormControl type="password"/>
          </Col>
          <Col md="4">
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col md="4">
          </Col>
          <Col md="4">
            <Link to="/Menu"><Button > Ingresar </Button></Link>
          </Col>
            <Col md="4" >
            </Col>
        </Row>
      </div>
    </div>
  );
}
