import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="border-b border-yellow-400 bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="shrink-0 text-2xl font-bold"
        >
          <span className="text-yellow-400">DRONE</span>
          <span className="text-red-500">TV</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link to="/" className="hover:text-yellow-400">
            Home
          </Link>

          <Link to="/services" className="hover:text-yellow-400">
            Services
          </Link>

          <Link to="/courses" className="hover:text-yellow-400">
            Courses
          </Link>

          <Link to="/chatbot" className="hover:text-yellow-400">
            Chat
          </Link>

          <Link to="/contact" className="hover:text-yellow-400">
            Contact
          </Link>

          <Link to="/admin-login" className="hover:text-green-400">
            Admin
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-md border border-zinc-700 px-3 py-2 text-xl text-white md:hidden"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="border-t border-zinc-800 px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-3">
            <Link
              to="/"
              onClick={closeMenu}
              className="rounded-md px-3 py-3 hover:bg-zinc-900 hover:text-yellow-400"
            >
              Home
            </Link>

            <Link
              to="/services"
              onClick={closeMenu}
              className="rounded-md px-3 py-3 hover:bg-zinc-900 hover:text-yellow-400"
            >
              Services
            </Link>

            <Link
              to="/courses"
              onClick={closeMenu}
              className="rounded-md px-3 py-3 hover:bg-zinc-900 hover:text-yellow-400"
            >
              Courses
            </Link>

            <Link
              to="/chatbot"
              onClick={closeMenu}
              className="rounded-md px-3 py-3 hover:bg-zinc-900 hover:text-yellow-400"
            >
              Chat
            </Link>

            <Link
              to="/contact"
              onClick={closeMenu}
              className="rounded-md px-3 py-3 hover:bg-zinc-900 hover:text-yellow-400"
            >
              Contact
            </Link>

            <Link
              to="/admin-login"
              onClick={closeMenu}
              className="rounded-md px-3 py-3 hover:bg-zinc-900 hover:text-green-400"
            >
              Admin
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
