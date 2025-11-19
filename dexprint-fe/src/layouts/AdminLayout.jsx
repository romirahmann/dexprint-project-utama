import { useEffect, useState } from "react";
import { Sidebar } from "../components/admin/Sidebar";
import { Topbar } from "../components/admin/Topbar";
import { Outlet } from "@tanstack/react-router";

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="h-screen flex bg-gray-50 overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isMobile={isMobile}
      />

      {/* Konten utama */}
      <div className="flex-1 flex flex-col">
        <Topbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="text-gray-700">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
