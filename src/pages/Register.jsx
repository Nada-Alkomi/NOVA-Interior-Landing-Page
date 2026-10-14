import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "https://localhost:7109/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/Auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          data?.message ||
          data?.title ||
          (data?.errors
            ? Object.values(data.errors).flat().join(" ")
            : null) ||
          "Registration failed. Please check your information.";

        throw new Error(message);
      }

      setSuccess(data?.message || "Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.message || "Could not connect to the server."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#075E63] focus:ring-2 focus:ring-[#075E63]/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-[#073F43]";

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
          Join NOVA
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#073F43]">
          Create your account
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Sign up to discover our furniture and interior designs.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              required
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className={inputClass}
            />
          </div>

          {/* Phone */}
          <div>
  <label htmlFor="phone" className={labelClass}>
    Phone Number
  </label>

  <input
    id="phone"
    name="phone"
    type="tel"
    value={form.phone ?? ""}
    onChange={handleChange}
    placeholder="Enter your phone number"
    autoComplete="tel"
    required
    className={inputClass}
  />
</div>

          {/* Address */}
          <div>
            <label htmlFor="address" className={labelClass}>
              Address
            </label>

            <input
              id="address"
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter your address"
              autoComplete="street-address"
              required
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                autoComplete="new-password"
                required
                className={`${inputClass} pr-12`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#075E63]"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className={labelClass}
            >
              Confirm Password
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
                className={`${inputClass} pr-12`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((previous) => !previous)
                }
                aria-label={
                  showConfirmPassword
                    ? "Hide password"
                    : "Show password"
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#075E63]"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {/* Success Message */}
          {success && (
            <p
              role="status"
              className="rounded-xl bg-green-50 p-3 text-sm text-green-700"
            >
              {success}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#075E63] px-5 py-3.5 font-semibold text-white transition hover:bg-[#073F43] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#075E63] hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
