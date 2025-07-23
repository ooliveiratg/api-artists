import { Request, Response } from 'express';
import { Song } from '../../models/interfaces/interfaces';
import { PrismaClient } from '../../models/generated/client/index.js';
import {GetArtistName } from '../../utils/getArtistName';

const prisma = new PrismaClient();

export const CreateSong = async (req: Request, res: Response) => {
    try{
        const song:Song = req.body;
        if(!song.title || !song.duration || !song.artistName ||  (!song.imageURL && !song.imageBase64)){
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        const artistID = await GetArtistName(song.artistName)

        if(!artistID){
            return res.status(404).json({ message: "artista não encontrado"})
        }
        const songDB = await prisma.song.create({
            data: {
                title: song.title,
                duration: song.duration,
                artistName: song.artistName,
                artistId: artistID,
                imageURL: song.imageURL,
                imageBase64: song.imageBase64

            }
        })
       return res.status(201).json(songDB);
    }catch(error){
        res.status(500).json({ message: "Erro ao criar música", error });
    }
}