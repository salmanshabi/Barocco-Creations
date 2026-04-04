import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import SplashIntro from "./components/SplashIntro";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {!splashDone && <SplashIntro onComplete={() => setSplashDone(true)} />}
      <CustomCursor />
      {splashDone && <Navbar />}
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </AnimatePresence>
      {splashDone && <Footer />}
    </>
  );
}
