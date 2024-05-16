import { BotMessageSquare } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { useState } from "react";
import {GoogleGenerativeAI} from "@google/generative-ai"
  
const genAI = new GoogleGenerativeAI("AIzaSyA9zfZnMiZo2SLv0kDVJw3Hcb2mRToF8vQ");
  

function ChatBot() {
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState("");
  
    async function getAnswer() {
        try {
        setLoading(true);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text)
        setAnswer(text)
        } catch (error) {
        console.log(error);
        } finally {
        setLoading(false);
        }
    }
      return(
        <div className="w-full h-full">
        <Popover>
          <PopoverTrigger className="bg-blue-950 rounded-lg fixed top-auto bottom-10 left-auto right-12 p-4 flex gap-3">
            <BotMessageSquare className="text-gray-100" />
            <span className="text-gray-100">ChatBot</span>
          </PopoverTrigger>
          <PopoverContent className="bg-yellow-300 ">
            <div className="h-auto w-full p-6">
              <div className="user text-end">{prompt}</div>
              <br />
              <div className="bot">{answer}</div>
            </div>
            <div className="flex gap-3 items-center">
              <Textarea
                placeholder="Ask anything!"
                className=""
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
              />
              <Button
                onClick={() => getAnswer()}
                className="text-primary text-slate-950 bg-blue-500 rounded-lg"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      )
}

export default ChatBot
      