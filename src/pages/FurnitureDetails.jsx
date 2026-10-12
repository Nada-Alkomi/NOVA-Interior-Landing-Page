
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Armchair,
  Tag,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "https://localhost:7109/api";

function FurnitureDetails() {
  const { id } = useParams();

  const [furniture, setFurniture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchFurniture() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/Furniture/${id}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Furniture item not found."
              : "Failed to load furniture details."
          );
        }

        const data = await response.json();
        setFurniture(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    if (id) {
      fetchFurniture();
    } else {
      setError("Furniture ID is missing.");
      setLoading(false);
    }

    return () => controller.abort();
  }, [id]);

  const imageUrl = furniture?.imageUrl
    ? furniture.imageUrl.startsWith("http")
      ? furniture.imageUrl
      : `${API_URL.replace("/api", "")}${furniture.imageUrl.startsWith("/") ? "" : "/"}${furniture.imageUrl}`
    : null;

  return (
    <section className="min-h-screen bg-[#F7F5F0] px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5A623]">
          NOVA Furniture
        </p>

        <h1 className="mt-3 text-3xl font-bold text-[#073F43] sm:text-4xl">
          Furniture Details
        </h1>

        {loading ? (
          <div className="flex min-h-80 flex-col items-center justify-center gap-4">
            <LoaderCircle className="h-10 w-10 animate-spin text-[#075E63]" />
            <p className="text-[#6B7373]">Loading furniture details...</p>
          </div>
        ) : error ? (
          <div className="mt-8 rounded-2xl border border-red-200 bg-white p-8">
            <AlertCircle className="mb-3 h-8 w-8 text-red-500" />
            <p className="font-semibold text-red-600">{error}</p>
            <p className="mt-2 text-sm text-[#6B7373]">
              Please check the furniture ID and try again.
            </p>

            <Link
              to="/furniture"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#075E63] px-6 py-3 font-semibold text-white transition hover:bg-[#073F43]"
            >
              <ArrowLeft size={18} />
              Back to Furniture
            </Link>
          </div>
        ) : furniture ? (
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <div className="flex min-h-80 items-center justify-center overflow-hidden rounded-3xl bg-white shadow-sm">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={furniture.name || "Furniture"}
                  className="h-full max-h-[520px] w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="flex flex-col items-center gap-3 py-20 text-[#6B7373]">
                  <Armchair size={64} strokeWidth={1.2} />
                  <p>No image available</p>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-sm text-[#6B7373]">
                Furniture ID: {furniture.id ?? id}
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#073F43] sm:text-4xl">
                {furniture.name || "Untitled Furniture"}
              </h2>

              <p className="mt-5 whitespace-pre-line leading-7 text-[#6B7373]">
                {furniture.description || "No description available."}
              </p>

              <div className="mt-6 flex items-center gap-3 text-[#075E63]">
                <Tag size={21} />
                <span>
                  {furniture.categoryName ||
                    furniture.category?.name ||
                    "Furniture"}
                </span>
              </div>

              <p className="mt-6 text-3xl font-bold text-[#075E63]">
                {furniture.price != null
                  ? `${Number(furniture.price).toLocaleString()} EGP`
                  : "Price unavailable"}
              </p>

              <Link
                to="/furniture"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#075E63] px-7 py-3 font-semibold text-white transition hover:bg-[#e2b40a]"
              >
                <ArrowLeft size={18} />
                Back to Furniture
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default FurnitureDetails;
