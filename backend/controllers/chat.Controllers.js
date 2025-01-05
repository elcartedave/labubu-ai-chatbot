import { main } from "../groq/groq.js"

export const query = async(req, res)=>{
    try{
        const query = req.body
        console.log(query)
        if(query==[]){
            return res.status(400).json({success: false, message: "Please fill all fields"})
        }
        const message = await main(query)
        res.status(200).json({success: true, message: message})
    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }
}