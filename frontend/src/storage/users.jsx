import { create } from "zustand";

export const useUserStore = create((set)=>({
    users:[],
    setUsers: (users) => set({ users }),
    createUser: async(newUser, login) => {
        const isDeployment = false
        const url = isDeployment ? "https://labubu-ai-chatbot.vercel.app/signup" : "http://localhost:3000/signup"
        const res = await fetch(url, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newUser)
        });
        const data = await res.json();
        if(!data.success){
            return {success: false, message: data.message}
        }
        login(data.token, data.user)
        set((state)=>({
            users:[...state.users, data.user]
        }))
        return {success: true, message: "User created successfully"}
    },
    logInUser: async(user, login) =>{
        const isDeployment = false
        const url = isDeployment ? "https://labubu-ai-chatbot.vercel.app/login" : "http://localhost:3000/login"
        if(!user.email || !user.password) return {success: false, message: "Please fill in required fields"}
        const res = await fetch(url, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(user)
        });
        const data = await res.json();
        if(!data.success){
            return {success: false, message: data.message}
        }
        login(data.token, data.user)
        return {success: true, message: `Welcome back ${data.user.name}!`}
    }
}))