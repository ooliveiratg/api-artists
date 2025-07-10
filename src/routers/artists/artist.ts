import express from "express";
import { CreateArtist } from "../../controllers/artists/create";

const router = express.Router();

router.post("/create",CreateArtist)

export default router;