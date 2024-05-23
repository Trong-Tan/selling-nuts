import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import cartIcon from "../../assets/empty-cart-icon.png";
import navIcon from "/logo.png";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Cog } from "lucide-react";
import { getToken, removeToken } from "@/utils/token";

function Navbar(props: { location: string }) {
  const paths = getPaths(props.location);
  const [logoutPopup, setLogoutPopup] = useState<"none" | "block">("none");
  const [cartPopup, setCartPopup] = useState<"none" | "block">("none");
  const [navbar, showNav] = useState<"flex" | "">("");
  const cartNum = 0;
  const accessToken = getToken()
  const navigate = useNavigate()
  let cartNumDisplayed = "";
  let cartNumVisibility: "visible" | "hidden" = "hidden";
  if (cartNum == 0) {
    cartNumVisibility = "hidden";
  } else if (cartNum > 0 && cartNum < 100) {
    cartNumVisibility = "visible";
    cartNumDisplayed = String(cartNum);
  } else {
    cartNumVisibility = "visible";
    cartNumDisplayed = "+";
  }

  const handleLogout = () => {
    removeToken();
    navigate("/login"); 
  };

  return (
    <div className="header border-b-2 bg-[#f7eade] border-[#F5EFE9] w-full">
      <h2>
        <Link to="..">ENUTS</Link>
      </h2>
      <img src={navIcon} alt="navigation links" className="nav-icon" 
        onClick={() => {navbar == "flex" ? showNav("") : showNav("flex")}}/>
      <nav className="navbar" style={{display: navbar}}>
        <Link to={paths.shopPath}>Shop</Link>
        <Link to={paths.mapPath}>Locations</Link>
        <Link to={paths.aboutPath}>About Us</Link>
        <Link to="" id="cart-nav">Cart</Link>
        <div className="icons">
          <img
            src={cartIcon}
            alt="view cart button"
            onClick={() => setCartPopup("block")}
          />
        </div>
        <div style={{ display: cartPopup }} className="screen-fill"
          onClick={() => setCartPopup("none")}>
          <div className="cart-popup login-popup">
            <span className="login-text">Your cart is empty.</span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Cog className="h-10 w-10"/>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {accessToken ? (
              <DropdownMenuItem className="cursor-pointer" >
                <div className="log-out" onClick={handleLogout}>Log out</div>
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem>
                  <Link to={paths.loginPath}>Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={paths.loginPath}>Sign-up</Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  );
}

interface Paths {
  shopPath: string;
  mapPath: string;
  aboutPath: string;
  loginPath: string
}

const getPaths = (location: string): Paths => {
  let shopPath, mapPath, aboutPath, loginPath;
  switch (location) {
  case "home":
    (shopPath = "/shop"), (mapPath = "/locations"), (aboutPath = "/about"), (loginPath = "../login");
    break;
  case "shop":
    (shopPath = ""), (mapPath = "../locations"), (aboutPath = "../about"), (loginPath = "../login");
    break;
  case "map":
    (shopPath = "../shop"), (mapPath = ""), (aboutPath = "../about"), (loginPath = "../login");
    break;
  case "about":
    (shopPath = "../shop"), (mapPath = "../locations"), (aboutPath = ""), (loginPath = "../login");
    break;
  case "login":
    (shopPath = "../shop"), (mapPath = "../locations"), (aboutPath = ""), (loginPath = "");
    break;  
  case "error":
    (shopPath = "../shop"),
    (mapPath = "../locations"),
    (aboutPath = "../about");
    (loginPath = "../login");
    break;
  default:
    (shopPath = "../shop"), (mapPath = "../locations"), (aboutPath = "../about"), (loginPath = "../login");
    break;
  }

  return {
    shopPath,
    mapPath,
    aboutPath,
    loginPath,
  };
};

export default Navbar;
