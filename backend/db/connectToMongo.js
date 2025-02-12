import mongoose from "mongoose"

const connectToMongo = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to db")
  } catch (error) {
    console.log("Error connecting to Mongodb"+ error.message)
  }
}
export default connectToMongo