import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./product.module.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(""); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "https://ecommerce-node4-five.vercel.app/products?page=1&limit=10";
        if (sortBy) {
          url += `&sort=${sortBy}`;
        }
        const response = await axios.get(url);
        setProducts(response.data.products || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [sortBy]); 

  const addToCart = async (productId) => {
    const token = localStorage.getItem("userToken");
    try {
      const { data } = await axios.post(
        `https://ecommerce-node4-five.vercel.app/cart`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      toast.success("Product added to cart successfully");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="mb-3">
        <label htmlFor="sortBy" className="form-label">
          Sort By:
        </label>
        <select
          id="sortBy"
          className="form-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="name">Name: A-Z</option>
          <option value="price">Price: Low to High</option>
        </select>
      </div>
      {loading ? (
        <div className={style.loader} />
      ) : (
        <MDBRow className="row-cols-1 row-cols-md-2 g-4">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <MDBCol key={product._id}>
                <MDBCard style={{ width: "100%" }}>
                  {product.mainImage && product.mainImage.secure_url ? (
                    <Link to={`/products/${product._id}`}>
                      <MDBCardImage
                        src={product.mainImage.secure_url}
                        alt={product.name}
                        position="top"
                        style={{ height: "200px", objectFit: "contain" }}
                      />
                    </Link>
                  ) : (
                    {}
                  )}
                  <MDBCardBody>
                    <MDBCardTitle>{product.name}</MDBCardTitle>
                    <MDBCardText>{product.price}$</MDBCardText>
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(product._id)}
                    >
                      Add to Cart
                    </button>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </MDBRow>
      )}
    </>
  );
}

export default Product;
