import express from "express";
import { CreateArtist } from "../../controllers/artists/create";
import { CreateSong } from "../../controllers/songs/create";
import { ListSongs } from "../../controllers/songs/list";
import { ListArtists } from "../../controllers/artists/list";
import { DeleteArtist } from "../../controllers/artists/delete";
import { DeleteSong } from "../../controllers/songs/delete";
import { UpdateArtist } from "../../controllers/artists/update";

const router = express.Router();

router.post("/create",CreateArtist);
router.post("/create/song",CreateSong);
router.get("/all",ListArtists);
router.get("/songs/all",ListSongs);
router.delete("/delete/:id",DeleteArtist);
router.delete("/delete/song/:id", DeleteSong);
router.put("/update/:id",UpdateArtist)
export default router;