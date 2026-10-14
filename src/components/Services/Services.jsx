
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "https://localhost:7109/api";

const fallbackIcons = ["✦", "◇", "⌂", "↗", "▤", "☼", "◈", "✎"];

function Services({ limit = 8, showViewAll = true }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/Service`);

        if (!response.ok) {
          throw new Error(`Failed to load services (${response.status})`);
        }

        const data = await response.json();

        setServices(
          Array.isArray(data) ? data : data?.data ?? data?.items ?? []
        );
      } catch (err) {
        setError(err.message || "Unable to load services.");
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  const visibleServices = services.slice(0, limit);

  return (
    <section
      id="services"
      className="bg-[#F7F5F0] py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#F5A623]" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#075E63]">
                What We Do
              </span>
            </div>

            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#073F43] sm:text-5xl lg:text-6xl">
              Everything your
              <br />
              <span className="text-[#075E63]">space needs.</span>
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-[#6B7373]">
            From the first idea to the final detail, NOVA brings design,
            furniture, and styling together to create spaces that feel
            beautiful and personal.
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <p className="mt-14 py-10 text-center text-[#6B7373]">
            Loading services...
          </p>
        ) : error ? (
          <p className="mt-14 py-10 text-center text-red-600">
            {error}
          </p>
        ) : visibleServices.length === 0 ? (
          <p className="mt-14 py-10 text-center text-[#6B7373]">
            No services available yet.
          </p>
        ) : (
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {visibleServices.map((service, index) => {
              const id = service.id ?? service.Id ?? index;
              const title = service.name ?? service.Name ?? service.title ?? service.Title;
              const description =
                service.description ?? service.Description ?? "";
              const icon =
                service.icon ?? service.Icon ?? fallbackIcons[index % fallbackIcons.length];

              return (
                <article
                  key={id}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-[#073F43]/10 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#F5A623]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#075E63]/10 text-lg text-[#075E63] transition-all duration-300 group-hover:bg-[#075E63] group-hover:text-white">
                      {icon}
                    </div>
                  </div>

                  <div className="relative z-10 mt-12">
                    <h3 className="text-xl font-semibold text-[#073F43]">
                      {title}
                    </h3>

                    <p className="mt-4 text-sm leading-6 text-[#7A8080]">
                      {description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-8 flex items-center gap-2 text-sm font-semibold text-[#075E63]">
                    Learn More
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>

                  <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-[#F5A623]/10 transition-transform duration-500 group-hover:scale-150" />
                </article>
              );
            })}
          </div>
        )}

        {showViewAll && !loading && !error && services.length > limit && (
          <div className="mt-8 text-center">
            <Link
              to="/services"
              className="inline-flex rounded-full border border-[#075E63] px-6 py-3 font-semibold text-[#075E63] transition hover:bg-[#f7d309] hover:text-white"
            >
              View All Services
            </Link>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-[1.75rem] bg-[#073F43] px-7 py-8 sm:px-10 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F5A623]">
              Have a project in mind?
            </p>

            <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              Let's make your space extraordinary.
            </h3>
          </div>

          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#F5A623] px-6 py-3.5 text-sm font-semibold text-[#073F43] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
          >
            Start a Project
            <span>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Services;
