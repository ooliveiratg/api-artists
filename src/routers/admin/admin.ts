import express from "express";
import { Registeradmin } from "../../services/controllers/admin/register";
import { LoginAdmin } from "../../services/controllers/admin/login";

const router = express.Router();

router.post("/register",Registeradmin);
router.post("/login", LoginAdmin)

export default router;
