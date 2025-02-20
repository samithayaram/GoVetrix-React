import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../firebase";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Validation function
  const validateField = (name, value) => {
    let error = "";
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) error = "Email is required.";
      else if (!emailRegex.test(value)) error = "Enter a valid email.";
    }
    if (name === "password") {
      if (!value.trim()) error = "Password is required.";
      else if (value.length < 6) error = "Password must be at least 6 characters.";
      else if (!/\d/.test(value)) error = "Password must contain at least one number.";
    }
    return error;
  };

  // Handle input changes & validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        setFormData({ email: "", password: "" });
      } catch (error) {
        console.error("Login error:", error.message);
        alert("Login failed! Please check your credentials.");
      }
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      alert(`Welcome ${result.user.displayName}!`);
    } catch (error) {
      console.error("Google Sign-In error:", error);
      alert("Google Sign-In failed!");
    }
  };

  // Guest Login
  const handleGuestLogin = () => {
    alert("Guest Login Clicked! (Add your guest login logic)");
  };

  return (
    <div className="bg-gray-900 text-white flex min-h-screen items-center justify-center">
      <div className="w-[90%] sm:w-[320px] bg-white p-6 rounded-lg shadow-md text-gray-900">
        <div className="text-center">
          <img alt="Your Company" src="src/assets/logo.png" className="mx-auto h-8 w-auto" />
          <h2 className="mt-2 text-xl font-bold">Login</h2>
        </div>

        <form className="mt-4 space-y-4" autoComplete="off" onSubmit={handleSubmit}>
          {/* Floating Label Inputs */}
          {[
            { id: "email", type: "email", label: "Email address" },
            { id: "password", type: "password", label: "Password" },
          ].map(({ id, type, label }) => (
            <div key={id} className="relative">
              <input
                id={id}
                name={id}
                type={type}
                value={formData[id]}
                onChange={handleChange}
                className={`peer block w-full rounded-md px-3 pb-2 pt-4 text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600
                ${errors[id] ? "border-red-500" : "border-gray-300"}`}
                placeholder=" "
              />
              <label
                htmlFor={id}
                className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-300 transform scale-75 -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600"
              >
                {label}
              </label>
              {errors[id] && <span className="text-red-500 text-xs">{errors[id]}</span>}
            </div>
          ))}

          {/* Forgot Password */}
          <div className="flex justify-end text-xs">
            <a href="#" className="text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-indigo-500 transition-all"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="mt-4 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500 text-xs">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Sign in with Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mt-3 w-full bg-red-500 text-white py-2 rounded-md text-sm font-semibold hover:bg-red-400 transition-all"
        >
          Sign in with Google
        </button>

        {/* Guest Login */}
        <button
          type="button"
          onClick={handleGuestLogin}
          className="mt-3 w-full bg-gray-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-gray-500 transition-all"
        >
          Sign in as Guest
        </button>

        {/* Register Redirect */}
        <p className="mt-4 text-center text-xs text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-semibold">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
