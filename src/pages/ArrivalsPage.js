import React from "react";
import Arrivals from "../components/Arrivals";
import Navbar from "../components/navbar";
function ArrivalsPage()
{
    return(
    <>
    <Navbar />
  <section className="arrivals" id="arrivals">
            <div className="heading"><span>new arrivals</span></div>
            <Arrivals />
           </section>
           </>
    )
}
export default ArrivalsPage;