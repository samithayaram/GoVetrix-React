import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from '../assets/logo.png';

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  // Validation function
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "username":
        if (!value.trim()) error = "Username is required.";
        else if (value.length < 3) error = "Username must be at least 3 characters.";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) error = "Email is required.";
        else if (!emailRegex.test(value)) error = "Enter a valid email.";
        break;
      case "mobile":
        const mobileRegex = /^[0-9]{10}$/;
        if (!value.trim()) error = "Mobile number is required.";
        else if (!mobileRegex.test(value)) error = "Enter a valid 10-digit mobile number.";
        break;
      case "password":
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        if (!value.trim()) error = "Password is required.";
        else if (!passwordRegex.test(value)) {
          error = "Password must be at least 6 characters & include a number & special character.";
        }
        break;
      case "terms":
        if (!value) error = "You must agree to the terms.";
        break;
      default:
        break;
    }
    return error;
  };

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue) }));
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const { email, password, username, mobile, terms } = formData;

        // Firebase Authentication
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;

        if (user?.uid) {
          await setDoc(doc(db, "userData", user.uid), {
            username,
            email,
            mobile,
            terms,
            createdAt: new Date(),
          });

          toast.success("Registration successful!");

          // Reset form fields
          setFormData({
            username: "",
            email: "",
            mobile: "",
            password: "",
            terms: false,
          });
        } else {
          throw new Error("User ID is undefined.");
        }
      } catch (err) {
        console.error("Error during registration:", err.message);
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white flex min-h-screen items-center justify-center pt-5 sm:pt-0">
  <div className="w-[90%] sm:w-[320px] bg-white p-5 rounded-lg shadow-md text-gray-900">
    <ToastContainer position="top-right" autoClose={3000} />

    <div className="text-center">
      <img alt="GoVetrix" src={logo} className="mx-auto h-8 w-auto object-contain rounded-lg" />
      <h2 className="mt-2 text-xl font-bold">Create an Account</h2>
    </div>

    <form className="mt-3 space-y-3" autoComplete="off" onSubmit={handleSubmit}>
      {["username", "email", "mobile", "password"].map((id) => (
        <div key={id} className="relative">
          <input
            id={id}
            name={id}
            type={id === "password" ? "password" : "text"}
            value={formData[id]}
            onChange={handleChange}
            className={`peer block w-full rounded-md px-3 pb-2 pt-4 text-gray-900 bg-gray-50 border-0 border-b-2 ${
              errors[id] ? "border-red-500" : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600`}
            placeholder=" "
          />
          <label
            htmlFor={id}
            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-300 transform scale-75 -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600"
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </label>
          {errors[id] && <span className="text-red-500 text-xs">{errors[id]}</span>}
        </div>
      ))}

      <div className="flex items-center space-x-2">
        <input
          id="terms"
          type="checkbox"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
          className="w-4 h-4 rounded border-gray-300"
        />
        <label htmlFor="terms" className="text-xs">
          I agree to the <span className="text-indigo-600 font-semibold">Terms & Conditions</span>
        </label>
      </div>

      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md">
        Sign Up
      </button>
    </form>

    <p className="mt-3 text-center text-xs">
      Already have an account? <Link to="/login" className="text-indigo-600">Login here</Link>
    </p>
  </div>
</div>

  );
};

export default Register;