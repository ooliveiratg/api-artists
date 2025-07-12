import { Request, Response } from "express";
import { PrismaClient } from "../../models/generated/client/index.js";


const prisma = new PrismaClient();
export const DeleteSong = async (req: Request, res: Response) => {
    const id = req.params.id;

  try {
    if (id) {
      const songExists = await prisma.song.findUnique({ where: { id } });
      if (!songExists) {
        return res.status(404).json({ message: "não encontrado" });
      }
      await prisma.song.delete({ where: { id } });
      return res.status(200).json({ message: "deletado com sucesso" });
    } else {
      return res.status(400).json({ message: "ID é obrigatório" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro interno do servidor ", error });
  }

}