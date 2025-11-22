import React, { type JSX } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhySmartCareer from "./components/WhySmartCareer";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ContactPage from "./ContactPage";
import DashboardPage from "./DashboardPage";

const App = (): JSX.Element => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            {/* Page d'accueil */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <WhySmartCareer />
                  <HowItWorks />
                  <Footer />
                </>
              }
            />

            {/* Pages Login et Register */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
