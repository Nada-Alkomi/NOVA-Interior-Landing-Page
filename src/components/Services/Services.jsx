const services = [
  {
    number: "01",
    title: "Interior Design",
    description:
      "Complete interior concepts created around your lifestyle, personality, and the way you use your space.",
    icon: "✦",
  },
  {
    number: "02",
    title: "Furniture",
    description:
      "Carefully selected furniture pieces that combine comfort, quality, and timeless contemporary design.",
    icon: "◇",
  },
  {
    number: "03",
    title: "Home Styling",
    description:
      "Transform your rooms with the right colors, textures, lighting, and decor details.",
    icon: "⌂",
  },
  {
    number: "04",
    title: "Design Consultation",
    description:
      "Get practical design advice and creative direction to make better decisions for your home.",
    icon: "↗",
  },
];

const Services = () => {
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
              <span className="text-[#075E63]">
                space needs.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-[#6B7373]">
            From the first idea to the final detail, NOVA brings design,
            furniture, and styling together to create spaces that feel
            beautiful and personal.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.number}
              className="group relative overflow-hidden rounded-[1.75rem] border border-[#073F43]/10 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Number */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#F5A623]">
                  {service.number}
                </span>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#075E63]/10 text-lg text-[#075E63] transition-all duration-300 group-hover:bg-[#075E63] group-hover:text-white">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-[#073F43]">
                  {service.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-[#7A8080]">
                  {service.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#075E63]">
                Learn More

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </div>

              {/* Decorative */}
              <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-[#F5A623]/10 transition-transform duration-500 group-hover:scale-150" />
            </article>
          ))}
        </div>

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

          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#F5A623] px-6 py-3.5 text-sm font-semibold text-[#073F43] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
          >
            Start a Project
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;