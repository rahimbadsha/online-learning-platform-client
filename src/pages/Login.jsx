// src/pages/Login.jsx
import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);

      Swal.fire({
        icon: "success",
        title: "Logged in successfully!",
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

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      // Optional: send user info to server
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
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-primary font-semibold">
            Register
          </Link>
        </p>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex items-center justify-center"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
