
import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Tags,
  X,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryService.js";

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  async function loadCategories() {
    setLoading(true);
    setError("");

    try {
      const data = await getAllCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }

useEffect(() => {
  let ignore = false;

  async function fetchCategories() {
    setLoading(true);
    setError("");

    try {
      const data = await getAllCategories();

      if (!ignore) {
        setCategories(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      if (!ignore) {
        setError(err.message || "Failed to load categories.");
      }
    } finally {
      if (!ignore) {
        setLoading(false);
      }
    }
  }

  fetchCategories();

  return () => {
    ignore = true;
  };
}, []);

  function openAddModal() {
    setEditingCategory(null);
    setForm({ name: "", description: "" });
    setError("");
    setMessage("");
    setIsModalOpen(true);
  }

  function openEditModal(category) {
    setEditingCategory(category);
    setForm({
      name: category.name ?? category.Name ?? "",
      description:
        category.description ?? category.Description ?? "",
    });
    setError("");
    setMessage("");
    setIsModalOpen(true);
  }

  function closeModal() {
    if (saving) return;
    setIsModalOpen(false);
    setEditingCategory(null);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    const name = form.name.trim();
    const description = form.description.trim();

    if (!name) {
      setError("Please enter a category name.");
      return;
    }

    setSaving(true);

    const payload = {
      Name: name,
      Description: description || null,
    };

    try {
      if (editingCategory) {
        const id = editingCategory.id ?? editingCategory.Id;

        await updateCategory(id, payload);
        setMessage("Category updated successfully.");
      } else {
        await createCategory(payload);
        setMessage("Category created successfully.");
      }

      setIsModalOpen(false);
      setEditingCategory(null);
      await loadCategories();
      setMessage(
        editingCategory
          ? "Category updated successfully."
          : "Category created successfully."
      );
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(category) {
    const name = category.name ?? category.Name;
    const id = category.id ?? category.Id;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      await deleteCategory(id);
      setCategories((previous) =>
        previous.filter(
          (item) => (item.id ?? item.Id) !== id
        )
      );
      setMessage("Category deleted successfully.");
    } catch (err) {
      setError(
        err.message ||
          "Could not delete the category. It may be linked to furniture."
      );
    }
  }

  const filteredCategories = categories.filter((category) => {
    const name = category.name ?? category.Name ?? "";
    const description =
      category.description ?? category.Description ?? "";

    const query = search.toLowerCase();

    return (
      name.toLowerCase().includes(query) ||
      description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-sm font-medium text-[#F5A623]">
            Inventory Organization
          </p>

          <h1 className="text-3xl font-bold text-[#073F43]">
            Categories
          </h1>

          <p className="mt-2 text-sm text-[#667477]">
            Create and organize your furniture categories.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#075E63] px-5 py-3 font-semibold text-white transition hover:bg-[#073F43]"
        >
          <Plus size={19} />
          Add Category
        </button>
      </div>

      {/* Feedback */}
      {message && (
        <div
          role="status"
          className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          {message}
        </div>
      )}

      {error && !isModalOpen && (
        <div
          role="alert"
          className="mb-5 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>{error}</span>

          <button
            onClick={loadCategories}
            className="flex items-center gap-2 font-semibold"
          >
            <RefreshCw size={16} />
            Retry
          </button>
        </div>
      )}

      {/* Table Card */}
      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-black/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#073F43]">
              All Categories
            </h2>

            <p className="mt-1 text-sm text-[#667477]">
              {categories.length} categories in total
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667477]"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search categories..."
              className="w-full rounded-xl border border-black/10 bg-[#F7F5F0] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#075E63]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[ 600px]">
            <thead>
              <tr className="bg-[#F7F5F0] text-left">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#667477]">
                  ID
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#667477]">
                  Category Name
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#667477]">
                  Description
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#667477]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <LoaderCircle
                      className="mx-auto animate-spin text-[#075E63]"
                      size={30}
                    />
                    <p className="mt-3 text-sm text-[#667477]">
                      Loading categories...
                    </p>
                  </td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <Tags
                      size={35}
                      className="mx-auto text-[#075E63]/50"
                    />
                    <p className="mt-3 font-semibold text-[#073F43]">
                      No categories found
                    </p>
                    <p className="mt-1 text-sm text-[#667477]">
                      Add a category or try another search.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => {
                  const id = category.id ?? category.Id;
                  const name = category.name ?? category.Name;
                  const description =
                    category.description ?? category.Description;

                  return (
                    <tr
                      key={id}
                      className="border-t border-black/5 transition hover:bg-[#F7F5F0]/70"
                    >
                      <td className="px-6 py-5 text-sm text-[#667477]">
                        #{id}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#075E63]/10 text-[#075E63]">
                            <Tags size={19} />
                          </div>

                          <span className="font-semibold text-[#073F43]">
                            {name}
                          </span>
                        </div>
                      </td>

                      <td className="max-w-xs px-6 py-5 text-sm text-[#667477]">
                        {description || "No description"}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(category)}
                            aria-label={`Edit ${name}`}
                            className="rounded-lg p-2 text-[#075E63] transition hover:bg-[#075E63]/10"
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(category)}
                            aria-label={`Delete ${name}`}
                            className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[ 100] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-modal-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2
                  id="category-modal-title"
                  className="text-2xl font-bold text-[#073F43]"
                >
                  {editingCategory
                    ? "Edit Category"
                    : "Add Category"}
                </h2>

                <p className="mt-2 text-sm text-[#667477]">
                  Enter the category details below.
                </p>
              </div>

              <button
                onClick={closeModal}
                disabled={saving}
                aria-label="Close dialog"
                className="rounded-lg p-2 text-[#667477] transition hover:bg-gray-100"
              >
                <X size={21} />
              </button>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="category-name"
                  className="mb-2 block text-sm font-semibold text-[#073F43]"
                >
                  Category Name *
                </label>

                <input
                  id="category-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  placeholder="e.g. Living Room"
                  className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-[#075E63] focus:ring-2 focus:ring-[#075E63]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="category-description"
                  className="mb-2 block text-sm font-semibold text-[#073F43]"
                >
                  Description
                </label>

                <textarea
                  id="category-description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  maxLength={500}
                  placeholder="Describe this category..."
                  className="w-full resize-y rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-[#075E63] focus:ring-2 focus:ring-[#075E63]/10"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-black/10 px-5 py-3 font-semibold text-[#667477] transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#075E63] px-5 py-3 font-semibold text-white transition hover:bg-[#073F43] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <LoaderCircle size={18} className="animate-spin" />
                  )}

                  {saving
                    ? "Saving..."
                    : editingCategory
                      ? "Save Changes"
                      : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryManagement;
