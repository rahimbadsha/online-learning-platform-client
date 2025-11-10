// src/pages/Register.jsx
import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const validatePassword = (pass) => {
    if (!/[A-Z]/.test(pass))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(pass))
      return "Password must contain at least one lowercase letter";
    if (pass.length < 6) return "Password must be at least 6 characters long";
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const validationError = validatePassword(password);
    if (validationError) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: validationError,
      });
    }

    try {
      const result = await createUser(email, password);
      await updateUser({ displayName: name, photoURL });

      // Save to server
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, photoURL, role: "student" }),
      });

      Swal.fire({
        icon: "success",
        title: "Registered successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "student",
        }),
      });

      Swal.fire({
        icon: "success",
        title: "Logged in with Google!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lightBg">
      <div className="card w-full max-w-md shadow-lg bg-base-100 p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Photo URL"
            className="input input-bordered w-full"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleRegister}
          className="btn btn-outline w-full flex items-center justify-center"
        >
          Register with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
