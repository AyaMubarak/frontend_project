import { Swiper, SwiperSlide } from "swiper/react";
import first from "../../assets/images/elegant-adult-woman-holding-shopping-bags-with-copy-space.jpg";
import second from "../../assets/images/online-fashion-shopping-collage.jpg";
import third from "../../assets/images/young-man-shopping-menswear-store-talking-phone.jpg";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={first} alt="" width="100%" height="60%" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={second} alt="" width="100%" height="60%" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={third} alt="" width="100%" height="60%" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
