import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import { useAuth } from "./contexts/AuthContext";
import { fetchOrCreateProfile } from "./services/profileService";
import type { AppUser, Profile } from "./types"; // Updated to AppUser

const App: React.FC = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        const fetchedProfile = await fetchOrCreateProfile(user.id, user.email || "Unknown Hero");
        setProfile(fetchedProfile);
      } catch (err) {
        setError("Failed to load your profile. Please try logging in again.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  return (
    <Router>
      <div className="flex">
        {user && <Sidebar />}
        <div className="flex-1">
          {user && (
            <div className="p-4 flex justify-end">
              <button
                onClick={signOut}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 font-roboto"
              >
                Logout
              </button>
            </div>
          )}
          <Routes>
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <LoginPage />}
            />
            <Route
              path="/"
              element={
                user ? (
                  error ? (
                    <div className="p-4">
                      <p className="text-red-500 font-roboto">{error}</p>
                    </div>
                  ) : loading ? (
                    <div className="p-4">
                      <p className="text-gold font-roboto">Loading profile...</p>
                    </div>
                  ) : profile ? (
                    <Home user={user} profile={profile} />
                  ) : null
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;