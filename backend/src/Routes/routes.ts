import { Router } from "express";
import { getHomepage, loginUser, registerUser, checkUser } from "../Controller/UsersController";
import { addNewProject, getprojectdata } from "../Controller/ProjectsController";
import { VerifyToken } from "../Middleware/VerifyToken";

const router =Router()


router.post('/login',loginUser)
router.post('/signup', registerUser)
router.post('/newproject', addNewProject)
router.get('/projects', getprojectdata)
router.get('/homepage',VerifyToken,getHomepage)
router.get('/check', VerifyToken,checkUser)


export default router