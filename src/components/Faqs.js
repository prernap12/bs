import React, { useState } from "react";
import "./Faqs.css";

const FAQSection = () => {
  const faqsection = [
    {
      id: 1,
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of purchase, provided the book is in its original condition and accompanied by the receipt. Refunds will be issued in the original form of payment. Certain items like clearance or special orders may not be eligible."
    },
    {
      id: 2,
      question: "Do you offer book club memberships?",
      answer:
        "Yes! We offer book club memberships that include discounts, early access to events, and monthly newsletters."
    },
    {
      id: 3,
      question: "Can I order books online?",
      answer:
        "Absolutely! You can browse our collection online, place orders, and even opt for home delivery or in-store pickup."
    }
  ];

  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">Our Frequently Asked Questions</h2>

      {faqsection.map((item) => (
        <div className="faq-item" key={item.id}>
          <div
            className="faq-question"
            onClick={() => toggleFAQ(item.id)}
          >
            <span>{item.question}</span>
            <span className="faq-icon">
              {openId === item.id ? "−" : "+"}
            </span>
          </div>
          {openId === item.id && (
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default FAQSection;
