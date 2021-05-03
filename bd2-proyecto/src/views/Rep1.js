import React, { useState, useEffect } from "react";
import Retorno from "../components/Retorno";
import { Table, Row, Col, FormControl, Button } from "react-bootstrap";
import axios from "axios";
const url = "http://192.168.1.18:3000";

export default function Rep1() {
  const [data, setData] = useState([]);
  const [cui, setCUI] = useState("");
  const [cuis, setCUIS] = useState([]);

  useEffect(() => {

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
    axios.get(url + "/operaciones?cui="+cui).then((res) => {
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
            <Button className="btn-danger" onClick={()=>{setData([])}}> Resetear Datos </Button>
            </Col>
        </Row>
      </div>

      <Table style={{ marginTop: 40, marginBottom: 50 }} striped bordered hover>
        <thead>
          <tr>
            <th>CUI</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Institución Bancaria</th>
            <th>Tipo de Cuenta</th>
            <th>Nombre 2</th>
            <th>Apellido 2</th>
            <th>Institución Bancaria 2</th>
            <th>Fecha Transferencia</th>
            <th>Monto Tranferencia</th>
          </tr>
        </thead>
        <tbody>
          {data.map((persona, index) => (
            <tr>
              <td>{persona.cui}</td>
              <td>{persona.nombre}</td>
              <td>{persona.apellido}</td>
              <td>{persona.institucionbancaria}</td>
              <td>{persona.tipocuenta}</td>
              <td>{persona.nombre2}</td>
              <td>{persona.apellido2}</td>
              <td>{persona.institucionbancaria2}</td>
              <td>{persona.fechatransferencia}</td>
              <td>{"Q. " + persona.montotransferencia}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
