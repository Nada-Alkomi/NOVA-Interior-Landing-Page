import { Outlet } from "react-router-dom";

import Navbar from "./Navbar/Nav";
import Footer from "./Footer/Footer";

function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#fceec9] text-[#243033]">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default PublicLayout;