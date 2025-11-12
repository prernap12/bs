import React from "react";
import { FaPlane, FaLock, FaHeadset } from "react-icons/fa"; // font-awesome icons

const IconsSection = () => {
  const iconsData = [
    {
      id: 1,
      icon: <FaPlane />,
      title: "Fast Delivery",
      text: "Get your books delivered quickly to your doorstep."
    },
    {
      id: 2,
      icon: <FaLock />,
      title: "Secure Payment",
      text: "All payments are safe and encrypted."
    },
    {
      id: 3,
      icon: <FaHeadset />,
      title: "24/7 Support",
      text: "We are always here to help you."
    }
  ];

  return (
    <>
      {iconsData.map((item) => (
        <div className="icons" key={item.id}>
          <i className="icon">{item.icon}</i>
          <div className="content">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default IconsSection;
