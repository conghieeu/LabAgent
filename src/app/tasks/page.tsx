import { CheckSquare, Filter, Plus, Search, MoreHorizontal, Clock } from "lucide-react";

export default function TasksPage() {
  const tasks = [
    { id: 1, title: "Finalize System Design Document", project: "VibePlan App", priority: "High", status: "Done", dueDate: "Oct 20" },
    { id: 2, title: "Implement Dashboard UI", project: "VibePlan App", priority: "High", status: "Done", dueDate: "Oct 22" },
    { id: 3, title: "Build Kanban Board functionality", project: "VibePlan App", priority: "Medium", status: "In Progress", dueDate: "Oct 25" },
    { id: 4, title: "Review Team Collaboration flow", project: "VibePlan App", priority: "Medium", status: "To Do", dueDate: "Oct 26" },
    { id: 5, title: "Setup Database Schema", project: "Backend Services", priority: "High", status: "To Do", dueDate: "Oct 27" },
    { id: 6, title: "Write API Documentation", project: "Backend Services", priority: "Low", status: "To Do", dueDate: "Nov 01" },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">My Tasks</h1>
          <p className="text-muted-foreground">Manage your assigned tasks and track upcoming deadlines.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" size={16} />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="bg-accent/50 border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button className="bg-accent hover:bg-accent/80 text-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors border border-border">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
            <Plus size={20} />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden mt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-accent/30 text-muted-foreground text-sm">
              <th className="py-4 px-6 font-medium w-12 text-center"></th>
              <th className="py-4 px-6 font-medium">Task Name</th>
              <th className="py-4 px-6 font-medium">Project</th>
              <th className="py-4 px-6 font-medium">Status</th>
              <th className="py-4 px-6 font-medium">Priority</th>
              <th className="py-4 px-6 font-medium">Due Date</th>
              <th className="py-4 px-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-accent/30 transition-colors group">
                <td className="py-4 px-6 text-center">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${task.status === 'Done' ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground hover:border-primary'}`}>
                    {task.status === 'Done' && <CheckSquare size={14} />}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`font-medium ${task.status === 'Done' ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                    {task.title}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm px-2.5 py-1 bg-accent rounded-md text-foreground/80">{task.project}</span>
                </td>
                <td className="py-4 px-6">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    task.status === 'Done' ? 'bg-green-500/20 text-green-500' : 
                    task.status === 'In Progress' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`text-sm font-medium ${
                    task.priority === 'High' ? 'text-red-500' : 
                    task.priority === 'Medium' ? 'text-orange-500' : 'text-green-500'
                  }`}>
                    {task.priority}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock size={14} />
                    <span>{task.dueDate}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
