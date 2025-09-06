import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import quizzesData from "./data/quizzes.json";
import LightRays from "./LightRays";
import { Link } from "react-router-dom";
import "animate.css"; // animate.css dosyanız
let userScore = 0;
let userPuan = 0;
let developerMessage = ""
let ekranSaati = ""
function Quiz() {
  const { id } = useParams();
  const quiz = quizzesData.find((q) => q.id === +id);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState(
    "animate__bounceInRight"
  );

  if (!quiz) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Quiz bulunamadı. Lütfen ana sayfaya geri dönün.
      </div>
    );
  }

  const handleAnswer = (userChoice) => {
    // Burada "dogruCevap" özelliğinin quiz.gorseller objelerinde olduğunu varsayıyorum.

    if (userChoice){
      userScore += 1
    }

    setAnimationClass("animate__bounceOutLeft");

    setTimeout(() => {
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < quiz.gorseller.length) {
        setCurrentQuestionIndex(nextQuestion);
        setAnimationClass("animate__bounceInRight");
      } else {
        setCurrentQuestionIndex(nextQuestion);
      }
    }, 500);
  };

  // Sonuç ekranı iskeleti
  if (currentQuestionIndex >= quiz.gorseller.length) {

    console.log(currentQuestionIndex)
    console.log(userScore)

    let userPuan = (100 / currentQuestionIndex) * userScore

    if(userPuan == 100){ // 100 puan
      developerMessage = "siteyi azalt kardeşim 100 puan ne aq"
      ekranSaati = "> 6 Saat"
    }else if(userPuan <= 100 && userPuan > 90){
      developerMessage = "100'ü az farkla kaçırmışsın haftaya tekrar dene";
      ekranSaati = "> 5.5 Saat"
    }else if(userPuan <=90 && userPuan > 80){ //  80-90 arası
      developerMessage = "bağımlı olmana ramak kalmış dikkat et kardeş (sağlık için)"
      ekranSaati = "> 4 Saat"
    }else if(userPuan <= 80 && userPuan > 70){ // 70-80 arası
      developerMessage = "bağımlılık seziyorum haftaya olacak testte bundan yüksek çıkmasın (sağlığın icin)"
      ekranSaati = "> 3.5 saat";
    }else if(userPuan <= 70 && userPuan > 60){ //60-70 arası
      developerMessage = "twittera sık sık giriyorsun bence çünkü puanın hiç azımsanacak bir puan değil, bağımlı olma dikkat et <3"
      ekranSaati = "> 3 Saat"
    }else if(userPuan <= 60 && userPuan >= 50){ //50-60 arası
      developerMessage = "kılpayı testten geçtin ve twittera daha bağımlı olmamışsın gibi gözüküyor böyle devam et haftaya yine gel <3 "
      ekranSaati = "> 2.5 Saat"
    }else if(userPuan <= 49 && userPuan > 40){ //40-50 arası
      developerMessage = "geçemediniz malesef, twitter süreni biraz daha arttırabilirsin site bağımlısı olma lütfen (ben gibi)" 
      ekranSaati = "> 2 Saat"
    }else if(userPuan <= 40 && userPuan > 30){ //30-40 arası
      developerMessage = "geçemedin malesef, twitter süren az gözüküyor haftaya yine gel"
      ekranSaati = "> 1.5 Saat"
    }else if(userPuan <= 30 && userPuan > 20){ //20-30 arası
      developerMessage = "twittera az giriyorsun heralde bu puan hiç yüksek değil"
      ekranSaati = "1 Saat >"
    }else if(userPuan <= 20 && userPuan > 10){ //10-20 arası
      developerMessage = "twittera son zamanlarda az girmişsin süreyi arttırabilirsin gibi"
      ekranSaati = "30 Dakika >"
    }else if(userPuan <= 10 && userPuan > 0){ //0-10 arası
      developerMessage = "twittera aşırı az giriyorsun bu siteyi keşfetmen bile senin için mucize" 
      ekranSaati = "15 Dakika >"
    }else if(userPuan == 0){ //0 puan
      developerMessage = "0 puan ne arkadaş siteyi nereden buldun twitter yerine facebooka giriyorsun heralde"
      ekranSaati = "> 10 Dakika"
    }

    return (
      <div className="sonucContainer">
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

        <div className="sonucCard">
          <div className="twitterPuan">
            <h1>Twitter Dili ve Edebiyatı Puanın:</h1>
            <div className="aciklama">
              <p>{userPuan}</p>
            </div>
          </div>
          <div className="ekranSuresi">
            <h1>Tahmini Günlük Twitter Ekran Süren:</h1>
            <div className="aciklama">
            <p>{ekranSaati}</p>
            </div>
          </div>
          <div className="yapimcininMesaji">
            <h1>Yapımcının Sana Mesajı:</h1>
            <div className="aciklama">
                <p>{developerMessage}</p>
            </div>
          </div>
          <div className="soruStats">
            <p>
              <span>{currentQuestionIndex}</span> Gündem Tweetin{" "}
              <span>{userScore}</span> tanesini biliyorsun.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.gorseller[currentQuestionIndex];

  return (
    <div className="relative min-h-screen">
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

      <div className="questionPage relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div
          className={`questionContainer animate__animated ${animationClass} fastAnimation `}
        >
          <div className="questionImageContainer">
            <img src={currentQuestion.yol} alt="Quiz Görseli" />
          </div>
          <div className="text">
            <p>{currentQuestion.aciklama}</p>
          </div>

          <div className="buttonsContainer">
            <button
              onClick={() => handleAnswer(true)}
              className="confirm questButton"
            >
              <span>Gördüm</span>
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="decline questButton"
            >
              <span>Görmedim</span>
            </button>
          </div>
        </div>
        <div className="questionIndexContainer">
          <h1>
            {currentQuestionIndex + 1} / {quiz.gorseller.length}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
