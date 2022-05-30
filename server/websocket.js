const ws = require('ws').Server;

const wss = new ws({
  port: 5000
}, () => console.log('server started on port 5000'))



wss.on('connection', function connection(ws) {
  // ws - одне це користувач
  ws.on('message', function(message) {
    message = JSON.parse(message)
    
    switch (message.event) {
      case 'message': 
        broadcastMessage(message)
        break;

      case 'connection':
        broadcastMessage('anikihref connected')
        break;
    }
  })
})


// ws - одно подключение, тоесть один пользователь и поскольку мы должны отослать сообщение всем пользователям то делаем функцию рассылки

function broadcastMessage(message) {
  wss.clients.forEach(client => {
    client.send(JSON.stringify(message))
  })
}