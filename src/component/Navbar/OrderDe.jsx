import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderDe() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get("https://ecommerce-node4-five.vercel.app/order", {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      const filteredOrders = response.data.orders.filter(order => order.finalPrice !== 0 && order.status !== "cancelled");
      setUserData(filteredOrders);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleCancel = async (orderId) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.patch(`https://ecommerce-node4-five.vercel.app/order/cancel/${orderId}`, {}, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      console.log("Order cancelled successfully");
      fetchUserData();
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  return (
    <section >
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          {userData.map(order => (
            <div key={order._id} className="col-md-10 col-lg-8 col-xl-6">
              <div className="card card-stepper" style={{ borderRadius: 16 }}>
                <div className="card-body p-4">
                  <h4>Order Id: {order._id}</h4>
                  <div className="d-flex ">
                    <div>
                      <p>Status: {order.status}</p>
                      <p>Address: {order.address}</p>
                    </div>
                    <div>
                      <p>Phone: {order.phoneNumber}</p>
                      <p>Final Price: ${order.finalPrice}</p>
                    </div>
                  </div>
                  <hr />
                  {order.products.map(product => (
                    <div key={product._id} className="d-flex flex-row mb-4 pb-2">
                      <div className="flex-fill">
                        <h5 className="bold">{product.productId.name}</h5>
                        <p>{product.productId.price}$</p>
                      </div>
                      <div>
                        <img className="align-self-center img-fluid" src={product.productId.mainImage.secure_url} width={100} alt={product.productId.name} />
                      </div>
                    </div>
                  ))}
                  {order.status === "pending" && (
                    <button onClick={() => handleCancel(order._id)} className="btn btn-danger">Cancel Order</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OrderDe;
