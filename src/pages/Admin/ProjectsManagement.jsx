import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL || "https://localhost:7109/api";

const STATUSES = [
  "NotStarted",
  "InProgress",
  "Completed",
  "OnHold",
];

const emptyForm = {
  name: "",
  description: "",
  imageUrl: "",
  status: "NotStarted",
  progress: 0,
};

function ProjectsManagement() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function getToken() {
    // Change this key if your login stores the token under another name.
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("Token") ||
      localStorage.getItem("accessToken")
    );
  }

  async function request(url, options = {}) {
    const token = getToken();

    const response = await fetch(url, {
      ...options,
      headers: {
        ...(options.body
          ? { "Content-Type": "application/json" }
          : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(
        message || `Request failed (${response.status})`
      );
    }

    if (response.status === 204) return null;

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  async function loadProjects() {
    setLoading(true);
    setError("");

    try {
      const data = await request(`${API_URL}/Project`);
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        name === "progress"
          ? Math.min(100, Math.max(0, Number(value)))
          : value,
    }));
  }

  function handleEdit(project) {
    setEditingId(project.id);
    setForm({
      name: project.name ?? "",
      description: project.description ?? "",
      imageUrl: project.imageUrl ?? "",
      status: project.status ?? "NotStarted",
      progress: project.progress ?? 0,
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
      const token = getToken();

      if (!token) {
        throw new Error(
          "Please sign in with an Admin account before managing projects."
        );
      }

      const payload = editingId
        ? {
            name: form.name.trim(),
            description: form.description.trim() || null,
            imageUrl: form.imageUrl.trim() || null,
            status: form.status,
            progress: Number(form.progress),
          }
        : {
            name: form.name.trim(),
            description: form.description.trim() || null,
            imageUrl: form.imageUrl.trim() || null,
            userId: 0, // Replace with the authenticated user's actual ID.
          };

      const url = editingId
        ? `${API_URL}/Project/${editingId}`
        : `${API_URL}/Project`;

      await request(url, {
        method: editingId ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });

      setSuccess(
        editingId
          ? "Project updated successfully."
          : "Project created successfully."
      );

      resetForm();
      await loadProjects();
    } catch (err) {
      setError(err.message || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      if (!getToken()) {
        throw new Error("Please sign in with an Admin account.");
      }

      await request(`${API_URL}/Project/${id}`, {
        method: "DELETE",
      });

      setProjects((previous) =>
        previous.filter((project) => project.id !== id)
      );

      setSuccess("Project deleted successfully.");

      if (editingId === id) resetForm();
    } catch (err) {
      setError(err.message || "Failed to delete project.");
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
            Projects Management
          </h1>
          <p className="mt-2 text-[#6B7373]">
            Manage project details, status, progress, and images.
          </p>
        </div>

        {error && (
          <div role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div role="status" className="mb-5 rounded-xl bg-green-50 p-4 text-sm text-green-700">
            {success}
          </div>
        )}

        <div className="grid items-start gap-8 lg:grid-cols-[360px_1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#073F43]/10 bg-white p-6 shadow-sm"
          >
            <h2 className="mb-6 text-xl font-bold text-[#073F43]">
              {editingId ? "Edit Project" : "Add New Project"}
            </h2>

            <label className="mb-2 block text-sm font-semibold text-[#073F43]">
              Project Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              maxLength={150}
              className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#075E63]"
              placeholder="Modern Living"
            />

            <label className="mb-2 block text-sm font-semibold text-[#073F43]">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#075E63]"
              placeholder="Describe the project..."
            />

            <label className="mb-2 block text-sm font-semibold text-[#073F43]">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#075E63]"
              placeholder="https://..."
            />

            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="Project preview"
                className="mb-4 h-40 w-full rounded-xl object-cover"
              />
            )}

            {editingId && (
              <>
                <label className="mb-2 block text-sm font-semibold text-[#073F43]">
                  Project Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="mb-4 w-full rounded-xl border border-gray-200 bg-white px-4 py-3"
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <label className="mb-2 block text-sm font-semibold text-[#073F43]">
                  Progress: {form.progress}%
                </label>
                <input
                  type="range"
                  name="progress"
                  min="0"
                  max="100"
                  value={form.progress}
                  onChange={handleChange}
                  className="mb-6 w-full accent-[#075E63]"
                />
              </>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-[#075E63] px-5 py-3 font-semibold text-white hover:bg-[#073F43] disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Save Changes"
                  : "Add Project"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="mt-3 w-full rounded-xl border border-gray-200 px-5 py-3 font-semibold text-[#073F43]"
              >
                Cancel Editing
              </button>
            )}
          </form>

          <div className="rounded-2xl border border-[#073F43]/10 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[#073F43]">
                All Projects
              </h2>
              <span className="rounded-full bg-[#075E63]/10 px-3 py-1 text-sm font-semibold text-[#075E63]">
                {projects.length} projects
              </span>
            </div>

            {loading ? (
              <p className="py-10 text-center text-[#6B7373]">
                Loading projects...
              </p>
            ) : projects.length === 0 ? (
              <p className="py-10 text-center text-[#6B7373]">
                No projects found.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {projects.map((project) => (
                  <article
                    key={project.id}
                    className="overflow-hidden rounded-xl border border-gray-100"
                  >
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="h-44 w-full bg-gray-100 object-cover"
                      />
                    ) : (
                      <div className="flex h-44 items-center justify-center bg-gray-100 text-sm text-gray-500">
                        No image
                      </div>
                    )}

                    <div className="p-4">
                      <h3 className="font-bold text-[#073F43]">
                        {project.name}
                      </h3>

                      <p className="mt-2 text-sm text-[#6B7373]">
                        {project.description || "No description"}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#075E63]/10 px-3 py-1 text-xs font-semibold text-[#075E63]">
                          {project.status}
                        </span>
                        <span className="rounded-full bg-[#F5A623]/15 px-3 py-1 text-xs font-semibold text-[#073F43]">
                          {project.progress}%
                        </span>
                      </div>

                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-[#075E63]"
                          style={{
                            width: `${Math.min(100, Math.max(0, project.progress || 0))}%`,
                          }}
                        />
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(project)}
                          className="flex-1 rounded-lg border border-[#075E63]/20 px-3 py-2 text-sm font-semibold text-[#075E63]"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(project.id)}
                          className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600"
                        >
                          Delete
                        </button>
                      </div>
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

export default ProjectsManagement;