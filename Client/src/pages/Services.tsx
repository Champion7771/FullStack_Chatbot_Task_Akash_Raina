export default function Services() {
  const services = [
    {
      title: "Drone Services",
      description:
        "Professional drone solutions for commercial and business requirements.",
    },
    {
      title: "Aerial Photography",
      description:
        "Capture high-quality aerial images and videos using drone technology.",
    },
    {
      title: "Drone Training",
      description:
        "Learn drone operations and develop practical skills through training.",
    },
  ];

  return (
    <main className="min-h-[100vh] bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-yellow-400">
            What We Do
          </p>

          <h1 className="mt-2 text-4xl font-bold">Our Services</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <h2 className="text-xl font-bold text-yellow-400">
                {service.title}
              </h2>

              <p className="mt-3 text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
