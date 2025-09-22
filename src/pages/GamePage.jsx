import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import { FaGift, FaHome } from "react-icons/fa";
import Confetti from "react-confetti";
import "../App.css";

function GamePage() {
  const { currentIndex } = useContext(GameContext);
  const navigate = useNavigate();

  const [attempt, setAttempt] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [showLose, setShowLose] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showConfetti, setShowConfetti] = useState(false);

  const questions = [
    {
      hints: [
        "تلميح أول: أول مخرجة سعودية تقدم عملاً من تأليفها وإخراجها في بوليوود",
        "تلميح ثاني: شغلت منصب مديرة منظمة الاتحاد الدولي للرياضات العالمية التابعة للأمم المتحدة",
      ],
      answer: "سميرة عزيز",
      img: "/assets/Q1.jpg",
    },
    {
      hints: [
        "تلميح أول: تقلدت منصب المدير التنفيذي لبرنامج الأمان الأسري الوطني",
        "تلميح ثاني: فازت بجائزة أشجع امرأة في العالم لعام 2014 وتكريمها من قبل الرئيس الأميركي السابق باراك أوباما",
      ],
      answer: "مها المنيف",
      img: "/assets/Q2.jpeg",
    },
    {
      hints: [
        "تلميح أول: تولت منصب نائب رئيس الاتحاد الدولي للملاحة الفضائية",
        "تلميح ثاني: أول مهندسة في هندسة الصواريخ والمركبات الفضائية في الخليج العربي",
      ],
      answer: "مشاعل الشميمري",
      img: "/assets/Q3.jpg",
    },
    {
      hints: [
        "تلميح أول: شغلت منصب مستشار إقليمي في المكتب الإقليمي لمنظمة الصحة العالمية لبرنامج الأدوية الأساسية",
        "تلميح ثاني: تعد أول سعودية تحصل على درجة الأستاذيّة في علم الأدوية",
      ],
      answer: "سميرة إسلام",
      img: "/assets/Q4.jpg",
    },
    {
      hints: [
        "تلميح أول: عملت مستشارة في الإستراتيجية الاجتماعية والاقتصادية للبنك الدولي والبنك الإسلامي للتنمية",
        "تلميح ثاني: أول متحدثة باسم سفارة السعودية بواشنطن",
      ],
      answer: "فاطمة باعشن",
      img: "/assets/Q5.jpg",
    },
    {
      hints: [
        "تلميح أول: أعلنت أكاديمية فنون وعلوم الصور المتحركة (الأوسكار) عن تعيينها عضوًا في مجلس محافظي الأكاديمية ممثلةً لفرع المخرجين للدورة المقبلة 2025–2026",
        "تلميح ثاني: أول إمرأة سعودية تُخرج فيلمًا سينمائيًا",
      ],
      answer: "هيفاء المنصور",
      img: "/assets/Q6.jpg",
    },
    {
      hints: [
        "تلميح أول: تولّت منصب الرئيس التنفيذي لشركة الأهلي كابيتال المالية، وعضواً في مجلس الإدارة",
        "تلميح ثاني: أول امرأة تتولى إدارة شركة السوق المالية السعودية تداول",
      ],
      answer: "سارة السحيمي",
      img: "/assets/Q7.jpg",
    },
  ];

  const data = questions[currentIndex];

  // ✅ Preload برمجي لكل الصور أول ما تفتح اللعبة
  useEffect(() => {
    questions.forEach((q) => {
      const img = new Image();
      img.src = q.img;
    });
  }, []);

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
    navigate("/");
  }

  return (
    <div className="game-page-wrapper" dir="rtl">
      {/* ✅ الشعارات العلوية */}
      <div className="game-logos-static">
        <img
          src="/assets/NaDayLogo.png"
          alt="شعار اليوم الوطني"
          className="logo-static"
        />
        <img
          src="/assets/pmoLogoGame.png"
          alt="شعار وزارة المالية"
          className="logo-static"
        />
      </div>

      {/* ✅ رسالة الفوز/الخسارة */}
      <div className="result-banner-wrapper">
        {showWin && (
          <div className="result-banner win-text">مبروك! إجابة صحيحة</div>
        )}
        {showLose && (
          <div className="result-banner lose-text">
            انتهى الوقت — حظ أوفر
          </div>
        )}
      </div>

      {/* ✅ الصفحة الرئيسية للعبة */}
      <div className={`game-container ${showLose ? "lose-mode" : ""}`}>
        {showConfetti && (
          <div className="confetti-wrapper">
            <Confetti numberOfPieces={500} recycle={true} />
          </div>
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
              <h2>{data.hints[0]}</h2>
            </section>

            {attempt >= 2 && (
              <section className="panel hint-card">
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
    </div>
  );
}

export default GamePage;
