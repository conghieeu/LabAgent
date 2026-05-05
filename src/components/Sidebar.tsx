"use client";

import { LayoutDashboard, KanbanSquare, CheckSquare, Users, BarChart2, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Kanban Board", href: "/board", icon: KanbanSquare },
    { name: "My Tasks", href: "/tasks", icon: CheckSquare },
    { name: "Team", href: "/team", icon: Users },
    { name: "Analytics", href: "/analytics", icon: BarChart2 },
  ];

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-white font-bold text-xl">V</span>
        </div>
        <h1 className="font-bold text-xl tracking-tight">VibePlan</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">Menu</div>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name}
              href={item.href} 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground/70 hover:text-foreground hover:bg-accent"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Link 
          href="/settings" 
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
            pathname === "/settings"
              ? "bg-primary/10 text-primary"
              : "text-foreground/70 hover:text-foreground hover:bg-accent"
          }`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
