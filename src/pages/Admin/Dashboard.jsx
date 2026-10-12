import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Armchair,
  Wrench,
  FolderKanban,
  Users,
  Mail,
  ArrowUpRight,
  Plus,
  Eye,
  LayoutGrid,
  RefreshCw,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "https://localhost:7109/api";

function getList(result) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.data)) return result.data;
  if (Array.isArray(result?.items)) return result.items;
  return [];
}

function Dashboard() {
  const [stats, setStats] = useState({
    furniture: null,
    services: null,
    projects: null,
    users: null,
    inquiries: null,
  });

  const [recentFurniture, setRecentFurniture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


async function loadDashboard() {
  setLoading(true);
  setError("");

  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("Token") ||
    localStorage.getItem("accessToken");

  const endpoints = [
    { key: "furniture", url: `${API_URL}/Furniture` },
    { key: "services", url: `${API_URL}/Service` },
    { key: "projects", url: `${API_URL}/Project` },
    { key: "inquiries", url: `${API_URL}/Contact` },
  ];

  const results = await Promise.all(
    endpoints.map(async ({ key, url }) => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`${key} request failed`);
        }

        const result = await response.json();

        return { key, data: getList(result), ok: true };
      } catch {
        return { key, data: [], ok: false };
      }
    })
  );

  // Load the actual users count using the Admin token
  let usersCount = null;
  let usersOk = false;

  if (token) {
    try {
      const response = await fetch(
        `${API_URL}/Auth/users-count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (typeof data.count === "number") {
          usersCount = data.count;
          usersOk = true;
        }
      }
    } catch {
      usersCount = null;
    }
  }

  const nextStats = {
    furniture: null,
    services: null,
    projects: null,
    users: usersOk ? usersCount : null,
    inquiries: null,
  };

  results.forEach(({ key, data, ok }) => {
    nextStats[key] = ok ? data.length : null;

    if (key === "furniture" && ok) {
      setRecentFurniture(data.slice(-4).reverse());
    }

    if (key === "furniture" && !ok) {
      setRecentFurniture([]);
    }
  });

  setStats(nextStats);

  if (results.some((result) => !result.ok) || !usersOk) {
    setError(
      "Some statistics could not be loaded. Check the API endpoints, Admin token, and backend."
    );
  }

  setLoading(false);
}


  useEffect(() => {
    loadDashboard();
  }, []);

  const statCards = [
    {
      title: "Total Furniture",
      value: stats.furniture,
      icon: Armchair,
      description: "Furniture items",
      to: "/admin/furniture",
    },
    {
      title: "Total Services",
      value: stats.services,
      icon: Wrench,
      description: "Available services",
      to: "/admin/services",
    },
    {
      title: "Total Projects",
      value: stats.projects,
      icon: FolderKanban,
      description: "Interior design projects",
      to: "/admin/projects",
    },
    {
      title: "Total Users",
      value: stats.users,
      icon: Users,
      description: "User statistics unavailable",
      to: "/admin/users",
    },
    {
      title: "Contact Inquiries",
      value: stats.inquiries,
      icon: Mail,
      description: "Received messages",
      to: "/admin/contact-inquiries",
    },
  ];

  const quickActions = [
    {
      title: "Add Furniture",
      description: "Add a new furniture item",
      icon: Plus,
      to: "/admin/furniture",
      primary: true,
    },
    {
      title: "Manage Services",
      description: "Add and update services",
      icon: Wrench,
      to: "/admin/services",
    },
    {
      title: "Manage Projects",
      description: "View and update projects",
      icon: FolderKanban,
      to: "/admin/projects",
    },
    {
      title: "Manage Categories",
      description: "Organize furniture categories",
      icon: LayoutGrid,
      to: "/admin/categories",
    },
    {
      title: "View Inquiries",
      description: "Read customer messages",
      icon: Mail,
      to: "/admin/contact-inquiries",
    },
    {
      title: "View Website",
      description: "Open the public website",
      icon: Eye,
      to: "/",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-sm font-medium text-[#F5A623]">
            Welcome Back
          </p>

          <h1 className="text-3xl font-bold text-[#073F43] sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-[#667477]">
            Here's what's happening with your NOVA website today.
          </p>
        </div>

        <button
          type="button"
          onClick={loadDashboard}
          disabled={loading}
          className="flex w-fit items-center gap-2 rounded-full border border-[#075E63] px-4 py-2 text-sm font-semibold text-[#075E63] transition hover:bg-[#075E63] hover:text-white disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
        >
          {error}
        </div>
      )}

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              key={stat.title}
              to={stat.to}
              className="group rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#075E63]/10 text-[#075E63] transition group-hover:bg-[#075E63] group-hover:text-white">
                  <Icon size={23} />
                </div>

                <ArrowUpRight
                  size={18}
                  className="text-[#667477] transition group-hover:text-[#F5A623]"
                />
              </div>

              <p className="text-sm font-medium text-[#667477]">
                {stat.title}
              </p>

              <h2 className="mt-1 text-3xl font-bold text-[#073F43]">
                {loading && stat.value === null
                  ? "..."
                  : stat.value === null
                    ? "—"
                    : stat.value}
              </h2>

              <p className="mt-2 text-xs text-[#667477]">
                {stat.description}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        {/* Recent Furniture */}
        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b border-black/5 px-6 py-5">
            <div>
              <h2 className="text-lg font-bold text-[#073F43]">
                Recent Furniture
              </h2>

              <p className="mt-1 text-sm text-[#667477]">
                Recently added furniture items
              </p>
            </div>

            <Link
              to="/admin/furniture"
              className="flex items-center gap-2 rounded-full border border-[#075E63] px-4 py-2 text-xs font-semibold text-[#075E63] transition hover:bg-[#075E63] hover:text-white"
            >
              View All
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-black/5 bg-[#F7F5F0]">
                  {["Furniture", "Category", "Price", "Status"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#667477]"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-sm text-[#667477]">
                      Loading furniture...
                    </td>
                  </tr>
                ) : recentFurniture.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-sm text-[#667477]">
                      No furniture available or the API could not be loaded.
                    </td>
                  </tr>
                ) : (
                  recentFurniture.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-black/5 last:border-0 hover:bg-[#F7F5F0]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#075E63]/10 text-[#075E63]">
                            <Armchair size={19} />
                          </div>

                          <span className="text-sm font-semibold text-[#073F43]">
                            {item.name || item.title || "Untitled"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-[#667477]">
                        {item.categoryName ||
                          item.category?.name ||
                          item.categoryId ||
                          "—"}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-[#073F43]">
                        {item.price ?? "—"}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          {item.status || "Available"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#073F43]">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-[#667477]">
            Manage your website quickly.
          </p>

          <div className="mt-6 space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  to={action.to}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-4 text-left transition ${
                    action.primary
                      ? "bg-[#075E63] text-white hover:bg-[#073F43]"
                      : "border border-black/5 hover:bg-[#F7F5F0]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-lg p-2 ${
                        action.primary
                          ? "bg-white/10"
                          : "bg-[#075E63]/10 text-[#075E63]"
                      }`}
                    >
                      <Icon size={19} />
                    </div>

                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          action.primary ? "" : "text-[#073F43]"
                        }`}
                      >
                        {action.title}
                      </p>

                      <p
                        className={`text-xs ${
                          action.primary
                            ? "text-white/70"
                            : "text-[#667477]"
                        }`}
                      >
                        {action.description}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className={
                      action.primary ? "text-white" : "text-[#667477]"
                    }
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Inquiries */}
      <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5A623]/10 text-[#F5A623]">
              <Mail size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#073F43]">
                Contact Inquiries
              </h2>

              <p className="text-sm text-[#667477]">
                {stats.inquiries === null
                  ? "Inquiry count unavailable."
                  : `${stats.inquiries} messages received.`}
              </p>
            </div>
          </div>

          <Link
            to="/admin/contact-inquiries"
            className="flex items-center justify-center gap-2 rounded-full bg-[#075E63] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#073F43]"
          >
            View Inquiries
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;