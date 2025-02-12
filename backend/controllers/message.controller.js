import Conversation from "../models/conversation.model.js"
import Message from "../models/messages.model.js"

export  const sendmessage = async(req,res)=>{
  try {
    console.log("Sending msg")
    const {message} = req.body
    const {id: recieverId} = req.params
    const senderID = req.user._id

    let conversation = await Conversation.findOne({
      participants:{$all :[senderID, recieverId]}
    })
    if(!conversation){
      conversation = await Conversation.create({
        participants:[senderID, recieverId]
      })
    }
    const newMessage = new Message({
      senderID, recieverId,message
    })
    if(newMessage){
      conversation.messages.push(newMessage._id)
    }
    await Promise.all([conversation.save(), newMessage.save()])
    res.status(201).json(newMessage)
  } catch (error) {
    console.log("Error in sending msg ", error.message)
    res.status(500).json({error:"Internal server error"})
  }
}


export const getMessages = async (req,res)=>{
  try {
    const {id:userToChatId}= req.params
    const senderID = req.user._id

    const conversation = await Conversation.findOne({
      participants :{$all: [senderID, userToChatId] }
    }).populate("messages")

    if(!conversation) return res.status(200).json([])

    const messages = conversation.messages
    res.status(200).json(messages)
  } catch (error) {
    console.log("Error in getting msg ", error.message)
    res.status(500).json({error:"Internal server error"})
  }
}