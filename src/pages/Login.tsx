import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleError = (message: string) => {
    setError(message);
    setSuccess("");
  };

  const handleSuccess = (message: string) => {
    setSuccess(message);
    setError("");
  };

  return (
    <div className="relative h-screen">
      <LoginForm onError={handleError} onSuccess={handleSuccess} />
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-lg shadow-lg">
          <p className="font-roboto">{error}</p>
        </div>
      )}
      {success && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg">
          <p className="font-roboto">{success}</p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;