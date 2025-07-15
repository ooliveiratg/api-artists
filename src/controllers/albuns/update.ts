import { Request, Response } from "express";
import { PrismaClient } from "../../models/generated/client/index.js";

const prisma = new PrismaClient();

export const UpdateAlbuns = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, imageURL, imageBase64 } = req.body;

  try {
    if (id) {
      const albumExists = await prisma.album.findUnique({ where: { id } });
      if (!albumExists) {
        return res.status(404).json({ message: "Álbum não encontrado" });
      }

      const updatedAlbum = await prisma.album.update({
        where: { id },
        data: {
          title: name,
          imageURL: imageURL,
          imageBase64: imageBase64,
        },
      });

      return res.status(200).json(updatedAlbum);
    } else {
      return res.status(400).json({ message: "ID é obrigatório" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor", error });
  }
};
