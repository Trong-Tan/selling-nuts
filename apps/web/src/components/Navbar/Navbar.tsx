import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import cartIcon from "../../assets/empty-cart-icon.png";
import navIcon from "/logo.png";
import { useState } from "react";
import { Button } from '@/components/ui/button'

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

import Setting from "../../components/Setting";


function Navbar(props: { location: string }) {
  const [navbar, showNav] = useState<"flex" | "">("");
  const accessToken = getToken()
  const navigate = useNavigate()

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
        <Link to={"/shop"}>Shop</Link>
        <Link to={"/locations"}>Locations</Link>
        <Link to={"/about"}>About Us</Link>
        <Link to={"/cart"}>
        <img src={cartIcon} alt="" />
        </Link>

        
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Cog className="h-10 w-10"/>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
            <Setting/>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {accessToken ? (
              <DropdownMenuItem className="cursor-pointer" >
                <Button>
                <div className="log-out" onClick={handleLogout}>Log out</div>
                </Button>
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem>
                  <Link to={"/login"}>Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={"/login"}>Sign-up</Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  );
}

export default Navbar;
