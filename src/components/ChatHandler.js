import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Col, Container, Row, Button, Accordion } from 'react-bootstrap'
import { socket } from './Socket'
import { ChatContainer } from './ChatContainer'
import { FriendsCard } from './FriendsCard'

export default function ChatHandler (props) {
  const [username, setUsername] = useState('')
  const [currentRoomID, setCurrentRoomID] = useState('')
  const [rooms, setRooms] = useState([])

  socket.emit('registerSocketID', username)

  socket.on('disconnect', () => {
    rooms.forEach(room => {
      socket.emit(room, `${username} has left the room.`)
    })
    socket.removeAllListeners()
    console.log('Disconnected from server.')
  })

  useEffect(() => {
    fetchAuth()
  }, [])

  const fetchAuth = async () => {
    await axios.post('/authenticate-token')
      .then(response => {
        // console.log(response.data);
        setUsername(response.data.username)
      }).catch(() => {
        window.location.replace('/')
      })
  }

  const sidePanelStyling = {
    background: '#FFF5E4',
    color: 'whitesmoke'
  }

  const cardStyling = {
    background: '#9ee37d',
    border: 'none'
  }

  function joinRoom (roomID) {
    socket.emit('join', roomID, username)
    setCurrentRoomID(roomID)
    setRooms([...rooms, roomID])
  }

  function leaveRoom (roomID) {
    socket.emit('leave', roomID, username)
    if (roomID === currentRoomID) { setCurrentRoomID('') }
    setRooms(rooms.filter(room => room !== roomID))
  }

  const SidePanel = () => {
    const [roomIDEntry, setRoomIDEntry] = useState()
    return (
      <Col className='col-3' style={sidePanelStyling}>
        <Card className='mt-3 shadow-sm' style={cardStyling}>
          <Card.Body>
            <Card.Title>Room ID</Card.Title>
            <input className='form form-control' placeholder='ID' onChange={(ev) => setRoomIDEntry(ev.target.value)} />
            <Button className='mt-3 m-2 shadow-sm' style={{ backgroundColor: '#cffcff', border: 'none', color: 'grey' }} onClick={() => joinRoom(roomIDEntry)}>Join</Button>
            <Button className='mt-3 m-2 shadow-sm' style={{ backgroundColor: '#cffcff', border: 'none', color: 'grey' }}>Create</Button>
          </Card.Body>
        </Card>
        <RoomCard />
        <FriendsCard style={cardStyling} />
      </Col>
    )
  }

  const RoomCard = () => {
    return (
      <Col className='col mt-3 rounded'>
        <Card style={cardStyling}>
          <Card.Body>
            <Card.Title>
              Rooms
            </Card.Title>
            <Accordion flush>
              {rooms.map((room, index) => {
                return (
                  <Accordion.Item action='true' key={index} eventKey='0'>
                    <Accordion.Header>{room}</Accordion.Header>
                    <Accordion.Body>
                      <p>Room participants: </p>
                      <Button style={{ backgroundColor: '#cffcff', border: 'none', color: 'grey' }} onClick={() => window.confirm(`Leave ${room}?`) ? leaveRoom(room) : false}>Leave</Button>
                      <Button className='m-3' style={{ backgroundColor: '#cffcff', border: 'none', color: 'grey' }} onClick={() => setCurrentRoomID(room)}>Switch</Button>
                    </Accordion.Body>
                  </Accordion.Item>
                )
              })}
            </Accordion>
          </Card.Body>
        </Card>
      </Col>
    )
  }

  return (
    <>
      <Container fluid>
        <Row>
          <SidePanel />
          <ChatContainer username={username} currentRoom={currentRoomID} rooms={rooms} />
        </Row>
      </Container>

    </>
  )
}
