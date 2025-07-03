import express from "express";

import { RegisterUser } from "../../middlewares/user/userController.js";



const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

  router.post("/register", RegisterUser) 

  router.post("/login",)
    
export default router

//como meu prisma está está no src/models/generated/client, um lugar customizado, no terminal eu preciso passar o caminho do arquivo de schema.prisma para o prisma client, assim:
// npx prisma generate --schema=src/models/prisma/schema.prisma