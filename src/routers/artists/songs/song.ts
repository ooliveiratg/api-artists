import { CreateSong } from "../../../services/controllers/songs/create";
import { DeleteSong } from "../../../services/controllers/songs/delete";
import { ListSongs } from "../../../services/controllers/songs/list";
import { UpdateSong } from "../../../services/controllers/songs/update";
import express from "express";


const router = express.Router();

router.post("/songs/create",CreateSong);
router.get("/songs/all",ListSongs);
router.delete("/songs/delete/:id", DeleteSong);
router.put("/songs/update/:id", UpdateSong);

export default router