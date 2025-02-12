import express from "express"
import protectRouter from "../middleware/protectRouter.js"
import { getusersforsidebar } from "../controllers/user.controller.js"

const router = express.Router()
router.get("/",protectRouter,getusersforsidebar)

export default router