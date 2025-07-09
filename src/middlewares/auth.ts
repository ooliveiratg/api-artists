import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Role } from '../models/generated/client';
import { JWTDecoded } from '../models/interfaces/interfaces';
const JWT_SECRET = process.env.JWT_SECRET;


export const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(401).json({ message: "Token não fornecido" });
    }
    if (!JWT_SECRET) {
        return res.status(500).json({ message: "JWT_SECRET não configurado" });
    }
    try{

        
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET ) as jwt.JwtPayload & JWTDecoded;

        if(decoded.role !== "admin" ){
            res.status(403).json({ message: "Acesso negado: Usuário não autorizado" });
        }
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token inválido: ", err });
    }
}