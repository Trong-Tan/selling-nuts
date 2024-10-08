import "./style/Product.css";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "@/router";
import { fetchProductById } from "@/apis/products";
import { useQuery } from "@tanstack/react-query";
import { createCart } from "@/apis/cart";
import { User } from "@/apis/auth";

export default function Component() {
  const [quantity, changeQuantity] = useState(1);
  const { productId } = useParams("/:productId")
  const navigate = useNavigate()
  const { me } = useOutletContext<{ me: User }>()
  
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
    const userId = me?.id
    if(!userId){
        navigate("/login")
    }
    try {
      const cartData = {
        productId: productQuery?.data.id,
        productName: productQuery?.data.name,
        orderId: productQuery?.data.orderId,
        price: productQuery?.data.price,
        discountPrice: productQuery?.data.discountPrice,
        numRatings: productQuery?.data.numRatings,
        imageUrl: productQuery?.data.imageUrl,
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
      <div className="product-content">
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
            <div className="flex flex-col gap-3 my-5 w-20">
              <Button onClick={() => handleChange(String(quantity - 1))} onDoubleClick={e => e.preventDefault()}>-</Button>
              <input className="mt-3 w-20" value={String(quantity)} onChange={(e) => handleChange(e.currentTarget.value)}/>
              <Button onClick={() => handleChange(String(quantity + 1))} onDoubleClick={e => e.preventDefault()}>+</Button>
            </div>
            <Button className="bg-[#3D2102]" onClick={handleAddToCart}>Add to cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

