import { useState, useEffect } from "react";
import axios from "axios";
import style from "./product.module.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductsDe() {
  const { productId } = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [review, setReview] = useState({ comment: "", rating: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://ecommerce-node4.vercel.app/products/${productId}`
        );
        setProduct(response.data.product || {});
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? product.subImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === product.subImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.post(
        `https://ecommerce-node4.vercel.app/cart`,
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

  const addReview = async (productId, comment, rating) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        `https://ecommerce-node4.vercel.app/products/${productId}/review`,
        { comment, rating },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      toast.success("Review added successfully");
      setProduct(response.data.product || {});
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review",error);
    }
  };

  return (
    <>
      {loading ? (
        <div className={style.loader} />
      ) : (
        <div className={`container ${style.productContainer}`}>
          <div
            id="carouselExampleDark"
            className={`carousel ${style.carousel}`}
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {product.subImages &&
                product.subImages.map((image, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${
                      index === activeIndex ? "active" : ""
                    }`}
                  >
                    <img
                      src={image.secure_url}
                      className={`d-block w-100 ${style.carouselImage}`}
                      alt={`Slide ${index}`}
                      width="100%"
                    />
                  </div>
                ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              onClick={handlePrev}
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              onClick={handleNext}
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className={`card w-75 mb-3 ${style.productDescription}`}>
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
            </div>
          </div>
          <div className="card mb-3" style={{ width: "18rem" }}>
            <div className="card-body">
              <h4 className="card-title">Product Info</h4>
              <p className="card-text">Price: {product.price}$</p>
              <p className="card-text">Discount: {product.discount}%</p>
              <h5 className="card-text">Final Price: {product.finalPrice}$</h5>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => addToCart(product._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h5 className="mb-4">Reviews</h5>
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <div key={index} className="card mb-3">
                    <div className="card-body">
                      <p className="card-text">{review.comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews yet</p>
              )}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your comment"
                  value={review.comment}
                  onChange={(e) =>
                    setReview({ ...review, comment: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Your rating (1-5)"
                  value={review.rating}
                  min={1}
                  max={5}
                  onChange={(e) =>
                    setReview({ ...review, rating: parseInt(e.target.value) })
                  }
                />
              </div>
              <button
                onClick={() => addReview(product._id, review.comment, review.rating)}
                className="btn btn-primary"
              >
                Add a Review
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsDe;
