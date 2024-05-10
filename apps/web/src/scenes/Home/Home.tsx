import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import PromotionBar from "../../components/PromotionBar/PromotionBar";
import Button from "../../components/Button/Button";
import walnuts from "../../assets/walnuts.png";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorElement from "../Error/Error";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { BotMessageSquare } from "lucide-react";
import {useState} from "react"
import { Textarea } from "@/components/ui/textarea";

function Home() {
  const {isLoading, error} = useAuth0();
  const [promt, setPromt] = useState("")
  const [answer, setAnswer] = useState("Notthing")

  if(isLoading) { return <p>loading your data</p>}

  if(error) {return <ErrorElement error={error.message}/>}

  return (
    <div>
      <Navbar location='home'/>
      <div className="homepage">
        <div className="text">
          <h1>Delicious <span className="emphasis">Nuts</span> <br/>Excellent Service</h1>
          <p>Check out one of our locations or take advantage of our delivery services!</p>
          <div className="button-container">
            <Button buttonType='primary' textType="inverted-text-color" destination='shop'>Shop</Button>
            <Button buttonType='secondary' textType="normal-text-color" destination='about'>About Us</Button>
          </div>
        </div>
        <img src={walnuts} alt="walnuts" />
      </div>
      <div className="w-full h-full">
      <Popover >
        <PopoverTrigger className="bg-blue-950 rounded-lg fixed top-auto bottom-10 left-auto right-12 p-4 flex gap-3">
          <BotMessageSquare className="text-gray-100" /> 
          <span className="text-gray-100">ChatBot</span>
        </PopoverTrigger>
        <PopoverContent className="bg-yellow-300 ">
          <div className="h-auto w-full p-6">
            <div className="user text-end">
              123
            </div>
            <br />
            <div className="bot">
              xyz
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <Textarea  placeholder="Aks anythings!" className="" onChange={(event) => setPromt(event.target.value)} />
            {/* <Button buttonType='primary' textType="inverted-text-color" className="text-slate-950 bg-blue-500 rounded-lg">Send</Button> */}
            <span>{promt}</span>
          </div>
          
        </PopoverContent>
      </Popover>
      </div>
      <PromotionBar />
      
    </div>
  );
}

export default Home;