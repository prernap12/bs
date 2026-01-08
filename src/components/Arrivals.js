// Arrivals.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaStar, FaStarHalf } from "react-icons/fa";
import axios from "axios";

// Import swiper styles
import "swiper/css";

const swiperOptionThree = {
  slidesPerView: 3,
  spaceBetween: 20,
  breakpoints: {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
};

const Arrivals = () => {
  return (
    <section className="arrivals" id="arrivals">
      <div className="heading">
    
      </div>

      <div className="swiper">
        <Swiper
          watchSlidesProgress={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="arrivals-slider"
          {...swiperOptionThree}
        >
          {[
            "book1.jpg",
            "book5.jpg",
            "book2.jpg",
            "book3.jpg",
            "book4.jpg",
          ].map((book, index) => (
            <SwiperSlide key={index}>
              <a href="#" className="box">
                <div className="image">
                  <img src={`image/${book}`} alt={`book ${index + 1}`} />
                </div>
                <div className="content">
                  <h3>new arrivals</h3>
                  <div className="price">
                    Rs 2980 <span> Rs 1999</span>
                  </div>
                  <div className="stars">
                    <i>
                      <FaStar />
                    </i>
                    <i>
                      <FaStar />
                    </i>
                    <i>
                      <FaStar />
                    </i>
                    <i>
                      <FaStar />
                    </i>
                    <i>
                      <FaStarHalf />
                    </i>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Arrivals;
