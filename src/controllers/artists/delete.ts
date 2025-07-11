import { Request, Response } from "express";
import { PrismaClient } from "../../models/generated/client/index.js";

const prisma = new PrismaClient();

export const DeleteArtist = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    if (id) {
      const artistExists = await prisma.artist.findUnique({ where: { id } });
      if (!artistExists) {
        return res.status(404).json({ message: "não encontrado" });
      }
      await prisma.artist.delete({ where: { id } });
      return res.status(200).json({ message: "deletado com sucesso" });
    } else {
      return res.status(400).json({ message: "ID é obrigatório" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro interno do servidor ", error });
  }
};
