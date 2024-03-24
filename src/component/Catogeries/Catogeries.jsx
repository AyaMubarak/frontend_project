import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import axios from "axios";
import { NavLink } from "react-router-dom";

function Catogeries() {
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce-node4.vercel.app/categories/active?page=1&limit=10"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Swiper spaceBetween={130} slidesPerView={5}>
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <NavLink to={category.name}>
              <img src={category.image.secure_url} alt={category.name} />
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Catogeries;
