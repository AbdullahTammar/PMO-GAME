import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import { GameContext } from "../context/GameContext";
import "../App.css";

const QUESTIONS_COUNT = 7; // حدّثه إذا زاد/نقص عدد الأسئلة

function HomePage() {
  const navigate = useNavigate();
  const { setCurrentIndex } = useContext(GameContext);

  const handleImageClick = (e) => {
    const imageHeight = e.currentTarget.clientHeight;
    const clickY = e.nativeEvent.offsetY;

    // آخر 120px من الصورة يبدأ الجولة
    if (clickY > imageHeight - 120) {
      flushSync(() => {
        setCurrentIndex((prev) => (prev + 1) % QUESTIONS_COUNT);
      });
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
