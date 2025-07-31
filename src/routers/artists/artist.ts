import express from "express";
import { CreateArtist } from "../../services/controllers/artists/create";
import { ListArtists } from "../../services/controllers/artists/list";
import { DeleteArtist } from "../../services/controllers/artists/delete";
import { UpdateArtist } from "../../services/controllers/artists/update";

const router = express.Router();

router.post("/create",CreateArtist);
router.get("/all",ListArtists);
router.delete("/delete/:id",DeleteArtist);
router.put("/update/:id",UpdateArtist)
export default router;