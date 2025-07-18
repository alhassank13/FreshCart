// src/Compontents/HeroSlider/HeroSlider.jsx
import React, { useEffect, useState } from "react";

export default function HeroSlider() {
  const heroSlides = [
    {
      image:
        "https://img.freepik.com/free-photo/high-angle-clothes-bed-fast-fashion-concept_23-2149726122.jpg?semt=ais_hybrid&w=740", // Example: Trendy streetwear
      title: "New Arrivals: Urban Edge Collection 🏙️",
      description:
        "Step up your street style with our freshest drops. Bold designs, unmatched comfort.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhpbmclMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D", // Example: Elegant evening wear
      title: "Comfort & Style: Everyday Essentials 👕",
      description:
        "Shop our versatile collection of comfortable and chic clothing for daily wear.",
    },
    {
      image:
        "https://d1pjg4o0tbonat.cloudfront.net/content/dam/midea-aem/gulf/kv3.jpg/jcr:content/renditions/cq5dam.web.5000.5000.jpeg", // Example: Casual everyday wear
      title: "Home Essentials",
      description:
        "Shop our new collection of home essentials for your daily needs. Clean, cozy, and stylish.",
    },
    {
      image:
        "https://static.vecteezy.com/system/resources/previews/002/538/616/non_2x/sale-discount-end-of-season-sign-free-vector.jpg", // Example: Seasonal sale
      title: "End of Season Sale! 🎉",
      description:
        "Grab incredible deals on your favorite styles before they're gone.",
    },
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const currentSlide = heroSlides[currentSlideIndex];

  return (
    <div className=" relative w-full h-80 md:h-96 bg-primary dark:bg-darkPrimary rounded-lg shadow-xl overflow-hidden flex items-center justify-center text-white text-center">
      <img
        src={currentSlide.image}
        alt={currentSlide.title} // Use title as alt text for accessibility
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
      />
      <div className="relative z-10 p-4 bg-gray-800 opacity-75 rounded-lg max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg mb-2 leading-tight">
          {currentSlide.title}
        </h1>
        <p className="text-base md:text-xl font-medium">
          {currentSlide.description}
        </p>
      </div>
      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {heroSlides.map((_, index) => (
          <span
            key={index}
            className={`block w-3 h-3 rounded-full cursor-pointer transition-colors duration-200 ${
              index === currentSlideIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentSlideIndex(index)}
            aria-label={`Go to slide ${index + 1}`} // Accessibility improvement
          ></span>
        ))}
      </div>
    </div>
  );
}
