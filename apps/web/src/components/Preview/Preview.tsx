import "./Preview.css"
import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";
import colorScheme from "../../colors";
import cartIcon from "../../assets/add-to-cart-icon.png";
import { ProductContract } from "../../types";

function Preview(props: {product: ProductContract}) {
  return ( 
    <Link to={props.product._id.toString()} className="preview">
      {/* absolutely positioned elements */}
      {props.product.popularItem ? <div className="best-seller-tag"><p>Best Seller</p></div> : <></>}
      <img src={cartIcon} alt="add to cart button" className="cart-icon" 
        onClick={e => e.preventDefault()}/>

      {/* relative elements */}
      <img src={props.product.imageUrl} alt={props.product.name} className="preview-image" />
      <div>
        <h1>{props.product.name}</h1>
        {props.product.discountPrice == null ? 
          <p>${props.product.price.toFixed(2)}</p> :
          <p><s style={{color: "#8b0000"}}>${props.product.price.toFixed(2)}</s> ${props.product.discountPrice.toFixed(2)}</p>}
        <div className="star-rating">
          <Rating initialValue={props.product.rating} allowFraction={true} disableFillHover={true} allowHover={false} fillColor={colorScheme.primaryColor} 
            emptyColor={colorScheme.primaryColor} emptyStyle={{opacity: .4}} size={22} readonly={true}/>
          <p>({props.product.numRatings})</p>
        </div>
      </div>
    </Link>
  );
}

export default Preview;