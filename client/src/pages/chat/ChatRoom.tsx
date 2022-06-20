import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import BlueButton from '../../components/BlueButton';
import Input from '../../components/Input';
import getSecondChatMember from '../../helpers/getSecondChatMemeber';
import useUser from '../../hook/useUser';
import IChat from '../../interfaces/chat';
import IChatMessage from '../../interfaces/chatMessage';
import './chatroom.css'


const ChatRoom = () => {
  const { id } = useParams();
  const [title, setTitle] = useState<string>('');
  const { loginedUser } = useUser();
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [chatInfo, setChatInfo] = useState<IChat>();
  const [value, setValue] = useState<string>('');
  const [ws, setWs] = useState<WebSocket>();
  const messagesElement = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([fetchChatInfo(), fetchMessages()]).then(async ([chat, messages]) => {
      const secondMember = await getSecondChatMember(chat, loginedUser?._id!);
      setMessages(messages);
      setChatInfo(chat)

      if (chat.title) {
        setTitle(chat.title);
      } else if (secondMember) {
        setTitle(`Чат з ${secondMember}`);
      } else {
        setTitle('Назву чату не вказано');
      }

    });
  }, []);

  useEffect(() => {
    const ws = createWebSocket();
    
    setWs(ws);
   

    return function () {
      ws?.send(
        JSON.stringify({
          type: 'close',
          connectionId: loginedUser?._id,
        })
      );
      ws?.close();
    };
  }, []);

  useEffect(() => {
    scrollChatToBottom()
  }, [messages])


  async function fetchMessages(): Promise<IChatMessage[]> {
    const chatMessagesResponse = await axios({
      url: `http://localhost:5000/message/${id}`,
      method: 'get',
    });

    return await chatMessagesResponse.data;
  }

  async function fetchChatInfo(): Promise<IChat> {
    const chatInfoResponse = await axios({
      url: `http://localhost:5000/chat/${id}`,
      method: 'GET',
    });

    return await chatInfoResponse.data;
  }



  function scrollChatToBottom() {
    const messages = messagesElement.current!

    messages.scrollTop = messages.scrollHeight
  }

  function createWebSocket() {
    const ws = new WebSocket('ws://localhost:7000');

    ws.onopen = function () {
      console.log('connected to WebSocket server');

      

      ws.send(JSON.stringify({
        type: 'connection',
        chatId: chatInfo?._id,
        connectionId: loginedUser?._id
      }))
    };

    ws.onclose = function () {
      console.log('close websocket');
    };

    ws.onmessage = function (event) {
      const data = JSON.parse(event.data);

      switch (data.type) {

        case 'message': {
          setMessages((prev) => [...prev, data]);
          break;
        }
      }
    };

    return ws;
  }

  async function handleSend() {
    setValue('');

    ws?.send(
      JSON.stringify({
        content: value,
        author: loginedUser?._id,
        chat: id,
        type: 'message',
      })
    );
  }

  return (
    <div className='chatroom'>
      <header className="chatroom__header">
        <h3 className='chatroom__title'>{title}</h3>
        <BlueButton btnType='button' cb={() => navigate(-1)} className='chatroom__back'>Назад</BlueButton>
      </header>
     

      <div ref={messagesElement} className="chatroom__messages">
        {messages.map((message) => {
          return (
            <div
              key={message._id}
              className={`chatroom__message ${
                message.author === loginedUser?._id
                  ? 'chatroom__your-message'
                  : 'chatroom__someone-message'
              }`}
            >
              {message.content}
            </div>
          );
        })}
      </div>

      <form className="chatroom__message-form" onSubmit={(e) => e.preventDefault()}>
        <Input placeholder='Повідомлення' value={value} setValue={setValue}/>
        <BlueButton btnType='button' cb={handleSend} >Відправити</BlueButton>
      </form>
    </div>
  );
};

export default ChatRoom;
