import React, { useState, useEffect } from "react";
import Retorno from "../components/Retorno";
import { Table, Row, Col, FormControl, Button } from "react-bootstrap";
import axios from "axios";
const url = "http://192.168.1.18:3000";

export default function Rep2() {
  const [data, setData] = useState();
  const [cui, setCUI] = useState("");
  const [cuis, setCUIS] = useState([]);

  useEffect(() => {

      axios.get(url + "/inst2").then((res) => {
          console.log(res.data);
        setCUIS(res.data);
      });

  }, []);


  function getUsers(){
    axios.get(url + "/users").then((res) => {
      setData(res.data);
    });

  }
 
  function getUser(){
    axios.get(url + "/creditoInst?cui="+cui.replace("&","%26")).then((res) => {
      console.log(res.data);
      setData(res.data);
    });

  }


  return (
    <div>
      <Retorno />
      <h1 style={{ marginTop: 30 }}> Creditos y Debitos por Banco</h1>

      <div>
        <h4> Buscar Banco</h4>
        <Row>
          <Col md="4">
            <FormControl as="select" onChange={(e)=>{setCUI(e.target.value);console.log(cui)}} >
                {cuis.map((num,index)=>(
                    <option>{num.institucionbancaria}</option>
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
        <br></br>
        <br></br>
        <Row>
            <Col>
        <h3>Creditos</h3>
        <h4> Q. {data?.creditos}</h4>
        </Col>
            <Col>
        <h3>Debitos</h3>
        <h4> Q. {data?.debitos}</h4></Col>
        </Row>
      </div>

     
    </div>
  );
}
