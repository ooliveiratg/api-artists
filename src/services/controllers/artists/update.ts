import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { Artist } from "../../../models/types/types";

const prisma = new PrismaClient();

export const UpdateArtist = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const artistData = Artist.parse(req.body);
    const existingArtist = await prisma.artist.findUnique({ where: { id } });

    if (!existingArtist) {
      return res.status(404).json({ message: "Artista não encontrado" });
    }

    if(!id){
      return res.status(400).json({ message: "ID é obrigatório" });
    }

    const updatedArtist = await prisma.artist.update({
        where:{id},
        data: {
            name: artistData.name,
            genre: artistData.genre,
            imageURL: artistData.imageURL,   
        }
    })
    return res.status(200).json({ message: "Artista atualizado com sucesso", artist: updatedArtist });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor", error });
  }
};


{

}