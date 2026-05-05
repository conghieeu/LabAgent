"use client";

import { CheckSquare, Filter, Plus, Search, MoreHorizontal, Clock, Edit, Trash2, ExternalLink } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function TasksPage() {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Finalize System Design Document", project: "VibePlan App", priority: "High", status: "Done", dueDate: "Oct 20" },
    { id: 2, title: "Implement Dashboard UI", project: "VibePlan App", priority: "High", status: "Done", dueDate: "Oct 22" },
    { id: 3, title: "Build Kanban Board functionality", project: "VibePlan App", priority: "Medium", status: "In Progress", dueDate: "Oct 25" },
    { id: 4, title: "Review Team Collaboration flow", project: "VibePlan App", priority: "Medium", status: "To Do", dueDate: "Oct 26" },
    { id: 5, title: "Setup Database Schema", project: "Backend Services", priority: "High", status: "To Do", dueDate: "Oct 27" },
    { id: 6, title: "Write API Documentation", project: "Backend Services", priority: "Low", status: "To Do", dueDate: "Nov 01" },
  ]);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleStatus = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'Done' ? 'To Do' : 'Done' } 
        : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    setOpenMenuId(null);
  };

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
              className="bg-accent/50 border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
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

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-visible mt-4">
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
                  <div 
                    onClick={() => toggleStatus(task.id)}
                    className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${task.status === 'Done' ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground hover:border-primary'}`}
                  >
                    {task.status === 'Done' && <CheckSquare size={14} />}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`font-medium transition-all ${task.status === 'Done' ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                    {task.title}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm px-2.5 py-1 bg-accent rounded-md text-foreground/80">{task.project}</span>
                </td>
                <td className="py-4 px-6">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
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
                <td className="py-4 px-6 text-right relative">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === task.id ? null : task.id);
                    }}
                    className={`p-1.5 rounded-lg transition-all ${openMenuId === task.id ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100'}`}
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {openMenuId === task.id && (
                    <div 
                      ref={menuRef}
                      className="absolute right-6 top-12 w-48 bg-card border border-border rounded-xl shadow-xl p-1 z-50 animate-in fade-in zoom-in-95"
                    >
                      <button className="w-full text-left px-3 py-2 hover:bg-accent rounded-lg text-sm transition-colors flex items-center gap-2">
                        <Edit size={14} />
                        Edit Task
                      </button>
                      <button className="w-full text-left px-3 py-2 hover:bg-accent rounded-lg text-sm transition-colors flex items-center gap-2">
                        <ExternalLink size={14} />
                        View Details
                      </button>
                      <div className="h-px bg-border my-1"></div>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="w-full text-left px-3 py-2 hover:bg-destructive/10 hover:text-destructive rounded-lg text-sm transition-colors flex items-center gap-2"
                      >
                        <Trash2 size={14} />
                        Delete Task
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
