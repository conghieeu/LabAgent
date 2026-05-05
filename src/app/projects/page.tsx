"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Filter, Plus, MoreHorizontal, Calendar, Clock, CheckCircle2, Circle, AlertCircle, Trash2, Edit, X } from "lucide-react";

// Mock data
const mockProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Overhaul the corporate website with a new modern design system and better UX.",
    status: "Active",
    progress: 65,
    dueDate: "2026-06-15",
    team: [
      "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      "https://i.pravatar.cc/150?u=a04258114e29026702d",
    ],
  },
  {
    id: 2,
    name: "Mobile App Launch",
    description: "Develop and launch the iOS and Android mobile app for clients.",
    status: "Planning",
    progress: 15,
    dueDate: "2026-08-01",
    team: [
      "https://i.pravatar.cc/150?u=a04258114e29026703d",
      "https://i.pravatar.cc/150?u=a04258114e29026704d",
      "https://i.pravatar.cc/150?u=a04258114e29026705d",
    ],
  },
  {
    id: 3,
    name: "Q3 Marketing Campaign",
    description: "Prepare social media assets and ad copy for the upcoming Q3 campaign.",
    status: "On Hold",
    progress: 40,
    dueDate: "2026-07-20",
    team: [
      "https://i.pravatar.cc/150?u=a04258114e29026706d",
    ],
  },
  {
    id: 4,
    name: "Database Migration",
    description: "Migrate legacy database to the new cloud infrastructure.",
    status: "Completed",
    progress: 100,
    dueDate: "2026-05-01",
    team: [
      "https://i.pravatar.cc/150?u=a04258114e29026703d",
      "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    ],
  },
];

const statusColors: Record<string, string> = {
  "Active": "bg-blue-500/20 text-blue-500 border-blue-500/20",
  "Planning": "bg-purple-500/20 text-purple-500 border-purple-500/20",
  "On Hold": "bg-orange-500/20 text-orange-500 border-orange-500/20",
  "Completed": "bg-green-500/20 text-green-500 border-green-500/20",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState(mockProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProject = {
      id: Date.now(),
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as string,
      progress: 0,
      dueDate: formData.get("dueDate") as string,
      team: ["https://i.pravatar.cc/150?u=a042581f4e29026704d"], // Default current user
    };
    setProjects([newProject, ...projects]);
    setIsCreateModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedProject = {
      ...editingProject,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as string,
      dueDate: formData.get("dueDate") as string,
    };
    setProjects(projects.map(p => p.id === editingProject.id ? updatedProject : p));
    setEditingProject(null);
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
    setOpenMenuId(null);
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">Projects</h1>
          <p className="text-sm md:text-base text-muted-foreground">Manage and track all your active initiatives.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full sm:w-auto justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          <span>New Project</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-accent/50 border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors hover:bg-accent/80"
          />
        </div>
        <div className="flex items-center gap-2 relative">
          <div className="relative flex-1 sm:w-48">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-accent/50 border border-border rounded-lg pl-9 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors hover:bg-accent/80 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Planning">Planning</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div key={project.id} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:border-primary/50 transition-all flex flex-col group relative overflow-hidden">
            {/* Status indicator line on top */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${project.status === "Completed" ? "bg-green-500" : project.status === "Active" ? "bg-blue-500" : project.status === "Planning" ? "bg-purple-500" : "bg-orange-500"}`}></div>
            
            <div className="flex justify-between items-start mb-3 mt-1">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${statusColors[project.status]}`}>
                {project.status}
              </span>
              
              <div className="relative">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === project.id ? null : project.id);
                  }}
                  className={`p-1.5 rounded-lg transition-colors ${openMenuId === project.id ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}
                >
                  <MoreHorizontal size={18} />
                </button>
                
                {openMenuId === project.id && (
                  <div 
                    ref={menuRef}
                    className="absolute right-0 top-9 w-40 bg-card border border-border rounded-xl shadow-xl p-1 z-50 animate-in fade-in zoom-in-95"
                  >
                    <button 
                      onClick={() => {
                        setEditingProject(project);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-accent rounded-lg text-sm transition-colors flex items-center gap-2"
                    >
                      <Edit size={14} />
                      Edit Project
                    </button>
                    <div className="h-px bg-border my-1"></div>
                    <button 
                      onClick={() => handleDeleteProject(project.id)}
                      className="w-full text-left px-3 py-2 hover:bg-destructive/10 hover:text-destructive text-destructive rounded-lg text-sm transition-colors flex items-center gap-2"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2 line-clamp-1" title={project.name}>{project.name}</h3>
            <p className="text-sm text-muted-foreground mb-6 line-clamp-2 min-h-[40px]">{project.description}</p>
            
            <div className="mt-auto space-y-4">
              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className="font-medium">Progress</span>
                  <span className="font-medium text-foreground">{project.progress}%</span>
                </div>
                <div className="h-2 w-full bg-accent rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${project.status === "Completed" ? "bg-green-500" : "bg-primary"}`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar size={14} />
                  <span>{new Date(project.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
                
                {/* Team Avatars */}
                <div className="flex -space-x-2">
                  {project.team.map((avatar, i) => (
                    <img 
                      key={i} 
                      src={avatar} 
                      alt="Team member" 
                      className="w-7 h-7 rounded-full border-2 border-card bg-accent"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredProjects.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-center bg-card/50 border border-border border-dashed rounded-xl">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-muted-foreground mb-4">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-lg font-bold mb-1">No projects found</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              We couldn't find any projects matching your current search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-card border border-border w-full max-w-md rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col relative overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between bg-accent/30">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Plus size={20} className="text-primary" />
                Create New Project
              </h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="p-1 hover:bg-accent rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Name</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="e.g. Website Redesign"
                  className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  name="description"
                  placeholder="Brief description of the project goals..."
                  rows={3}
                  className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none"
                  required
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <div className="relative">
                    <select 
                      name="status"
                      className="w-full appearance-none bg-accent/50 border border-border rounded-lg pl-4 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors cursor-pointer"
                    >
                      <option value="Planning">Planning</option>
                      <option value="Active">Active</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Due Date</label>
                  <input 
                    type="date" 
                    name="dueDate"
                    className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                    required
                  />
                </div>
              </div>
              
              <div className="pt-4 flex gap-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-card border border-border w-full max-w-md rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col relative overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between bg-accent/30">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Edit size={20} className="text-primary" />
                Edit Project
              </h2>
              <button onClick={() => setEditingProject(null)} className="p-1 hover:bg-accent rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Name</label>
                <input 
                  type="text" 
                  name="name"
                  defaultValue={editingProject.name}
                  className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  name="description"
                  defaultValue={editingProject.description}
                  rows={3}
                  className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none"
                  required
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <div className="relative">
                    <select 
                      name="status"
                      defaultValue={editingProject.status}
                      className="w-full appearance-none bg-accent/50 border border-border rounded-lg pl-4 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors cursor-pointer"
                    >
                      <option value="Planning">Planning</option>
                      <option value="Active">Active</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Due Date</label>
                  <input 
                    type="date" 
                    name="dueDate"
                    defaultValue={editingProject.dueDate}
                    className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                    required
                  />
                </div>
              </div>
              
              <div className="pt-4 flex gap-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
