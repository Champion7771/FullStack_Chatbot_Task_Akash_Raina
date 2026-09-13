import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b border-yellow-400 bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-4">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-yellow-400 ">DRONE</span>
          <span className="text-red-500">TV</span>
        </Link>

        <nav className="flex gap-6 text-sm">
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
      </div>
    </header>
  );
}
