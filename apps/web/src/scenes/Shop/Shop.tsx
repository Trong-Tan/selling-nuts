import "./Shop.css"
import Dropdown from "../../components/Dropdown/Dropdown";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import cartIcon from "../../assets/add-to-cart-icon.png";
import { Star } from "lucide-react";


function Shop() {
  const products = [
    {
      "_id": "6498c18cef7076d898597a1b",
      "name": "Planters' Mixed Nuts",
      "price": 5.99,
      "popularItem": true,
      "__v": 0,
      "discountPrice": null,
      "numRatings": 146,
      "rating": 4.5,
      "imageUrl": "https://i.ibb.co/k6tJpGC/peanuts.png",
      "nutType": "peanut"
    },
    {
      "_id": "6498c19cef7076d898597a1d",
      "name": "Lemoncello Chocolate Almonds",
      "price": 8.99,
      "popularItem": false,
      "__v": 0,
      "rating": 3,
      "numRatings": 15,
      "discountPrice": null,
      "imageUrl": "https://i.ibb.co/z2qJ5sB/lemon-choc-almonds.webp",
      "nutType": "almond"
    },
    {
      "_id": "6498c1aaef7076d898597a1f",
      "name": "Spicy Dill Cashews",
      "price": 7.49,
      "popularItem": false,
      "__v": 0,
      "rating": 3.5,
      "numRatings": 19,
      "discountPrice": null,
      "imageUrl": "https://i.ibb.co/TcVPZZv/spicy-dill.webp",
      "nutType": "cashew"
    },
    {
      "_id": "6498c1d2ef7076d898597a21",
      "name": "Gorbanzo Beans",
      "price": 6.99,
      "popularItem": false,
      "__v": 0,
      "rating": 4,
      "numRatings": 33,
      "discountPrice": 5.99,
      "imageUrl": "https://i.ibb.co/rMXKgQW/beans.webp",
      "nutType": "legume"
    },
    {
      "_id": "649db5e9f48993899d054dd1",
      "name": "Pistachios (No Shell)",
      "price": 7.99,
      "popularItem": true,
      "__v": 0,
      "rating": 4.5,
      "numRatings": 88,
      "discountPrice": null,
      "imageUrl": "https://i.ibb.co/ncJkwmQ/pistachios.webp",
      "nutType": "pistachio"
    },
    {
      "_id": "652abd6bd2d0d1f970721677",
      "name": "Honey Roasted Cashews",
      "price": 3.99,
      "discountPrice": null,
      "popularItem": false,
      "rating": 4,
      "numRatings": 35,
      "imageUrl": "https://i.ibb.co/Cnnjsh3/honeyroastedcashews.png",
      "__v": 0,
      "nutType": "cashew"
    }
  ]
  const [limit, setLimit] = useState(6);
  const [filter, setFilter] = useState<{[key: string]: object | string[]}>({"nutType": ["almond", "peanut", "pistachio", "cashew", "legume"]})
  const [sort, setSort] = useState<{[key: string]: number}>({})
  const handleSelect = async(e: React.ChangeEvent<HTMLSelectElement>)  => {
    setLimit(Number(e.currentTarget.value))
    const newProducts = await fetch(hydrateRequestUrl(Number(e.currentTarget.value), sort, filter))
      .then(res => res.json())
    newProducts(newProducts)
  }
  const handleFilter = async(field: string, checked: boolean) => {
    const newFilter = {...filter}
    const filterMapping = getFilterMapping(field);
    if(checked) {
      if(filterMapping[0] === "nutType") {
        const nutFilters = filter["nutType"] as string[]
        newFilter["nutType"] = nutFilters.concat(filterMapping[1] as string[])
      } else {
        newFilter[filterMapping[0]] = filterMapping[1];
      }
    } else {
      if(filterMapping[0] === "nutType") {
        const nutFilters = filter["nutType"] as string[]
        const temp = filterMapping[1] as string[]
        newFilter["nutType"] = nutFilters.filter(e => e !== temp[0])
      } else {
        delete newFilter[filterMapping[0]]
      }
    }
    const newProducts = await fetch(hydrateRequestUrl(limit, sort, newFilter))
      .then(res => res.json())
    newProducts(newProducts)
    setFilter(newFilter)
  }

  const handleSort = async(field: string, checked: boolean) => {
    const newSort = {...sort}
    const sortMapping = getSortMapping(field);
    if(checked) {
      newSort[sortMapping[0]] = sortMapping[1];
    } else {
      delete newSort[sortMapping[0]];
    }
    const newProducts = await fetch(hydrateRequestUrl(limit, newSort, filter))
      .then(res => res.json())
    newProducts(newProducts)
    setSort(newSort)
  }

  const filters =[
    {
      title: "Sort By",
      options: ["Popularity", "Rating", "Price Low-High", "Price High-Low", "A-Z", "Z-A"]
    },
    {
      title: "Price",
      options: ["Under $5", "$5-$10", "$10-$20", "Over $20"]
    },
    {
      title: "Nut",
      options: ["Peanuts", "Almonds", "Cashews", "Pistachios", "Legumes"]
    }
  ]

  return (
    <div style={{width: "100%"}}>
      <Navbar location="shop"/>
      <div className="shop">
        <div className="product-filter ">
          <h1 className="filter-title ">Filters</h1>
          <div className="rule" />
          {filters.map((e, i) => <Dropdown title={e.title}  options={e.options} key={i} filter={handleFilter} sort={handleSort}/>)}
        </div>
        <div style={{width: "100%"}}>
          <div className="product-header">
            <h1>{products.length} Results</h1>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
              <label htmlFor="items">Items</label>
              <select name="items" id="items-displayed" onChange={e => handleSelect(e)}>
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={18}>18</option>
              </select>
            </div>
          </div>
          <div className="product-container">
            {products.map(item => (
              <div className="product-item border-2 border-[#ECD2B8] justify-center items-center cursor-pointer hover:border-[#97836f] hover:bg-[#fffaf5be]" key={item._id}>
                <Link to={item._id.toString()} className="preview ">
                  {/* absolutely positioned elements */}
                  {/* {item.popularItem ? <div className="best-seller-tag"><p>Best Seller</p></div> : <></>} */}
                  <img src={cartIcon} alt="add to cart button" className="cart-icon ml-40" width="50" height="50" onClick={e => e.preventDefault()}/>
                  {/* relative elements */}
                  <img src={item.imageUrl} alt={item.name} className="preview-image w-52 h-52" />
                  <div>
                    <h1>{item.name}</h1>
                    {item.discountPrice == null ? 
                      <p>${item.price.toFixed(2)}</p> :
                      <p><s style={{color: "#8b0000"}}>${item.price.toFixed(2)}</s> ${item.discountPrice.toFixed(2)}</p>}
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

function getFilterMapping(filterName: string): [string, object | string[]] {
  switch(filterName) {
  case "Under $5":
    return ["price", { $lt: 5 }]
  case "$5-$10":
    return ["price", { $and: [{$gte: 5}, {$lt: 10}] }]
  case "$10-20":
    return ["price", { $and: [{$gte: 10}, {$lt: 20}] }]
  case "Over $20":
    return ["price", { $gte: 20 }]
  case "Peanuts":
    return ["nutType", ["peanut"]]
  case "Almonds":
    return ["nutType", ["almond"]]
  case "Cashews":
    return ["nutType", ["cashew"]]
  case "Pistachios":
    return ["nutType", ["pistachio"]]
  case "Legumes":
    return ["nutType", ["legume"]]
  default:
    return ["nofilter", {}] // can't happen
  }
}

function getSortMapping(filterName: string): [string, number] {
  switch(filterName) {
  case "Popularity":
    return ["numRatings", -1]
  case "Rating":
    return ["rating", -1]
  case "A-Z":
    return ["name", 1]
  case "Z-A":
    return ["name", -1]
  case "Price High-Low":
    return ["price", -1]
  case "Price Low-High":
    return ["price", 1]
  default:
    return ["nosort", 0] // can't happen
  }
}

function hydrateRequestUrl(limit: number, sort: {[key: string]: number}, filter: {[key: string]: object | string[]}) {
  return `https://enuts.devinedwards.xyz/server/products?numItems=${limit}&sort=${JSON.stringify(sort)}&filter=${JSON.stringify(filter)}`
}

export default Shop;