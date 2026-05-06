"use client";

import { useState, useEffect } from "react";
import { X, Bot, Palette, LineChart, BrainCircuit, SlidersHorizontal, Shield, Trash2, PauseCircle } from "lucide-react";
import { Agent } from "@/lib/mockData";

interface EditAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent | null;
}

export function EditAgentModal({ isOpen, onClose, agent }: EditAgentModalProps) {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    name: "",
    role: "Frontend Developer",
    model: "GPT-4",
    avatar: "Bot",
    prompt: "",
    access: "all"
  });

  useEffect(() => {
    if (isOpen && agent) {
      setFormData({
        name: agent.name,
        role: agent.role,
        model: agent.model || "GPT-4",
        avatar: agent.avatar,
        prompt: agent.description || "",
        access: "all"
      });
      setActiveTab("general");
    }
  }, [isOpen, agent]);

  if (!isOpen || !agent) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Agent Updated:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="absolute inset-0 z-0" onClick={onClose} />
      
      <div className="relative z-10 w-full max-w-4xl h-[80vh] bg-card border border-border rounded-2xl shadow-2xl flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-accent/30 border-r border-border flex flex-col">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold">Edit Agent</h2>
            <p className="text-sm text-muted-foreground mt-1 truncate">{agent.name}</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <button 
              type="button"
              onClick={() => setActiveTab("general")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'general' ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-accent hover:text-foreground'}`}
            >
              <Bot size={18} /> General
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab("intelligence")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'intelligence' ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-accent hover:text-foreground'}`}
            >
              <BrainCircuit size={18} /> Intelligence
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab("access")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'access' ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-accent hover:text-foreground'}`}
            >
              <Shield size={18} /> Permissions
            </button>
            <div className="pt-4 mt-4 border-t border-border/50">
              <button 
                type="button"
                onClick={() => setActiveTab("danger")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'danger' ? 'bg-destructive/10 text-destructive' : 'text-destructive/70 hover:bg-destructive/10 hover:text-destructive'}`}
              >
                <Trash2 size={18} /> Danger Zone
              </button>
            </div>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col bg-card">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h3 className="text-lg font-semibold">
              {activeTab === 'general' && 'General Settings'}
              {activeTab === 'intelligence' && 'Intelligence & Prompt'}
              {activeTab === 'access' && 'Project Access'}
              {activeTab === 'danger' && 'Danger Zone'}
            </h3>
            <button type="button" onClick={onClose} className="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <form id="edit-agent-form" onSubmit={handleSubmit} className="h-full">
              {/* General Tab */}
              {activeTab === "general" && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-accent/30 border border-border">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                       {formData.avatar === 'Bot' && <Bot size={32} />}
                       {formData.avatar === 'Palette' && <Palette size={32} />}
                       {formData.avatar === 'LineChart' && <LineChart size={32} />}
                       {formData.avatar === 'BrainCircuit' && <BrainCircuit size={32} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-lg">{agent.name}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${agent.status === 'working' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-accent text-muted-foreground'}`}>
                          {agent.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">Currently handling {agent.tasksCount} tasks</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Agent Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Primary Role</label>
                      <select 
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
                      >
                        <option>Frontend Developer</option>
                        <option>Backend Developer</option>
                        <option>UI/UX Designer</option>
                        <option>Data Analyst</option>
                        <option>Copywriter</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Avatar Icon</label>
                    <div className="flex gap-4">
                      {[
                        { id: 'Bot', icon: Bot, color: 'text-blue-500' },
                        { id: 'Palette', icon: Palette, color: 'text-pink-500' },
                        { id: 'LineChart', icon: LineChart, color: 'text-emerald-500' },
                        { id: 'BrainCircuit', icon: BrainCircuit, color: 'text-purple-500' },
                      ].map((avatar) => (
                        <button
                          key={avatar.id}
                          type="button"
                          onClick={() => setFormData({...formData, avatar: avatar.id})}
                          className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all duration-200 ${
                            formData.avatar === avatar.id 
                              ? 'border-primary bg-primary/10 ring-2 ring-primary/50 z-10' 
                              : 'border-border bg-accent/30 hover:bg-accent/70 hover:border-border/80'
                          }`}
                        >
                          <avatar.icon size={28} className={avatar.color} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Intelligence Tab */}
              {activeTab === "intelligence" && (
                <div className="space-y-6 h-full flex flex-col animate-in fade-in zoom-in-95 duration-200">
                  <div className="space-y-2 shrink-0">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <BrainCircuit size={16} /> Base Model
                    </label>
                    <select 
                      value={formData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
                    >
                      <option>GPT-4o</option>
                      <option>GPT-4</option>
                      <option>Claude 3 Opus</option>
                      <option>Gemini 1.5 Pro</option>
                      <option>Llama 3</option>
                    </select>
                  </div>

                  <div className="space-y-2 flex-1 flex flex-col min-h-0">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <SlidersHorizontal size={16} /> System Prompt & Instructions
                      </label>
                      <button type="button" className="text-xs text-primary hover:underline font-medium">Test Prompt</button>
                    </div>
                    <textarea 
                      value={formData.prompt}
                      onChange={(e) => setFormData({...formData, prompt: e.target.value})}
                      placeholder="Describe how this agent should behave..."
                      className="w-full flex-1 bg-accent/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none font-mono text-sm leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* Access Tab */}
              {activeTab === "access" && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                  <div className="space-y-3">
                    <label className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      formData.access === 'all' ? 'border-primary bg-primary/10 ring-2 ring-primary/50' : 'border-border bg-accent/30 hover:bg-accent/70 hover:border-border/80'
                    }`}>
                      <input 
                        type="radio" 
                        name="access" 
                        value="all"
                        checked={formData.access === 'all'}
                        onChange={(e) => setFormData({...formData, access: e.target.value})}
                        className="mt-1 accent-primary"
                      />
                      <div>
                        <div className="font-medium">All Projects</div>
                        <div className="text-xs text-muted-foreground">Agent can view and participate in any project.</div>
                      </div>
                    </label>
                    <label className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      formData.access === 'specific' ? 'border-primary bg-primary/10 ring-2 ring-primary/50' : 'border-border bg-accent/30 hover:bg-accent/70 hover:border-border/80'
                    }`}>
                      <input 
                        type="radio" 
                        name="access" 
                        value="specific"
                        checked={formData.access === 'specific'}
                        onChange={(e) => setFormData({...formData, access: e.target.value})}
                        className="mt-1 accent-primary"
                      />
                      <div>
                        <div className="font-medium">Specific Projects</div>
                        <div className="text-xs text-muted-foreground">Agent can only access projects it is explicitly invited to.</div>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Danger Zone Tab */}
              {activeTab === "danger" && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                  <div className="border border-destructive/20 rounded-xl overflow-hidden">
                    <div className="p-4 bg-destructive/5 border-b border-destructive/10 flex items-center gap-3 text-destructive">
                      <PauseCircle size={20} />
                      <div>
                        <h4 className="font-semibold text-sm">Pause Agent Activity</h4>
                        <p className="text-xs opacity-80 mt-0.5">Temporarily stop the agent from processing new tasks.</p>
                      </div>
                    </div>
                    <div className="p-4 bg-card">
                      <button type="button" className="px-4 py-2 bg-accent hover:bg-accent/80 border border-border rounded-lg text-sm font-medium transition-colors">
                        Pause Agent
                      </button>
                    </div>
                  </div>

                  <div className="border border-destructive/20 rounded-xl overflow-hidden">
                    <div className="p-4 bg-destructive/5 border-b border-destructive/10 flex items-center gap-3 text-destructive">
                      <Trash2 size={20} />
                      <div>
                        <h4 className="font-semibold text-sm">Delete Agent</h4>
                        <p className="text-xs opacity-80 mt-0.5">Permanently remove this agent and its history. This cannot be undone.</p>
                      </div>
                    </div>
                    <div className="p-4 bg-card">
                      <button type="button" className="px-4 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg text-sm font-medium transition-colors">
                        Delete Agent
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="p-6 border-t border-border bg-accent/30 flex justify-end">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-accent transition-colors border border-transparent hover:border-border"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="edit-agent-form"
                className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
