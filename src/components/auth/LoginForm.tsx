import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
// import backgroundImage from "../../assets/images/background.jpg";
import type { AppUser } from "../../types";

interface LoginFormProps {
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onError, onSuccess }) => {
  const [mode, setMode] = useState<"login" | "signUp" | "resetPassword" | "updatePassword">("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const { signIn, signUp, resetPassword, updatePassword } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    if (accessToken) {
      setMode("updatePassword");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onError("");
    onSuccess("");

    try {
      if (mode === "signUp") {
        await signUp(email, password);
        onSuccess("Sign-up successful! Please log in with your credentials.");
        setMode("login");
      } else if (mode === "login") {
        await signIn(email, password);
      } else if (mode === "resetPassword") {
        await resetPassword(email);
        onSuccess("A magical scroll has been sent to your inbox. Follow its instructions to reset your rune.");
        setMode("login");
      } else if (mode === "updatePassword") {
        await updatePassword(newPassword);
        onSuccess("Your rune has been rewritten! Log in with your new password.");
        setMode("login");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      onError(errorMessage);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case "login":
        return "Enter the Realm";
      case "signUp":
        return "Join the Quest";
      case "resetPassword":
        return "Seek the Oracle";
      case "updatePassword":
        return "Rewrite Your Rune";
      default:
        return "Enter the Realm";
    }
  };

  const getButtonText = () => {
    switch (mode) {
      case "login":
        return "Unlock the Gate";
      case "signUp":
        return "Embark on Journey";
      case "resetPassword":
        return "Send Magic Scroll";
      case "updatePassword":
        return "Seal the Rune";
      default:
        return "Unlock the Gate";
    }
  };

  return (
    <div
      /*  className="flex items-center justify-center h-screen bg-dark"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }} */
    >
      <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg w-96 border border-gold">
        <h2 className="text-3xl text-emerald font-rpg mb-6 text-center">{getTitle()}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gold mb-2 font-roboto" htmlFor="email">
              Scroll of Identity (Email)
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white border border-emerald focus:outline-none focus:ring-2 focus:ring-emerald"
              required
              disabled={mode === "updatePassword"}
            />
          </div>
          {(mode === "login" || mode === "signUp") && (
            <div className="mb-6">
              <label className="block text-gold mb-2 font-roboto" htmlFor="password">
                Secret Rune (Password)
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 text-white border border-emerald focus:outline-none focus:ring-2 focus:ring-emerald"
                required
                minLength={6}
              />
            </div>
          )}
          {mode === "updatePassword" && (
            <div className="mb-6">
              <label className="block text-gold mb-2 font-roboto" htmlFor="new-password">
                New Secret Rune
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 text-white border border-emerald focus:outline-none focus:ring-2 focus:ring-emerald"
                required
                minLength={6}
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-emerald text-white p-3 rounded hover:bg-green-600 font-rpg transition-all"
          >
            {getButtonText()}
          </button>
        </form>
        <div className="text-gold mt-6 font-roboto text-center">
          {mode === "login" && (
            <>
              <p>
                New to the Realm?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signUp")}
                  className="text-emerald hover:underline"
                >
                  Join the Quest
                </button>
              </p>
              <p>
                Forgot your Rune?{" "}
                <button
                  type="button"
                  onClick={() => setMode("resetPassword")}
                  className="text-emerald hover:underline"
                >
                  Seek the Oracle
                </button>
              </p>
            </>
          )}
          {mode === "signUp" && (
            <p>
              Already a Hero?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-emerald hover:underline"
              >
                Enter the Gate
              </button>
            </p>
          )}
          {(mode === "resetPassword" || mode === "updatePassword") && (
            <p>
              Return to{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-emerald hover:underline"
              >
                The Gate
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;