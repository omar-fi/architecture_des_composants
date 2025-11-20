import React, { type JSX } from "react";

const HowItWorks = (): JSX.Element => {
  return (
    <section 
    id="HowItWoerks" className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-100 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-center text-blue-700 drop-shadow-lg tracking-tight animate-fade-in">
          Comment ça marche ?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-lg border border-blue-200 hover:scale-105 transition-all duration-200 flex flex-col items-center text-center animate-fade-in">
            <div className="mb-4">
              <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
                <rect
                  x="8"
                  y="12"
                  width="32"
                  height="24"
                  rx="4"
                  fill="#3b82f6"
                  opacity="0.15"
                />
                <rect
                  x="12"
                  y="16"
                  width="24"
                  height="16"
                  rx="2"
                  fill="#3b82f6"
                />
                <rect
                  x="16"
                  y="20"
                  width="16"
                  height="8"
                  rx="1"
                  fill="#2563eb"
                />
              </svg>
            </div>
            <h3 className="font-bold mb-2 text-blue-600 text-lg">
              Étape 1 — Déposez votre CV
            </h3>
            <p className="text-gray-700">
              Zone d’upload + bouton CTA pour démarrer votre parcours.
            </p>
          </div>
          <div className="p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-lg border border-indigo-200 hover:scale-105 transition-all duration-200 flex flex-col items-center text-center animate-fade-in">
            <div className="mb-4">
              <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="22" fill="#6366f1" opacity="0.15" />
                <path
                  d="M24 14a6 6 0 100 12 6 6 0 000-12zm0 16c-5.33 0-16 2.67-16 8v2h32v-2c0-5.33-10.67-8-16-8z"
                  fill="#6366f1"
                />
              </svg>
            </div>
            <h3 className="font-bold mb-2 text-indigo-600 text-lg">
              Étape 2 — Analyse intelligente
            </h3>
            <p className="text-gray-700">
              L’IA extrait vos compétences, expériences et diplômes en quelques
              secondes.
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
              Étape 3 — Matching avec les offres
            </h3>
            <p className="text-gray-700">
              Les modèles d’IA comparent votre profil avec une base d’offres
              pour un matching précis.
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
              Étape 4 — Recommandations personnalisées
            </h3>
            <p className="text-gray-700">
              Recevez des offres d’emploi et des formations adaptées à votre
              profil.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
