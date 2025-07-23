import express from "express";
import { CreateAlbum } from "../../../controllers/albuns/create";
import { ListAlbuns } from "../../../controllers/albuns/list";
import { UpdateAlbuns } from "../../../controllers/albuns/update";
import { DeleteAlbum } from "../../../controllers/albuns/delete";


const router = express.Router();

router.post("/album/create", CreateAlbum);
router.get("/albuns/all", ListAlbuns); 
router.put("/album/update/:id", UpdateAlbuns);
router.delete("/album/delete/:id", DeleteAlbum)


export default router