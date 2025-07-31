import e, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { Song } from "../../../models/types/types";

const prisma = new PrismaClient();
export const UpdateSong = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "ID da música é obrigatório" });
    }
    try{
        const songData = Song.parse(req.body);
        const existingSong = await prisma.song.findUnique({ where: { id } });

        if(!existingSong) {
            return res.status(404).json({ message: "Música não encontrada" });
        }

        const updatedSong = await prisma.song.update({
            where: { id },
            data: {
                title: songData.title,
                duration: songData.duration,
                imageURL: songData.imageURL  
            }
        });

        return res.status(200).json({ message: "Música atualizada com sucesso", song: updatedSong });
    }catch (error){
        return res.status(500).json({ message: "Erro interno do servidor", error });
    }
}