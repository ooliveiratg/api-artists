import express from "express";
import { CreateAlbum } from "../../../services/controllers/albuns/create";
import { ListAlbuns } from "../../../services/controllers/albuns/list";
import { UpdateAlbuns } from "../../../services/controllers/albuns/update";
import { DeleteAlbum } from "../../../services/controllers/albuns/delete";


const router = express.Router();

router.post("/album/create", CreateAlbum);
router.get("/albuns/all", ListAlbuns); 
router.put("/album/update/:id", UpdateAlbuns);
router.delete("/album/delete/:id", DeleteAlbum)


export default router