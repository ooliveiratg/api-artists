import { PrismaClient, Role } from "../../models/generated/client/index.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Admin } from "../../models/interfaces/interfaces.js";



const prisma = new PrismaClient();


export const Registeradmin = async (req:Request, res:Response) => {
  try {
    const admin: Admin = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(admin.password, salt);

    if (!admin.email || !admin.password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    if (admin.email.includes("@") && admin.password.length >= 8) {
      const existingAdmin = await prisma.admin.findUnique({
        where: { email: admin.email },
      });
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin já existe" });
      }
      await prisma.admin.create({
        data: {
          email: admin.email,
          password: hashedPassword,
          name: admin.name
        },
      });

      return res.status(200).json("Admin criado com sucesso");
    } else {
      return res.status(400).json({ message: "Email inválido ou senha muito curta" });
    }
  } catch (error) {
    console.error("Erro ao criar Admin:", error);
    return res.status(500).json({ message: "Erro na criação", error });
  }
};
