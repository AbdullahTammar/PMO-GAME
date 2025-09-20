// src/pages/HomePage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function HomePage() {
  const navigate = useNavigate();

  // ✅ تحريك الكشاف مع الماوس
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.body.style.setProperty("--x", `${e.clientX}px`);
      document.body.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="home-page" dir="rtl">
      <div className="home-content">
        <h1>✨ لعبة من أنا؟ ✨</h1>
        <p>جاوب بسرعة على التلميحات وحاول تكتشف قبل ما يخلص الوقت!</p>
        <button className="btn" onClick={() => navigate("/game")}>
          ابدأ الجولة
        </button>
      </div>
    </div>
  );
}

export default HomePage;
