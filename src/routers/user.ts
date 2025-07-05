import express from "express";

import { RegisterUser } from "../controllers/user/register.js";
import { LoginUser } from "../controllers/user/login.js";
import { ListingUsers } from "../controllers/user/listing.js";
import { DeleteUser } from "../controllers/user/delete.js";




const router = express.Router();

  router.post("/register", RegisterUser) 
  router.get('/all',ListingUsers)
  router.post("/login", LoginUser)
  router.delete("/delete/:id", DeleteUser)
    
export default router

//como meu prisma está está no src/models/generated/client, um lugar customizado, no terminal eu preciso passar o caminho do arquivo de schema.prisma para o prisma client, assim:
// npx prisma generate --schema=src/models/prisma/schema.prisma