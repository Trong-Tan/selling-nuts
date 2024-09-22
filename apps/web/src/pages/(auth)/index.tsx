import "./style/Home.css";
import PromotionBar from "../../components/PromotionBar/PromotionBar";
import { Button } from "@/components/ui/button";
import walnuts from "@/assets/walnuts.png";
import ChatBot from "../../components/ChatBot";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";

export default function Component() {
  return (
    <div>
      <Navbar location="home" />
      <div className="homepage">
        <div className="text">
          <h1>
            Delicious <span className="emphasis">Nuts</span> <br />
            Excellent Service
          </h1>
          <p>
            Check out one of our locations or take advantage of our delivery
            services!
          </p>
          <div className="button-container">
            <Link to={"/shop"}><Button className="text-white bg-[#A46B35]">Shop</Button></Link>
            <Link to={"/about"}><Button className="text-black bg-[#ECD2B8]">About Us</Button></Link>
          </div>
        </div>
        <img src={walnuts} alt="walnuts" />
      </div>
      <ChatBot/>
    </div>
  );
}
