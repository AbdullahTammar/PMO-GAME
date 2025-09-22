// src/pages/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function HomePage() {
  const navigate = useNavigate();

  const handleImageClick = (e) => {
    const imageHeight = e.currentTarget.clientHeight;
    const clickY = e.nativeEvent.offsetY;

    // ✅ إذا ضغط المستخدم في آخر 120px من الصورة يبدأ الجولة
    if (clickY > imageHeight - 120) {
      navigate("/game");
    }
  };

  return (
    <div className="home-page" dir="rtl">
      <img
        src="/assets/home-banner.png"
        alt="من أنا؟"
        className="full-home-image"
        onClick={handleImageClick}
        loading="eager"
      />
    </div>
  );
}

export default HomePage;
