import express from "express";
import { Registeradmin } from "../../controllers/admin/register";

const router = express.Router();

router.post("/register",Registeradmin)
