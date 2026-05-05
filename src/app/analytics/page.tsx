import { ArrowDownRight, ArrowUpRight, BarChart3, LineChart, PieChart, TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Analytics & Reports</h1>
        <p className="text-muted-foreground">Monitor your project performance and team productivity.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
        {[
          { title: "Total Tasks", value: "128", change: "+12%", up: true, icon: BarChart3 },
          { title: "Completion Rate", value: "84%", change: "+5%", up: true, icon: PieChart },
          { title: "Avg. Time per Task", value: "4.2h", change: "-1.5h", up: true, icon: TrendingUp },
          { title: "Overdue Tasks", value: "3", change: "+2", up: false, icon: LineChart },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-accent rounded-lg text-primary">
                <stat.icon size={20} />
              </div>
              <span className={`flex items-center text-xs font-medium px-2 py-1 rounded-md ${stat.up ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {stat.up ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                {stat.change}
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Mockup */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold">Productivity Trends</h2>
              <p className="text-sm text-muted-foreground">Tasks completed over the last 30 days</p>
            </div>
            <select className="bg-accent border border-border rounded-lg px-3 py-1.5 text-sm outline-none">
              <option>Last 30 Days</option>
              <option>This Week</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="flex-1 relative flex items-end gap-2 pb-6 px-4">
            {/* Mock Bar Chart */}
            {[40, 70, 45, 90, 65, 85, 100, 50, 75, 60, 80, 95].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer">
                <div 
                  className="w-full bg-primary/20 rounded-t-sm group-hover:bg-primary transition-colors relative"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {height}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pb-6 pointer-events-none opacity-10">
              {[0, 1, 2, 3, 4].map((_, i) => (
                <div key={i} className="w-full h-px bg-foreground border-b border-dashed"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Breakdown Mockup */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col">
          <h2 className="text-xl font-bold mb-1">Project Breakdown</h2>
          <p className="text-sm text-muted-foreground mb-8">Work distribution by project</p>
          
          <div className="flex-1 flex flex-col items-center justify-center relative">
            {/* Mock Donut Chart using CSS */}
            <div className="w-48 h-48 rounded-full border-[16px] border-primary/20 relative flex items-center justify-center">
              {/* Fake donut segments */}
              <div className="absolute inset-0 rounded-full border-[16px] border-primary border-t-transparent border-l-transparent rotate-45"></div>
              <div className="absolute inset-0 rounded-full border-[16px] border-secondary border-b-transparent border-r-transparent -rotate-12"></div>
              
              <div className="text-center">
                <span className="text-3xl font-bold block">128</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Tasks</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 mt-8">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span>VibePlan App</span>
              </div>
              <span className="font-medium">45%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                <span>Backend Services</span>
              </div>
              <span className="font-medium">35%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent"></div>
                <span>Marketing Website</span>
              </div>
              <span className="font-medium">20%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
