const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const app = express()
const os = require('os')

const networkInterfaces = os.networkInterfaces()

// initialize a simple http server
const server = http.createServer(app)

// initialize the WebSocket server instance
const wss = new WebSocket.Server({ server })

wss.on('connection', ws => {
  // connection is up, let's add a simple simple event
  ws.on('message', event => {
    // console.log(event.data)
    try {
      console.log(new Date(), JSON.parse(event))
    } catch (e) {
      console.log(new Date(), 'This not is a json', event)
    }

    // log the received message and send it back to the client
    // console.log('received: %s', message)
    // ws.send(`Hello, you sent -> ${message}`)
  })

  // send immediatly a feedback to the incoming connection
  ws.send('Hi there, I am a WebSocket server')
})

const PORT = 3000

// start our server
server.listen(process.env.PORT || PORT, () => {
  console.log(`
    LISTENINIG
    http://${networkInterfaces.lo[0].address}:${PORT}
    http://${networkInterfaces.wlp3s0[0].address}:${PORT}
                      _________
                      | - . - |
                     <|  ___  |>
                      \\_______/
  `)
})
