import { Request, Response } from 'express';
import { PrismaClient } from '../../models/generated/client/index.js';

const prisma = new PrismaClient
export const DeleteUser = async (req: Request, res: Response) => {
    
    const id = req.params.id
        
    

    try{   
        if(id){
            
            const userExists = await prisma.user.findUnique({ where: {id} })
            if(!userExists){
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            await prisma.user.delete({where: {id}})
            return res.status(200).json({ message: "Usuário deletado com sucesso" });

        }
        else{
            return res.status(400).json({ message: "ID do usuário é obrigatório" });
        }

    }catch(error){
        return res.status(500).json({ message: "Erro interno do servidor ",error });
    }
    
    
}