import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
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
        req
        
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token inválido: ", err });
    }
}