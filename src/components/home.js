import React from "react";
//import Navbar from './navbar';
import { FaPlane, FaLock, FaSearch,FaHeart,FaEye,FaStar,FaStarHalf} from "react-icons/fa";
import {FaHeadset} from "react-icons/fa";
import { Swiper,SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';
import ReviewsSection from "./ReviewsSection";
import IconsSection from "./IconsSection";
import { Autoplay } from "swiper/modules";
import Arrivals from "./Arrivals";
import DealSection from "./DealSection";
import FeaturedBooks from "./FeaturedBooks";
import HomeBanner from "./HomeBanner";
import FAQSection from "./Faqs";
import Nepali from "./NepaliBooks";

const Home = () => {
    const swiperOptionOne ={
        breakpoints:{
            0:{
                slidesPerView:1,

            },
            768:{
                slidesPerView:2.
            },
            1024:{
                slidesPerView:3,
            }
        },
        loop:true,
    };
    const swiperOptionTwo = {
          breakpoints:{
            0:{
                slidesPerView:1,
                spaceBetween:10,

            },
            450:{
            slidesPerView:2,
            spaceBetween:10,
            },
            768:{
                slidsPerView:3,
                spaceBetween:10,
            },
            1024:{
                slidesPerView:3,
            },
        },
        loop:true,
        centeredSlides:true,
        spaceBetween:10,
    };
    const swiperOptionThree={
            breakpoints:{
            0:{
                slidesPerView:1,
                spaceBetween:10,

            },
            450:{
            slidesPerView:2,
            spaceBetween:10,
            },
            768:{
                slidsPerView:3,
                spaceBetween:10,
            },
            1024:{
                slidesPerView:3,
            },
        },
        loop:true,
        centeredSlides:true,
        spaceBetween:10,
    };
    return (
        <div className="home-container">
          
           <section className="home" id="home">
          <HomeBanner />
           </section>

         <section className="icons-container">
                        <IconsSection />
           </section> 

           <section className="featured" id="featured">
                        <FeaturedBooks />
           </section>

           <section className="newsletter">
            <form action="">
                <h3>subscribe for the latest update</h3>
                <input type="email" placeholder="enter your email" className="box"/>
                <input type="submit" placeholder="subscribe" className="btn"/>
            </form>
           </section>

           <section className="arrivals" id="arrivals">
            <div className="heading"><span>new arrivals</span></div>
            <Arrivals />
           </section>
           
           <section className="deal">
            <div className="content">
                <DealSection />
            </div>
           </section>
           
           
                        <FAQSection />
           
           <section className="reviews" id="reviews">
            <h1 className="heading"><span>Client's reviews</span></h1>
            <div className="swiper">
                <ReviewsSection />
            </div>
           </section>
         </div>
    )
}
export default Home;