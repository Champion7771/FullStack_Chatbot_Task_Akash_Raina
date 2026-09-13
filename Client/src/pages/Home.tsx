import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="min-h-[100vh] bg-black text-white">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold tracking-widest text-yellow-400">
            DRONE<span className="text-red-500">TV</span>
          </p>

          <h1 className="text-5xl font-bold leading-tight md:text-6xl">
            Explore the World of
            <span className="text-yellow-400"> Drones</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-gray-400">
            Discover drone services, training programs and get answers through
            our support assistant.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/services"
              className="rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black hover:bg-yellow-300"
            >
              Explore Services
            </Link>

            <Link
              to="/chatbot"
              className="rounded-lg border border-yellow-400 px-6 py-3 font-semibold text-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              Chat With Us
            </Link>

            
          </div>
        </div>
      </section>
    </main>
  );
}
