import express from "express";
import { CreateArtist } from "../../controllers/artists/create";
import { CreateSong } from "../../controllers/songs/create";
import { ListSongs } from "../../controllers/songs/list";

const router = express.Router();

router.post("/create",CreateArtist)
router.post("/create/song",CreateSong)

router.get("/songs/all",ListSongs)

export default router;