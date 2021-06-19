const express = require('express');
const server = express();

server.get('/test', (request, response) =>{
    response.send('TUDO CERTO COM NOSSA AAPI');
})

server.listen(3000, () => {
    console.log('API ONLINE')
})