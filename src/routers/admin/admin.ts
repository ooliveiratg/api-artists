import express from "express";
import { Registeradmin } from "../../controllers/admin/register";
import { LoginAdmin } from "../../controllers/admin/login";

const router = express.Router();

router.post("/register",Registeradmin);
router.post("/login", LoginAdmin)

export default router;
