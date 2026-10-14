import aboutMain from "../../assets/image/f05cff3c9f272c13bda6d5804ecb27a7.jpg";
import aboutSmall from "../../assets/image/0bf7fc677ff966b88f2f87dbcfdb44cc.jpg";


const About = () => {
  return (
    <section
      id="about"
      className="bg-white py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Images */}
          <div className="relative">
            
            {/* Main Image */}
            <div className="overflow-hidden rounded-[2rem/] bg-[#E7E2D8] shadow-xl">
              <img
                src={aboutMain}
                alt="Modern interior designed by NOVA"
                className="h-[420px/] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[520px/]"
              />
            </div>

            {/* Small Image */}
            <div className="absolute -bottom-8 -right-4 w-40 overflow-hidden rounded-2xl border-8 border-white shadow-xl sm:-right-8 sm:w-52">
              <img
                src={aboutSmall}
                alt="NOVA interior details"
                className="h-48 w-full object-cover sm:h-60"
              />
            </div>

            {/* Number Card */}
            <div className="absolute left-4 top-4 rounded-2xl bg-[#075E63] px-5 py-4 text-white shadow-lg">
              <p className="text-3xl font-bold">15+</p>
              <p className="text-xs text-white/70">
                Years of Experience
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-4">

            {/* Label */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#F5A623]" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#075E63]">
                About NOVA
              </span>
            </div>

            {/* Heading */}
            <h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#073F43] sm:text-5xl">
              We create spaces
              <br />
              <span className="text-[#075E63]">
                made for living.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-[#6B7373]">
              At NOVA, we believe great interiors are more than beautiful
              rooms. They are spaces that reflect your personality, support
              your lifestyle, and make everyday moments feel special.
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#6B7373]">
              From complete interior concepts to carefully selected furniture
              and decor, our team combines modern design with warmth,
              functionality, and timeless details.
            </p>

            {/* Features */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2">

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F5A623]/15 text-lg text-[#075E63]">
                  ✦
                </div>

                <div>
                  <h3 className="font-semibold text-[#073F43]">
                    Thoughtful Design
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#7A8080]">
                    Every detail has a purpose.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#075E63]/10 text-lg text-[#075E63]">
                  ◇
                </div>

                <div>
                  <h3 className="font-semibold text-[#073F43]">
                    Timeless Style
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#7A8080]">
                    Designs that stay beautiful.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#075E63]/10 text-lg text-[#075E63]">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold text-[#073F43]">
                    Built Around You
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#7A8080]">
                    Your lifestyle comes first.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F5A623]/15 text-lg text-[#075E63]">
                  ↗
                </div>

                <div>
                  <h3 className="font-semibold text-[#073F43]">
                    Quality First
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#7A8080]">
                    Materials chosen to last.
                  </p>
                </div>
              </div>

            </div>

            {/* Button */}
            <a
              href="#projects"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#F5A623] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#075E63]"
            >
              Discover Our Work

              <span className="text-lg text-[#F5A623]">
                ↗
              </span>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;