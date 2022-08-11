import { Router } from "express";
import { getHomepage, loginUser, registerUser, checkUser,getallusers } from "../Controller/UsersController";
import { addNewProject,assignNewProject, deleteProject } from "../Controller/ProjectsController";
import { VerifyToken } from "../Middleware/VerifyToken";

const router =Router()


router.post('/login',loginUser)
router.post('/signup', registerUser)
router.get('/users', getallusers)
router.get('/homepage',VerifyToken,getHomepage)
router.get('/check', VerifyToken,checkUser)
router.post('/newproject', addNewProject)
router.post('/assignnewproject', assignNewProject)
router.post('/deleteProject', deleteProject)


export default router