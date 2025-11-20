import React, { type JSX } from "react";
import { Link } from "react-router-dom";

const Footer = (): JSX.Element => {
  return (
    <footer className="bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 w-full h-32 opacity-20"
        >
          <path
            fill="#fff"
            fillOpacity="0.1"
            d="M0,160L60,165.3C120,171,240,181,360,165.3C480,149,600,107,720,117.3C840,128,960,192,1080,218.7C1200,245,1320,235,1380,229.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between md:gap-8 gap-8 relative z-10">
        {/* Newsletter + logo + description */}
        <div className="md:w-1/3 mb-10 md:mb-0 flex flex-col items-center md:items-start text-center md:text-left justify-center md:px-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-white font-extrabold text-3xl tracking-tight drop-shadow-lg">
              Smart
            </span>
            <span className="bg-white text-blue-700 px-4 py-1 rounded-lg font-bold text-xl shadow">
              Career
            </span>
          </div>
          <p className="text-white/80 text-base mb-2">
            SmartCareer vous aide à booster votre carrière grâce à
            l’intelligence artificielle.
          </p>
          <span className="text-white/60 text-sm mb-4">
            Analyse de CV, matching avec les offres et recommandations
            personnalisées.
          </span>
          <form className="flex flex-col gap-2 w-full max-w-xs mx-auto md:mx-0">
            <label
              htmlFor="newsletter"
              className="text-white/80 text-sm text-center md:text-left w-full mb-1"
            >
              Recevez nos actualités :
            </label>
            <div className="flex w-full">
              <input
                id="newsletter"
                type="email"
                placeholder="Votre email"
                className="px-3 py-2 rounded-l-lg border-none outline-none text-blue-900 bg-white/80 placeholder-blue-400 w-2/3"
              />
              <Link
                to="/register"
                className="bg-blue-600 text-white px-3 py-2 rounded-r-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
              >
                S'inscrire
              </Link>
            </div>
          </form>
        </div>

        {/* Liens utiles */}
        <div className="md:w-1/3 flex flex-col items-center justify-center md:px-4">
          <h4 className="font-semibold mb-3 text-lg">Liens utiles</h4>
          <ul className="space-y-2 text-sm text-white/80 text-center">
            <li className="hover:text-white cursor-pointer transition">
              <a href="/#why-smartcareer">Pourquoi SmartCareer ?</a>
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Offres recommandées
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Formations
            </li>
            <li className="hover:text-white cursor-pointer transition">
             <Link to="/contact"> Contact</Link>
            </li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div className="md:w-1/3 flex flex-col items-center justify-center md:px-4">
          <h4 className="font-semibold mb-3 text-lg">Suivez-nous</h4>
          <div className="flex gap-4">
            <a
              href="#"
              className="hover:text-gray-200 transition transform hover:scale-110"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 4.01c-.77.35-1.6.59-2.46.69a4.29 4.29 0 001.88-2.37 8.52 8.52 0 01-2.7 1.03 4.26 4.26 0 00-7.26 3.88A12.09 12.09 0 013 3.16a4.26 4.26 0 001.32 5.69 4.22 4.22 0 01-1.93-.53v.05a4.26 4.26 0 003.41 4.17 4.27 4.27 0 01-1.92.07 4.27 4.27 0 003.98 2.96 8.55 8.55 0 01-5.3 1.83c-.34 0-.68-.02-1.02-.06a12.07 12.07 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2l-.01-.56A8.72 8.72 0 0022 4.01z" />
              </svg>
            </a>
            <a
              href="#"
              className="hover:text-gray-200 transition transform hover:scale-110"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.5 0-10 4.48-10 10.01 0 4.42 2.87 8.16 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.14-1.11-1.44-1.11-1.44-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.54 9.54 0 012.5-.34 9.5 9.5 0 012.5.34c1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.02 1.59 1.02 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .26.18.57.69.48A10.002 10.002 0 0022 12.05c0-5.53-4.5-10.01-10-10.01z" />
              </svg>
            </a>
            <a
              href="#"
              className="hover:text-gray-200 transition transform hover:scale-110"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.8 8.2c-.3-1.5-1.5-2.7-3-3s-3.2-.3-4.8-.3c-1.6 0-3.5 0-5.1.3-1.5.3-2.7 1.5-3 3-.3 1.5-.3 3.2-.3 4.8s0 3.5.3 5.1c.3 1.5 1.5 2.7 3 3 1.5.3 3.2.3 4.8.3s3.5 0 5.1-.3c1.5-.3 2.7-1.5 3-3 .3-1.5.3-3.2.3-4.8s0-3.5-.3-5.1zM12 15.5c-1.9 0-3.5-1.6-3.5-3.5S10.1 8.5 12 8.5s3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm4.9-6.6a.8.8 0 11-.8-.8.8.8 0 01.8.8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-14 border-t border-white/30 pt-6 text-center text-white/70 text-sm">
        &copy; {new Date().getFullYear()} SmartCareer. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
