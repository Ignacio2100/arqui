const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());

wss.on('connection', (ws) => {
  console.log('Nuevo cliente conectado');

  // Envía los datos recibidos al cliente que los envió
  ws.on('message', (data) => {
    // Realiza acciones con los datos recibidos
    // Por ejemplo, puedes almacenarlos en una base de datos, procesarlos, etc.

    const { air_quality, temperature, pressure, altitude } = JSON.parse(data);

    console.log('Datos recibidos:');
    console.log('Calidad del aire:', air_quality);
    console.log('Temperatura:', temperature);
    console.log('Presión:', pressure);
    console.log('Altitud:', altitude);

    // Envía los datos al cliente que los envió
    ws.send(data);

    // Envía los datos a todos los clientes conectados
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  // Maneja la desconexión del cliente
  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

app.post('/api/data', (req, res) => {
  const { air_quality, temperature, pressure, altitude } = req.body;


  

  const data = JSON.stringify({ air_quality, temperature, pressure, altitude });

  // Emitir los datos recibidos a través de WebSocket
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });

  console.log('Datos recibidos:');
  console.log('Calidad del aire:', air_quality);
  console.log('Temperatura:', temperature);
  console.log('Presión:', pressure);
  console.log('Altitud:', altitude);

  // Responder al ESP32 con un mensaje de éxito
  res.status(200).json({ message: 'Datos recibidos correctamente' });
});

const port = process.env.PORT || 3000; 
  server.listen(port, () => {
    console.log(' 🚀 El servidor ha despegado en el puerto ', port);
  });