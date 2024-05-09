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

function Home() {
  const {isLoading, error} = useAuth0();

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
        <PopoverTrigger className="bg-teal-500 rounded-lg fixed top-auto bottom-10 left-auto right-12 p-4 flex gap-3">
          <BotMessageSquare /> Chat with me
        </PopoverTrigger>
        <PopoverContent className="bg-yellow-300">Place content for the popover here.</PopoverContent>
      </Popover>
      </div>
      <PromotionBar />
      
    </div>
  );
}

export default Home;