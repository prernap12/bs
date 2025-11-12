import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Sample data
const bookList = [
  { id: 1, img: "image/book1.jpg" },
  { id: 2, img: "image/book2.jpg" },
  { id: 3, img: "image/book3.jpg" },
  { id: 4, img: "image/book4.jpg" },
  { id: 5, img: "image/book5.jpg" },
];

const HomeBanner = ({ swiperOptionOne }) => {
  return (
    <div className="row">
      {/* Left side content */}
      <div className="content">
        <h1>SEAL THE DEAL 20% OFF</h1>
        <p>Get 20% off on any book till June !!!</p>
        <a href="#" className="btn">
          Shop Now
        </a>
      </div>

      {/* Right side Swiper */}
      <div className="swiper">
        <Swiper
          watchSlidesProgress={true}
          slidesPerView={3}
          autoplay={{
            delay: 9500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="book-list"
          {...swiperOptionOne}
        >
          {bookList.map((book) => (
            <SwiperSlide key={book.id}>
              <a href="#">
                <img src={book.img} alt={`Book ${book.id}`} />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        <img className="stand" src="image/stand.jpg" alt="stand" />
      </div>
    </div>
  );
};

export default HomeBanner;
