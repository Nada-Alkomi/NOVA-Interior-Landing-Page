
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getAllFurniture,
  createFurniture,
  updateFurniture,
  deleteFurniture,
} from "../../services/furnitureService";

import { getAllCategories } from "../../services/categoryService";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  categoryId: "",
  imageFile: null,
};

function FurnitureManagement() {
  const [furniture, setFurniture] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [furnitureData, categoriesData] = await Promise.all([
        getAllFurniture(),
        getAllCategories(),
      ]);

      setFurniture(
        Array.isArray(furnitureData) ? furnitureData : []
      );

      setCategories(
        Array.isArray(categoriesData) ? categoriesData : []
      );
    } catch (err) {
      setError(err.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must not exceed 5 MB.");
      event.target.value = "";
      return;
    }

    setError("");

    setForm((previous) => ({
      ...previous,
      imageFile: file,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Please enter the product name.");
      return;
    }

    if (!form.categoryId) {
      setError("Please select a category.");
      return;
    }

    if (
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) <= 0
    ) {
      setError("Please enter a valid price.");
      return;
    }

    try {
      setSaving(true);

      if (editingId !== null) {
        // Update an existing product.
        // This sends JSON and does not replace its image.
        await updateFurniture(editingId, {
          name: form.name.trim(),
          description: form.description.trim(),
          price: Number(form.price),
          categoryId: Number(form.categoryId),
        });

        setSuccess("Furniture updated successfully.");
      } else {
        // Create a new product with an optional image.
        const formData = new FormData();

        formData.append("Name", form.name.trim());
        formData.append(
          "Description",
          form.description.trim()
        );
        formData.append("Price", String(Number(form.price)));
        formData.append(
          "CategoryId",
          String(Number(form.categoryId))
        );

        if (form.imageFile) {
          formData.append("ImageFile", form.imageFile);
        }

        await createFurniture(formData);

        setSuccess("Furniture added successfully.");
      }

      const updatedFurniture = await getAllFurniture();

      setFurniture(
        Array.isArray(updatedFurniture)
          ? updatedFurniture
          : []
      );

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      console.error("Furniture save error:", err);
      setError(err.message || "Failed to save furniture.");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(item) {
    setEditingId(item.id);

    setForm({
      name: item.name || "",
      description: item.description || "",
      price: String(item.price ?? ""),
      categoryId: String(item.categoryId ?? ""),
      imageFile: null,
    });

    setError("");
    setSuccess("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }


async function handleDelete(item) {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: `Do you want to delete "${item.name}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    background: "#ffffff",
    color: "#1f2937",
    reverseButtons: true,
    focusCancel: true,
  });

  if (!result.isConfirmed) return;

  setError("");
  setSuccess("");

  try {
    setDeletingId(item.id);

    await deleteFurniture(item.id);

    setFurniture((previous) =>
      previous.filter(
        (furnitureItem) => furnitureItem.id !== item.id
      )
    );

    if (editingId === item.id) {
      resetForm();
    }

    await Swal.fire({
      title: "Deleted!",
      text: `${item.name} has been deleted successfully.`,
      icon: "success",
      confirmButtonColor: "#111827",
    });
  } catch (err) {
    console.error("Furniture delete error:", err);

    await Swal.fire({
      title: "Error!",
      text: err.message || "Failed to delete furniture.",
      icon: "error",
      confirmButtonColor: "#111827",
    });
  } finally {
    setDeletingId(null);
  }
}


  function getImageUrl(imageUrl) {
    if (!imageUrl) return null;

    if (/^https?:\/\//i.test(imageUrl)) {
      return imageUrl;
    }

    return `https://localhost:7109${
      imageUrl.startsWith("/") ? "" : "/"
    }${imageUrl}`;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Furniture Management
          </h1>

          <p className="mt-1 text-gray-500">
            Manage furniture products and categories.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setError("");
              setSuccess("");
              setForm(emptyForm);
              setEditingId(null);
              setShowForm(true);
            }
          }}
          className="rounded-lg bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-700"
        >
          {showForm ? "Cancel" : "+ Add Furniture"}
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div
          role="alert"
          className="rounded-lg bg-red-50 p-4 text-red-700"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="rounded-lg bg-green-50 p-4 text-green-700"
        >
          {success}
        </div>
      )}

      {/* Add / Edit Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl border bg-white p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800">
            {editingId !== null
              ? "Edit Furniture"
              : "Add New Furniture"}
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Name */}
            <div>
              <label
                htmlFor="furniture-name"
                className="mb-1 block text-sm font-medium"
              >
                Product Name
              </label>

              <input
                id="furniture-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                maxLength={150}
                className="w-full rounded-lg border p-3 outline-none focus:border-gray-800"
                placeholder="Enter product name"
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="furniture-price"
                className="mb-1 block text-sm font-medium"
              >
                Price
              </label>

              <input
                id="furniture-price"
                name="price"
                type="number"
                min="0.01"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3 outline-none focus:border-gray-800"
                placeholder="Enter price"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="furniture-category"
                className="mb-1 block text-sm font-medium"
              >
                Category
              </label>

              <select
                id="furniture-category"
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                required
                className="w-full rounded-lg border bg-white p-3 outline-none focus:border-gray-800"
              >
                <option value="">Select a category</option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image */}
            <div>
              <label
                htmlFor="furniture-image"
                className="mb-1 block text-sm font-medium"
              >
                Product Image
              </label>

              <input
                id="furniture-image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="w-full rounded-lg border p-3"
                disabled={editingId !== null}
              />

              {editingId !== null && (
                <p className="mt-2 text-sm text-gray-500">
                  Image replacement is not enabled during editing.
                </p>
              )}

              {form.imageFile && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected: {form.imageFile.name}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="furniture-description"
              className="mb-1 block text-sm font-medium"
            >
              Description
            </label>

            <textarea
              id="furniture-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              maxLength={2000}
              className="w-full rounded-lg border p-3 outline-none focus:border-gray-800"
              placeholder="Describe the product"
            />
          </div>

          {/* Form Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving || categories.length === 0}
              className="rounded-lg bg-gray-900 px-6 py-3 font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editingId !== null
                  ? "Update Furniture"
                  : "Save Furniture"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              disabled={saving}
              className="rounded-lg border px-6 py-3 font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">
            Total Furniture
          </p>

          <p className="mt-2 text-2xl font-bold">
            {furniture.length}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">
            Total Categories
          </p>

          <p className="mt-2 text-2xl font-bold">
            {categories.length}
          </p>
        </div>
      </div>

      {/* Furniture Table */}
      {loading ? (
        <p className="text-gray-500">
          Loading furniture...
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full min-w-[1000px] text-left">
            <thead className="bg-gray-100 text-sm text-gray-600">
              <tr>
                <th className="px-5 py-4">Image</th>
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Description</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {furniture.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-8 text-center text-gray-500"
                  >
                    No furniture found.
                  </td>
                </tr>
              ) : (
                furniture.map((item) => {
                  const category = categories.find(
                    (cat) =>
                      Number(cat.id) === Number(item.categoryId)
                  );

                  const imageUrl = getImageUrl(item.imageUrl);

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50"
                    >
                      {/* Image */}
                      <td className="px-5 py-4">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={item.name}
                            className="h-14 w-14 rounded-lg object-cover"
                            onError={(event) => {
                              console.error(
                                "Failed to load image:",
                                event.currentTarget.src
                              );
                            }}
                          />
                        ) : (
                          <span className="text-sm text-gray-400">
                            No image
                          </span>
                        )}
                      </td>

                      {/* Name */}
                      <td className="px-5 py-4 font-medium">
                        {item.name}
                      </td>

                      {/* Price */}
                      <td className="px-5 py-4">
                        {item.price}
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        {item.categoryName ||
                          category?.name ||
                          "Uncategorized"}
                      </td>

                      {/* Description */}
                      <td className="max-w-xs px-5 py-4 text-sm text-gray-500">
                        {item.description || "No description"}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            disabled={
                              saving || deletingId === item.id
                            }
                            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            disabled={
                              saving || deletingId === item.id
                            }
                            className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                          >
                            {deletingId === item.id
                              ? "Deleting..."
                              : "Delete"}
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
      )}
    </div>
  );
}

export default FurnitureManagement;
