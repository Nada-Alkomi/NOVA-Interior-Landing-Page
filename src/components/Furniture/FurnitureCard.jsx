
import { ArrowUpRight, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "https://localhost:7109/api";

const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

function getImageUrl(imageUrl) {
  if (!imageUrl) return "/placeholder-furniture.jpg";

  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;

  return `${API_ORIGIN}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
}

function FurnitureCard({ furniture }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function checkWishlist() {
      const token = localStorage.getItem("token");

      if (!token || !furniture?.id) {
        setIsFavorite(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/Wishlist/mine`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) return;

        const items = await response.json();

        if (!cancelled && Array.isArray(items)) {
          setIsFavorite(
            items.some(
              (item) =>
                Number(item.furnitureId) === Number(furniture.id)
            )
          );
        }
      } catch (error) {
        console.error("Could not load wishlist:", error);
      }
    }

    checkWishlist();

    return () => {
      cancelled = true;
    };
  }, [furniture?.id]);

  if (!furniture) return null;

  const categoryName =
    furniture.categoryName ||
    (typeof furniture.category === "string"
      ? furniture.category
      : furniture.category?.name) ||
    "Furniture";

  const price =
    furniture.price !== null &&
    furniture.price !== undefined &&
    furniture.price !== ""
      ? Number(furniture.price)
      : null;

  async function handleAddToWishlist() {
    setMessage("");
    setMessageType("");

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!furniture.id) {
      setMessage("Furniture ID is missing.");
      setMessageType("error");
      return;
    }

    if (isFavorite) {
      setMessage("This item is already in your wishlist.");
      setMessageType("success");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/Wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          furnitureId: Number(furniture.id),
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("auth-change"));
        navigate("/login");
        return;
      }

      if (response.status === 409) {
        setIsFavorite(true);
        setMessage("This item is already in your wishlist.");
        setMessageType("success");
        return;
      }

      if (!response.ok) {
        console.error("Wishlist API error:", response.status, data);

        throw new Error(
          data?.message ||
            `Could not add furniture. Status: ${response.status}`
        );
      }

      setIsFavorite(true);
      setMessage("Added to your wishlist!");
      setMessageType("success");
    } catch (error) {
      console.error("Wishlist error:", error);
      setMessage(error.message || "Could not add furniture to wishlist.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative isolate h-72 overflow-hidden bg-[#EDE8DC]">
        <img
          src={getImageUrl(furniture.imageUrl)}
          alt={furniture.name || "Furniture"}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/placeholder-furniture.jpg";
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#075E63] backdrop-blur-sm">
          {categoryName}
        </span>

        <button
          type="button"
          onClick={handleAddToWishlist}
          disabled={loading}
          aria-label={
            isFavorite ? "Already in wishlist" : "Add to wishlist"
          }
          title={isFavorite ? "In your wishlist" : "Add to wishlist"}
          className={`absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition disabled:cursor-not-allowed disabled:opacity-60 ${
            isFavorite
              ? "bg-[#075E63] text-white"
              : "bg-white text-[#075E63] hover:bg-[#075E63] hover:text-white"
          }`}
        >
          <Heart
            size={22}
            strokeWidth={2}
            fill={isFavorite ? "currentColor" : "none"}
            className={loading ? "animate-pulse" : ""}
          />
        </button>
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold text-[#073F43]">
            {furniture.name}
          </h3>

          <span className="whitespace-nowrap text-lg font-bold text-[#F5A623]">
            {price !== null && Number.isFinite(price)
              ? `${price.toLocaleString("en-EG")} EGP`
              : "Price unavailable"}
          </span>
        </div>

        <p className="mb-4 line-clamp-2 min-h-12 text-sm leading-6 text-[#667477]">
          {furniture.description ||
            "Beautiful furniture designed for modern living."}
        </p>

        {message && (
          <p
            role={messageType === "error" ? "alert" : "status"}
            className={`mb-4 rounded-lg p-3 text-sm ${
              messageType === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message}
          </p>
        )}

        <Link
          to={`/furniture/${furniture.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-[#075E63] px-5 py-3 text-sm font-semibold text-[#075E63] transition-all duration-300 hover:bg-[#075E63] hover:text-white"
        >
          View Details
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}

export default FurnitureCard;
