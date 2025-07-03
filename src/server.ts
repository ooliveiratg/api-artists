import express from 'express';
import UserRegister from './routers/user/register.js';



const server = express();
const port = 3000;
server.use(express.json())

server.use('/user', UserRegister);



server.listen(port, () => {
    console.log(`está funcionando na porta: ${port}`)
});