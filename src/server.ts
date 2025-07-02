import express from 'express';
import { PrismaClient } from './models/generated/client/index.js';
import { register } from './routers/user/register.js';


const prisma = new PrismaClient();
const server = express();
const port = 3000;
server.use(express.json())
server.use('/', register())

server.listen(port, () => {
    try{
        console.log(`está funcionando na porta: ${port}`)
    }catch(error) {
        console.error('Erro ao iniciar o servidor:', error);
    }
});