import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./ReviewSection.css";

const ReviewsSection = () => {
  const reviews = [
    { id: 1, name: "John Doe", text: "Amazing bookstore, fast delivery!", image: `${process.env.PUBLIC_URL}/image/p5.png` },
    { id: 2, name: "Jane Smith", text: "Great collection of books!", image: `${process.env.PUBLIC_URL}/image/p6.png` },
    { id: 3, name: "Alex Lee", text: "Customer support is top-notch.", image: `${process.env.PUBLIC_URL}/image/p6.png` },
  ];

  return (
    <>
      

      <Swiper
        slidesPerView={1}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        modules={[Autoplay]}
         className="reviews-slider"
      >
        {reviews.map(review => (
          <SwiperSlide key={`review-${review.id}`}>
            <div className="swiper-slide box">
              <img src={review.image} alt={review.name} className="review-img" />
              <p>{review.text}</p>
              <h3>- {review.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
  </>
  );
};

export default ReviewsSection;
