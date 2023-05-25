const express = require('express');
const nodemailer = require('nodemailer');


const app = express();



app.use(express.json());



  app.post('/api/data', (req, res) => {
    const { air_quality, temperature, pressure, altitude } = req.body;
  
    // Realiza acciones con los datos recibidos
    // Por ejemplo, almacenarlos en una base de datos, procesarlos, etc.
  
    console.log('Datos recibidos:');
    console.log('Calidad del aire:', air_quality);
    console.log('Temperatura:', temperature);
    console.log('Presión:', pressure);
    console.log('Altitud:', altitude);

    // Envía un correo electrónico con los datos recibidos
 
  
    // Responde al ESP32 con un mensaje de éxito
    res.status(200).json({ message: 'Datos recibidos correctamente' });
  });

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
