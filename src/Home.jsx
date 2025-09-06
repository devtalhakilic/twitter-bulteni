import React from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import LightRays from "./LightRays";
import quizzesData from "./data/quizzes.json";
import "animate.css"; // animate.css dosyanız
import { Slide } from "react-awesome-reveal";

function Home() {
  const sortedQuizzes = [...quizzesData].sort((a, b) => b.id - a.id);
  const enGuncelQuiz = sortedQuizzes[0];
  const arsivQuizzes = sortedQuizzes.slice(1);

  // useInView hook'unu kullanarak animasyonları tetikliyoruz
  const { ref: textRef, inView: textInView } = useInView({
    threshold: 0, // Elementin %10'u ekrana girdiğinde tetikle
  });

  const { ref: lastTestRef, inView: lastTestInView } = useInView({
    threshold: 0,
  });

  return (
    <>
      <div
        style={{ backgroundColor: "#060010" }}
        className="light-rays-container"
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

      <section className="mainPage">
        {/* Başlık ve paragraf için animasyon */}
        <div
          ref={textRef}
          className={`text animate__animated ${
            textInView ? "animate__fadeIn" : ""
          }`}
        >
          <h1 className="text-white text-center">Haftalık Twitter Bülteni</h1>
          <p>
            Haftalık Twitter bültenine hoş geldiniz! Gündemi, hit olmuş
            tweetleri ne kadar yakından takip ettiğini merak ediyor musun? O
            zaman doğru yerdesin. Her hafta en popüler tweet'leri derliyor, sana
            bir test sunuyorum. Bakalım kaçta kaç yapacaksın?
          </p>
        </div>

        {/* En güncel test kartı için animasyon */}
        <div
          ref={lastTestRef}
          className={`lastTest animate__animated ${
            lastTestInView ? "animate__fadeIn" : ""
          }`}
        >
          <div className="divTop">
            <h1>{enGuncelQuiz.hafta}</h1>
            <div className="currentDiv">
              <div className="currentTag">
                <span>En Güncel</span>
              </div>
            </div>
          </div>
          <div className="divMain">
            <p>{enGuncelQuiz.haftaAciklama}</p>
            <div className="buttonsContainer">
              <Link className="inline-block" to={`/quiz/${enGuncelQuiz.id}`}>
                <button className="cssbuttons-io-button startButton">
                  Teste Başla
                  <div className="icon">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="archiveTextContainer">
        <h2>Eski Testler</h2>
      </div>

      <section className="archiveTests">
        {arsivQuizzes.map((quiz) => (
          <Slide key={quiz.id} direction="up">
            <div className="lastTest">
              <div className="divTop">
                <h1>{quiz.hafta}</h1>
              </div>
              <div className="divMain">
                <p>{quiz.haftaAciklama}</p>
                <div className="buttonsContainer">
                  <Link className="inline-block" to={`/quiz/${quiz.id}`}>
                    <button className="cssbuttons-io-button startButton">
                      Teste Başla
                      <div className="icon">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Slide>
        ))}
      </section>
    </>
  );
}

export default Home;
