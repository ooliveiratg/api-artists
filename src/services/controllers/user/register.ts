import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../../../models/types/types";



const prisma = new PrismaClient();



export const RegisterUser = async (req:Request, res:Response) => {
  try {
    const user = User.parse(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    if (!user.email || !user.password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    if (user.email.includes("@") && user.password.length >= 8) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });
      if (existingUser) {
        return res.status(400).json({ message: "Usuário já existe" });
      }
      await prisma.user.create({
        data: {
          email: user.email,
          password: hashedPassword,
          name: user.name
        },
      });

      return res.status(201).json("Usuário criado com sucesso");
    } else {
      return res.status(400).json({ message: "Email inválido ou senha muito curta" });
    }
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ message: "Erro na criação", error });
  }
};


