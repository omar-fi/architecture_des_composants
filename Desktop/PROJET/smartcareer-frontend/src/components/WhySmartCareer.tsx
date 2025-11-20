import React, { type JSX } from "react";

const WhySmartCareer = (): JSX.Element => {
  return (
    <section
      id="why-smartcareer"
      className="py-24 bg-gradient-to-br from-blue-100 via-white to-purple-200 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 w-full h-40 opacity-20"
        >
          <path
            fill="#6366f1"
            fillOpacity="0.2"
            d="M0,160L60,165.3C120,171,240,181,360,165.3C480,149,600,107,720,117.3C840,128,960,192,1080,218.7C1200,245,1320,235,1380,229.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-center text-blue-700 drop-shadow-lg tracking-tight animate-fade-in">
          Pourquoi SmartCareer ?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-lg border border-blue-200 hover:scale-105 transition-all duration-200 flex flex-col items-center text-center animate-fade-in">
            <div className="mb-4">
              <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="22" fill="#3b82f6" opacity="0.15" />
                <path
                  d="M24 14a6 6 0 100 12 6 6 0 000-12zm0 16c-5.33 0-16 2.67-16 8v2h32v-2c0-5.33-10.67-8-16-8z"
                  fill="#3b82f6"
                />
              </svg>
            </div>
            <h3 className="font-bold mb-2 text-blue-600 text-lg">
              Analyse IA instantanée de votre CV
            </h3>
            <p className="text-gray-700">
              Votre profil est analysé en quelques secondes grâce à des
              technologies NLP avancées.
            </p>
          </div>
          <div className="p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-lg border border-green-200 hover:scale-105 transition-all duration-200 flex flex-col items-center text-center animate-fade-in">
            <div className="mb-4">
              <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="22" fill="#22c55e" opacity="0.15" />
                <path
                  d="M34 18v-2a2 2 0 00-2-2H16a2 2 0 00-2 2v2m20 0v12a2 2 0 01-2 2H16a2 2 0 01-2-2V18m20 0H14"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-bold mb-2 text-green-600 text-lg">
              Offres d’emploi ultra-personnalisées
            </h3>
            <p className="text-gray-700">
              Nous comparons votre profil aux offres pour trouver celles qui
              vous correspondent vraiment.
            </p>
          </div>
          <div className="p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-lg border border-yellow-200 hover:scale-105 transition-all duration-200 flex flex-col items-center text-center animate-fade-in">
            <div className="mb-4">
              <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="22" fill="#facc15" opacity="0.15" />
                <path
                  d="M24 14v20m0 0l-6-6m6 6l6-6"
                  stroke="#facc15"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-bold mb-2 text-yellow-600 text-lg">
              Formations recommandées sur-mesure
            </h3>
            <p className="text-gray-700">
              L’outil identifie vos lacunes et suggère des formations
              pertinentes pour booster votre carrière.
            </p>
          </div>
          <div className="p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-lg border border-orange-200 hover:scale-105 transition-all duration-200 flex flex-col items-center text-center animate-fade-in">
            <div className="mb-4">
              <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="22" fill="#fb923c" opacity="0.15" />
                <path
                  d="M24 14a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 110 12 6 6 0 010-12z"
                  fill="#fb923c"
                />
              </svg>
            </div>
            <h3 className="font-bold mb-2 text-orange-600 text-lg">
              Orientation fiable et personnalisée
            </h3>
            <p className="text-gray-700">
              Chaque utilisateur reçoit des recommandations uniques selon son
              parcours et ses ambitions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySmartCareer;
