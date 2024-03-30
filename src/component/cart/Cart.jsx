import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTypography,
  MDBListGroup,
  MDBBtn,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import trash from "../../assets/images/icons8-trash-26.png";
import empty from "../../assets/images/empty.png";
import mun from "../../assets/images/icons8-minus-24.png";
import plus from "../../assets/images/icons8-plus-24.png";
import { toast } from "react-toastify";
import style from "./cart.module.css";
import OrderPage from "./OrderPage";

export default function CartPage() {
  const [products, setProducts] = useState([]);
  const [showOrderPage, setShowOrderPage] = useState(false);
  const [formData] = useState({
    couponName: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("userToken");
      try {
        const response = await axios.get(
          "https://ecommerce-node4-five.vercel.app/cart",
          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }
        );
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const storedCartData = JSON.parse(localStorage.getItem("cartData"));
    if (storedCartData && storedCartData.length > 0) {
      setProducts(storedCartData);
    } else {
      fetchData();
    }
  }, []);

  const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  };

  const removeItem = async (productId) => {
    const token = localStorage.getItem("userToken");
    try {
      await axios.patch(
        "https://ecommerce-node4-five.vercel.app/cart/removeItem",
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );

      const updatedProducts = products.filter(
        (product) => product.details.id !== productId
      );

      setProducts(updatedProducts);
      saveCartToLocalStorage(updatedProducts);

      toast.success("Product removed from cart successfully");
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Error removing product from cart");
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("userToken");
    try {
      await axios.patch(
        `https://ecommerce-node4-five.vercel.app/cart/clear`,
        {},
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      setProducts([]);
      localStorage.removeItem("cartData");

      toast.success("All products removed from cart successfully");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Error clearing cart");
    }
  };

  const decreaseQty = async (productId) => {
    const token = localStorage.getItem("userToken");
    try {
      await axios.patch(
        `https://ecommerce-node4-five.vercel.app/cart/decraseQuantity`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      const updatedProducts = products.map((product) => {
        if (product.details.id === productId) {
          const newQuantity = Math.max(1, parseInt(product.quantity) - 1);
          return { ...product, quantity: newQuantity };
        }
        return product;
      });

      setProducts(updatedProducts);
      saveCartToLocalStorage(updatedProducts);

      toast.success("Quantity decreased successfully");
    } catch (error) {
      console.error("Error decreasing quantity:", error);
      toast.error("Error decreasing quantity");
    }
  };

  const increaseQty = async (productId) => {
    const token = localStorage.getItem("userToken");
    try {
      await axios.patch(
        `https://ecommerce-node4-five.vercel.app/cart/incraseQuantity`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      const updatedProducts = products.map((product) => {
        if (product.details.id === productId) {
          const newQuantity = parseInt(product.quantity) + 1;
          return { ...product, quantity: newQuantity };
        }
        return product;
      });

      setProducts(updatedProducts);
      saveCartToLocalStorage(updatedProducts);

      toast.success("Quantity increased successfully");
    } catch (error) {
      console.error("Error increasing quantity:", error);
      toast.error("Error increasing quantity");
    }
  };

  const TotalAmount = () => {
    return products.reduce((total, product) => {
      return total + product.details.finalPrice * product.quantity;
    }, 0);
  };

  const totalAmount = TotalAmount();

  const handleOrderClick = () => {
    if (products.length > 0) {
      setShowOrderPage(true);
    } else {
      console.log("Cannot place order. Cart is empty.");
    }
  };

  return (
    <section className="h-100 gradient-custom">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center my-4">
          <MDBCol md="8">
            {showOrderPage ? (
              <OrderPage
                couponName={formData.couponName}
                address={formData.address}
                phone={formData.phone}
              />
            ) : (
              <MDBCard className="mb-4">
                <MDBCardHeader className="py-3">
                  <MDBTypography tag="h5" className="mb-0">
                    Cart - {products.length} items
                    <button className={style.button} onClick={clearCart}>
                      <img src={empty} alt="" width={50} />
                    </button>
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                  {products.map((product, index) => (
                    <div key={index} className="mb-4">
                      <MDBRow>
                        <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                          <MDBCardImage
                            src={product.details.mainImage.secure_url || ""}
                            alt={product.title}
                            className="w-100"
                          />
                        </MDBCol>

                        <MDBCol lg="5" md="6" className="mb-4 mb-lg-0">
                          <p>
                            <strong>{product.details.name}</strong>
                          </p>

                          <button
                            onClick={() => removeItem(product.details.id)}
                            className={style.btn}
                          >
                            <img src={trash} alt="" />
                          </button>
                        </MDBCol>

                        <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                          <div
                            className="d-flex mb-4"
                            style={{ maxWidth: "300px" }}
                          >
                            <button
                              className={style.btn}
                              onClick={() => decreaseQty(product.details.id)}
                            >
                              <img src={mun} alt="" />
                            </button>

                            <MDBInput
                              value={product.quantity}
                              type="number"
                              label="Quantity"
                              onChange={(e) => {
                                const newQuantity = Math.max(
                                  1,
                                  parseInt(e.target.value)
                                );
                                const updatedProducts = [...products];
                                updatedProducts[index].quantity = newQuantity;
                                setProducts(updatedProducts);
                                saveCartToLocalStorage(updatedProducts);
                              }}
                            />

                            <button
                              className={style.btn}
                              onClick={() => increaseQty(product.details.id)}
                            >
                              <img src={plus} alt="" />
                            </button>
                          </div>

                          <p className="text-start text-md-center">
                            <strong>
                              ${product.details.finalPrice * product.quantity}
                            </strong>
                          </p>
                        </MDBCol>
                      </MDBRow>

                      <hr className="my-4" />
                    </div>
                  ))}
                </MDBCardBody>

                <MDBCardBody>
                  <MDBListGroup>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>$ {totalAmount.toFixed(2)}</strong>
                      </span>
                    </MDBListGroupItem>
                  </MDBListGroup>

                  <MDBBtn block size="lg" onClick={handleOrderClick}>
                    Order
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
