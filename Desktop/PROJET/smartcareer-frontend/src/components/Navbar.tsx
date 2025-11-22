import React, { type JSX } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = (): JSX.Element => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold flex items-center gap-1 select-none mr-12">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-transparent bg-clip-text font-bold">
            Smart
          </span>
          <span className="px-3 py-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white rounded-md font-bold">
            Career
          </span>
        </Link>

        {/* MENU */}
        <ul className="hidden md:flex gap-10 text-gray-700 font-medium text-sm items-center">
          <li className="hover:text-blue-600 transition cursor-pointer">
            <Link to="/">Accueil</Link>
          </li>
          {isAuthenticated && (
            <>
              <li className="hover:text-blue-600 transition cursor-pointer">
                <Link to="/dashboard">Déposer mon CV</Link>
              </li>
              <li className="hover:text-blue-600 transition cursor-pointer">
                Offres recommandées
              </li>
              <li className="hover:text-blue-600 transition cursor-pointer">
                Formations
              </li>
            </>
          )}
          <li className="hover:text-blue-600 transition cursor-pointer">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* ACTIONS */}
        <div className="flex items-center gap-3 ml-8">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-700">
                {user?.fullName}
              </span>
              <Link
                to="/dashboard"
                className="px-4 py-1 font-semibold bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="px-3 py-1 font-semibold text-gray-700 text-sm hover:text-blue-700 transition"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 font-semibold text-gray-700 text-sm hover:text-blue-700 transition"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="px-4 py-1 font-semibold bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition"
              >
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
