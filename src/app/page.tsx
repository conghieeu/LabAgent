import { CalendarDays, CheckCircle2, Clock, MoreHorizontal, Plus, TrendingUp } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Alex. Here's your plan for today.</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
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
            <button className="text-muted-foreground hover:text-foreground">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="flex-1 bg-accent/30 rounded-lg border border-border border-dashed flex items-center justify-center min-h-[300px]">
            <p className="text-muted-foreground">Progress Chart Visualization</p>
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
    </div>
  );
}
