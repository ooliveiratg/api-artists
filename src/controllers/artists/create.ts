import {Request, Response} from 'express'
import { Artist, PrismaClient } from '../../models/generated/client/index.js';
const prisma = new PrismaClient();

export const CreateArtist = async (req: Request, res: Response) => {
    try{
        const artist:Artist = req.body;
        if(!artist.name || !artist.genre || (!artist.imageURL && !artist.imageBase64)){
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }
        const existingArtist = await prisma.artist.findUnique({
            where: { name: artist.name },
        });

        if(existingArtist){
            return res.status(400).json({ message: "Artista já existe" });
        }
        const newArtist = await prisma.artist.create({
            data: {
                name: artist.name,
                genre: artist.genre,
                imageURL: artist.imageURL,
                imageBase64: artist.imageBase64
            },
        });

        return res.status(201).json(newArtist);

    }catch(error){
        res.status(500).json({ message: "Erro ao criar artista", error });
    }
}