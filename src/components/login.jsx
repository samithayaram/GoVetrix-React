import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from '../assets/logo.png';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // Ensure toast container is mounted
  useEffect(() => {
    console.log("Toast system initialized");
  }, []);

  // Toast notification function
  const notifyAndNavigate = (type, message, path) => {
    toast[type](message, {
      onClose: () => navigate(path),
    });
  };

  // Field validation
  const validateField = (name, value) => {
    let error = "";
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) error = "Email is required.";
      else if (!emailRegex.test(value)) error = "Enter a valid email.";
    }
    if (name === "password") {
      if (!value.trim()) error = "Password is required.";
      else if (value.length < 6)
        error = "Password must be at least 6 characters.";
    }
    return error;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate as user types
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  // Handle form submission (email & password login)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    // If no errors, proceed to login
    if (Object.keys(newErrors).length === 0) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        notifyAndNavigate("success", "Login successful!", "/app-interface");
      } catch (error) {
        console.error("Login error:", error.message);
        toast.error(error.message || "Invalid credentials. Please try again.");
      }
    }
  };

  // Google Sign-In
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      notifyAndNavigate(
        "success",
        `Welcome ${result.user.displayName}!`,
        "/app-interface"
      );
    } catch (error) {
      console.error("Google Sign-In error:", error);
      toast.error("Google Sign-In failed. Try again.");
    }
  };

  // Guest Login
  const handleGuestLogin = () => {
    notifyAndNavigate("info", "You are Guest Now!!.", "/app-interface");
  };

  return (
    <div className="bg-gray-900 text-white flex min-h-screen items-center justify-center">
      {/* Toast Notification */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-[90%] sm:w-[320px] bg-white p-5 rounded-lg shadow-md text-gray-900 mt-[-40px] sm:mt-[-40px]">
        <div className="text-center">
          <img alt="GoVetrix" src={logo} className="mx-auto h-8 w-auto object-contain rounded-lg" />

          <h2 className="mt-2 text-xl font-bold">Login</h2>
        </div>

        {/* Form */}
        <form
          className="mt-4 space-y-4"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {Object.keys(formData).map((field) => (
            <div key={field} className="relative">
              <input
                id={field}
                name={field}
                type={field}
                value={formData[field]}
                onChange={handleChange}
                className={`peer block w-full rounded-md px-3 pb-2 pt-4 text-gray-900 bg-gray-50 border-0 border-b-2 focus:outline-none focus:ring-0 ${
                  errors[field]
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-600"
                }`}
                placeholder=" "
              />
              <label
                htmlFor={field}
                className="absolute left-3 top-3 text-gray-500 text-sm transform scale-75 -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {errors[field] && (
                <span className="text-red-500 text-xs">{errors[field]}</span>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-indigo-500 transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500 text-xs">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mt-3 w-full bg-red-500 text-white py-2 rounded-md text-sm font-semibold hover:bg-red-400 transition-all"
        >
          Sign in with Google
        </button>

        <button
          type="button"
          onClick={handleGuestLogin}
          className="mt-3 w-full bg-gray-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-gray-500 transition-all"
        >
          Sign in as Guest
        </button>

        <p className="mt-4 text-center text-xs text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:text-indigo-500 font-semibold"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
