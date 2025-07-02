import express from 'express';
import { PrismaClient } from '../../models/generated/client/index.js';
// import jwt from 'jsonwebtoken';

interface User {
    name?: string;
    email: string;
    password: string;
}



const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET




export function register() {
    router.post('/register', async (req, res) => {
    try{
        const user:User = req.body

       if(user.email.includes('@') && user.password.length >= 8 ){
        const userDB = await prisma.user.create({
            data:{
               
                email: user.email,
                password: user.password,
                name: user.name
            }
        })
        res.status(200).json({message: 'Usuário criado com sucesso'})
       }else{
        res.status(400).json({ error: 'Email inválido ou senha muito curta' });
       }

       
        
    }catch(error){
        res.status(500).json({ error: 'Erro na criação' });
    }
})

    return router;
}

//como meu prisma está está no src/models/generated/client, um lugar customizado, no terminal eu preciso passar o caminho do arquivo de schema.prisma para o prisma client, assim:
// npx prisma generate --schema=src/models/prisma/schema.prisma
