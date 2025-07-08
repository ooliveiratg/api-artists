import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
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
        const admin = req.headers.admin;
        console.log("Admin:", admin);
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET );
        console.log("Decoded:", decoded);
        
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token inválido: ", err });
    }
}