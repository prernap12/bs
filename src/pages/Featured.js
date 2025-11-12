import React from "react";
import FeaturedBooks from "../components/FeaturedBooks";
import Navbar from "../components/navbar";
import 'swiper/swiper-bundle.css';
import "../App.css";
function Featured()
{
    return(
    <>
    <Navbar />
  <section className="featured" id="featured">
                        <FeaturedBooks />
           </section>    </>)
}
export default Featured;