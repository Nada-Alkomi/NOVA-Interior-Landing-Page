import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL || "https://localhost:7109/api";

const emptyForm = {
  name: "",
  description: "",
  icon: "✦",
};

function ServicesManagement() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


async function request(url, options = {}) {
  const tokenKeys = ["token", "Token", "accessToken"];
  let token = null;

  for (const key of tokenKeys) {
    const value = localStorage.getItem(key);

    if (value) {
      token = value;
      break;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.body
        ? { "Content-Type": "application/json" }
        : {}),
      ...options.headers,
      ...(token
        ? { Authorization: `Bearer ${token}` }
        : {}),
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(
        "Session expired or token missing. Please log in again."
      );
    }

    if (response.status === 403) {
      throw new Error(
        "Access denied. Admin permissions are required."
      );
    }

    const message = await response.text();
    throw new Error(
      message || `Request failed: ${response.status}`
    );
  }

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}


  async function loadServices() {
    setLoading(true);
    setError("");

    try {
      const data = await request(`${API_URL}/Service`);
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        "Couldn't load services. Check the API endpoint and make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleEdit(service) {
    setEditingId(service.id);
    setForm({
      name: service.name ?? service.title ?? "",
      description: service.description ?? "",
      icon: service.icon ?? "✦",
    });
    setError("");
    setSuccess("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        icon: form.icon.trim(),
      };

      const url = editingId
        ? `${API_URL}/Service/${editingId}`
        : `${API_URL}/Service`;

      await request(url, {
        method: editingId ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });

      setSuccess(
        editingId
          ? "Service updated successfully."
          : "Service added successfully."
      );

      resetForm();
      await loadServices();
    } catch (err) {
      setError(
        err.message || "Couldn't save the service. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await request(`${API_URL}/Service/${id}`, {
        method: "DELETE",
      });

      setServices((previous) =>
        previous.filter((service) => service.id !== id)
      );
      setSuccess("Service deleted successfully.");

      if (editingId === id) resetForm();
    } catch (err) {
      setError(err.message || "Couldn't delete the service.");
    }
  }

  return (
    <section className="min-h-screen bg-[#F7F5F0] p-5 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5A623]">
            NOVA Admin
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#073F43]">
            Services Management
          </h1>
          <p className="mt-2 text-[#6B7373]">
            Add, edit, and manage your interior design services.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
          >
            {success}
          </div>
        )}

        <div className="grid items-start gap-8 lg:grid-cols-[360px_1fr]">
          {/* Add / Edit Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#073F43]/10 bg-white p-6 shadow-sm"
          >
            <h2 className="mb-6 text-xl font-bold text-[#073F43]">
              {editingId ? "Edit Service" : "Add New Service"}
            </h2>

            <label className="mb-2 block text-sm font-semibold text-[#073F43]">
              Service Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              maxLength={150}
              placeholder="e.g. Interior Design"
              className="mb-5 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#075E63]"
            />

            <label className="mb-2 block text-sm font-semibold text-[#073F43]">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              maxLength={2000}
              placeholder="Describe the service..."
              className="mb-5 w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#075E63]"
            />

            <label className="mb-2 block text-sm font-semibold text-[#073F43]">
              Icon
            </label>
            <input
              name="icon"
              value={form.icon}
              onChange={handleChange}
              maxLength={50}
              placeholder="✦"
              className="mb-6 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#075E63]"
            />

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-[#075E63] px-5 py-3 font-semibold text-white transition hover:bg-[#073F43] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Save Changes"
                  : "Add Service"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="mt-3 w-full rounded-xl border border-gray-200 px-5 py-3 font-semibold text-[#073F43] hover:bg-gray-50"
              >
                Cancel Editing
              </button>
            )}
          </form>

          {/* Services List */}
          <div className="rounded-2xl border border-[#073F43]/10 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[#073F43]">
                All Services
              </h2>
              <span className="rounded-full bg-[#075E63]/10 px-3 py-1 text-sm font-semibold text-[#075E63]">
                {services.length} services
              </span>
            </div>

            {loading ? (
              <p className="py-10 text-center text-[#6B7373]">
                Loading services...
              </p>
            ) : services.length === 0 ? (
              <p className="py-10 text-center text-[#6B7373]">
                No services found. Add your first service.
              </p>
            ) : (
              <div className="space-y-4">
                {services.map((service) => (
                  <article
                    key={service.id}
                    className="flex flex-col justify-between gap-4 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#075E63]/10 text-xl text-[#075E63]">
                        {service.icon || "✦"}
                      </div>

                      <div>
                        <h3 className="font-bold text-[#073F43]">
                          {service.name ?? service.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-[#6B7373]">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(service)}
                        className="rounded-lg border border-[#075E63]/20 px-4 py-2 text-sm font-semibold text-[#075E63] hover:bg-[#075E63]/5"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(service.id)}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesManagement;