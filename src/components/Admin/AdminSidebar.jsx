
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Armchair,
  Wrench,
  FolderKanban,
  Users,
  Mail,
  Globe,
  LogOut,
  X,
  Tag,
} from "lucide-react";

function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Furniture", path: "/admin/furniture", icon: Armchair },
    { name: "Services", path: "/admin/services", icon: Wrench },
    { name: "Categories", path: "/admin/categories", icon: Tag },
    { name: "Projects", path: "/admin/projects", icon: FolderKanban },
    { name: "Users", path: "/admin/users", icon: Users },
    {
      name: "Contact Inquiries",
      path: "/admin/contact-inquiries",
      icon: Mail,
    },
  ];

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("auth-change"));

    onClose?.();
    navigate("/login", { replace: true });
  }

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-[#073F43] text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Link
            to="/admin"
            onClick={onClose}
            className="text-3xl font-bold tracking-widest"
          >
            NOVA
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 transition hover:bg-white/10 lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Admin Label */}
        <div className="px-6 py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F5A623]">
            Administration
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#F5A623] text-[#073F43] shadow-lg"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="space-y-2 border-t border-white/10 p-4">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
          >
            <Globe size={20} />
            <span>View Website</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
