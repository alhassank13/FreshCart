import { Moon, Menu, Sun, X, ShoppingCart, Heart, User } from "lucide-react"; // Import User icon
import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import FreshCart from "../../assets/images/freshcart-logo.svg";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext/CartContext";
import { wishListContext } from "../../Context/WishlistContext/WishlistContext";
// AllOrders import not directly used in Navbar, can be removed if not needed for direct component render.
// import AllOrders from "./../../pages/AllOrders";

export default function Navbar({ toggletheme, theme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // For desktop user dropdown

  const { token, setToken, user, setUser } = useContext(authContext); // user object contains decoded user data (e.g., user.name)

  const { cart } = useContext(cartContext);
  const { wishList } = useContext(wishListContext);

  // Initialize counters directly from context, then update via useEffect
  const [cartCounter, setCartCounter] = useState(cart?.numOfCartItems || 0);
  const [wishlistCounter, setWishlistCounter] = useState(wishList?.count || 0);

  // Update cart counter when cart context changes
  useEffect(() => {
    setCartCounter(cart?.numOfCartItems || 0);
  }, [cart]);

  // Update wishlist counter when wishlist context changes
  useEffect(() => {
    setWishlistCounter(wishList?.count || 0);
  }, [wishList]);

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    setUser(null);
    setToken(null);
    setIsMenuOpen(false); // Close mobile menu on logout
  };

  // Get first name for display, safely handle if user is null
  const firstName = user?.name?.split(" ")[0] || "User";

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md text-gray-800 dark:text-gray-100 transition-colors duration-300 relative z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1 className="font-primary text-2xl md:text-3xl font-bold">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img src={FreshCart} alt="FreshCart Logo" className="h-10" />
          </Link>
        </h1>

        {/* Desktop Navigation Links */}
        {token && (
          <ul className="hidden lg:flex space-x-6 items-center text-lg">
            <li className="relative afterEffect">
              <Link to="/">Home</Link>
            </li>
            <li className="relative afterEffect">
              <Link to="/products">Products</Link>
            </li>
            <li className="relative afterEffect">
              <Link to="/categories">Categories</Link>
            </li>
            <li className="relative afterEffect">
              <Link to="/brands">Brands</Link>
            </li>
            {/* <li className="relative afterEffect">
              <Link to="/allorders">Orders</Link>
            </li> */}
          </ul>
        )}

        {/* Desktop Auth & Icons */}
        <ul className="hidden lg:flex space-x-6 items-center text-lg">
          {token ? (
            <>
              {/* User Dropdown */}
              <li
                className="relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <div className="text-base font-medium text-primary cursor-pointer px-2 py-1 flex items-center gap-1">
                  <User className="size-5" /> Ahlan, {firstName}
                </div>

                <div
                  className={`absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 shadow-lg rounded-md overflow-hidden transition-all duration-200 ease-out transform ${
                    showDropdown
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                  }`}
                >
                  <ul className="py-1">
                    {/* <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-primary transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        Profile
                      </Link>
                    </li> */}
                    <li>
                      <Link
                        to="/allorders"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-primary transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        My Orders
                      </Link>
                    </li>
                    {/* <li>
                      <Link
                        to="/forgot-password"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-primary transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        Reset Password
                      </Link>
                    </li> */}
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Wishlist */}
              <li>
                <Link to="/wishlist" className="relative hover:text-primary">
                  <Heart className="size-6 w-6" />
                  {wishlistCounter > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold p-[2px]">
                      {wishlistCounter}
                    </span>
                  )}
                </Link>
              </li>

              {/* Cart */}
              <li>
                <Link to="/cart" className="relative hover:text-primary">
                  <ShoppingCart className="size-6 w-6" />
                  {cartCounter > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold p-[2px]">
                      {cartCounter}
                    </span>
                  )}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="relative afterEffect">
                <Link to="/login">Login</Link>
              </li>
              <li className="relative afterEffect">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}

          {/* Theme Toggle */}
          <li>
            <button
              className="btn focus:outline-none"
              onClick={toggletheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Sun className="size-5" />
              ) : (
                <Moon className="size-5" />
              )}
            </button>
          </li>
        </ul>

        {/* Mobile Header Controls & Profile/Cart Icons */}
        <div className="lg:hidden flex items-center space-x-3">
          {token && (
            <>
              {/* User Icon/Name for Mobile */}
              <Link
                // to="/profile"
                className="flex items-center gap-1 text-primary font-medium text-base"
              >
                <User className="size-6" /> {firstName}
              </Link>

              {/* Wishlist (Mobile) */}
              <Link to="/wishlist" className="relative">
                <Heart className="size-6 w-6" />
                {wishlistCounter > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold p-[2px]">
                    {wishlistCounter}
                  </span>
                )}
              </Link>

              {/* Cart (Mobile) */}
              <Link to="/cart" className="relative">
                <ShoppingCart className="size-6 w-6" />
                {cartCounter > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold p-[2px]">
                    {cartCounter}
                  </span>
                )}
              </Link>
            </>
          )}

          {/* Mobile Theme Toggle */}
          <button
            className="btn focus:outline-none"
            onClick={toggletheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </button>

          {/* Mobile Menu Toggle (Hamburger/X icon) */}
          <button
            onClick={toggleMenu}
            className="focus:outline-none p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="size-8 text-gray-700 dark:text-gray-200" />
            ) : (
              <Menu className="size-8 text-gray-700 dark:text-gray-200" />
            )}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg py-6 z-40 transform transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "scale-y-100 opacity-100 visible"
              : "scale-y-0 opacity-0 invisible"
          } origin-top`}
        >
          <ul className="flex flex-col items-center space-y-5 text-xl font-medium">
            {token && (
              <>
                <li>
                  <Link
                    to="/"
                    onClick={toggleMenu}
                    className="afterEffect-mobile"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    onClick={toggleMenu}
                    className="afterEffect-mobile"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    onClick={toggleMenu}
                    className="afterEffect-mobile"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/brands"
                    onClick={toggleMenu}
                    className="afterEffect-mobile"
                  >
                    Brands
                  </Link>
                </li>
                <li>
                  <Link
                    to="/allorders"
                    onClick={toggleMenu}
                    className="afterEffect-mobile"
                  >
                    My Orders
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/profile"
                    onClick={toggleMenu}
                    className="afterEffect-mobile"
                  >
                    Profile
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    to="/forgot-password"
                    onClick={toggleMenu}
                    className="afterEffect-mobile"
                  >
                    Reset Password
                  </Link>
                </li> */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="afterEffect-mobile text-red-500 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {!token && (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={toggleMenu}
                    className="afterEffect-mobile"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    onClick={toggleMenu}
                    className="afterEffect-mobile"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
