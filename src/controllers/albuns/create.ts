import { Request, Response } from "express";
import { PrismaClient } from "../../models/generated/client/index.js";
import { Album } from "../../models/interfaces/interfaces.js";

const prisma = new PrismaClient();

export const createAlbum = async (req: Request, res: Response) => {
 try{
    const album:Album = req.body

    if(!album.title || !album.artistId || (!album.imageURL && !album.imageBase64)){
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const albumDB = await prisma.album.create({
        data: {
            title: album.title,
            realaseDate: album.releaseDate,
            imageURL: album.imageURL,
            imageBase64: album.imageBase64,
            artistId: album.artistId
        }
    });

    res.status(201).json(albumDB);
 }catch(error){
    res.status(500).json({ message: "Erro ao criar álbum", error });
  }
 }