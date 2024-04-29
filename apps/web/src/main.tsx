import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./scenes/Home/Home";
import Shop from "./scenes/Shop/Shop";
import Map from "./scenes/Map/Map";
import About from "./scenes/About/About";
import ErrorElement from "./scenes/Error/Error";
import Product from "./scenes/Product/Product";
import { ProductContract } from "./types";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Home />,
    errorElement: <ErrorElement />
  },
  {
    path: "/shop",
    element: <Shop />,

    loader: async (): Promise<ProductContract[]> => {
      return fetch("https://enuts.devinedwards.xyz/server/products?numItems=6&sort=nosort&filter=nofilter")
        .then(res => res.json())
    },

    errorElement: <ErrorElement />
  },
  {
    path: "/shop/:productId",
    element: <Product />,

    loader: async ({params}): Promise<ProductContract> => {
      return fetch(`https://enuts.devinedwards.xyz/server/product?productId=${params.productId}`)
        .then(res => res.json())
    },

    errorElement: <ErrorElement />
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorElement />
  },
  {
    path: "/locations",
    element: <Map />,
    errorElement: <ErrorElement />
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-my0uthfp11u0e8bi.us.auth0.com"
      clientId="WslQyr2n9dwKHvV9H1QCJkBIFvJupJxi"
      authorizationParams={{
        redirect_uri: "https://enuts.devinedwards.xyz/"
      }}>
      <RouterProvider router={router} />
    </Auth0Provider>
    
  </React.StrictMode>
);
