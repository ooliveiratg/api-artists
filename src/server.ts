import express from 'express';
import { PrismaClient } from './models/generated/client/index.js';
import register from './routers/user/register.js';



const prisma = new PrismaClient();
const server = express();
const port = 3000;
server.use(express.json())


    
    server.use('/user', register);



server.listen(port, () => {
    console.log(`está funcionando na porta: ${port}`)
});