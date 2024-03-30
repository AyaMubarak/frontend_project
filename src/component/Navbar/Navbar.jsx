import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import Logo from "../../assets/images/bag_11911980.png";
import cartIcon from "../../assets/images/shopping-cart (1).png";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import style from "./navbar.module.css";
import signIcon from "../../assets/images/icons8-add-user-male-48.png";

function Navbar() {
  const { userData, setUserToken, setUserName } = useContext(UserContext);
  const [productsCount, setProductsCount] = useState(0);
  const [userImage, setUserImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (token) {
          const response = await axios.get(
            "https://ecommerce-node4-five.vercel.app/cart",
            {
              headers: {
                Authorization: `Tariq__${token}`,
              },
            }
          );
          setProductsCount(response.data.products.length);
        } else {
          setProductsCount(0);
        }
      } catch (error) {
        console.error("Error fetching product count:", error);
      }
    };

    const fetchUserImage = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (token) {
          const response = await axios.get(
            "https://ecommerce-node4-five.vercel.app/user/profile",
            {
              headers: {
                Authorization: `Tariq__${token}`,
              },
            }
          );
          setUserImage(response.data.user.image.secure_url);
        } else {
          setUserImage(null);
        }
      } catch (error) {
        console.error("Error fetching user image:", error);
        setUserImage(null);
      }
    };

    fetchProductCount();
    fetchUserImage();
  }, []);

  const handleLogout = () => {
    setUserToken(null);
    alert("You have been logged out.");
    setUserName(null);
    setUserImage(null); // Set user image to null
    localStorage.removeItem("userToken");
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="logo" width={60} height={60} />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                to="/categories"
              >
                Categories
              </NavLink>
              <ul className="dropdown-menu">
             
              </ul>
            </li>
          </ul>
        </div>

        <div className="navbar-nav ml-auto mr-2">
        
          {userImage ? (
            <div className="nav-item dropdown">
              <img
                src={userImage}
                alt="User"
                className="user-icon dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                width={30}
              />
              <ul className="dropdown-menu">
                <li>
                  <p className="dropdown-item">{userData.userName}</p>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/profile">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/orderDe"
                  >
                    Order Details
                  </NavLink>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="nav-item">
              <Link to="/signin">
                <img
                  src={signIcon}
                  alt="Sign In"
                  width={40}
                  height={50}
                />
              </Link>
            </div>
          )}

         
          {userImage && (
            <div className="nav-item cartBadge">
              <Link to="/cart">
                <span
                  className={`${style.badge} rounded-pill badge-notification bg-danger`}
                >
                  {productsCount}
                </span>
                <img
                  src={cartIcon}
                  className={style.cart}
                  alt="Cart"
                  width={30}
                  height={25}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
