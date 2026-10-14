
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FurnitureCard from "./FurnitureCard";

const API_URL =
  import.meta.env.VITE_API_URL || "https://localhost:7109/api";

const PAGE_SIZE = 8;

function Furniture({ limit, showPagination = false }) {
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    async function getFurniture() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/Furniture`);

        if (!response.ok) {
          throw new Error("Failed to load furniture.");
        }

        const data = await response.json();

        if (isMounted) {
          setFurnitureItems(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load furniture.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    getFurniture();

    return () => {
      isMounted = false;
    };
  }, []);

  const allPagesCount = Math.ceil(furnitureItems.length / PAGE_SIZE);

  const displayedItems = showPagination
    ? furnitureItems.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
      )
    : limit
      ? furnitureItems.slice(0, limit)
      : furnitureItems;

  function changePage(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section
      id="furniture"
      className="bg-[#F7F5F0] px-6 py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5A623]">
            Our Furniture
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#073F43] md:text-5xl">
            Furniture made for living.
          </h2>

          <p className="mt-4 max-w-2xl text-gray-600">
            Discover furniture designed to bring comfort,
            beauty, and elegance into your home.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="py-10 text-center text-[#073F43]">
            Loading furniture...
          </p>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl bg-red-50 p-5 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && furnitureItems.length === 0 && (
          <p className="py-10 text-center text-gray-500">
            No furniture is available at the moment.
          </p>
        )}

        {/* Furniture Cards */}
        {!loading && !error && furnitureItems.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {displayedItems.map((item) => (
                <FurnitureCard
                  key={item.id}
                  furniture={item}
                />
              ))}
            </div>

            {/* View All on Home */}
            {!showPagination && limit && furnitureItems.length > limit && (
              <div className="mt-10 text-center">
                <Link
                  to="/furniture"
                  className="inline-flex items-center justify-center rounded-full bg-[#075E63] px-8 py-3 font-semibold text-white transition hover:bg-[#ebcd09]"
                >
                  View All Furniture
                </Link>
              </div>
            )}

            {/* Pagination */}
            {showPagination && allPagesCount > 1 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-full border border-[#075E63] px-5 py-2 text-sm font-semibold text-[#075E63] transition hover:bg-[#075E63] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                {Array.from(
                  { length: allPagesCount },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => changePage(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={`h-10 w-10 rounded-full font-semibold transition ${
                      currentPage === page
                        ? "bg-[#075E63] text-white"
                        : "border border-[#075E63] text-[#075E63] hover:bg-[#075E63] hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === allPagesCount}
                  className="rounded-full border border-[#075E63] px-5 py-2 text-sm font-semibold text-[#075E63] transition hover:bg-[#075E63] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Furniture;
