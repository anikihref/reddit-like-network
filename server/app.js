const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const ws = require('ws').Server;
const PostController = require('./controllers/PostController');
const UserController = require('./controllers/UserController');
const ChatController = require('./controllers/ChatController');
const MessageController = require('./controllers/MessageController');
const MessageSchema = require('./model/Message')
const { json } = require('express');

const cors = require('cors');

const app = express();
const PORT = 5000;
const CONNECT_URI =
  'mongodb+srv://anikihref:anikihref@cluster0.vlsmkyf.mongodb.net/?retryWrites=true&w=majority';

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(json());

app.get('/message/:id', MessageController.getMessages);


app.post('/chat', ChatController.createChat);
app.get('/chat/member/:id', ChatController.getChatsWithMember);
app.get('/chat/:id', ChatController.getChat);

app.post('/user-by-password', UserController.getUserByPassword);
app.post('/user', UserController.create);
app.get('/user-by-username/:username', UserController.getByUserName);
app.post('/users', UserController.getAll);

app.post('/post', PostController.create);
app.get('/post/author/:id', PostController.getByAuthorId);
app.delete('/post', PostController.delete);
app.put('/post-like', PostController.likePost);
app.get('/post-likes/:id', PostController.postLikes);

app.listen(PORT, async () => {
  await mongoose.connect(CONNECT_URI);
  console.log(`server started on port: ${PORT}`);
});

const wss = new ws({ port: 7000 });

let activeClients = [];

wss.on('connection', (ws) => {
  console.log('connected new user');


  ws.on('message', async (jsonData) => {

    try {
      const data = JSON.parse(jsonData)

      if (data.type === 'connection') {
        const connectedUser = activeClients.find(client => {
          return (
            client.chatId === data.chatId && 
            client.connectionId === data.connectionId
          )
        })

        if (!connectedUser) {
          ws.chatId = data.chatId
          ws.connectionId = data.connectionId
          activeClients.push(ws)
  
          console.log('Client connected. Connected clients', activeClients.length)
        }
        
        else {
          console.log('Client is already connected', activeClients.length)
        }
      }

      else if(data.type === 'message') {
        const message = await MessageSchema.create(data)

        const receivers = activeClients.filter(client => {
          return client.chatId === data.chatId
        })
        
        receivers.forEach(receiver => receiver.send(JSON.stringify({
          ...data,
          _id: message._id,
          type: 'message'
        })))
      }

      else if (data.type === 'close') {
        const filteredClients = activeClients.filter(client => {
          return client.connectionId !== data.connectionId
        })

        activeClients = filteredClients
      }
      
    } catch (error) {
      console.log(error)
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected. Connected clients:', activeClients.length)
  })

});
