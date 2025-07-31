import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export const ListAlbuns = async (req: Request, res: Response) => {
    try {
        const albuns = await prisma.album.findMany({
            include: {
                artist: true,
                songs: true
            }
        });

        return res.status(200).json(albuns);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor", error });
    }
}