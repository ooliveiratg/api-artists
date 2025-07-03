import { PrismaClient } from "../../models/generated/client/index.js";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";
// import jwt from 'jsonwebtoken';


interface User {
  name?: string;
  email: string;
  password: string;
}


const prisma = new PrismaClient();

export const RegisterUser:RequestHandler = async(req,res) => {
  try {
    const user:User = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password,salt)
    

    if (user.email.includes("@") && user.password.length >= 8) {
      const existingUser = await prisma.user.findUnique({
      where: {email: user.email}
    })
    if (existingUser) {
       res.status(400).json({ message: "Usuário já existe" });
    }
      const userDB = await prisma.user.create({
        data: {
          email: user.email,
          password: hashedPassword,
          name: user.name,
        },
      });


       res.status(200).json(userDB);
    } else {
       res.status(400).json({ message: "Email inválido ou senha muito curta" });
    }
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
     res.status(500).json({ message: "Erro na criação", error });
  }
}


export const LoginUser:RequestHandler = async(req,res) => {
  try{

  }catch(error){
    console.error(`Erro ao fazer login: ${error}`);
  }
}