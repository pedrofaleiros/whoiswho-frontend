import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/Login";
import { SignupPage } from "./pages/Signup";
import { RoomPage } from "./pages/RoomPage";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <AuthProvider>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/room/:room" element={<RoomPage />} />
            <Route path="/places" element={<PlacesPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
