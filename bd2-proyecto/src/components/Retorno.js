import React from 'react'
import {Link} from 'react-router-dom'
import { Row, Col, Button} from 'react-bootstrap'

export default function Retorno() {
    return (
        <div>
            <Row>
                <Col md="3">
                <Link to="/Menu"><Button> Regresar</Button></Link>
                </Col>
                <Col md="9">
                </Col>
            </Row>
        </div>
    )
}
