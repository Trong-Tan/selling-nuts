import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Map from "./pages/Map/Map";
import About from "./pages/About/About";
import ErrorElement from "./pages/Error/Error";
import Product from "./pages/Product/Product";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Login from "./pages/login";
import Cart from "./components/Cart/Cart";

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Home />,
    errorElement: <ErrorElement />
  },
  {
    path: "/shop",
    element: <Shop />,
    errorElement: <ErrorElement />
  },
  {
    path: "/shop/:productId",
    element: <Product />,
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
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/cart",
    element: <Cart />
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
