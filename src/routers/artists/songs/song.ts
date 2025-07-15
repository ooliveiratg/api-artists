import { CreateSong } from "../../../controllers/songs/create";
import { DeleteSong } from "../../../controllers/songs/delete";
import { ListSongs } from "../../../controllers/songs/list";
import { UpdateSong } from "../../../controllers/songs/update";
import express from "express";


const router = express.Router();

router.post("/create/song",CreateSong);
router.get("/songs/all",ListSongs);
router.delete("/delete/song/:id", DeleteSong);
router.put("/update/song/:id", UpdateSong);