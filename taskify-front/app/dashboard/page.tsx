"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Calendar, CheckSquare, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      title: "Calendario",
      icon: Calendar,
      href: "/dashboard/calendar",
    },
    {
      title: "Tareas",
      icon: CheckSquare,
      href: "/dashboard/tasks",
    },
    {
      title: "Configuración",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col bg-card border-r border-border transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-primary">Taskify</h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "transition-transform",
                isCollapsed ? "rotate-180" : ""
              )}
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent/50 transition-colors"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {!isCollapsed && <span>{item.title}</span>}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            {!isCollapsed && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Aquí irán las tarjetas de estadísticas y contenido principal */}
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-2">Tareas Pendientes</h2>
              <p className="text-3xl font-bold text-primary">0</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-2">Tareas Completadas</h2>
              <p className="text-3xl font-bold text-secondary">0</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-2">Progreso Total</h2>
              <p className="text-3xl font-bold text-accent">0%</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 