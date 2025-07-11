
import { Request, Response } from 'express';
import { PrismaClient } from '../../models/generated/client/index.js';

const prisma = new PrismaClient();
export const ListSongs = async (req:Request, res:Response) => {
    try{
        const songs = await prisma.song.findMany({
            include: {
                artist:true
            }
        })

        return res.status(200).json(songs);

    }catch(error){
        res.status(500).json({ message: "Erro ao listar músicas", error });
    }
}