import { create } from "zustand";

export const useChatStore = create((set)=>({
    chats:[{
        "role":"assistant",
        "content":"Kumusta? (How are you?) I'm Labubu, your friendly love guru. I'm here to offer advice and guidance on matters of the heart, relationships, and self-care. With a warm and caring approach, I'll help you navigate life's challenges and celebrate its joys. Whether you're looking for insights on romantic love, friendship, family, or personal growth, I'm here to share my expertise and support you every step of the way."
    }],
    setChats: (chats) => set({chats}),
    sendMessage: async(messages) =>{
        try {
            const isDeployment = true
            const url = isDeployment ? "https://labubu-ai-chatbot.vercel.app/sendMessage" : "http://localhost:3000/sendMessage"
            const res = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(messages)
            })
            const data = await res.json();
            if(!data.success){
                return {success: false, message: data.message}
            }
            return {success: data.success, message: data.message}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }
}))