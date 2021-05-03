import React, { useState, useEffect } from "react";
import Retorno from "../components/Retorno";
import { Table, Row, Col, FormControl, Button } from "react-bootstrap";
import axios from "axios";
const url = "http://192.168.1.18:3000";

export default function Users() {
  const [data, setData] = useState([]);
  const [cui, setCUI] = useState("");
  const [cuis, setCUIS] = useState([]);

  useEffect(() => {
      getUsers()

      axios.get(url + "/getCuis").then((res) => {
        setCUIS(res.data);
      });

  }, []);


  function getUsers(){
    axios.get(url + "/users").then((res) => {
      setData(res.data);
    });

  }
 
  function getUser(){
    axios.get(url + "/user?cui="+cui).then((res) => {
      console.log(res.data);
      setData(res.data);
    });

  }


  return (
    <div>
      <Retorno />
      <h1 style={{ marginTop: 30 }}> Listado de Cuentahabientes</h1>

      <div>
        <h4> Buscar Cuentahabiente</h4>
        <Row>
          <Col md="4">
            <FormControl as="select" onChange={(e)=>{setCUI(e.target.value);console.log(cui)}} >
                {cuis.map((num,index)=>(
                    <option>{num.cui}</option>
                ))}
            </FormControl>
          </Col>
          <Col md="3">
            <Button onClick={()=>{getUser()}}> Buscar! </Button>
          </Col>
            <Col md="3" >
            <Button className="btn-danger" onClick={()=>{getUsers()}}> Resetear Datos </Button>
            </Col>
        </Row>
      </div>

      <Table style={{ marginTop: 40, marginBottom: 50 }} striped bordered hover>
        <thead>
          <tr>
            <th>CUI</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Username</th>
            <th>Email</th>
            <th>Genero</th>
            <th>Institucion Bancaria</th>
            <th>Tipo de Cuenta</th>
            <th>Saldo Inicial</th>
          </tr>
        </thead>
        <tbody>
          {data.map((persona, index) => (
            <tr>
              <td>{persona.cui}</td>
              <td>{persona.nombre}</td>
              <td>{persona.apellido}</td>
              <td>{persona.fecharegistro}</td>
              <td>{persona.email}</td>
              <td>{persona.genero}</td>
              <td>{persona.abreviacioninstitucion}</td>
              <td>{persona.tipocuenta}</td>
              <td>{"Q. " + persona.saldoinicial}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
