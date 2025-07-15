import express from "express";
import { CreateArtist } from "../../controllers/artists/create";
import { ListArtists } from "../../controllers/artists/list";
import { DeleteArtist } from "../../controllers/artists/delete";
import { UpdateArtist } from "../../controllers/artists/update";

const router = express.Router();

router.post("/create",CreateArtist);
router.get("/all",ListArtists);
router.delete("/delete/:id",DeleteArtist);
router.put("/update/:id",UpdateArtist)
export default router;