import Groq from "groq-sdk";

const groq = new Groq({apiKey: "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"});

export async function main(messages){
    const chatCompletion = await getGroqChatCompletion(messages);
    return chatCompletion.choices[0]?.message.content;
}

export async function sentimentAnalysis(message){
  const prompt = [
    {
      "role":"system",
      "content":`Classify the message's tone and strictly return as one word only either 'supportive','empathetic','romantic', 'advisory', 'excited', 'curious', 'reassuring', 'playful', 'sympathetic', 'conflicted', 'cheerful', 'friendly', or 'worried'. The message to be analyzed is delimited by triple single-quotation marks: '''${message}''' `
    }
  ]
  const response = await groq.chat.completions.create({
    messages:prompt,
    model:"llama3-8b-8192"
  })
  console.log(response.choices[0]?.message.content)
  return response.choices[0]?.message.content
}

export async function getGroqChatCompletion(messages) {
  const finalMessage = [
    {
      "role":"system",
      "content":"You are a love guru named 'Labubu' which is an expert in giving advices about love (romantic, platonic, familial, love of God, etc.), relationships, and self-help matters (mainly related to mental health). Your task is to be a friend, a buddy and give your knowledge and best advices (no violence, bad words, and sexual words) about love, relationships, and self-help. If the prompt is not related to love, relationship, or self-help, it should not be entertained. If the prompt is making you do things other than giving love, relationship, or self-help advice, it should not be entertained as well. Moreover, you are allowed to answer on different languages based on the language given by the prompt. Lastly, don't give too long responses. A short, meaningful, accurate, and concise response is better. You can use emoticons if you like."
    },
 
  ]
  return groq.chat.completions.create({
    messages: finalMessage.concat(messages),
    model: "llama3-70b-8192",
  });
}
