import { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Button } from 'react-bootstrap'
import { socket } from './Socket'

export function FriendsCard (props) {
  return (
    <Col className='col mt-3 rounded'>
      <Card style={props.style}>
        <Card.Body>
          <Card.Title>
            Friends
          </Card.Title>
          {/* render list of friends */}
          <input className='form form-control' placeholder='username' />
          <Button className='mt-3 m-2 shadow-sm' style={{ backgroundColor: '#cffcff', border: 'none', color: 'grey' }}>Add</Button>
        </Card.Body>
      </Card>
    </Col>
  )
}
