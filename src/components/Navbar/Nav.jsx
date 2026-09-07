import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Furniture", href: "#furniture" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => {
    setIsOpen(false);
    };

    return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-8">
        <nav
        className="
            mx-auto flex max-w-7xl items-center justify-between
            rounded-full border border-black/5
            bg-[#F7F5F0]/90 px-5 py-3
            shadow-sm backdrop-blur-md
            lg:px-7
        "
        >
        {/* Logo */}
        <a
            href="#home"
            className="group flex items-center gap-2"
            onClick={closeMenu}
        >
            <span
  className="
    flex h-10 w-10 items-center justify-center
    rounded-full bg-[#075E63]
    text-sm font-bold text-white
    transition-all duration-500
    group-hover:rotate-12
    group-hover:bg-[#F5A623]
    group-hover:text-[#073F43]
    group-hover:scale-110
  "
>
  N
</span>

            <span
  className="
    text-xl font-bold tracking-[0.2em]
    text-[#073F43]
    transition-all duration-500
    group-hover:text-[#F5A623]
    group-hover:tracking-[0.3em]
  "
>
  NOVA
</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
            <a
                key={link.name}
                href={link.href}
                className="
                relative text-sm font-medium text-[#243033]
                transition-colors duration-300
                hover:text-[#075E63]
                after:absolute after:-bottom-1 after:left-0
                after:h-[2px/] after:w-0
                after:bg-[#F5A623]
                after:transition-all after:duration-300
                hover:after:w-full
                hover:color-[#F5A623]
                "
            >
                {link.name}
            </a>
            ))}
        </div>

        {/* Desktop CTA */}
        <a
            href="#contact"
            className="
            hidden items-center gap-2
            rounded-full bg-[#F5A623]
            px-5 py-3
            text-sm font-semibold text-[#073F43]
            transition-all duration-300
            hover:-translate-y-0.5
            hover:bg-[#073F43]
            hover:text-white
            lg:flex
            "
        >
            Get Started
            <ArrowUpRight size={17} />
        </a>

        {/* Mobile Button */}
        <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen(!isOpen)}
            className="
            flex h-10 w-10 items-center justify-center
            rounded-full bg-[#075E63]
            text-white transition-colors
            hover:bg-[#073F43]
            lg:hidden
            "
        >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        </nav>

      {/* Mobile Menu */}
        <div
        className={`
            mx-4 mt-2 overflow-hidden rounded-3xl
            border border-black/5
            bg-[#F7F5F0]/95
            shadow-lg backdrop-blur-md
            transition-all duration-300
            lg:hidden
            ${
            isOpen
                ? "max-h-[500px/] p-5 opacity-100"
                : "max-h-0 p-0 opacity-0"
            }
        `}
        >
        <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
            <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="
                rounded-2xl px-4 py-3
                text-sm font-medium text-[#243033]
                transition-all duration-300
                hover:bg-[#075E63]
                hover:text-white
                "
            >
                {link.name}
            </a>
            ))}

            <a
            href="#contact"
            onClick={closeMenu}
            className="
                mt-2 flex items-center justify-center gap-2
                rounded-2xl bg-[#F5A623]
                px-4 py-3
                text-sm font-semibold text-[#073F43]
                transition-all duration-300
                hover:bg-[#073F43]
                hover:text-white
            "
        >
            Get Started
            <ArrowUpRight size={17} />
            </a>
        </div>
        </div>
    </header>
    );
}