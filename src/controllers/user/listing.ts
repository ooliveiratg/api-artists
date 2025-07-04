
import { Request, Response } from "express";
import { PrismaClient } from "../../models/generated/client/index.js";

const prisma = new PrismaClient();

export const ListingUsers = async (req: Request, res: Response) => {
    try{
        const users = await prisma.user.findMany({omit: {password: true}})

        return res.status(200).json(users);
    }catch (error){
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}