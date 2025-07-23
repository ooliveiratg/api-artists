import { CreateSong } from "../../../controllers/songs/create";
import { DeleteSong } from "../../../controllers/songs/delete";
import { ListSongs } from "../../../controllers/songs/list";
import { UpdateSong } from "../../../controllers/songs/update";
import express from "express";


const router = express.Router();

router.post("/songs/create",CreateSong);
router.get("/songs/all",ListSongs);
router.delete("/songs/delete/:id", DeleteSong);
router.put("/songs/update/:id", UpdateSong);

export default router