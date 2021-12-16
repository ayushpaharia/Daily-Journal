import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import Dashboard from "./Dashboard/Dashboard";
import AboutUs from "./AboutUs/AboutUs";
import ContactUs from "./ContactUs/ContactUs";
import NotFound from "./NotFound/NotFound";
import { useGlobal } from "../context/globalContext";

function App() {
  const { retrieveUserFromLocal } = useGlobal();
  useEffect(() => {
    retrieveUserFromLocal();
  }, [retrieveUserFromLocal]);
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
