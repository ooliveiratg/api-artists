import { PrismaClient } from "../../models/generated/client/index.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { Admin } from "../../models/interfaces/interfaces.js";


const prisma = new PrismaClient();

export const LoginAdmin = async (req:Request, res:Response) => {

  const JWT_SECRET = process.env.JWT_SECRET 

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não está definido nas variáveis de ambiente");
}
  try {
    const admin: Admin = req.body;
    if (!admin.email || !admin.password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    const adminDB = await prisma.admin.findUnique({
      where: { email:admin.email  },
    });

    if(!adminDB) {
      return res.status(404).json({ message: "Admin não encontrado" });
    }
      
    const isPasswordVAlid = await bcrypt.compare(admin.password, adminDB!.password)

    if (!isPasswordVAlid) {
       return res.status(400).json({ message: "Senha incorreta" });
    }

    const token = jwt.sign({id: adminDB?.id, name: adminDB?.name,role :adminDB.role}, JWT_SECRET, {expiresIn: '7d'});
    return res.status(200).send(token)
  } catch (error) {
    console.error(`Erro ao fazer login: ${error}`);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};