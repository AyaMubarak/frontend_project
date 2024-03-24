import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import style from "../type.module.css";

function Laptops() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://ecommerce-node4.vercel.app/products/category/656b5d1c7ef25cbb5771638a",
          {
            headers: {
              Authorization: `Tariq_${token}`,
            },
          }
        );
        setProducts(response.data.products || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className={style.loader} />
      ) : (
        <MDBRow className="row-cols-1 row-cols-md-2 g-4">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <MDBCol key={product._id}>
                <MDBCard style={{ width: "100%" }}>
                  {product.mainImage && product.mainImage.secure_url ? (
                    <MDBCardImage
                      src={product.mainImage.secure_url}
                      alt={product.name}
                      position="top"
                      style={{ height: "200px", objectFit: "contain" }}
                    />
                  ) : (
                    {}
                  )}
                  <MDBCardBody>
                    <MDBCardTitle>{product.name}</MDBCardTitle>
                    <MDBCardText>{product.price}$</MDBCardText>
                    <Link
                      to={`/products/${product._id}`}
                      className="text-decoration-none"
                    >
                      <button className="btn btn-primary">View Details</button>
                    </Link>
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

export default Laptops;
