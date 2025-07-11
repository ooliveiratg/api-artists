import {Request, Response} from 'express';
import { PrismaClient } from '../../models/generated/client/index.js';

const prisma = new PrismaClient();
export const ListArtists = async (req: Request, res: Response) => {
    try{
        const artists = await prisma.artist.findMany({
            include: {
                Songs: true
            }
        });

        return res.status(200).json(artists);
    }catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor", error });
    }
}