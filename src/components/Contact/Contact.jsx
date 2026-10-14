import { useState } from "react";
import { Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://localhost:7109/api/Contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      const data = await response.json();

      setSuccess(data.message);

      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-[#F7F5F0] py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        <div className="grid overflow-hidden rounded-[2rem ] bg-[#073F43] lg:grid-cols-2">

          
          <div className="relative overflow-hidden px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">

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
                 <Phone size={20} />
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
                        <MapPin size={20} />
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

            <form onSubmit={handleSubmit} className="space-y-5">

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
                  value={formData.name}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#073F43]/10 bg-[#F7F5F0] px-4 py-3.5 text-sm text-[#243033] outline-none transition focus:border-[#075E63] focus:ring-2 focus:ring-[#075E63]/10"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-[#243033]"
                >
                  Project Type
                </label>

                <select
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#073F43]/10 bg-[#F7F5F0] px-4 py-3.5 text-sm text-[#243033] outline-none transition focus:border-[#075E63] focus:ring-2 focus:ring-[#075E63]/10"
                >
                  <option value="" disabled>
                    Select a project type
                  </option>

                  <option value="Interior Design">
                    Interior Design
                  </option>

                  <option value="Furniture">
                    Furniture
                  </option>

                  <option value="Home Decor">
                    Home Decor
                  </option>

                  <option value="Design Consultation">
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
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your space..."
                  className="w-full resize-none rounded-xl border border-[#073F43]/10 bg-[#F7F5F0] px-4 py-3.5 text-sm text-[#243033] outline-none transition focus:border-[#075E63] focus:ring-2 focus:ring-[#075E63]/10"
                />
              </div>

              {/* Messages */}
              {error && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              {success && (
                <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
                  {success}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#F5A623] px-6 py-4 text-sm font-semibold text-[#073F43] transition-all duration-300 hover:-translate-y-1 hover:bg-[#075E63] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}

                {!loading && (
                  <span className="text-lg">
                    ↗
                  </span>
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;