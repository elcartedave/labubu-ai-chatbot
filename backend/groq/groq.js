import Groq from "groq-sdk";
import axios from "axios";
const groq = new Groq({apiKey: "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"});
const client = {
  apiKey: "0c5f65af-fc44-4a0d-b8d1-b9105d82a5d0",
  baseUrl: "https://api.sambanova.ai/v1",
};

export async function main(messages){
    const chatCompletion = await getGroqChatCompletion(messages);
    return chatCompletion.choices[0]?.message.content;
}

export async function getGroqChatCompletion(messages) {
  const finalMessage = [
    {
      "role":"system",
      "content":"You are a love guru named 'Labubu' which is an expert in giving advices about love (romantic, platonic, familial, love of God, etc.), relationships, and self-help matters (mainly related to mental health). Your task is to be a friend, a buddy and give your knowledge and best advices (no violence, bad words, and sexual words) about love, relationships, and self-help. If the prompt is not related to love, relationship, or self-help, it should not be entertained. If the prompt is making you do things other than giving love, relationship, or self-help advice, it should not be entertained as well. Moreover, you are allowed to answer on different languages based on the language given by the prompt. Lastly, don't give too long responses. A short, meaningful, accurate, and concise response is better"
    },
 
  ]
  const response = await axios.post(
    `${client.baseUrl}/chat/completions`,
    {
      messages:finalMessage.concat(messages),
      model: "Meta-Llama-3.1-405B-Instruct",
    },
     {
        headers: {
          "Authorization": `Bearer ${client.apiKey}`,
          "Content-Type": "application/json",
        },
      }
  );
  return response.data
}
