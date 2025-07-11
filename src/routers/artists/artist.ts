import express from "express";
import { CreateArtist } from "../../controllers/artists/create";
import { CreateSong } from "../../controllers/songs/create";

const router = express.Router();

router.post("/create",CreateArtist)
router.post("/create/song",CreateSong)

export default router;