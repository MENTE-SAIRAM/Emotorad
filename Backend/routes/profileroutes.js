import express from "express"
import { addProfile, deleteProfile, getallprofiles, getprofile, updateProfile } from "../controlers/profilecontroller.js";
const router = express.Router();
router.post('/addprofile',addProfile);
router.get('/getprofiles',getallprofiles);
router.get('/getprofile/:email', getprofile);
router.delete('/deleteprofile/:email', deleteProfile);
router.post('/updateprofile',updateProfile)
export default router