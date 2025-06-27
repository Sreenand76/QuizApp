import React, { useState } from "react";
import { registerUser } from "../../utils/ApiFunction";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Registration = () => {
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await registerUser(registration);
      setSuccessMessage(result.message); // assuming result has a message
      setErrorMessage("");
      setRegistration({ firstName: "", lastName: "", email: "", password: "" });
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(`Registration error: ${error.message || "An error occurred"}`);
    } finally {
      setIsLoading(false);
    }
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <section className="flex justify-center p-3">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg  mt-10">
        {errorMessage && (
          <p className="bg-red-100 text-red-700 p-2 rounded-md mb-4">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="bg-green-100 text-green-700 p-2 rounded-md mb-4">{successMessage}</p>
        )}

        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Register</h2>

        <form onSubmit={handleRegistration} className="space-y-6">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={registration.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={registration.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={registration.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={registration.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>

          {/* Link to Login */}
          <div className="text-center">
            <span className="text-sm">Already have an account? </span>
            <Link to="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Registration;