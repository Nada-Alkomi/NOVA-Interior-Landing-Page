
import { useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  LogIn,
  UserRound,
  LogOut,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Furniture", path: "/furniture" },
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function getToken() {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("Token") ||
    localStorage.getItem("accessToken")
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(getToken()));

  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("Token");
    localStorage.removeItem("accessToken");

    setIsLoggedIn(false);
    closeMenu();
    navigate("/");
  }

  // Recheck the token when the user returns to the page.
  // Login should also notify the navbar after saving the token.
  window.addEventListener;

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-black/5 bg-[#F7F5F0]/90 px-5 py-3 shadow-sm backdrop-blur-md lg:px-7">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex items-center gap-2"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#075E63] text-sm font-bold text-white transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-[#F5A623] group-hover:text-[#073F43]">
            N
          </span>

          <span className="text-xl font-bold tracking-[0.2em] text-[#073F43] transition-all duration-500 group-hover:text-[#F5A623]">
            NOVA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-[#F5A623] after:transition-all after:duration-300 ${
                  isActive
                    ? "text-[#075E63] after:w-full"
                    : "text-[#243033] after:w-0 hover:text-[#075E63] hover:after:w-full"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                title="My Profile"
                aria-label="My Profile"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#075E63]/20 text-[#075E63] transition hover:bg-[#075E63] hover:text-white"
              >
                <UserRound size={20} />
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
              >
                <LogOut size={17} />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "border-[#075E63] bg-[#075E63] text-white"
                      : "border-[#075E63]/20 text-[#075E63] hover:bg-[#075E63]/10"
                  }`
                }
              >
                <LogIn size={17} />
                Login
              </NavLink>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#F5A623] px-5 py-3 text-sm font-semibold text-[#073F43] transition hover:-translate-y-0.5 hover:bg-[#073F43] hover:text-white"
              >
                Get Started
                <ArrowUpRight size={17} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#075E63] text-white transition-colors hover:bg-[#073F43] lg:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`mx-4 mt-2 overflow-hidden rounded-3xl border border-black/5 bg-[#F7F5F0]/95 shadow-lg backdrop-blur-md transition-all duration-300 lg:hidden ${
          isOpen
            ? "max-h-[700px] p-5 opacity-100"
            : "max-h-0 p-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#075E63] text-white"
                    : "text-[#243033] hover:bg-[#075E63] hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                onClick={closeMenu}
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl border border-[#075E63] px-4 py-3 font-semibold text-[#075E63] hover:bg-[#075E63] hover:text-white"
              >
                <UserRound size={18} />
                My Profile
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 rounded-2xl border border-red-200 px-4 py-3 font-semibold text-red-600 hover:bg-red-600 hover:text-white"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl border border-[#075E63] px-4 py-3 font-semibold text-[#075E63] hover:bg-[#075E63] hover:text-white"
              >
                <LogIn size={17} />
                Login
              </Link>

              <Link
                to="/contact"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#F5A623] px-4 py-3 text-sm font-semibold text-[#073F43] hover:bg-[#073F43] hover:text-white"
              >
                Get Started
                <ArrowUpRight size={17} />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
