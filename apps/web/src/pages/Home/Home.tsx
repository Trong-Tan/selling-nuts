import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import PromotionBar from "../../components/PromotionBar/PromotionBar";
import { Button } from "@/components/ui/button";
import walnuts from "../../assets/walnuts.png";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorElement from "../Error/Error";
import ChatBot from "../../components/ChatBot";
import { Link } from "react-router-dom";

function Home() {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return <p>loading your data</p>;
  }

  if (error) {
    return <ErrorElement error={error.message} />;
  }

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
      <PromotionBar />
    </div>
  );
}

export default Home;
