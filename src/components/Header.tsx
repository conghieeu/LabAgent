"use client";

import { Bell, Search, Check, Clock, MessageSquare, AlertCircle, Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSidebar } from "@/context/SidebarContext";

export function Header() {
  const { toggleSidebar } = useSidebar();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [notifications, setNotifications] = useState([
    { id: 1, title: "Sarah mentioned you", desc: "in Project Redesign comments", time: "5m ago", icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/10", unread: true },
    { id: 2, title: "Task deadline approaching", desc: "Finalize System Design is due tomorrow", time: "2h ago", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10", unread: true },
    { id: 3, title: "Payment failed", desc: "Your workspace subscription payment failed", time: "1d ago", icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10", unread: false },
    { id: 4, title: "System updated", desc: "VibePlan has been updated to v2.4", time: "2d ago", icon: Check, color: "text-green-500", bg: "bg-green-500/10", unread: false },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const hasUnread = notifications.some(n => n.unread);

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-3 md:gap-4 flex-1">
        <button 
          className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>
        <div className="relative hidden md:block w-96" ref={searchRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" size={18} />
          <input 
            type="text" 
            placeholder="Search tasks, projects..." 
            onClick={() => setIsSearchOpen(true)}
            className="w-full bg-accent/50 border border-border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          {isSearchOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-2">Recent Searches</div>
              <div className="p-2 hover:bg-accent rounded-lg cursor-pointer flex items-center gap-3 text-sm">
                <Search size={14} className="text-muted-foreground" />
                <span>"Dashboard UI Design"</span>
              </div>
              <div className="p-2 hover:bg-accent rounded-lg cursor-pointer flex items-center gap-3 text-sm">
                <Search size={14} className="text-muted-foreground" />
                <span>"System Requirements"</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-5">
        
        {/* Notification Bell Dropdown */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className={`relative p-2 transition-colors rounded-full ${isNotifOpen ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:text-foreground hover:bg-accent'}`}
          >
            <Bell size={20} />
            {hasUnread && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border border-background"></span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
              <div className="p-4 border-b border-border flex items-center justify-between bg-accent/30">
                <h3 className="font-bold">Notifications</h3>
                {hasUnread && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-[360px] overflow-y-auto">
                {notifications.map((notif) => {
                  const Icon = notif.icon;
                  return (
                    <div 
                      key={notif.id} 
                      className={`p-4 border-b border-border/50 hover:bg-accent/50 transition-colors flex gap-3 cursor-pointer ${notif.unread ? 'bg-accent/20' : ''}`}
                      onClick={() => {
                        setNotifications(notifications.map(n => n.id === notif.id ? { ...n, unread: false } : n));
                      }}
                    >
                      <div className={`mt-1 p-2 rounded-full shrink-0 ${notif.bg} ${notif.color}`}>
                        <Icon size={16} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h4 className={`text-sm ${notif.unread ? 'font-semibold text-foreground' : 'font-medium text-foreground/80'}`}>
                            {notif.title}
                          </h4>
                          {notif.unread && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5"></span>}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-1">{notif.desc}</p>
                        <p className="text-[10px] text-muted-foreground/70 font-medium">{notif.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-3 text-center border-t border-border">
                <Link 
                  href="/notifications" 
                  onClick={() => setIsNotifOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors inline-block w-full py-1"
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pl-5 border-l border-border relative" ref={profileRef}>
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium">Alex Morgan</p>
            <p className="text-xs text-foreground/50">Product Manager</p>
          </div>
          <div 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px] cursor-pointer hover:scale-105 transition-transform"
          >
            <img 
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
              alt="User avatar" 
              className="w-full h-full rounded-full border-2 border-background object-cover"
            />
          </div>
          
          {isProfileOpen && (
            <div className="absolute top-full right-0 mt-4 w-48 bg-card border border-border rounded-xl shadow-lg p-1 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 border-b border-border mb-1 md:hidden">
                <p className="text-sm font-medium">Alex Morgan</p>
                <p className="text-xs text-foreground/50">alex@vibeplan.com</p>
              </div>
              <Link href="/settings" onClick={() => setIsProfileOpen(false)} className="w-full text-left px-3 py-2 hover:bg-accent rounded-lg text-sm transition-colors flex items-center gap-2">
                My Profile
              </Link>
              <Link href="/settings" onClick={() => setIsProfileOpen(false)} className="w-full text-left px-3 py-2 hover:bg-accent rounded-lg text-sm transition-colors flex items-center gap-2">
                Settings
              </Link>
              <div className="h-px bg-border my-1"></div>
              <button className="w-full text-left px-3 py-2 hover:bg-destructive/10 hover:text-destructive rounded-lg text-sm transition-colors flex items-center gap-2">
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
