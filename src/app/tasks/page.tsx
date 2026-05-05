"use client";

import { CheckSquare, Filter, Plus, Search, MoreHorizontal, Clock, Edit, Trash2, ExternalLink, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function TasksPage() {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [viewingTask, setViewingTask] = useState<any>(null);
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

  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks(tasks.map(t => t.id === editingTask.id ? editingTask : t));
    setEditingTask(null);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">My Tasks</h1>
          <p className="text-muted-foreground">Manage your assigned tasks and track upcoming deadlines.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 md:gap-4 w-full md:w-auto">
          <div className="relative flex-1 min-w-[200px] md:min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" size={16} />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="w-full bg-accent/50 border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <button className="bg-accent hover:bg-accent/80 text-foreground px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors border border-border flex-1 md:flex-none">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors flex-1 md:flex-none">
            <Plus size={20} />
            <span className="whitespace-nowrap">Add Task</span>
          </button>
        </div>
      </div>

      {/* Mobile Tasks List */}
      <div className="grid md:hidden gap-4 mt-2">
        {tasks.map((task) => (
          <div key={task.id} className="bg-card border border-border rounded-xl p-4 shadow-sm relative flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div 
                  onClick={() => toggleStatus(task.id)}
                  className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center cursor-pointer shrink-0 transition-colors ${task.status === 'Done' ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground hover:border-primary'}`}
                >
                  {task.status === 'Done' && <CheckSquare size={14} />}
                </div>
                <div className="min-w-0">
                  <h3 className={`font-medium truncate transition-all ${task.status === 'Done' ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                    {task.title}
                  </h3>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    <span className="text-xs px-2 py-0.5 bg-accent rounded-md text-foreground/80 truncate max-w-full">
                      {task.project}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === task.id ? null : task.id);
                  }}
                  className={`p-1.5 rounded-lg shrink-0 transition-all ${openMenuId === task.id ? 'bg-accent text-foreground' : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'}`}
                >
                  <MoreHorizontal size={18} />
                </button>
                {openMenuId === task.id && (
                  <div 
                    ref={menuRef}
                    className="absolute right-0 top-10 w-48 bg-card border border-border rounded-xl shadow-xl p-1 z-50 animate-in fade-in zoom-in-95"
                  >
                    <button 
                      onClick={() => {
                        setEditingTask(task);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-accent rounded-lg text-sm transition-colors flex items-center gap-2"
                    >
                      <Edit size={14} />
                      Edit Task
                    </button>
                    <button 
                      onClick={() => {
                        setViewingTask(task);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-accent rounded-lg text-sm transition-colors flex items-center gap-2"
                    >
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
              </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center text-sm pt-2 border-t border-border/50">
              <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-all ${
                task.status === 'Done' ? 'bg-green-500/20 text-green-500' : 
                task.status === 'In Progress' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'
              }`}>
                {task.status}
              </span>
              <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full bg-accent/50 border border-border/50 ${
                task.priority === 'High' ? 'text-red-500' : 
                task.priority === 'Medium' ? 'text-orange-500' : 'text-green-500'
              }`}>
                {task.priority} Priority
              </span>
              <div className="flex items-center gap-1.5 text-muted-foreground bg-accent/50 border border-border/50 px-2.5 py-1 rounded-full text-[11px] ml-auto">
                <Clock size={12} />
                <span>{task.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Tasks Table */}
      <div className="hidden md:block bg-card border border-border rounded-xl shadow-sm overflow-visible mt-2">
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
                  <span className="text-sm px-2.5 py-1 bg-accent rounded-md text-foreground/80 whitespace-nowrap">{task.project}</span>
                </td>
                <td className="py-4 px-6">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition-all ${
                    task.status === 'Done' ? 'bg-green-500/20 text-green-500' : 
                    task.status === 'In Progress' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`text-sm font-medium whitespace-nowrap ${
                    task.priority === 'High' ? 'text-red-500' : 
                    task.priority === 'Medium' ? 'text-orange-500' : 'text-green-500'
                  }`}>
                    {task.priority}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground whitespace-nowrap">
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
                    className={`p-1.5 rounded-lg transition-all ${openMenuId === task.id ? 'bg-accent text-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground opacity-0 group-hover:opacity-100'}`}
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {openMenuId === task.id && (
                    <div 
                      ref={menuRef}
                      className="absolute right-6 top-12 w-48 bg-card border border-border rounded-xl shadow-xl p-1 z-50 animate-in fade-in zoom-in-95"
                    >
                      <button 
                        onClick={() => {
                          setEditingTask(task);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-accent rounded-lg text-sm transition-colors flex items-center gap-2"
                      >
                        <Edit size={14} />
                        Edit Task
                      </button>
                      <button 
                        onClick={() => {
                          setViewingTask(task);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-accent rounded-lg text-sm transition-colors flex items-center gap-2"
                      >
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

      {/* Edit Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-card border border-border w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border flex items-center justify-between bg-accent/30">
              <h2 className="text-xl font-bold">Edit Task</h2>
              <button onClick={() => setEditingTask(null)} className="p-1 hover:bg-accent rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpdateTask} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Task Name</label>
                <input 
                  type="text" 
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <select 
                    value={editingTask.priority}
                    onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                    className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Due Date</label>
                  <input 
                    type="text" 
                    value={editingTask.dueDate}
                    onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                    className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setEditingTask(null)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewingTask && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-card border border-border w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border flex items-center justify-between bg-accent/30">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded border flex items-center justify-center ${viewingTask.status === 'Done' ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                  {viewingTask.status === 'Done' ? <CheckSquare size={16} /> : <Clock size={16} />}
                </div>
                <h2 className="text-xl font-bold">Task Details</h2>
              </div>
              <button onClick={() => setViewingTask(null)} className="p-1 hover:bg-accent rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">{viewingTask.title}</h3>
                <span className="text-sm px-3 py-1 bg-accent rounded-md text-foreground/80 font-medium">
                  Project: {viewingTask.project}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-6 bg-accent/20 p-4 rounded-xl border border-border/50">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                    viewingTask.status === 'Done' ? 'bg-green-500/20 text-green-500' : 
                    viewingTask.status === 'In Progress' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'
                  }`}>
                    {viewingTask.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Priority</p>
                  <span className={`text-sm font-bold ${
                    viewingTask.priority === 'High' ? 'text-red-500' : 
                    viewingTask.priority === 'Medium' ? 'text-orange-500' : 'text-green-500'
                  }`}>
                    {viewingTask.priority}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Due Date</p>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Clock size={16} className="text-muted-foreground" />
                    {viewingTask.dueDate}
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Description</p>
                <div className="p-4 bg-accent/20 rounded-xl border border-border/50 text-sm text-muted-foreground leading-relaxed min-h-[100px]">
                  No detailed description provided for this task yet.
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-border flex justify-end gap-3 bg-accent/10">
              <button 
                onClick={() => setViewingTask(null)}
                className="px-6 py-2 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
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
