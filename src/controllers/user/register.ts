import { PrismaClient, Role } from "../../models/generated/client/index.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../../models/interfaces/interfaces.js";



const prisma = new PrismaClient();



export const RegisterUser = async (req:Request, res:Response) => {
  try {
    const user: User = req.body;
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
          name: user.name,
          role: Role.user
        },
      });

      return res.status(200).json("Usuário criado com sucesso");
    } else {
      return res.status(400).json({ message: "Email inválido ou senha muito curta" });
    }
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ message: "Erro na criação", error });
  }
};


