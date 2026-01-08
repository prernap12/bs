import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaSearch, FaHeart, FaEye } from "react-icons/fa";
import app from "./axios.js";
import "./FeaturedBooks.css";
import "swiper/swiper-bundle.css";

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]); 

  // ✅ Fetch Books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await app.get("/api/books");
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, []);

  // ✅ Add to Cart Handler
  const handleAddToCart = async (book) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first!");
        return;
      }

      const res = await app.post(
        "/api/addtocart/add",
        { bookId: book._id, qty: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(res.data.items); // update state
      alert(`${book.name} added to cart!`);
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add to cart.");
    }
  };

  return (
    <div>
      <div className="heading">
        <span>featured books</span>
      </div>

      <div className="swiper">
        <Swiper
          slidesPerView={3}
          slidesPerGroup={3}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="featured-slider"
        >
          {books.map((book) => (
            <SwiperSlide key={book._id}>
              <div className="box">
                <div className="icons">
                  <a href="#"><FaSearch /></a>
                  <a href="#"><FaHeart /></a>
                  <a href="#"><FaEye /></a>
                </div>

                <div className="image">
                  <img
                    src={book.image}
                    alt={book.name}
                  />
                </div>

                <div className="content">
                  <h3>{book.name}</h3>
                  <div className="price">
                    Rs.{book.price - (book.price * book.discount) / 100}
                    <span>Rs.{book.price}</span>
                  </div>
                  <button
                    className="btn"
                    onClick={() => handleAddToCart(book)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedBooks; 