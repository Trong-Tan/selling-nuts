import { Bot, BotMessageSquare, UserRound } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import bgChatBot from "../assets/bgChatBot.jpg"

const genAI = new GoogleGenerativeAI("AIzaSyA9zfZnMiZo2SLv0kDVJw3Hcb2mRToF8vQ");
interface Conversation {
  question: string;
  answer: string;
}

function ChatBot() {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);

  async function getAnswer() {
    if (!prompt.trim()) {
      alert("Please enter a question.");
      return;
    }

    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      setAnswer(text);
      setConversations([...conversations, { question: prompt, answer: text }]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-full">
      <Popover>
        <PopoverTrigger className="bg-blue-950 rounded-lg fixed bottom-10 right-12 p-4 flex gap-3">
          <BotMessageSquare className="text-gray-100" />
          <span className="text-gray-100">ChatBot</span>
        </PopoverTrigger>
        <PopoverContent className="relative bottom-20 rounded-t-lg mr-12">
          <img src={bgChatBot} alt="" className="h-72 static bottom-0 rounded-t-lg border-t-8 border-x-8 border-[#A46B35] opacity-75"/>
          <div className="w-full py-3 overflow-y-auto h-80 absolute bottom-0 top-0 p-2 font-mono text-base">
            <div className="flex gap-2 pt-2 px-2"><Bot /> <div className="rounded-3xl bg-white p-2 h-auto w-60">  Please!! Tell me what you want!</div> </div><br />
            {conversations.map((conversation, index) => (
              <div key={index}>
                <div className="user flex gap-2 justify-end">
                  <div className="rounded-3xl bg-white p-2 h-auto w-60 break-all">{conversation.question}  </div>
                  <UserRound className="items-center"/>               
                </div>
                <br />
                <div className="bot flex gap-2">
                  <Bot />
                  <div className="bg-white p-2 h-auto w-60 rounded-3xl">  {conversation.answer}</div>                  
                </div>
                <br />
              </div>
            ))}
            <br /><br />
          </div>
          <div className="flex justify-between gap-3 px-2 pt-2 absolute bg-[#DDDFDD] w-full border-b-8 border-x-8 border-[#BB9068]">
            <textarea
              className="resize rounded-md p-1 w-full"
              placeholder="Ask anything!"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
            ></textarea>
            <Button
              onClick={getAnswer}
              className="text-primary text-white bg-[#A46B35] rounded-lg mt-2"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ChatBot;
