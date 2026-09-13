import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Courses from "./pages/Courses";
import Chatbot from "./pages/Chatbot";
import Contact from "./pages/Contact";
import ProtectedAdmin from "./components/ProtectedAdmin";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<ProtectedAdmin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
