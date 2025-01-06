import { main, sentimentAnalysis } from "../groq/groq.js"

export const query = async(req, res)=>{
    try{
        const query = req.body
        if(query==[]){
            return res.status(400).json({success: false, message: "Please fill all fields"})
        }
        const message = await main(query)
        const sentiment = await sentimentAnalysis(message)
        res.status(200).json({success: true, message: message, sentiment:sentiment})
    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }
}