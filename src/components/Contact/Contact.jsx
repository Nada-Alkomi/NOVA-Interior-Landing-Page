const Contact = () => {
  return (
    <section
      id="contact"
      className="bg-[#F7F5F0] py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        <div className="grid overflow-hidden rounded-[2rem] bg-[#073F43] lg:grid-cols-2">

          {/* Left Content */}
          <div className="relative overflow-hidden px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">

            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#075E63] opacity-40" />

            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#F5A623] opacity-10" />

            <div className="relative z-10">

              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-[#F5A623]" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F5A623]">
                  Get In Touch
                </span>
              </div>

              <h2 className="max-w-lg text-4xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-5xl">
                Let's create a space
                <br />
                <span className="text-[#F5A623]">
                  you love.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-white/70">
                Have a project in mind? Tell us about your space, your style,
                and what you're looking for. We'd love to help bring your
                vision to life.
              </p>

              {/* Contact Info */}
              <div className="mt-10 space-y-5">

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#F5A623]">
                    @
                  </div>

                  <div>
                    <p className="text-xs text-white/50">
                      Email
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      hello@nova-design.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#F5A623]">
                    ☎
                  </div>

                  <div>
                    <p className="text-xs text-white/50">
                      Phone
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      +20 100 000 0000
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#F5A623]">
                    ◉
                  </div>

                  <div>
                    <p className="text-xs text-white/50">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      Cairo, Egypt
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">

            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#073F43]">
                Start a conversation
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#7A8080]">
                Fill out the form and we'll get back to you soon.
              </p>
            </div>

            <form className="space-y-5">

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-[#243033]"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-[#073F43]/10 bg-[#F7F5F0] px-4 py-3.5 text-sm text-[#243033] outline-none transition focus:border-[#075E63] focus:ring-2 focus:ring-[#075E63]/10"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#243033]"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#073F43]/10 bg-[#F7F5F0] px-4 py-3.5 text-sm text-[#243033] outline-none transition focus:border-[#075E63] focus:ring-2 focus:ring-[#075E63]/10"
                />
              </div>

              {/* Project Type */}
              <div>
                <label
                  htmlFor="project"
                  className="mb-2 block text-sm font-medium text-[#243033]"
                >
                  Project Type
                </label>

                <select
                  id="project"
                  className="w-full rounded-xl border border-[#073F43]/10 bg-[#F7F5F0] px-4 py-3.5 text-sm text-[#243033] outline-none transition focus:border-[#075E63] focus:ring-2 focus:ring-[#075E63]/10"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a project type
                  </option>

                  <option value="interior">
                    Interior Design
                  </option>

                  <option value="furniture">
                    Furniture
                  </option>

                  <option value="decor">
                    Home Decor
                  </option>

                  <option value="consultation">
                    Design Consultation
                  </option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-[#243033]"
                >
                  Tell Us About Your Project
                </label>

                <textarea
                  id="message"
                  rows="4"
                  placeholder="Tell us about your space..."
                  className="w-full resize-none rounded-xl border border-[#073F43]/10 bg-[#F7F5F0] px-4 py-3.5 text-sm text-[#243033] outline-none transition focus:border-[#075E63] focus:ring-2 focus:ring-[#075E63]/10"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#F5A623] px-6 py-4 text-sm font-semibold text-[#073F43] transition-all duration-300 hover:-translate-y-1 hover:bg-[#075E63] hover:text-white"
              >
                Send Message
                <span className="text-lg">
                  ↗
                </span>
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;