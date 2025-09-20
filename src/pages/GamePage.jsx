import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import { FaGift, FaHome } from "react-icons/fa";
import Confetti from "react-confetti";
import "../App.css";

function GamePage() {
  const { currentIndex, setCurrentIndex } = useContext(GameContext);
  const navigate = useNavigate();

  const [attempt, setAttempt] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [showLose, setShowLose] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showConfetti, setShowConfetti] = useState(false);

  const questions = [
    {
      hints: ["تلميح أول:شي نشربه شي نشربه شي نشربه شي نشربه شي نشربه", "تلميح ثاني: لونه بني ويصحّصح"],
      answer: "القهوة",
      img: "/assets/Q1.png",
    },
    {
      hints: ["تلميح أول: مدينة سعودية", "تلميح ثاني: فيها المسجد الحرام"],
      answer: "مكة المكرمة",
      img: "/assets/Q2.png",
    },
  ];

  const data = questions[currentIndex];

  useEffect(() => {
    setAttempt(1);
    setShowAnswer(false);
    setShowWin(false);
    setShowLose(false);
    setShowConfetti(false);
    setTimeLeft(60);
  }, [currentIndex]);

  useEffect(() => {
    if (showWin || showLose) return;

    if (timeLeft <= 0) {
      endLose();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t - 1 === 30) setAttempt(2);
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, showWin, showLose]);

  function reveal() {
    setShowAnswer(true);
    setShowWin(true);
    setShowConfetti(true);
  }

  function endLose() {
    setShowAnswer(true);
    setShowLose(true);
    setShowConfetti(false);
  }

  function goHome() {
    setShowConfetti(false);
    setCurrentIndex((prev) => (prev + 1) % questions.length);
    navigate("/");
  }

  return (
    <div className={`game-container ${showLose ? "lose-mode" : ""}`} dir="rtl">
      {/* ✅ الاحتفالات */}
      {showConfetti && (
        <div className="confetti-wrapper">
          <Confetti numberOfPieces={500} recycle={true} />
        </div>
      )}

      {/* ✅ رسالة الفوز/الخسارة */}
      {showWin && (
  <div className="result-banner win-text">مبروك! إجابة صحيحة</div>
)}
{showLose && (
  <div className="result-banner lose-text">انتهى الوقت — حظ أوفر</div>
)}



      <div className="cards-grid">
        {/* ✅ العمود الأيمن (التايمر + التلميحات) */}
        <div className="hints-col">
          <div className="panel timer-card">
            <div
              className={`digital-timer ${
                timeLeft <= 10 ? "timer-danger" : ""
              }`}
            >
              {timeLeft}
            </div>
          </div>

          <section className="panel hint-card">
            {/* <h2>تلميح 1</h2> */}
            <h2>{data.hints[0]}</h2>
          </section>

          {attempt >= 2 && (
            <section className="panel hint-card">
              {/* <h2>تلميح 2</h2> */}
              <h2>{data.hints[1]}</h2>
            </section>
          )}
        </div>

        {/* ✅ الكرت الأوسط (الصورة) */}
        <section className="panel image-card">
          <img
            src={data.img}
            alt="من أنا؟"
            className={`game-image ${
              showAnswer ? "clear" : attempt === 1 ? "blur-heavy" : "blur-light"
            }`}
          />
          {showAnswer && <div className="answer">الإجابة: {data.answer}</div>}
        </section>

        {/* ✅ أيقونة الجائزة / الهوم */}
        <div className="reward-col">
        {!showAnswer && timeLeft > 0 && (
  <div className="gift-icon" onClick={reveal}>
    <FaGift />
  </div>
)}

{(showWin || showLose || timeLeft <= 0) && (
  <div className="gift-icon home-icon" onClick={goHome}>
    <FaHome />
  </div>
)}

        </div>
      </div>
    </div>
  );
}

export default GamePage;
