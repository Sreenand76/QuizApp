import React, { useContext, useState } from "react";
import { loginUser } from "../../utils/ApiFunction";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { toast } from 'react-toastify';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const success = await loginUser(login);
      if (success) {
        const token = success.token;
        handleLogin(token);
        navigate("/");
        toast.success(`Login successful`);
      } else {
        setErrorMessage("Invalid username or password. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during login. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle guest login
  const handleGuestLogin = async (e) => {
    e.preventDefault();
    setLogin({
      email: "dummy123@gmail.com",
      password: "dummy_9037"
    });
    
    // Auto-submit after setting values (optional)
    // You can remove this if you want user to click login button
    setIsLoading(true);
    setErrorMessage("");

    try {
      const success = await loginUser({
        email: "guest123@gmail.com",
        password: "guest_9037"
      });
      if (success) {
        const token = success.token;
        handleLogin(token);
        navigate("/");
        toast.success(`Guest login successful`);
      } else {
        setErrorMessage("Guest login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during guest login. Please try again.");
      console.error("Guest login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 mx-4 mt-24">
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {errorMessage}
          </div>
        )}
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              value={login.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>
    
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              value={login.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
          </div>
    
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 mt-3 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* Guest Login Button */}
          <button
            onClick={handleGuestLogin}
            className="w-full bg-gray-600 text-white py-3 rounded-lg shadow-md hover:bg-gray-700 transition duration-200 mt-3 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Login as Guest"
            )}
          </button>
        </form>
    
        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">
            Don't have an account?{" "}
          </span>
          <Link
            to="/register"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;