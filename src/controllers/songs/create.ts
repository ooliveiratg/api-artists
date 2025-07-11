import { Request, Response } from 'express';
import { Song } from '../../models/interfaces/interfaces';
import { PrismaClient } from '../../models/generated/client/index.js';

const prisma = new PrismaClient();

export const CreateSong = async (req: Request, res: Response) => {
    try{
        const song:Song = req.body;
        if(!song.title || !song.duration || !song.artistId ||  (!song.imageURL && !song.imageBase64)){
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        const songDB = await prisma.song.create({
            data: {
                title: song.title,
                duration: song.duration,
                artistId: song.artistId,
                imageURL: song.imageURL,
                imageBase64: song.imageBase64

            }
        })
       return res.status(201).json(songDB);
    }catch(error){
        res.status(500).json({ message: "Erro ao criar música", error });
    }
}