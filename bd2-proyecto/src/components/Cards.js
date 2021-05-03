import React from 'react'
import Card from 'react-bootstrap/Card'
import {Button} from 'react-bootstrap'

import {Link} from "react-router-dom"
import "./Cards.css"


export default function Cards(props) {
    return (
            <Card className="text-center">
    <Card.Img className ="card-img-top" variant="top" src={props.img} />
    <Card.Body>
    <Card.Title>{props.title}</Card.Title>
      <Card.Text>
        {props.desc}
      </Card.Text>
    <Link to={props.dest}><Button variant="primary"> Ir! </Button></Link>

    </Card.Body>
  </Card>
    )
}
