import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/login", {
        email,
        password,
      });

      // JWT is stored in an HttpOnly cookie.
      // We do NOT use localStorage here.
      navigate("/admin");
    } catch (error) {
      console.error("Admin login failed:", error);
      alert("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] bg-black px-4 py-12 text-white">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Admin Login</h1>

          <p className="mt-2 text-gray-400">Login to manage enquiries</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl border border-zinc-800 bg-zinc-950 p-6"
        >
          <div>
            <label className="mb-2 block text-sm">Email</label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Admin email"
              className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">Password</label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 outline-none focus:border-yellow-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-yellow-400 px-4 py-3 font-semibold text-black hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
