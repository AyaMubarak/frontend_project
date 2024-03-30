import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Navbar/UserContext";

function OrderPage({ onOrderPlacement }) {
  const { userData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    couponName: "",
    address: "",
    phone: "",
  });

  const [orderId, setOrderId] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderCancelled, setOrderCancelled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");
    try {
      const response = await axios.post(
        "https://ecommerce-node4-five.vercel.app/order",
        formData,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      console.log("Order placed successfully");
      setOrderPlaced(true);

      if (onOrderPlacement) {
        onOrderPlacement();
      }
      setOrderId(response.data.order._id);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const handleCancel = async () => {
    const token = localStorage.getItem("userToken");

    try {
      await axios.patch(
        `https://ecommerce-node4-five.vercel.app/order/cancel/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      console.log("Order cancelled successfully");
      setOrderCancelled(true);
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  if (orderCancelled) {
    return (
      <div>
        <h2>Order Cancelled Successfully!</h2>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div>
        <h2>Order Placed Successfully!</h2>
        <button onClick={handleCancel}>Cancel Order</button>
      </div>
    );
  }

  return (
    <section className="order-form m-4">
      <div className="container pt-4">
        <div className="row">
          <div className="col-12 px-4">
            <h1>Order Form</h1>
            <hr className="mt-1" />
          </div>

          <div className="col-12">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="couponName" className="form-label">
                  Coupon Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="couponName"
                  name="couponName"
                  value={formData.couponName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderPage;
