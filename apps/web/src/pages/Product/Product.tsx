import "./Product.css";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "@/router";
import { fetchProductById } from "@/apis/products";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { createCart } from "@/apis/cart";
import { getMe } from "@/apis/auth";

const queryClient = new QueryClient(); 

function Product (){
  return(
    <QueryClientProvider client={queryClient}>
      <ProductContent />
    </QueryClientProvider>
  )
}

function ProductContent() {
  const [quantity, changeQuantity] = useState(1);
  const { productId } = useParams("/Shop/:productId")
  const navigate = useNavigate()

  const { data: meQuery } = useQuery({
    queryKey: ['me'],
    queryFn: getMe
    });


    
  
  const { data: productQuery } = useQuery({
    queryKey: ['products', productId],
    queryFn: () => fetchProductById(productId)
  })

  const handleChange = (value: string) => {
    if(Number.isInteger(Number(value)) && value !== "" && Number(value) < 100 && Number(value) > 0) {
      changeQuantity(Number(value));
    }
  }

  const handleAddToCart = async () => {
    const userId = meQuery?.data?.id
    if(!userId){
        navigate("/login")
    }
    try {
      const cartData = {
        productId: productQuery.data.id,
        productName: productQuery.data.name,
        price: productQuery.data.price,
        discountPrice: productQuery.data.discountPrice,
        numRatings: productQuery.data.numRatings,
        imageUrl: productQuery.data.imageUrl,
        quantity: quantity
      }
      await createCart(cartData)
      navigate('/cart')
    } catch (error) {
      console.error(error)
    }
  }

  return ( 
    <div style={{width: "100%", display: "flex", flexDirection: "column", minHeight: "90vh", marginTop: "10vh"}}>
      <Navbar location=""/>
      <div className="product-content">
        <Link id="product-path" to="/shop">← <span>Back to Shop</span></Link>
        <Link id="product-path-mobile" to="../shop">← <span>Shop</span></Link>
        <img className="border-4 border-[#3D2102] rounded-3xl p-5" src={productQuery?.data?.imageUrl} alt={productQuery?.data?.name} id="product-image"></img>
        <div className="product-text">
          <div id="name-and-tag">
            <p id="hot-product" style={{display: productQuery?.data?.popularItem ? "block" : "none"}}>HOT</p>
            <h1 id="product-name" className="font-medium text-4xl">{productQuery?.data?.name}</h1>
          </div>
          <div className="star-rating flex text-[#A7703F]">
            <p>{productQuery?.data?.rating}</p>
            <Star className="text-yellow-400" /> <Star className="text-yellow-400" /> <Star className="text-yellow-400" /> <Star className="text-yellow-400" /> <Star className="text-yellow-400" />
            <p>({productQuery?.data?.numRatings})</p>
          </div>
          <p id="product-price">${productQuery?.data?.price.toFixed(2)}</p>
          <div className="rule border-b-2 border-[#ab977f]"/>
          <p>description</p>
          <div style={{margin: "1rem 0", display: "flex", flexDirection: "column"}}>
            <p style={{fontWeight: "bold", fontSize: "0.95rem", margin: "0 0 0.4rem 0"}}>Quantity</p>
            <div className="quantity-counter border-2 border-[#3D2102] rounded-md p-1">
              <Button onClick={() => handleChange(String(quantity - 1))} onDoubleClick={e => e.preventDefault()}>-</Button>
              <input value={String(quantity)} onChange={(e) => handleChange(e.currentTarget.value)}/>
              <Button onClick={() => handleChange(String(quantity + 1))} onDoubleClick={e => e.preventDefault()}>+</Button>
            </div>
            <Button className="bg-[#3D2102]" onClick={handleAddToCart}>Add to cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;