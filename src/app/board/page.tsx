import { MoreHorizontal, Plus, Filter, Search } from "lucide-react";

export default function KanbanBoard() {
  const columns = [
    {
      title: "To Do",
      count: 4,
      color: "border-blue-500/50",
      tasks: [
        { title: "Design System Updates", tag: "Design", priority: "High", date: "Oct 24" },
        { title: "API Integration", tag: "Dev", priority: "Medium", date: "Oct 25" },
        { title: "Client Feedback Review", tag: "Management", priority: "Low", date: "Oct 26" },
        { title: "Landing Page Copy", tag: "Marketing", priority: "Medium", date: "Oct 27" },
      ]
    },
    {
      title: "In Progress",
      count: 2,
      color: "border-orange-500/50",
      tasks: [
        { title: "Dashboard Implementation", tag: "Dev", priority: "High", date: "Oct 24" },
        { title: "User Research Analysis", tag: "Research", priority: "Medium", date: "Oct 25" },
      ]
    },
    {
      title: "In Review",
      count: 3,
      color: "border-purple-500/50",
      tasks: [
        { title: "Login Authentication", tag: "Dev", priority: "High", date: "Oct 23" },
        { title: "Weekly Report", tag: "Management", priority: "Low", date: "Oct 23" },
        { title: "Social Media Assets", tag: "Marketing", priority: "Medium", date: "Oct 23" },
      ]
    },
    {
      title: "Done",
      count: 5,
      color: "border-green-500/50",
      tasks: [
        { title: "Project Setup", tag: "Dev", priority: "High", date: "Oct 20" },
        { title: "Initial Wireframes", tag: "Design", priority: "High", date: "Oct 21" },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Board Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Kanban Board</h1>
          <p className="text-muted-foreground">Manage your project tasks by moving them across columns.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" size={16} />
            <input 
              type="text" 
              placeholder="Search board..." 
              className="bg-accent/50 border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button className="bg-accent hover:bg-accent/80 text-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors border border-border">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
            <Plus size={20} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max h-full">
          {columns.map((column, index) => (
            <div key={index} className="w-[320px] flex flex-col h-full">
              {/* Column Header */}
              <div className={`flex items-center justify-between mb-4 pb-2 border-b-2 ${column.color}`}>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{column.title}</h3>
                  <span className="bg-accent text-xs px-2 py-0.5 rounded-full font-medium">
                    {column.count}
                  </span>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              {/* Column Tasks Container */}
              <div className="flex-1 bg-accent/20 rounded-xl p-3 flex flex-col gap-3 overflow-y-auto border border-border/50">
                {column.tasks.map((task, i) => (
                  <div 
                    key={i} 
                    className="bg-card border border-border rounded-lg p-4 shadow-sm hover:border-primary/50 hover:shadow-md cursor-pointer transition-all"
                    draggable
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs px-2 py-1 rounded-md bg-accent font-medium text-foreground/80">
                        {task.tag}
                      </span>
                      <button className="text-muted-foreground hover:text-foreground">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                    <h4 className="font-medium mb-3 text-sm leading-snug">{task.title}</h4>
                    
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-card z-10"></div>
                        <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-card z-0"></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] uppercase font-bold tracking-wider ${
                          task.priority === 'High' ? 'text-red-500' : 
                          task.priority === 'Medium' ? 'text-orange-500' : 'text-green-500'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-xs text-muted-foreground">{task.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Add Task Button */}
                <button className="w-full py-3 mt-2 rounded-lg border border-dashed border-border text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:border-primary/50 transition-all flex items-center justify-center gap-2 text-sm font-medium">
                  <Plus size={16} />
                  Add Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
