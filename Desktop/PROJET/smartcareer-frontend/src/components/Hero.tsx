import React, { type JSX } from "react";

const Hero = (): JSX.Element => {
  return (
    <section className="w-full bg-gradient-to-br from-blue-100 via-white to-purple-100 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Texte Hero */}
        <div className="md:w-1/2 flex flex-col items-start md:items-start font-sans bg-white/80 rounded-2xl shadow-2xl p-10 backdrop-blur-md border border-blue-100">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-snug tracking-tight w-full text-left">
            {/* Logo SmartCareer avec dégradé */}
            <span className="flex items-center gap-2 select-none mr-8 mb-10 animate-fade-in">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-transparent bg-clip-text font-bold">
                Smart
              </span>
              <span className="px-3 py-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white rounded-md font-bold">
                Career
              </span>
            </span>

            {/* Espace ajouté */}
            <div className="my-3" />

            {/* Sous-texte sur la même ligne */}
            <span className="text-blue-600   text-lg md:text-3xl font-semibold drop-shadow-md py-2 px-4 rounded-lg block w-full text-left">
              <span className="animate-gradient-x">— L’intelligence au service de votre avenir professionnel</span>
            </span>
          </h1>

          <p
            className="text-gray-700 mb-15 text-base md:text-lg italic"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Transformez votre CV en opportunités : obtenez des offres d’emploi
            pertinentes, des formations adaptées et une analyse complète de vos
            compétences.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 hover:from-blue-700 transition-all font-semibold duration-200"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              🚀 Déposer mon CV
            </button>
            <button
              className="bg-white border-2 border-blue-300 px-8 py-3 rounded-xl shadow hover:bg-blue-50 transition-all font-semibold duration-200 text-blue-700"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              🔍 Découvrir le projet
            </button>
          </div>
        </div>

        {/* Illustration */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img
            src="https://via.placeholder.com/500x400"
            alt="Illustration SmartCareer"
            className="rounded-2xl shadow-2xl border-4 border-blue-100 animate-fade-in"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
