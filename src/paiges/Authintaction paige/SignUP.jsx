import { useContext, useState } from "react";
import { FaGraduationCap, FaLock } from "react-icons/fa";
import { MdEmail, MdSchool } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { createUser  } = useContext(AuthContext);
  const Navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;


    console.log(firstName, lastName, email, password, confirmPassword);
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    createUser(email, password)
      .then((result) => {
        console.log("User created:", result.user);
        if (result.user) {
          Navigate(location?.state ? location?.state : '/')
        }
        
      })
      .catch((error) => {
        console.error("Error creating user:", error.message);
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-green-300 to-green-100">
      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="bg-gray-100 p-3 rounded-full shadow-sm">
          <FaGraduationCap className="text-gray-700 text-2xl" />
        </div>
        <h1 className="text-2xl font-semibold mt-3">Join Student Hub</h1>
        <p className="text-gray-500 text-sm">
          Create your account and connect with students worldwide
        </p>
      </div>

      {/* Card */}
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-xl font-semibold text-center mb-6">Create Account</h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          Fill your details, sign up, and get started
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center border rounded-lg px-3">
              <BsPersonFill className="text-gray-400 mr-2" />
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                className="w-full p-2 outline-none"
                required
              />
            </div>
            <div className="flex items-center border rounded-lg px-3">
              <BsPersonFill className="text-gray-400 mr-2" />
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="w-full p-2 outline-none"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 mb-4">
            <MdEmail className="text-gray-400 mr-2" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="student@university.edu"
              className="w-full p-2 outline-none"
              required
            />
          </div>

          {/* University, Major, Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <select
              id="university"
              name="university"
              className="border rounded-lg p-2 w-full"
              required
            >
              <option value="">Select your university</option>
              <option value="Harvard">Harvard</option>
              <option value="MIT">MIT</option>
              <option value="Stanford">Stanford</option>
            </select>

            <select
              id="year"
              name="year"
              className="border rounded-lg p-2 w-full"
              required
            >
              <option value="">Select year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          <div className="mb-4">
            <select
              id="major"
              name="major"
              className="border rounded-lg p-2 w-full"
              required
            >
              <option value="">Select major</option>
              <option value="CS">Computer Science</option>
              <option value="Math">Mathematics</option>
              <option value="Physics">Physics</option>
            </select>
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg px-3 mb-4">
            <FaLock className="text-gray-400 mr-2" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              className="w-full p-2 outline-none"
              required
              minLength={6}
            />
            <button
              type="button"
              className="text-gray-400 text-sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border rounded-lg px-3 mb-4">
            <FaLock className="text-gray-400 mr-2" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-full p-2 outline-none"
              required
              minLength={6}
            />
            <button
              type="button"
              className="text-gray-400 text-sm"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Checkboxes */}
          <div className="flex items-center mb-2">
            <input type="checkbox" id="terms" className="mr-2" required />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input type="checkbox" id="newsletter" className="mr-2" />
            <label htmlFor="newsletter" className="text-sm text-gray-600">
              Subscribe to our newsletter for study tips & updates
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50 transition"
          >
            <FcGoogle className="text-xl" />
            Continue with University Login
          </button>

          {/* Already Have Account */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <NavLink to="/signin" className="text-black font-medium hover:underline">
              Sign in
            </NavLink>
          </p>
        </form>
      </div>

      {/* What you’ll get */}
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-lg mt-6">
        <h3 className="font-semibold mb-4">What you’ll get:</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>✅ Access to study groups and collaboration tools</li>
          <li>✅ Personalized academic resources and recommendations</li>
          <li>✅ Connect with students from your university</li>
          <li>✅ Track your academic progress and achievements</li>
        </ul>
      </div>
    </div>
  );
};

export default SignUp;
