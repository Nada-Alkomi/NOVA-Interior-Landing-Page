
import { useEffect, useState } from "react";
import { Users, RefreshCw, Mail, ShieldCheck } from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "https://localhost:7109/api";

function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  async function loadUsers(isRefresh = false) {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("Token") ||
      localStorage.getItem("accessToken");

    if (!token) {
      setError("Please log in as an administrator.");
      setLoading(false);
      setRefreshing(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/Auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Your session has expired. Please log in again.");
        }

        if (response.status === 403) {
          throw new Error("Access denied. Admin permissions are required.");
        }

        throw new Error(
          data?.message || "Unable to load users."
        );
      }

      const list = Array.isArray(data)
        ? data
        : data?.data ?? data?.items ?? [];

      setUsers(list);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <section className="min-h-screen bg-[#F7F5F0] p-5 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5A623]">
              NOVA Admin
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#073F43]">
              Users Management
            </h1>

            <p className="mt-2 text-[#6B7373]">
              View registered users and their account information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => loadUsers(true)}
            disabled={loading || refreshing}
            className="flex w-fit items-center gap-2 rounded-full border border-[#075E63] px-5 py-3 font-semibold text-[#075E63] transition hover:bg-[#075E63] hover:text-white disabled:opacity-50"
          >
            <RefreshCw
              size={17}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        <div className="mt-8 flex items-center gap-4 rounded-2xl border border-[#075E63]/10 bg-white p-6 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#075E63]/10 text-[#075E63]">
            <Users size={27} />
          </div>

          <div>
            <p className="text-sm text-[#6B7373]">
              Total Registered Users
            </p>
            <p className="text-3xl font-bold text-[#073F43]">
              {loading ? "..." : users.length}
            </p>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
          >
            {error}
          </div>
        )}

        <div className="mt-6 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
          <div className="border-b border-black/5 px-6 py-5">
            <h2 className="text-lg font-bold text-[#073F43]">
              Registered Accounts
            </h2>
          </div>

          {loading ? (
            <p className="p-8 text-center text-[#6B7373]">
              Loading users...
            </p>
          ) : !error && users.length === 0 ? (
            <p className="p-8 text-center text-[#6B7373]">
              No users found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-[#F7F5F0]">
                  <tr>
                    {["User", "Email Address", "Role", "User ID"].map(
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
                  {users.map((user, index) => (
                    <tr
                      key={user.userId ?? user.id ?? index}
                      className="border-t border-black/5 hover:bg-[#F7F5F0]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#075E63]/10 font-bold text-[#075E63]">
                            {(user.name || user.Name || user.email || "U")
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <span className="font-semibold text-[#073F43]">
                            {user.name || user.Name || "Unnamed User"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-[#667477]">
                        <span className="flex items-center gap-2">
                          <Mail size={15} />
                          {user.email || user.Email || "—"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#075E63]/10 px-3 py-1 text-xs font-semibold text-[#075E63]">
                          <ShieldCheck size={14} />
                          {user.role || user.Role || "User"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-[#667477]">
                        {user.userId ?? user.id ?? user.Id ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default UsersManagement;
