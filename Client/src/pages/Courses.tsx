export default function Courses() {
  const courses = [
    "Drone Pilot Training",
    "Advanced Drone Training",
    "Professional Training",
  ];

  return (
    <main className="min-h-[100vh] bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-yellow-400">
            Learn & Grow
          </p>

          <h1 className="mt-2 text-4xl font-bold">Courses & Training</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {courses.map((course, index) => (
            <div
              key={course}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <p className="text-sm text-yellow-400">
                COURSE {String(index + 1).padStart(2, "0")}
              </p>

              <h2 className="mt-3 text-xl font-bold">{course}</h2>

              <p className="mt-3 text-gray-400">
                Learn practical drone skills and build your knowledge through
                structured training.
              </p>

              <button className="mt-6 rounded-lg bg-yellow-400 px-5 py-2 font-semibold text-black hover:bg-yellow-300 cursor-pointer">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
