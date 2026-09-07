const projects = [
  {
    title: "Modern Living",
    category: "Living Room",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Warm Bedroom",
    category: "Bedroom",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Elegant Kitchen",
    category: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
  },
];

function Projects() {
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

          <a
            href="#contact"
            className="w-fit rounded-full bg-[#075E63] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#073F43]"
          >
            View All Projects
          </a>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6">

  {/* Big Project */}
  <div className="relative h-[500px] overflow-hidden rounded-3xl">
    <img
      src={projects[0].image}
      alt={projects[0].title}
      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
    />

    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
      <p className="text-sm font-semibold uppercase text-[#F5A623]">
        {projects[0].category}
      </p>

      <h3 className="mt-1 text-2xl font-semibold text-white">
        {projects[0].title}
      </h3>
    </div>
  </div>

  {/* Two Small Projects */}
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
    {projects.slice(1, 3).map((project) => (
      <div
        key={project.title}
        className="relative h-[280px] overflow-hidden rounded-3xl"
      >
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />

        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-5">
          <p className="text-xs font-semibold uppercase text-[#F5A623]">
            {project.category}
          </p>

          <h3 className="mt-1 text-xl font-semibold text-white">
            {project.title}
          </h3>
        </div>
      </div>
    ))}
  </div>

</div>


        {/* Bottom text */}
        <div className="mt-10 flex flex-col gap-3 border-t border-[#073F43]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-sm leading-6 text-[#6B7373]">
            From cozy apartments to refined commercial spaces, NOVA creates
            interiors that balance beauty, comfort, and functionality.
          </p>

          <span className="text-sm font-medium text-[#073F43]">
            900+ projects worldwide
          </span>
        </div>
      </div>
    </section>
  );
}

export default Projects;