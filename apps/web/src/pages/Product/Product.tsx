import "./Product.css";
import Navbar from "../../components/Navbar/Navbar";
import { useLoaderData } from "react-router-dom";
import { ProductContract } from "../../types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

function Product() {
  const product = useLoaderData() as ProductContract;
  const [quantity, changeQuantity] = useState(1);
  const handleChange = (value: string) => {
    if(Number.isInteger(Number(value)) && value !== "" && Number(value) < 100 && Number(value) > 0) {
      changeQuantity(Number(value));
    }
  }

  return ( 
    <div style={{width: "100%", display: "flex", flexDirection: "column", minHeight: "90vh", marginTop: "10vh"}}>
      <Navbar location=""/>
      <div className="product-content">
        <Link id="product-path" to="../shop">← <span>Back to Shop</span></Link>
        <Link id="product-path-mobile" to="../shop">← <span>Shop</span></Link>
        <img className="border-4 border-[#3D2102] rounded-3xl p-5" src={product.imageUrl} alt={product.name} id="product-image"></img>
        <div className="product-text">
          <div id="name-and-tag">
            <p id="hot-product" style={{display: product.popularItem ? "block" : "none"}}>HOT</p>
            <h1 id="product-name" className="font-medium text-4xl">{product.name}</h1>
          </div>
          <div className="star-rating flex text-[#A7703F]">
            <p>{product.rating}</p>
            <Star className="text-yellow-400" /> <Star className="text-yellow-400" /> <Star className="text-yellow-400" /> <Star className="text-yellow-400" /> <Star className="text-yellow-400" />
            <p>({product.numRatings})</p>
          </div>
          <p id="product-price">${product.price.toFixed(2)}</p>
          <div className="rule border-b-2 border-[#ab977f]"/>
          <p>description</p>
          <div style={{margin: "1rem 0", display: "flex", flexDirection: "column"}}>
            <p style={{fontWeight: "bold", fontSize: "0.95rem", margin: "0 0 0.4rem 0"}}>Quantity</p>
            <div className="quantity-counter border-2 border-[#3D2102] rounded-md p-1">
              <Button onClick={() => handleChange(String(quantity - 1))} onDoubleClick={e => e.preventDefault()}>-</Button>
              <input value={String(quantity)} onChange={(e) => handleChange(e.currentTarget.value)}/>
              <Button onClick={() => handleChange(String(quantity + 1))} onDoubleClick={e => e.preventDefault()}>+</Button>
            </div>
            <Button className="bg-[#3D2102]">Add to cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;