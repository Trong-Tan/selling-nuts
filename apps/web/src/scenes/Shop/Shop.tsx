import "./Shop.css"
import Preview from "../../components/Preview/Preview";
import { ProductContract } from "../../types";
import Dropdown from "../../components/Dropdown/Dropdown";
import Navbar from "../../components/Navbar/Navbar";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

function Shop() {
  const [products, setProducts] = useState<ProductContract[]>(useLoaderData() as ProductContract[])
  const [limit, setLimit] = useState(6);
  const [filter, setFilter] = useState<{[key: string]: object | string[]}>({"nutType": ["almond", "peanut", "pistachio", "cashew", "legume"]})
  const [sort, setSort] = useState<{[key: string]: number}>({})
  const handleSelect = async(e: React.ChangeEvent<HTMLSelectElement>)  => {
    setLimit(Number(e.currentTarget.value))
    const newProducts = await fetch(hydrateRequestUrl(Number(e.currentTarget.value), sort, filter))
      .then(res => res.json())
    setProducts(newProducts)
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
    setProducts(newProducts)
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
    setProducts(newProducts)
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
        <div className="product-filter">
          <h1 className="filter-title">Filters</h1>
          <div className="rule" />
          {filters.map((e, i) => <Dropdown title={e.title} options={e.options} key={i} filter={handleFilter} sort={handleSort}/>)}
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
            {products.map((product: ProductContract, i: number) => 
              <Preview product={product} key={i}/>)}
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