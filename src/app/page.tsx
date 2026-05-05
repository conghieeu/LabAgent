"use client";

import { CalendarDays, CheckCircle2, Clock, MoreHorizontal, Plus, TrendingUp, Download, Eye, X } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useRef, useEffect } from "react";

const initialChartData = [
  { name: 'Mon', completed: 4, active: 2 },
  { name: 'Tue', completed: 7, active: 3 },
  { name: 'Wed', completed: 5, active: 6 },
  { name: 'Thu', completed: 10, active: 4 },
  { name: 'Fri', completed: 8, active: 7 },
  { name: 'Sat', completed: 12, active: 3 },
  { name: 'Sun', completed: 14, active: 5 },
];

export default function Dashboard() {
  const [isChartMenuOpen, setIsChartMenuOpen] = useState(false);
  const [chartData, setChartData] = useState(initialChartData);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const chartMenuRef = useRef<HTMLDivElement>(null);

  const handleExportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Day,Completed,Active\n"
      + chartData.map(e => `${e.name},${e.completed},${e.active}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "project_progress.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsChartMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chartMenuRef.current && !chartMenuRef.current.contains(event.target as Node)) {
        setIsChartMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground">Welcome back, Alex. Here's your plan for today.</p>
        </div>
        <button className="w-full sm:w-auto justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
          <Plus size={20} />
          <span>New Project</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <CheckCircle2 size={24} />
            </div>
            <span className="text-sm font-medium text-green-500 flex items-center gap-1">
              <TrendingUp size={16} /> +12%
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">24</h3>
          <p className="text-muted-foreground text-sm">Tasks Completed</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Clock size={24} />
            </div>
            <span className="text-sm font-medium text-red-500 flex items-center gap-1">
              <TrendingUp size={16} className="rotate-180" /> -4%
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">12</h3>
          <p className="text-muted-foreground text-sm">In Progress</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <CalendarDays size={24} />
            </div>
            <span className="text-sm font-medium text-green-500 flex items-center gap-1">
              <TrendingUp size={16} /> +8%
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">4</h3>
          <p className="text-muted-foreground text-sm">Upcoming Deadlines</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Project Progress</h2>
            <div className="relative" ref={chartMenuRef}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsChartMenuOpen(!isChartMenuOpen);
                }}
                className={`p-1.5 rounded-lg transition-all ${isChartMenuOpen ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <MoreHorizontal size={20} />
              </button>
              
              {isChartMenuOpen && (
                <div 
                  className="absolute right-0 top-10 w-48 bg-card border border-border rounded-xl shadow-xl p-1 z-50 animate-in fade-in zoom-in-95"
                >
                  <button 
                    onClick={handleExportData}
                    className="w-full text-left px-3 py-2 hover:bg-accent rounded-lg text-sm transition-colors flex items-center gap-2 text-foreground/80 hover:text-foreground"
                  >
                    <Download size={16} />
                    Export Data
                  </button>
                  <button 
                    onClick={() => {
                      setIsDetailsModalOpen(true);
                      setIsChartMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-accent rounded-lg text-sm transition-colors flex items-center gap-2 text-foreground/80 hover:text-foreground"
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%" style={{ outline: 'none' }}>
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#161920', 
                    border: '1px solid rgba(255,255,255,0.08)', 
                    borderRadius: '12px', 
                    color: '#e2e8f0',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    padding: '12px 16px',
                  }}
                  itemStyle={{ color: '#e2e8f0', fontSize: '13px', paddingTop: '4px' }}
                  labelStyle={{ color: '#94a3b8', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}
                  cursor={{ stroke: 'rgba(139,92,246,0.3)', strokeWidth: 1 }}
                />
                <Area type="monotone" dataKey="active" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActive)" />
                <Area type="monotone" dataKey="completed" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorCompleted)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Upcoming Tasks</h2>
            <button className="text-primary text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-4 flex-1">
            {[
              { title: "Design System Review", time: "10:00 AM", tag: "Design", color: "bg-blue-500/20 text-blue-500" },
              { title: "Client Sync Meeting", time: "01:30 PM", tag: "Meeting", color: "bg-purple-500/20 text-purple-500" },
              { title: "Fix API Endpoints", time: "03:00 PM", tag: "Development", color: "bg-green-500/20 text-green-500" },
              { title: "Marketing Assets", time: "Tomorrow", tag: "Marketing", color: "bg-orange-500/20 text-orange-500" }
            ].map((task, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors border border-transparent hover:border-border cursor-pointer">
                <div className="w-2 h-10 rounded-full bg-primary/50"></div>
                <div className="flex-1">
                  <h4 className="font-medium">{task.title}</h4>
                  <p className="text-xs text-muted-foreground">{task.time}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-md font-medium ${task.color}`}>
                  {task.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {isDetailsModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-card border border-border w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border flex items-center justify-between bg-accent/30 rounded-t-2xl">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Eye size={20} className="text-primary" />
                Project Progress Details
              </h2>
              <button onClick={() => setIsDetailsModalOpen(false)} className="p-1 hover:bg-accent rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-accent/50 border-b border-border">
                    <tr>
                      <th className="px-4 py-3 font-medium">Day</th>
                      <th className="px-4 py-3 font-medium">Completed Tasks</th>
                      <th className="px-4 py-3 font-medium">Active Tasks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.map((row, i) => (
                      <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-accent/20 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
                        <td className="px-4 py-3 font-medium text-purple-500">{row.completed}</td>
                        <td className="px-4 py-3 font-medium text-blue-500">{row.active}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-4 border-t border-border bg-accent/10 flex justify-end">
              <button 
                onClick={() => setIsDetailsModalOpen(false)}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
