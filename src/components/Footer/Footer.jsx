const Footer = () => {
  const navigation = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Furniture", href: "#furniture" },
    { name: "Tips", href: "#tips" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Interior Design",
    "Furniture",
    "Home Styling",
    "Decor Consultation",
  ];

  return (
    <footer className="bg-[#073F43] text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Main Footer */}
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">

          {/* Brand */}
          <div>
            <a
              href="#home"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5A623] text-lg font-bold text-[#073F43]">
                N
              </span>

              <span className="text-2xl font-bold tracking-[0.2em]">
                NOVA
              </span>
            </a>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
              Modern furniture, thoughtful interiors, and timeless decor
              ideas designed to make your space feel like home.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm transition hover:border-[#F5A623] hover:bg-[#F5A623] hover:text-[#073F43]"
              >
                IG
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm transition hover:border-[#F5A623] hover:bg-[#F5A623] hover:text-[#073F43]"
              >
                FB
              </a>

              <a
                href="#"
                aria-label="Pinterest"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm transition hover:border-[#F5A623] hover:bg-[#F5A623] hover:text-[#073F43]"
              >
                PI
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#F5A623]">
              Explore
            </h3>

            <ul className="mt-6 space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#F5A623]">
              Services
            </h3>

            <ul className="mt-6 space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#contact"
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#F5A623]">
              Let's Talk
            </h3>

            <p className="mt-6 text-sm leading-6 text-white/60">
              Ready to transform your space?
              <br />
              We'd love to hear from you.
            </p>

            <a
              href="mailto:hello@nova-design.com"
              className="mt-5 inline-block text-sm font-medium text-white transition hover:text-[#F5A623]"
            >
              hello@nova-design.com
            </a>

            <a
              href="tel:+201000000000"
              className="mt-2 block text-sm text-white/60 transition hover:text-white"
            >
              +20 100 000 0000
            </a>

            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F5A623] px-5 py-3 text-sm font-semibold text-[#073F43] transition hover:-translate-y-1 hover:bg-white"
            >
              Start a Project
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} NOVA. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a
              href="#"
              className="transition hover:text-white"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;