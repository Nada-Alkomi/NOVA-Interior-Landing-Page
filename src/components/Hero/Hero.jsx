import heroImage from "../../assets/image/6f30765f909f2d7c2777571e85c899f3.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#F7F5F0] pt-32 pb-16 sm:pt-36 lg:pt-40"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">

          {/* Content */}
          <div className="max-w-xl">

            {/* Small label */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#075E63]/15 bg-white px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#F5A623]" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#075E63]">
                Modern Interior & Furniture
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#073F43] sm:text-6xl lg:text-7xl">
              Make Your
              <br />

              <span className="text-[#075E63]">
                Space Feel
              </span>

              <br />

              Like Home.
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-lg text-base leading-7 text-[#6B7373] sm:text-lg">
              Discover timeless furniture, inspiring interiors, and thoughtful
              decor ideas designed to make every corner of your home feel
              beautiful and uniquely yours.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-3 rounded-full bg-[#F5A623] px-6 py-3.5 text-sm font-semibold text-[#073F43] transition-all duration-300 hover:-translate-y-1 hover:bg-[#073F43] hover:text-white"
              >
                Explore Projects

                <span className="text-lg">↗</span>
              </a>

              <a
                href="#furniture"
                className="inline-flex items-center gap-2 rounded-full border border-[#073F43]/20 bg-transparent px-6 py-3.5 text-sm font-semibold text-[#073F43] transition-all duration-300 hover:border-[#075E63] hover:bg-[#075E63] hover:text-white"
              >
                Explore Furniture
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap gap-8 border-t border-[#073F43]/10 pt-7">
              <div>
                <p className="text-2xl font-bold text-[#073F43]">
                  900+
                </p>

                <p className="mt-1 text-xs text-[#6B7373]">
                  Design Projects
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-[#073F43]">
                  15+
                </p>

                <p className="mt-1 text-xs text-[#6B7373]">
                  Years Experience
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-[#073F43]">
                  4.9/5
                </p>

                <p className="mt-1 text-xs text-[#6B7373]">
                  Client Rating
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">

            {/* Decorative background */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#F5A623]/20 blur-3xl" />

            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#075E63]/15 blur-3xl" />

            {/* Main image */}
            <div className="relative overflow-hidden rounded-[2rem] bg-[#E7E2D8] shadow-xl">
  <img
    src={heroImage}
    alt="Modern NOVA interior"
    className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[520px] lg:h-[600px]"
  />
</div>

              {/* Image overlay card */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between rounded-2xl border border-white/30 bg-white/85 p-4 backdrop-blur-md sm:p-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#075E63]">
                    Featured Space
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-[#073F43]">
                    Warm Minimal Living
                  </h2>
                </div>

                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5A623] text-lg text-[#073F43]">
                  ↗
                </span>
              </div>
            </div>

            {/* Floating card */}
            {/* <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-black/5 bg-white p-4 shadow-lg sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#075E63] text-sm font-bold text-white">
                  N
                </div>

                <div>
                  <p className="text-xs text-[#6B7373]">
                    Designed by
                  </p>

                  <p className="text-sm font-semibold text-[#073F43]">
                    NOVA Studio
                  </p>
                </div>
              </div>
            </div> */}

          </div>
        </div>
      
    </section>

  );  
};

export default Hero;