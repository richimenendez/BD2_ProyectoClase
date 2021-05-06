import React from 'react'
import {Row, Col} from 'react-bootstrap'
import Cards from  '../components/Cards'

import "./Menu.css"
export default function Menu() {
    return (
        <div className="alineado" fluid ="md">
    <Row>   
    <Col><Cards title="Lista de Cuentahabientes" dest ="/users" desc="Reporte con la lista de cuentahabientes y sus diferentes cuentas." img="https://i.pinimg.com/564x/51/f6/fb/51f6fb256629fc755b8870c801092942.jpg"/></Col>
    <Col><Cards title="Lista de Instituciones" dest ="/banks"  desc="Lista de Instituciones registradas en el servicio." img="https://communitybank.net/wp-content/uploads/2015/12/bank-icon.jpg"/></Col>
    <Col><Cards title="Realizar Transferencia" dest ="/deposito"  desc="Lista de Instituciones registradas en el servicio." img="https://communitybank.net/wp-content/uploads/2015/12/bank-icon.jpg"/></Col>
    </Row>
    <br></br>
    <Row> 
    <Col><Cards title="Retiros por cuentahabiente" dest ="/Rep1"  desc="Listado de las transacciones realizadas por el cuentahabiente seleccionado." img="https://library.kissclipart.com/20180911/lke/kissclipart-money-transfer-icon-clipart-electronic-funds-trans-6bd37925354b6fc1.png"/></Col>
    <Col><Cards title="Creditos y Debitos por Banco" dest ="/Rep2"  desc="Totales de los Debitos y Creditos de cada banco. Se incluyen también los listados." img="https://icon-library.com/images/wire_transfer-512.png"/></Col>
    <Col><Cards title="Movimientos mensuales del Cuentahabiente" dest ="/Rep3"  desc="listado de todos los movimientos realizados por" img="https://cdn3.iconfinder.com/data/icons/finance-business-colors/91/Finance__Business_06-512.png"/></Col>
    </Row>
   
        </div>
    )
}
