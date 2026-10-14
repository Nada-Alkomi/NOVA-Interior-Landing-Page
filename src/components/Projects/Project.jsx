
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "https://localhost:7109/api";

function Projects({ limit = 8, showViewAll = true }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/Project`);

        if (!response.ok) {
          throw new Error(`Failed to load projects (${response.status})`);
        }

        const data = await response.json();

        setProjects(Array.isArray(data) ? data : data?.data ?? []);
      } catch (err) {
        setError(err.message || "Unable to load projects.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const visibleProjects = projects.slice(0, limit);

  return (
    <section
      id="projects"
      className="bg-[#F7F5F0] px-5 py-20 sm:px-8 md:py-28 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#F5A623]">
              Our Projects
            </p>

            <h2 className="text-3xl font-bold leading-tight text-[#073F43] sm:text-4xl md:text-5xl">
              Spaces designed to
              <span className="block text-[#075E63]">
                inspire everyday living.
              </span>
            </h2>
          </div>

          {showViewAll && (
            <Link
              to="/projects"
              className="w-fit rounded-full bg-[#075E63] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#cec40c]"
            >
              View All Projects
            </Link>
          )}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <p className="py-12 text-center text-[#6B7373]">
            Loading projects...
          </p>
        ) : error ? (
          <p className="py-12 text-center text-red-600">{error}</p>
        ) : visibleProjects.length === 0 ? (
          <p className="py-12 text-center text-[#6B7373]">
            No projects available yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {/* Big Project */}
            <div className="group relative h-[350px] overflow-hidden rounded-3xl sm:h-[500px]">
              <img
                src={visibleProjects[0].imageUrl || visibleProjects[0].ImageUrl}
                alt={visibleProjects[0].name || visibleProjects[0].Name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                  {visibleProjects[0].name || visibleProjects[0].Name}
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/80">
                  {visibleProjects[0].description ||
                    visibleProjects[0].Description}
                </p>
              </div>
            </div>

            {/* Remaining Projects */}
            {visibleProjects.length > 1 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {visibleProjects.slice(1).map((project) => (
                  <article
                    key={project.id ?? project.Id}
                    className="group relative h-[280px] overflow-hidden rounded-3xl"
                  >
                    <img
                      src={project.imageUrl || project.ImageUrl}
                      alt={project.name || project.Name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    <div className="absolute bottom-0 left-0 w-full p-5">
                      <h3 className="text-xl font-semibold text-white">
                        {project.name || project.Name}
                      </h3>

                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/80">
                        {project.description || project.Description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bottom text */}
        <div className="mt-10 flex flex-col gap-3 border-t border-[#073F43]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-sm leading-6 text-[#6B7373]">
            From cozy apartments to refined commercial spaces, NOVA creates
            interiors that balance beauty, comfort, and functionality.
          </p>

          <span className="text-sm font-medium text-[#073F43]">
            {projects.length} projects
          </span>
        </div>
      </div>
    </section>
  );
}

export default Projects;
