import { Router } from "express";
import { getHomepage, loginUser, registerUser, checkUser } from "../Controller/UsersController";
import { VerifyToken } from "../Middleware/VerifyToken";

const router =Router()


router.post('/login',loginUser)
router.post('/signup', registerUser)
router.get('/homepage',VerifyToken,getHomepage)
router.get('/check', VerifyToken,checkUser)


export default router