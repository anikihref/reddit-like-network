import React, { useRef, useState } from 'react'

interface WebSocketResponse {
  username: string;
  id: number;
  event: string;
  data: string;
}

const WebSock = () => {
  const [messages, setMessages] = useState<WebSocketResponse[]>([])
  const socket = useRef<WebSocket>()
  const [connected, setConnected] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  function connect() {
    socket.current = new WebSocket('ws://localhost:5000')

    
    socket.current.onopen = (event) => {
      setConnected(true)
      console.log('connection succesful');

      const message = {
        event: 'conection',
        username: value,
        id: Date.now()
      }

      socket.current?.send(JSON.stringify(message))
    }

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data) 
      console.log(event);
      setMessages(prev => [message, ...prev])
    }

    socket.current.onerror = (err) => {
        console.log(err, 'error');
    }
  }

  async function sendMessage() {
    const message = {
      username: value,
      data: value,
      id: Date.now(),
      event: 'message'
    }

    socket.current?.send(JSON.stringify(message))
    setValue('')
  }


  return (
    <div>
      <button onClick={sendMessage}>Send</button>
      <input value={value} onChange={(e) => {setValue(e.target.value)}}/>
      {!connected && <button onClick={connect}>enter</button>}
      

      {messages.map((message, i) => 
        <div key={i} className="message">{message.data}</div>
      )}
    </div>
  )
}

export default WebSock