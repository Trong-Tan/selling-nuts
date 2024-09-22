import "./style/Shop.css"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useQuery} from '@tanstack/react-query'; // Import QueryClient và QueryClientProvider
import { Product, fetchAllProducts } from "@/apis/products";

export default function Component() {
  const [products, setProducts] = useState([]);
  const { data: productsQuery } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchAllProducts()
  });

  useEffect(() => {
    if (productsQuery) {
      setProducts(productsQuery);
    }
  }, [productsQuery]);

  return (
    <div style={{width: "100%"}}>
      <div className="shop">
        <div className="product-filter ">
          <h1 className="filter-title ">Filters</h1>
          <div className="rule" />
        </div>
        <div style={{width: "100%"}}>
          <div className="product-header">
            <h1>{products.length} Results</h1>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
              <label htmlFor="items">Items</label>
            </div>
          </div>
          <div className="product-container">
            {productsQuery?.data.map((item: Product, index: number)=> (
              <div className="product-item border-2 border-[#ECD2B8] justify-center items-center cursor-pointer hover:border-[#97836f] hover:bg-[#fffaf5be]" key={index}>
                <Link to={`/${item.id}`} className="preview ">
                  {/* absolutely positioned elements */}
                  {/* {item.popularItem ? <div className="best-seller-tag"><p>Best Seller</p></div> : <></>} */}
                  {/* relative elements */}
                  <img src={`${item.imageUrl}`} alt={`${item.name}`} className="preview-image w-52 h-52" />
                  <div>
                    <h1>{item.name}</h1>
                    <p>Price: ${item.price}</p>
                    {/* {item.discountPrice == null ? 
                      <p><s style={{color: "#8b0000"}}>${item.price.toFixed(2)}</s> ${item.discountPrice.toFixed(2)}</p>} */}
                    <div className="star-rating">
                      <Star className="text-yellow-400" /> <Star className="text-yellow-400" /> <Star className="text-yellow-400" /> <Star className="text-yellow-400" /> <Star className="text-yellow-400" />
                      <p>({item.numRatings})</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}


