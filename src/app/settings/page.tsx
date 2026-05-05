"use client";

import { Bell, Lock, User, Monitor, Save, ShieldAlert, Smartphone, Laptop } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-4">
        {/* Settings Navigation */}
        <aside className="w-full lg:w-64 shrink-0">
          <nav className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1 overflow-x-auto pb-2 lg:pb-0">
            <button 
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium w-full text-left whitespace-nowrap transition-colors ${activeTab === 'profile' ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:text-foreground hover:bg-accent'}`}
            >
              <User size={18} />
              Profile
            </button>
            <button 
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium w-full text-left whitespace-nowrap transition-colors ${activeTab === 'notifications' ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:text-foreground hover:bg-accent'}`}
            >
              <Bell size={18} />
              Notifications
            </button>
            <button 
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium w-full text-left whitespace-nowrap transition-colors ${activeTab === 'security' ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:text-foreground hover:bg-accent'}`}
            >
              <Lock size={18} />
              Security
            </button>
            <button 
              onClick={() => setActiveTab("appearance")}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium w-full text-left whitespace-nowrap transition-colors ${activeTab === 'appearance' ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:text-foreground hover:bg-accent'}`}
            >
              <Monitor size={18} />
              Appearance
            </button>
          </nav>
        </aside>

        {/* Settings Content */}
        <div className="flex-1 space-y-8">
          
          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold mb-4">Profile Information</h2>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8">
                <div className="w-20 h-20 shrink-0 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
                  <img 
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
                    alt="User avatar" 
                    className="w-full h-full rounded-full border-4 border-card object-cover"
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                    Change Avatar
                  </button>
                  <button className="bg-accent hover:bg-accent/80 text-foreground px-4 py-2 rounded-lg font-medium transition-colors text-sm border border-border">
                    Remove
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <input 
                    type="text" 
                    defaultValue="Alex"
                    className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <input 
                    type="text" 
                    defaultValue="Morgan"
                    className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="alex.morgan@vibeplan.com"
                    className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium">Job Title</label>
                  <input 
                    type="text" 
                    defaultValue="Product Manager"
                    className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === "notifications" && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold mb-4">Email Notifications</h2>
              <p className="text-sm text-muted-foreground mb-6">Choose what events you want to be notified about via email.</p>
              
              <div className="space-y-4">
                {[
                  { title: "Task Assignments", desc: "Receive an email when you are assigned a new task." },
                  { title: "Project Updates", desc: "Receive emails about project status changes." },
                  { title: "Team Mentions", desc: "Receive an email when someone mentions you in a comment." },
                  { title: "Weekly Digest", desc: "A weekly summary of your upcoming deadlines and team progress." }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0 last:pb-0">
                    <div>
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                    {/* Mock Toggle Switch */}
                    <div className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors ${i !== 1 ? 'bg-primary' : 'bg-accent border border-border'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${i !== 1 ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === "security" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Change Password</h2>
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirm New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                  </div>
                  <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors text-sm mt-2">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Two-Factor Authentication (2FA)</h2>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-accent/30 border border-border rounded-lg">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-full shrink-0">
                      <ShieldAlert size={24} />
                    </div>
                    <div>
                      <h4 className="font-medium">Authenticator App</h4>
                      <p className="text-sm text-muted-foreground mt-1">Not configured. We recommend using Google Authenticator.</p>
                    </div>
                  </div>
                  <button className="bg-accent hover:bg-accent/80 text-foreground px-4 py-2 rounded-lg font-medium transition-colors text-sm border border-border w-full sm:w-auto">
                    Enable 2FA
                  </button>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Active Sessions</h2>
                <div className="space-y-4">
                  <div className="flex items-start sm:items-center justify-between gap-4 py-3 border-b border-border/50">
                    <div className="flex items-start sm:items-center gap-3">
                      <Laptop size={20} className="text-primary mt-0.5 sm:mt-0 shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium">Windows PC - Chrome</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">Ho Chi Minh City, VN • Active Now</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-md shrink-0">Current</span>
                  </div>
                  <div className="flex items-start sm:items-center justify-between gap-4 py-3">
                    <div className="flex items-start sm:items-center gap-3">
                      <Smartphone size={20} className="text-muted-foreground mt-0.5 sm:mt-0 shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium">iPhone 14 Pro - Safari</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">Hanoi, VN • Last active 2 hours ago</p>
                      </div>
                    </div>
                    <button className="text-xs font-medium text-destructive hover:underline shrink-0 mt-1 sm:mt-0">Revoke</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* APPEARANCE TAB */}
          {activeTab === "appearance" && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold mb-4">Appearance</h2>
              <p className="text-sm text-muted-foreground mb-6">Customize how VibePlan looks on your device.</p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-medium mb-3">Theme Preference</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="border-2 border-primary rounded-lg p-1 cursor-pointer">
                      <div className="bg-[#0f1115] rounded-md h-24 p-2 flex flex-col gap-2">
                        <div className="flex gap-2">
                          <div className="w-1/3 h-4 bg-[#161920] rounded"></div>
                          <div className="w-2/3 h-4 bg-[#1e293b] rounded"></div>
                        </div>
                        <div className="flex-1 bg-[#161920] rounded border border-[#2e3646]"></div>
                      </div>
                      <p className="text-center text-sm font-medium mt-2 mb-1 text-primary">Dark (Active)</p>
                    </div>
                    <div className="border-2 border-transparent hover:border-border rounded-lg p-1 cursor-pointer transition-colors">
                      <div className="bg-white rounded-md h-24 p-2 flex flex-col gap-2 border border-slate-200 shadow-sm">
                        <div className="flex gap-2">
                          <div className="w-1/3 h-4 bg-slate-100 rounded"></div>
                          <div className="w-2/3 h-4 bg-slate-200 rounded"></div>
                        </div>
                        <div className="flex-1 bg-slate-50 rounded border border-slate-100"></div>
                      </div>
                      <p className="text-center text-sm font-medium mt-2 mb-1 text-muted-foreground">Light</p>
                    </div>
                    <div className="border-2 border-transparent hover:border-border rounded-lg p-1 cursor-pointer transition-colors">
                      <div className="bg-gradient-to-r from-[#0f1115] to-white rounded-md h-24 flex"></div>
                      <p className="text-center text-sm font-medium mt-2 mb-1 text-muted-foreground">System Default</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Accent Color</h3>
                  <div className="flex gap-3">
                    <button className="w-8 h-8 rounded-full bg-violet-500 ring-2 ring-offset-2 ring-offset-card ring-primary shadow-sm"></button>
                    <button className="w-8 h-8 rounded-full bg-blue-500 hover:scale-110 transition-transform shadow-sm"></button>
                    <button className="w-8 h-8 rounded-full bg-emerald-500 hover:scale-110 transition-transform shadow-sm"></button>
                    <button className="w-8 h-8 rounded-full bg-rose-500 hover:scale-110 transition-transform shadow-sm"></button>
                    <button className="w-8 h-8 rounded-full bg-amber-500 hover:scale-110 transition-transform shadow-sm"></button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
