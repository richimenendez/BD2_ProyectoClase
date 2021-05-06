import React, { useState, useEffect } from "react";
import Retorno from "../components/Retorno";
import { Table, Row, Col, FormControl, Button } from "react-bootstrap";
import axios from "axios";
const url = "http://192.168.1.18:3000";

export default function Deposito() {
  const [data, setData] = useState([]);
  const [cui, setCUI] = useState("");
  const [envio, setEnvio] = useState({});

  useEffect(() => {
      getUsers()


  }, []);


  function getUsers(){
    axios.get(url + "/users").then((res) => {
      setData(res.data);
    });

  }
 
  function sendData(){
    console.log(envio)
    if(envio.saldoinicial < envio.valor){
      alert("Fondos insuficientes")
      return
    }
    axios.post(url + "/insTrans",{values:envio}).then((res) => {
      console.log(res.data)
      if(res.data.mensaje==1)
        alert("Inserción con exito!")
      else
        alert("Error en la inserción!")
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
      <h1 style={{ marginTop: 30 }}> Realizar Transferencia</h1>

      <div>
        <h4> Buscar Cuentahabiente 1</h4>
        <Row>
          <Col md="12">
            <FormControl as="select" onChange={(e)=>{
              var text = e.target.value;
              var aux = envio;
              aux.cui = text.split(",")[0]
              aux.nombre = text.split(",")[1]
              aux.apellido = text.split(",")[2]
              aux.email = text.split(",")[4]
              aux.fecharegistro = text.split(",")[3]
              aux.genero = text.split(",")[5]
              aux.institucionbancaria = text.split(",")[6]
              aux.abreviacioninstitucion = text.split(",")[7]
              aux.tipocuenta = text.split(",")[8]
              aux.saldoinicial = parseInt(text.split(",")[9])
              setEnvio(aux);
              console.log(aux)
              }} >
                {data.map((num,index)=>(
                    <option>{num.cui+","+num.nombre+","+num.apellido+","+num.fecharegistro+","+num.email+","+num.genero+","+num.institucionbancaria+","+num.abreviacioninstitucion+","+num.tipocuenta+","+num.saldoinicial}</option>
                ))}
            </FormControl>
          </Col>
        </Row>
        <br></br>
        <h4> Buscar Cuentahabiente 2</h4>
        <Row>
          <Col md="12">
            <FormControl as="select" onChange={(e)=>{
              var text = e.target.value;
              var aux = envio;
              aux.cui2 = text.split(",")[0]
              aux.nombre2 = text.split(",")[1]
              aux.apellido2 = text.split(",")[2]
              aux.email2 = text.split(",")[4]
              aux.fecharegistro2 = text.split(",")[3]
              aux.genero2 = text.split(",")[5]
              aux.institucionbancaria2 = text.split(",")[6]
              aux.abreviacioninstitucion2 = text.split(",")[7]
              aux.tipocuenta2 = text.split(",")[8]
              aux.saldoinicial2 = parseInt(text.split(",")[9])
              setEnvio(aux);
              console.log(aux)
              }} >
              {data.map((num,index)=>(
                  <option>{num.cui+","+num.nombre+","+num.apellido+","+num.fecharegistro+","+num.email+","+num.genero+","+num.institucionbancaria+","+num.abreviacioninstitucion+","+num.tipocuenta+","+num.saldoinicial}</option>
              ))}
            </FormControl>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col md="4">
          </Col>
          <Col md="3">
            <FormControl onChange={(e)=>{
              var valor = envio;
              valor.valor = parseInt(e.target.value);

              setEnvio(valor);
              console.log(envio)}} />
          </Col>
        </Row>
        <br></br>
        <Row>   
          <Col md="4">
          </Col>
          <Col md="3" style={{alignContent:"center"}}>
            <Button onClick={()=>{sendData()}}> Insertar! </Button>
          </Col>
        </Row>
      </div>

    </div>
  );
}
