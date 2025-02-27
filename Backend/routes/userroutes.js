import { register } from "../controlers/usercontroller.js";
import { login } from "../controlers/usercontroller.js";
import { authcheck } from "../controlers/usercontroller.js";
import { logout } from "../controlers/usercontroller.js";
import { changepassword } from "../controlers/usercontroller.js";
import passport from "passport";
import express from "express";
import { updateProfile } from "../controlers/profilecontroller.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get('/auth/check',authcheck);
router.post('/logout',logout);
router.post('/changepassword',changepassword);

export default router;