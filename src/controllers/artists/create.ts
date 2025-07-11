import {Request, Response} from 'express'
import { PrismaClient } from '../../models/generated/client/index.js';
import { Artist } from '../../models/interfaces/interfaces.js';
import { create } from 'domain';
const prisma = new PrismaClient();

export const CreateArtist = async (req: Request, res: Response) => {
    try{
        const artist:Artist = req.body;
        const songData= artist.Songs
        if(!artist.name || !artist.genre || (!artist.imageURL && !artist.imageBase64)){
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }
        const existingArtist = await prisma.artist.findUnique({
            where: { name: artist.name },
        });

        if(existingArtist){
            return res.status(400).json({ message: "Artista já existe" });
        }

        if(songData && songData.length > 0){
            songData.map((song) => {
                if(!song.title  || (!song.imageURL && !song.imageBase64)){
                    return res.status(400).json({ message: "Todos os campos da música são obrigatórios" });
                }
            })
        }
        
        const newArtist = await prisma.artist.create({
            data: {
                name: artist.name,
                genre: artist.genre,
                imageURL: artist.imageURL,
                imageBase64: artist.imageBase64,
                
            },
        });

        return res.status(201).json(newArtist);

    }catch(error){
        res.status(500).json({ message: "Erro ao criar artista", error });
    }
}