import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/Login";
import { SignupPage } from "./pages/Signup";
import { RoomPage } from "./pages/RoomPage";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/room/:room" element={<RoomPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
