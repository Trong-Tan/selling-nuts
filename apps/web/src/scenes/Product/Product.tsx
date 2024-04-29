import "./Product.css";
import Navbar from "../../components/Navbar/Navbar";
import { useLoaderData } from "react-router-dom";
import { ProductContract } from "../../types";
import colorScheme from "../../colors";
import { Rating } from "react-simple-star-rating";
import { useState } from "react";
import { Link } from "react-router-dom";

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
        <img src={product.imageUrl} alt={product.name} id="product-image"></img>
        <div className="product-text">
          <div id="name-and-tag">
            <p id="hot-product" style={{display: product.popularItem ? "block" : "none"}}>HOT</p>
            <h1 id="product-name">{product.name}</h1>
          </div>
          <div className="star-rating">
            <p>{product.rating}</p>
            <Rating initialValue={product.rating} allowFraction={true} disableFillHover={true} allowHover={false} fillColor={colorScheme.primaryColor} 
              emptyColor={colorScheme.primaryColor} emptyStyle={{opacity: .4}} size={20} readonly={true}/>
            <p>({product.numRatings})</p>
          </div>
          <p id="product-price">${product.price.toFixed(2)}</p>
          <div className="rule"/>
          <p>description</p>
          <div style={{margin: "1rem 0", display: "flex", flexDirection: "column"}}>
            <p style={{fontWeight: "bold", fontSize: "0.95rem", margin: "0 0 0.4rem 0"}}>Quantity</p>
            <div className="quantity-counter">
              <button onClick={() => handleChange(String(quantity - 1))} onDoubleClick={e => e.preventDefault()}>-</button>
              <input value={String(quantity)} onChange={(e) => handleChange(e.currentTarget.value)}/>
              <button onClick={() => handleChange(String(quantity + 1))} onDoubleClick={e => e.preventDefault()}>+</button>
            </div>
            <button>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;