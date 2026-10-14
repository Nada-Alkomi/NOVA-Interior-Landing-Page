
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Heart,
  MessageSquare,
  FileText,
  LogOut,
  LoaderCircle,
  Mail,
  ShieldCheck,
  Trash2,
  ArrowLeft,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "https://localhost:7109/api";

const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

function getImageUrl(imageUrl) {
  if (!imageUrl) return "/placeholder-furniture.jpg";

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  return `${API_ORIGIN}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
}

async function readResponse(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || `Request failed (${response.status})`
    );
  }

  return data;
}

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeSection, setActiveSection] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistError, setWishlistError] = useState("");
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const response = await fetch(`${API_URL}/Auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.dispatchEvent(new Event("auth-change"));
          navigate("/login", { replace: true });
          return;
        }

        const data = await readResponse(response);

        if (data.role === "Admin") {
          navigate("/admin", { replace: true });
          return;
        }

        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (err) {
        setError(err.message || "Could not load your profile.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [navigate]);

  async function loadWishlist() {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    setWishlistLoading(true);
    setWishlistError("");

    try {
      const response = await fetch(`${API_URL}/Wishlist/mine`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("auth-change"));
        navigate("/login", { replace: true });
        return;
      }

      const data = await readResponse(response);
      const items = Array.isArray(data) ? data : [];

      // Load full furniture details for each wishlist item.
      const detailedItems = await Promise.all(
        items.map(async (item) => {
          const furnitureId = Number(
            item.furnitureId ?? item.FurnitureId
          );

          if (!furnitureId) {
            return { ...item, furnitureId, furniture: null };
          }

          try {
            const furnitureResponse = await fetch(
              `${API_URL}/Furniture/${furnitureId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (!furnitureResponse.ok) {
              return { ...item, furnitureId, furniture: null };
            }

            const furniture = await furnitureResponse.json();

            return {
              ...item,
              furnitureId,
              furniture,
            };
          } catch {
            return { ...item, furnitureId, furniture: null };
          }
        })
      );

      setWishlist(detailedItems);
    } catch (err) {
      setWishlistError(
        err.message || "Could not load your wishlist."
      );
    } finally {
      setWishlistLoading(false);
    }
  }

  async function handleRemove(furnitureId) {
    const token = localStorage.getItem("token");

    if (!token || !user?.userId) {
      navigate("/login", { replace: true });
      return;
    }

    setRemovingId(furnitureId);
    setWishlistError("");

    try {
      const response = await fetch(
        `${API_URL}/Wishlist/user/${user.userId}/furniture/${furnitureId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await readResponse(response);

      setWishlist((previous) =>
        previous.filter(
          (item) =>
            Number(item.furnitureId) !== Number(furnitureId)
        )
      );
    } catch (err) {
      setWishlistError(
        err.message || "Could not remove this item."
      );
    } finally {
      setRemovingId(null);
    }
  }

  function openSection(section) {
    setActiveSection(section);

    if (section === "wishlist") {
      loadWishlist();
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login", { replace: true });
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5F0]">
        <LoaderCircle
          className="animate-spin text-[#075E63]"
          size={36}
        />
      </div>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F7F5F0] px-5">
        <p className="text-center text-red-600">{error}</p>

        <button
          onClick={() => navigate("/")}
          className="rounded-xl bg-[#075E63] px-5 py-3 text-white"
        >
          Back to Home
        </button>
      </main>
    );
  }

  if (!user) return null;

  const sections = [
    {
      id: "wishlist",
      title: "My Wishlist",
      description: "View the furniture you saved.",
      icon: Heart,
    },
    {
      id: "messages",
      title: "My Contact Messages",
      description: "View your submitted inquiries.",
      icon: MessageSquare,
    },
    {
      id: "documents",
      title: "My Documents",
      description: "Manage your personal documents.",
      icon: FileText,
    },
  ];

  return (
    <main className="min-h-screen bg-[#F7F5F0] px-5 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5A623]">
            My Account
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#073F43] sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-3 text-gray-500">
            Manage your account and your personal information.
          </p>
        </div>

        <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E5F0ED] text-[#075E63]">
              <UserRound size={38} />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#073F43]">
                {user.name || "User"}
              </h2>

              <p className="mt-2 flex items-center gap-2 break-all text-gray-500">
                <Mail size={17} />
                {user.email}
              </p>

              <p className="mt-2 flex items-center gap-2 text-sm text-[#075E63]">
                <ShieldCheck size={17} />
                {user.role || "User"} Account
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </section>

        {!activeSection && (
          <section className="mt-10">
            <h2 className="mb-5 text-2xl font-bold text-[#073F43]">
              My Activity
            </h2>

            <div className="grid gap-5 md:grid-cols-3">
              {sections.map((section) => {
                const Icon = section.icon;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => openSection(section.id)}
                    className="rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E5F0ED] text-[#075E63]">
                      <Icon size={24} />
                    </div>

                    <h3 className="text-lg font-bold text-[#073F43]">
                      {section.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {section.description}
                    </p>

                    <span className="mt-4 inline-block text-sm font-semibold text-[#075E63]">
                      View details →
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {activeSection && (
          <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <button
              type="button"
              onClick={() => setActiveSection("")}
              className="mb-6 flex items-center gap-2 font-semibold text-[#075E63] hover:underline"
            >
              <ArrowLeft size={18} />
              Back to My Activity
            </button>

            {activeSection === "wishlist" && (
              <>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-2xl font-bold text-[#073F43]">
                    My Wishlist
                  </h2>

                  <button
                    type="button"
                    onClick={loadWishlist}
                    disabled={wishlistLoading}
                    className="inline-flex items-center gap-2 rounded-full border border-[#075E63] px-4 py-2 text-sm font-semibold text-[#075E63] hover:bg-[#E5F0ED] disabled:opacity-50"
                  >
                    <RefreshCw
                      size={15}
                      className={wishlistLoading ? "animate-spin" : ""}
                    />
                    Refresh
                  </button>
                </div>

                {wishlistLoading ? (
                  <div className="flex justify-center py-10">
                    <LoaderCircle
                      className="animate-spin text-[#075E63]"
                      size={32}
                    />
                  </div>
                ) : wishlistError ? (
                  <div className="rounded-xl bg-red-50 p-4 text-red-700">
                    <p>{wishlistError}</p>

                    <button
                      onClick={loadWishlist}
                      className="mt-3 font-semibold underline"
                    >
                      Try again
                    </button>
                  </div>
                ) : wishlist.length === 0 ? (
                  <div className="py-10 text-center">
                    <Heart
                      size={42}
                      className="mx-auto mb-4 text-[#075E63]"
                    />

                    <p className="text-lg font-semibold text-[#073F43]">
                      Your wishlist is empty.
                    </p>

                    <p className="mt-2 text-gray-500">
                      Explore our furniture and save your favorites.
                    </p>

                    <Link
                      to="/furniture"
                      className="mt-5 inline-flex rounded-full bg-[#075E63] px-6 py-3 font-semibold text-white hover:bg-[#073F43]"
                    >
                      Browse Furniture
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {wishlist.map((item) => {
                      const furniture = item.furniture;

                      const name =
                        furniture?.name ??
                        furniture?.Name ??
                        `Furniture #${item.furnitureId}`;

                      const imageUrl =
                        furniture?.imageUrl ??
                        furniture?.ImageUrl;

                      const price = Number(
                        furniture?.price ??
                          furniture?.Price ??
                          0
                      );

                      const description =
                        furniture?.description ??
                        furniture?.Description;

                      const category =
                        furniture?.categoryName ??
                        furniture?.CategoryName ??
                        furniture?.category?.name ??
                        furniture?.Category?.Name ??
                        "Furniture";

                      return (
                        <article
                          key={item.id ?? item.furnitureId}
                          className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                          <div className="relative h-64 overflow-hidden bg-[#EDE8DC]">
                            <img
                              src={getImageUrl(imageUrl)}
                              alt={name}
                              loading="lazy"
                              onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src =
                                  "/placeholder-furniture.jpg";
                              }}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#075E63] backdrop-blur-sm">
                              {category}
                            </span>
                          </div>

                          <div className="p-5">
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="text-lg font-bold text-[#073F43]">
                                {name}
                              </h3>

                              <span className="whitespace-nowrap text-base font-bold text-[#F5A623]">
                                {Number.isFinite(price)
                                  ? `${price.toLocaleString("en-EG")} EGP`
                                  : "Price unavailable"}
                              </span>
                            </div>

                            <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-gray-500">
                              {description ||
                                "Beautiful furniture designed for modern living."}
                            </p>

                            <p className="mt-2 text-xs text-gray-400">
                              Saved on{" "}
                              {item.createdAt
                                ? new Date(
                                    item.createdAt
                                  ).toLocaleDateString()
                                : "—"}
                            </p>

                            {!furniture && (
                              <p className="mt-3 rounded-lg bg-amber-50 p-2 text-xs text-amber-700">
                                Product details could not be loaded.
                                You can still open the product page.
                              </p>
                            )}

                            <div className="mt-5 flex gap-3">
                              <Link
                                to={`/furniture/${item.furnitureId}`}
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#075E63] px-3 py-2.5 text-sm font-semibold text-[#075E63] transition hover:bg-[#075E63] hover:text-white"
                              >
                                View Details
                                <ExternalLink size={15} />
                              </Link>

                              <button
                                type="button"
                                onClick={() =>
                                  handleRemove(
                                    Number(item.furnitureId)
                                  )
                                }
                                disabled={
                                  removingId ===
                                  Number(item.furnitureId)
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-red-200 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                              >
                                {removingId ===
                                Number(item.furnitureId) ? (
                                  <LoaderCircle
                                    size={15}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <Trash2 size={15} />
                                )}
                                Remove
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {activeSection === "messages" && (
              <>
                <h2 className="mb-4 text-2xl font-bold text-[#073F43]">
                  My Contact Messages
                </h2>

                <p className="text-gray-500">
                  Contact messages need to be connected to the contact
                  API before submitted inquiries can be displayed here.
                </p>

                <Link
                  to="/contact"
                  className="mt-5 inline-flex rounded-full bg-[#075E63] px-6 py-3 font-semibold text-white hover:bg-[#073F43]"
                >
                  Contact NOVA
                </Link>
              </>
            )}

            {activeSection === "documents" && (
              <>
                <h2 className="mb-4 text-2xl font-bold text-[#073F43]">
                  My Documents
                </h2>

                <p className="text-gray-500">
                  Your documents need to be connected to the document
                  API before they can be displayed here.
                </p>
              </>
            )}
          </section>
        )}

        <div className="mt-10">
          <Link
            to="/"
            className="font-semibold text-[#075E63] hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Profile;
