import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const wishListContext = createContext(null);

export default function WishListContextProvider({ children }) {
  const [wishList, setWishList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  function isInWishList(productId) {
    return wishList?.data?.some((item) => item._id === productId);
  }

  // const getLoggedUserWishList = useCallback(async () => {
  //   setIsLoading(true);
  //   const userToken = localStorage.getItem("userToken");

  //   if (!userToken) {
  //     setIsLoading(false);
  //     console.warn("No user token found");
  //     return;
  //   }

  //   try {
  //     const { data } = await axios.get(
  //       "https://ecommerce.routemisr.com/api/v1/wishlist",
  //       {
  //         headers: { token: userToken },
  //       }
  //     );

  //     if (data?.status === "success" && Array.isArray(data?.data?.products)) {
  //       setWishList(data);
  //       toast.success("Wishlist loaded successfully.");
  //       console.log(data);
  //     } else {
  //       setWishList({ data: { products: [] } }); // fallback
  //     }
  //   } catch (err) {
  //     console.error("Fetch Wishlist Error:", err);
  //     toast.error("Failed to load wishlist.");
  //     setWishList({ data: { products: [] } }); // fallback
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [toast]); // Include dependencies if you're using anything from outer scope

  async function getLoggedUserWishList() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      if (data.status === "success") {
        setWishList(data);
        // toast.success("item added to cart");
        // console.log("data", data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function addProductToWishList(productId) {
    setDisabled(true);
    try {
      await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      await getLoggedUserWishList(); // Refresh cart from server
      console.log("productId", productId);

      toast.success("Item added to Wishlist!");
    } catch (err) {
      console.log(err);
    } finally {
      setDisabled(false);
    }
  }

  async function removewishListItem(productId) {
    setDisabled(true);
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      await getLoggedUserWishList(); // Refresh cart from server
      toast.success("Item removed from Wishlist.");
    } catch (err) {
      console.log(err);
    } finally {
      setDisabled(false);
    }
  }

  useEffect(() => {
    getLoggedUserWishList();
  }, []);
  return (
    <wishListContext.Provider
      value={{
        wishList,
        addProductToWishList,
        getLoggedUserWishList,
        removewishListItem,
        isLoading,
        disabled,
        isInWishList,
      }}
    >
      {children}
    </wishListContext.Provider>
  );
}
