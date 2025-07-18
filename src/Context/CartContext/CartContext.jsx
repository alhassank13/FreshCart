import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let cartContext = createContext(null);

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  async function getLoggedUserCart() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      if (data.status === "success") {
        setCart(data);
        // toast.success("item added to cart");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function addProductToCart(productId) {
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      await getLoggedUserCart(); // Refresh cart from server
      toast.success("item added to cart");
    } catch (err) {
      console.log(err);
    }
  }

  async function removeCartItem(cartItemId) {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      await getLoggedUserCart(); // Refresh cart from server
      toast.success("item removed from cart");
    } catch (err) {
      console.log(err);
    }
  }

  async function clearCart() {
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      });
      await getLoggedUserCart(); // Refresh cart from server
      toast.success("cart cleared");
    } catch (err) {
      console.log(err);
    }
  }

  async function updateCartItem(count, cartItemId) {
    setDisabled(true);
    try {
      await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,
        {
          count,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      await getLoggedUserCart(); // Refresh cart from server
      toast.success("item count updated");
    } catch (err) {
      console.log(err);
    } finally {
      setDisabled(false);
    }
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);
  return (
    <cartContext.Provider
      value={{
        cart,
        addProductToCart,
        getLoggedUserCart,
        removeCartItem,
        isLoading,
        clearCart,
        updateCartItem,
        disabled,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
