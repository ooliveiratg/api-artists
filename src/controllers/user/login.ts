import { PrismaClient } from "../../models/generated/client/index.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { User } from "../../models/interfaces/interfaces.js";


const prisma = new PrismaClient();

export const LoginUser = async (req:Request, res:Response) => {

  const JWT_SECRET = process.env.JWT_SECRET 

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não está definido nas variáveis de ambiente");
}
  try {
    const user: User = req.body;
    if (!user.email || !user.password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    const userDB = await prisma.user.findUnique({
      where: { email:user.email  },
    });

    if(!userDB) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
      
    const isPasswordVAlid = await bcrypt.compare(user.password, userDB!.password)

    if (!isPasswordVAlid) {
       return res.status(400).json({ message: "Senha incorreta" });
    }

    const token = jwt.sign({id: userDB?.id, name: userDB?.name}, JWT_SECRET, {expiresIn: '1h'});
    return res.status(200).json(token)
  } catch (error) {
    console.error(`Erro ao fazer login: ${error}`);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};