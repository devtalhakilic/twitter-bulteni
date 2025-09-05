import { useParams } from "react-router-dom";
import { useState } from "react";
import quizzesData from "./data/quizzes.json";
import LightRays from "./LightRays";

function Quiz() {
  const { id } = useParams();
  const quiz = quizzesData.find((q) => q.id === +id);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Eğer quiz verisi bulunamazsa bu mesajı gösteririz.
  if (!quiz) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Quiz bulunamadı. Lütfen ana sayfaya geri dönün.
      </div>
    );
  }

  // Sadece bir sonraki soruya geçme mantığı
  const goToNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < quiz.gorseller.length) {
      setCurrentQuestionIndex(nextQuestion);
    }
  };

  // Quiz tamamlandığında gösterilecek ekran
  if (currentQuestionIndex >= quiz.gorseller.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        {/* Arka plan için LightRays bileşenini buraya da eklemeyi unutma */}
        <div
          style={{ backgroundColor: "#060010" }}
          className="light-rays-container absolute inset-0"
        >
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1.0}
            lightSpread={0.5}
            rayLength={3}
            fadeDistance={1.0}
            saturation={1.0}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.0}
            distortion={0.0}
            className="custom-rays"
          />
        </div>
        <div className="relative z-10 text-center p-8">
          <h1 className="text-4xl font-bold mb-4">Quiz Tamamlandı!</h1>
          <p className="text-xl">
            Tüm soruları tamamladın. Gündemi ne kadar takip ettiğini artık
            biliyorsun!
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.gorseller[currentQuestionIndex];

  return (
    // Tüm içeriği kapsayan ana div
    <div className="relative min-h-screen">
      {/* Arka plan için LightRays bileşeni */}
      <div
        style={{ backgroundColor: "#060010" }}
        className="light-rays-container absolute inset-0"
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.0}
          lightSpread={0.5}
          rayLength={3}
          fadeDistance={1.0}
          saturation={1.0}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.0}
          distortion={0.0}
          className="custom-rays"
        />
      </div>

      {/* Quiz içeriği */}
      <div className="questionPage relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="questionContainer">
          <div className="questionImageContainer">
            <img src={currentQuestion.yol} alt="Quiz Görseli" />
          </div>
          <div className="text">
            <p>{currentQuestion.aciklama}</p>
          </div>

          <div className="buttonsContainer">
            <button onClick={goToNextQuestion} className="confirm questButton">
              <span>Gördüm</span>
            </button>
            <button onClick={goToNextQuestion} className="decline questButton">
              <span>Görmedim</span>
            </button>
          </div>
        </div>
        <div className="questionIndexContainer">
          <h1>{currentQuestionIndex + 1} / {quiz.gorseller.length}</h1>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
