import React, { useState, useEffect } from "react";
import Retorno from "../components/Retorno";
import { Table, Row, Col, FormControl, Button } from "react-bootstrap";
import axios from "axios";
const url = "http://192.168.1.18:3000";

export default function Instituciones() {
  const [data, setData] = useState([]);

  useEffect(() => {
      getUsers()


  }, []);


  function getUsers(){
    axios.get(url + "/inst").then((res) => {
      setData(res.data);
    });

  }
 


  return (
    <div>
      <Retorno />
      <h1 style={{ marginTop: 30 }}> Listado de Instituciones</h1>

      

      <Table style={{ marginTop: 40, marginBottom: 50 }} striped bordered hover>
        <thead>
          <tr>
            <th>Nombre Institución</th>
            <th>Abreviación Institucion</th>
          </tr>
        </thead>
        <tbody>
          {data.map((persona, index) => (
            <tr>
              <td>{persona.institucionbancaria}</td>
              <td>{persona.abreviacioninstitucion}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
