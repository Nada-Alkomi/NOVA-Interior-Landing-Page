import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "https://localhost:7109/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");
  
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }


async function handleSubmit(event) {
  event.preventDefault();
  setError("");
  setSuccess("");
  setLoading(true);

  try {
    const response = await fetch(`${API_URL}/Auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.message || "Invalid email or password.");
    }

    if (!data?.token) {
      throw new Error("The server did not return an access token.");
    }

    // Save the token for the account that just logged in.
    localStorage.setItem("token", data.token);

    // Get the identity and role of the current user.
    const userResponse = await fetch(`${API_URL}/Auth/me`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });

    const user = await userResponse.json().catch(() => null);

    if (!userResponse.ok) {
      localStorage.removeItem("token");
      throw new Error("Could not verify your account. Please sign in again.");
    }
    if (!user?.userId) {
  localStorage.removeItem("token");
  throw new Error("Could not retrieve user information.");
}

localStorage.setItem("user", JSON.stringify(user));

    setSuccess(data.message || "Login successful!");

    if (user.role === "Admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  } catch (err) {
    setError(err.message || "Could not connect to the server.");
  } finally {
    setLoading(false);
  }
}


  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F5F0] px-5 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl sm:p-10">
        <Link
          to="/"
          className="text-3xl font-bold tracking-widest text-[#075E63]"
        >
          NOVA
        </Link>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-[#F5A623]">
          Welcome Back
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#073F43]">
          Sign in to your account
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Enter your email and password to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#073F43]"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="off"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#075E63] focus:ring-2 focus:ring-[#075E63]/10"
            />
          </div>

          
<div>
  <label
    htmlFor="password"
    className="mb-2 block text-sm font-semibold text-[#073F43]"
  >
    Password
  </label>

  <div className="relative">
    <input
      id="password"
      name="password"
      type={showPassword ? "text" : "password"}
      value={form.password}
      onChange={handleChange}
      placeholder="Enter your password"
      autoComplete="new-password"
      required
      className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 outline-none focus:border-[#075E63] focus:ring-2 focus:ring-[#075E63]/10"
    />

    <button
      type="button"
      onClick={() => setShowPassword((previous) => !previous)}
      aria-label={showPassword ? "Hide password" : "Show password"}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#075E63]"
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>
</div>


          {error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {success && (
            <p
              role="status"
              className="rounded-xl bg-green-50 p-3 text-sm text-green-700"
            >
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#075E63] px-5 py-3.5 font-semibold text-white transition hover:bg-[#073F43] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
         
<p className="mt-6 text-center text-sm text-gray-600">
  Don't have an account?{" "}
  <Link
    to="/register"
    className="font-semibold text-[#075E63] hover:underline"
  >
    Create Account
  </Link>
</p>

        </form>
      </div>
    </main>
  );
}

export default Login;