import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL || "https://localhost:7109/api";

function ContactInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInquiries() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/Contact`);

        if (!response.ok) {
          throw new Error("Failed to load contact inquiries.");
        }

        const result = await response.json();
        const data = Array.isArray(result) ? result : result.data;

        setInquiries(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    loadInquiries();
  }, []);

  async function openInquiry(inquiry) {
    setSelected(inquiry);

    if (!inquiry.id) return;

    try {
      const response = await fetch(
        `${API_URL}/Contact/${inquiry.id}`
      );

      if (!response.ok) return;

      const result = await response.json();
      setSelected(result.data ?? result);
    } catch {
      // Keep the inquiry already loaded in the list.
    }
  }

  function formatDate(value) {
    if (!value) return "Date unavailable";

    const date = new Date(value);

    return Number.isNaN(date.getTime())
      ? "Date unavailable"
      : date.toLocaleString();
  }

  return (
    <section className="min-h-screen bg-[#F7F5F0] p-5 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5A623]">
          NOVA Admin
        </p>

        <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#073F43]">
              Contact Inquiries
            </h1>
            <p className="mt-2 text-[#6B7373]">
              Messages received from your website visitors.
            </p>
          </div>

          <span className="w-fit rounded-full bg-[#075E63]/10 px-4 py-2 text-sm font-semibold text-[#075E63]">
            {inquiries.length} messages
          </span>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
          >
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center text-[#6B7373]">
            Loading messages...
          </div>
        ) : inquiries.length === 0 && !error ? (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-[#073F43]">
              No messages yet
            </h2>
            <p className="mt-2 text-[#6B7373]">
              Contact messages will appear here when visitors submit the form.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_0.9fr]">
            {/* Messages List */}
            <div className="space-y-4">
              {inquiries.map((inquiry) => (
                <button
                  key={inquiry.id}
                  type="button"
                  onClick={() => openInquiry(inquiry)}
                  className={`w-full rounded-2xl border bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                    selected?.id === inquiry.id
                      ? "border-[#075E63] shadow-sm"
                      : "border-[#073F43]/10"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="font-bold text-[#073F43]">
                        {inquiry.name || inquiry.fullName || "Website visitor"}
                      </h2>
                      <p className="mt-1 break-all text-sm text-[#075E63]">
                        {inquiry.email || "No email provided"}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs text-[#6B7373]">
                      #{inquiry.id}
                    </span>
                  </div>

                  <p className="mt-4 font-semibold text-[#073F43]">
                    {inquiry.subject || "No subject"}
                  </p>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6B7373]">
                    {inquiry.message || inquiry.content || ""}
                  </p>

                  <p className="mt-4 text-xs text-[#6B7373]">
                    {formatDate(
                      inquiry.createdAt || inquiry.createdDate
                    )}
                  </p>
                </button>
              ))}
            </div>

            {/* Message Details */}
            <aside className="rounded-2xl border border-[#073F43]/10 bg-white p-6 sm:p-8">
              {selected ? (
                <>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F5A623]">
                    Message Details
                  </p>

                  <h2 className="mt-3 break-words text-2xl font-bold text-[#073F43]">
                    {selected.subject || "No subject"}
                  </h2>

                  <div className="mt-6 space-y-5">
                    <div>
                      <p className="text-sm text-[#6B7373]">Name</p>
                      <p className="mt-1 font-semibold text-[#073F43]">
                        {selected.name || selected.fullName || "Not provided"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-[#6B7373]">Email</p>
                      {selected.email ? (
                        <a
                          href={`mailto:${selected.email}`}
                          className="mt-1 block break-all font-semibold text-[#075E63] underline"
                        >
                          {selected.email}
                        </a>
                      ) : (
                        <p className="mt-1 text-[#073F43]">Not provided</p>
                      )}
                    </div>

                    <div>
                      <p className="text-sm text-[#6B7373]">Received</p>
                      <p className="mt-1 text-[#073F43]">
                        {formatDate(
                          selected.createdAt || selected.createdDate
                        )}
                      </p>
                    </div>

                    <div className="border-t border-gray-100 pt-5">
                      <p className="text-sm text-[#6B7373]">Message</p>
                      <p className="mt-2 whitespace-pre-wrap break-words leading-7 text-[#073F43]">
                        {selected.message || selected.content || "No message content"}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-12 text-center">
                  <h2 className="text-lg font-semibold text-[#073F43]">
                    Select a message
                  </h2>
                  <p className="mt-2 text-sm text-[#6B7373]">
                    Choose a message from the list to read its details.
                  </p>
                </div>
              )}
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

export default ContactInquiries;