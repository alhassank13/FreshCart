import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import Cart from "./pages/Cart/Cart";
import Brands from "./pages/Brands/Brands";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Layout from "./pages/Layout/Layout";
import { Toaster } from "react-hot-toast";
import ProtetedRoutes from "./Protected/ProtetedRoutes";
import AuthContextProvider from "./Context/AuthContext";
import LoginProtected from "./pages/Register/LoginProtected";
import SubCategories from "./pages/SubCategories/SubCategories";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext/CartContext";
import WishListContextProvider from "./Context/WishlistContext/WishlistContext";
import WishList from "./pages/WishList/WishList";
import Checkout from "./pages/Checkout/Checkout";
import "./index.css"; // ✅ Tailwind & custom styles
import AllOrders from "./pages/AllOrders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BrandDetails from "./pages/BrandDetails/BrandDetails";
import ForgetPassword from "./pages/ForgotPassword/ForgotPassword";
import VerifyCode from "./pages/VerifyCode/VerifyCode";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import SpecificCategory from "./Compontents/SpecificCategory/SpecificCategory";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggletheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout toggletheme={toggletheme} theme={theme} />,
      children: [
        {
          path: "/",
          element: (
            <ProtetedRoutes>
              <Home />
            </ProtetedRoutes>
          ),
        },
        {
          path: "/products",
          element: (
            <ProtetedRoutes>
              <Products />
            </ProtetedRoutes>
          ),
        },
        {
          path: "/productDetails/:id",
          element: (
            <ProtetedRoutes>
              <ProductDetails />
            </ProtetedRoutes>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtetedRoutes>
              <Categories />
              <SubCategories />
            </ProtetedRoutes>
          ),
        },
        {
          path: "/categories/:id",
          element: (
            <ProtetedRoutes>
              <SpecificCategory />
              <SubCategories />
            </ProtetedRoutes>
          ),
        },
        {
          path: "/brands",
          element: (
            <ProtetedRoutes>
              <Brands />
            </ProtetedRoutes>
          ),
        },
        // 👇 CORRECTED: This is the new, correct route for BrandDetails
        {
          path: "/brands/:id", // Use dynamic parameter :id for brand details
          element: (
            <ProtetedRoutes>
              <BrandDetails />
            </ProtetedRoutes>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtetedRoutes>
              <Cart />
            </ProtetedRoutes>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtetedRoutes>
              <WishList />
            </ProtetedRoutes>
          ),
        },
        {
          path: "/login",
          element: (
            <LoginProtected>
              <Login />
            </LoginProtected>
          ),
        },
        {
          path: "/checkout",
          element: (
            <ProtetedRoutes>
              <Checkout />
            </ProtetedRoutes>
          ),
        },

        {
          path: "/allorders",
          element: (
            <ProtetedRoutes>
              <AllOrders />
            </ProtetedRoutes>
          ),
        },
        {
          path: "/forgot-password",
          element: (
            <LoginProtected>
              <ForgetPassword />
            </LoginProtected>
          ),
        },
        {
          path: "/verify-code",
          element: (
            <LoginProtected>
              <VerifyCode />
            </LoginProtected>
          ),
        },
        {
          path: "/reset-password",
          element: (
            <LoginProtected>
              <ResetPassword />
            </LoginProtected>
          ),
        },
        {
          path: "/register",
          element: (
            <LoginProtected>
              <Register />
            </LoginProtected>
          ),
        },
      ],
    },
  ]);

  let client = new QueryClient();

  return (
    <>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <CartContextProvider>
            <WishListContextProvider>
              <RouterProvider router={routes} />
              <Toaster position="top-right" />
            </WishListContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
