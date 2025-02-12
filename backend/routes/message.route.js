import express from "express"
import { getMessages, sendmessage } from "../controllers/message.controller.js"
import protectRouter from "../middleware/protectRouter.js"

const router = express.Router()

router.get('/:id',protectRouter,getMessages)
router.post('/send/:id',protectRouter,sendmessage)
export default router