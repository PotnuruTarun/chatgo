import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import userRoutes from "./routes/user.route.js"
import connectToMongo from "./db/connectToMongo.js"
dotenv.config()
const PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)





app.listen(PORT, ()=>{
  connectToMongo()
  console.log("Server running in port " + PORT)
})