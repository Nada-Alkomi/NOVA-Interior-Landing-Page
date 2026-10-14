
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const API_URL =
  import.meta.env.VITE_API_URL || "https://localhost:7109/api";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState("loading");

  useEffect(() => {
    async function checkAdmin() {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuthStatus("unauthorized");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/Auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("token");
          setAuthStatus("unauthorized");
          return;
        }

        const user = await response.json();

        if (user.role !== "Admin") {
          setAuthStatus("forbidden");
          return;
        }

        setAuthStatus("authorized");
      } catch {
        setAuthStatus("error");
      }
    }

    checkAdmin();
  }, []);

  if (authStatus === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5F0]">
        <p className="text-[#075E63]">Verifying your access...</p>
      </div>
    );
  }

  if (authStatus === "unauthorized") {
    return <Navigate to="/login" replace />;
  }

  if (authStatus === "forbidden") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F7F5F0] p-6 text-center">
        <h1 className="text-3xl font-bold text-[#073F43]">
          Access Denied
        </h1>
        <p className="text-gray-600">
          You do not have permission to access the admin dashboard.
        </p>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="rounded-xl bg-[#075E63] px-5 py-3 font-semibold text-white hover:bg-[#073F43]"
        >
          Back to Login
        </button>
      </div>
    );
  }

  if (authStatus === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F7F5F0] p-6 text-center">
        <p className="text-gray-700">
          Could not verify your access. Please check that the backend is running.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-xl bg-[#075E63] px-5 py-3 font-semibold text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:ml-72">
        <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
