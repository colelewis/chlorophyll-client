import { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Button, Accordion } from 'react-bootstrap'
import { socket } from './Socket'

export function ChatContainer (props) {
  const [messageContent, setMessageContent] = useState('')
  const [feeds, setFeeds] = useState({})

  useEffect(() => {
    props.rooms.forEach(room => {
      setFeeds({ ...feeds, [room]: <MessageFeed /> })
    })
  }, [])

  const messageFeedStyling = {
    background: 'rgb(158,227,125)',
    background: 'linear-gradient(0deg, rgba(158,227,125,1) 0%, rgba(170,239,223,1) 48%, rgba(207,252,255,1) 80%)'
  }

  const containerStyling = {
    background: '#FFF5E4'
  }

  const MessageFeed = () => {
    const [messages, setMessages] = useState([])

    socket.onAny(res => {
      console.log(res)
      if (res.room === props.currentRoom) {
        setMessages(...messages, res)
      }
    })

    return (
      <Container fluid className='rounded shadow-sm mt-3' style={messageFeedStyling}>
        <p>test</p>
        {/* {
                    messages.filter()
                } */}
        {messages.map((message) => {
          // return <Message data={message} />
        })}
      </Container>
    )
  }

  const StatusBar = () => {
    return (
      <Container fluid className='rounded bg-white p-1'>
        <h5>{props.currentRoom}</h5>
      </Container>
    )
  }

  const sendMessage = (content, roomID) => {
    socket.emit('message', {
      author: props.username,
      body: content,
      room: roomID,
      date: Date.now()
    })
    setMessageContent('')
  }

  return (
    <Col className='col' style={containerStyling}>
      <Container fluid className='rounded mt-3'>
        <Row>
          <StatusBar />
        </Row>
        <MessageFeed />
        <Row className='d-flex align-items-end'>
          <Col className='col'>
            <Row>
              <input className='form form-control' placeholder='Type here...' style={{ width: '93%' }} value={messageContent} onChange={(ev) => setMessageContent(ev.target.value)} />
              <Button style={{ width: '7%' }} onClick={() => sendMessage(messageContent, props.currentRoom)}>send</Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </Col>
  )
}
