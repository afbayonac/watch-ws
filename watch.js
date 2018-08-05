const express = require('express')
const http = require('http')
const morgan = require('morgan')
const WebSocket = require('ws')

const rubrica = `
                    _________
                    | - . - |
                   <|  ___  |>
                    \\_______/
`

const app = express()
app.use(morgan('dev'))
const os = require('os')

const networkInterfaces = os.networkInterfaces()

// initialize a simple http server
const server = http.createServer(app)

// initialize the WebSocket server instance
const wss = new WebSocket.Server({ server })

wss.on('connection', ws => {
  console.log('*** Is connected  by ws ***')
  // connection is up, let's add a simple simple event
  ws.on('message', event => {
    console.log(`------------------- WebSockets ------------------:${new Date()}`)
    try { console.log(JSON.parse(event)) } catch (e) { console.log(event) }
  })
  // send immediatly a feedback to the incoming connection
  ws.send(`I'm server test  | - . - |`)
})

const PORT = 3000

// start our server
server.listen(process.env.PORT || PORT, () => {
  console.log('   LISTENINIG')
  for (let key in networkInterfaces) {
    console.log()
    console.log(`     http://${networkInterfaces[key][0].address}:${PORT}`)
    console.log(`     ws://${networkInterfaces[key][0].address}:${PORT}`)
  }

  console.log(rubrica)
})
