import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "./components/PublicLayout";
import AdminLayout from "./components/Admin/AdminLayout";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Furniture from "./pages/Furniture";
import FurnitureDetails from "./pages/FurnitureDetails";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
// Admin Pages
import Dashboard from "./pages/Admin/Dashboard";
import FurnitureManagement from "./pages/Admin/FurnitureManagement";
import ServicesManagement from "./pages/Admin/ServicesManagement";
import CategoryManagement from "./pages/Admin/CategoryManagement";
import ProjectsManagement from "./pages/Admin/ProjectsManagement";
import UsersManagement from "./pages/Admin/UsersManagement";
import ContactInquiries from "./pages/Admin/ContactInquiries";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/furniture" element={<Furniture />} />
          <Route
            path="/furniture/:id"
            element={<FurnitureDetails />}
          />
          <Route
  path="/services"
  element={<Services limit={8} showViewAll={false} />}
/>

<Route
  path="/projects"
  element={<Projects limit={8} showViewAll={false} />}
/>
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
<Route path="/profile" element={<Profile />} />
        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="furniture"
            element={<FurnitureManagement />}
          />
          <Route path="services" element={<ServicesManagement />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="projects" element={<ProjectsManagement />} />
          <Route path="users" element={<UsersManagement />} />
          <Route
            path="contact-inquiries"
            element={<ContactInquiries />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;