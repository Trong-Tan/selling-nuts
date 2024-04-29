import "./Navbar.css";
import { Link } from "react-router-dom";
import cartIcon from "../../assets/empty-cart-icon.png";
import accountIcon from "../../assets/account-icon.png";
import navIcon from "../../assets/nav-icon.png";
import { useState } from "react";
import {useAuth0} from "@auth0/auth0-react";

function Navbar(props: { location: string }) {
  const paths = getPaths(props.location);
  const [loginPopup, setLoginPopup] = useState<"none" | "block">("none");
  const [logoutPopup, setLogoutPopup] = useState<"none" | "block">("none");
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  // const [accountPopup, setAccountPopup] = useState<"hidden" | "visible">(
  //   "hidden"
  // );
  const [cartPopup, setCartPopup] = useState<"none" | "block">("none");
  const [navbar, showNav] = useState<"flex" | "">("");
  const cartNum = 0;
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

  return (
    <div className="header">
      <h2>
        <Link to="..">ENUTS</Link>
      </h2>
      <img src={navIcon} alt="navigation links" id="nav-icon" 
        onClick={() => {navbar == "flex" ? showNav("") : showNav("flex")}}/>
      <nav className="navbar" style={{display: navbar}}>
        <Link to={paths.shopPath}>Shop</Link>
        <Link to={paths.mapPath}>Locations</Link>
        <Link to={paths.aboutPath}>About Us</Link>
        <Link to="" id="cart-nav">Cart</Link>
        <Link to="" id="account-nav">Account</Link>
        <div className="icons">
          <img
            src={cartIcon}
            alt="view cart button"
            onClick={() => setCartPopup("block")}
          />
          <span
            className="cart-number"
            style={{ visibility: cartNumVisibility }}
          >
            {cartNumDisplayed}
          </span>
          <img
            src={accountIcon}
            alt="view account information button"
            onClick={() => {isAuthenticated ? setLogoutPopup("block") : setLoginPopup("block"); console.log(isAuthenticated)}}
          />
        </div>
      </nav>
      <div style={{ display: loginPopup }} className="screen-fill"
        onClick={() => {setLoginPopup("none"); console.log(isAuthenticated)}}>
        <div className="login-popup" onClick={() => loginWithRedirect()}>
          <span className="login-text">log in / sign up</span>
          <span>→</span>
        </div>
      </div>
      <div style={{ display: logoutPopup }} className="screen-fill"
        onClick={() => setLogoutPopup("none")}>
        <div className="login-popup" onClick={() => logout({logoutParams: {returnTo: "https://enuts.devinedwards.xyz/"}})}>
          <span className="login-text">log out</span>
          <span>→</span>
        </div>
      </div>
      <div style={{ display: cartPopup }} className="screen-fill"
        onClick={() => setCartPopup("none")}>
        <div className="cart-popup login-popup">
          <span className="login-text">Your cart is empty.</span>
        </div>
      </div>
    </div>
  );
}

interface Paths {
  shopPath: string;
  mapPath: string;
  aboutPath: string;
}

const getPaths = (location: string): Paths => {
  let shopPath, mapPath, aboutPath;
  switch (location) {
  case "home":
    (shopPath = "/shop"), (mapPath = "/locations"), (aboutPath = "/about");
    break;
  case "shop":
    (shopPath = ""), (mapPath = "../locations"), (aboutPath = "../about");
    break;
  case "map":
    (shopPath = "../shop"), (mapPath = ""), (aboutPath = "../about");
    break;
  case "about":
    (shopPath = "../shop"), (mapPath = "../locations"), (aboutPath = "");
    break;
  case "error":
    (shopPath = "../shop"),
    (mapPath = "../locations"),
    (aboutPath = "../about");
    break;
  default:
    (shopPath = "../shop"), (mapPath = "../locations"), (aboutPath = "../about");
    break;
  }

  return {
    shopPath,
    mapPath,
    aboutPath,
  };
};

export default Navbar;
