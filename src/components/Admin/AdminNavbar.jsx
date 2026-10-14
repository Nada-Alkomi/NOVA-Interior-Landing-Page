import { Bell, Menu, UserCircle } from "lucide-react";

function AdminNavbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-black/5 bg-[#F7F5F0]/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2.5 text-[#073F43] transition hover:bg-[#073F43]/10 lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[#667477]">
            NOVA
          </p>

          <h1 className="text-lg font-bold text-[#073F43] sm:text-xl">
            Admin Dashboard
          </h1>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 sm:gap-5">
        
        {/* Notifications */}
        <button className="relative rounded-xl p-2.5 text-[#073F43] transition hover:bg-[#073F43]/10">
          <Bell size={21} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#F5A623]" />
        </button>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-black/10 sm:block" />

        {/* Admin User */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-[#073F43]">
              Admin
            </p>

            <p className="text-xs text-[#667477]">
              Administrator
            </p>
          </div>

          <UserCircle
            size={38}
            strokeWidth={1.5}
            className="text-[#075E63]"
          />
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;