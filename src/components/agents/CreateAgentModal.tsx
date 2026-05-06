"use client";

import { useState } from "react";
import { X, Bot, Palette, LineChart, BrainCircuit, Sparkles, SlidersHorizontal, Shield } from "lucide-react";

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateAgentModal({ isOpen, onClose }: CreateAgentModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    role: "Frontend Developer",
    model: "GPT-4",
    avatar: "Bot",
    prompt: "",
    access: "all"
  });

  if (!isOpen) return null;

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Agent Created:", formData);
    onClose();
    setStep(1); // Reset
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div 
        className="absolute inset-0 z-0" 
        onClick={onClose}
      />
      
      <div className="relative z-10 w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-border flex justify-between items-center bg-accent/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Create New AI Agent</h2>
              <p className="text-sm text-muted-foreground">Configure your new digital team member</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex px-6 pt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 flex items-center">
               <div className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-primary' : 'bg-accent'}`} />
               {i < 3 && <div className="w-2" />}
            </div>
          ))}
        </div>
        <div className="flex justify-between px-6 pt-2 pb-6 text-xs font-medium text-muted-foreground">
          <span className={step >= 1 ? 'text-primary' : ''}>Identity</span>
          <span className={step >= 2 ? 'text-primary' : ''}>Intelligence</span>
          <span className={step >= 3 ? 'text-primary' : ''}>Access</span>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          <form id="create-agent-form" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Agent Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. CodeBot Alpha"
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

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <BrainCircuit size={16} /> Base Model
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['GPT-4', 'Claude 3 Opus', 'Gemini 1.5 Pro', 'Llama 3'].map((model) => (
                      <label key={model} className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                        formData.model === model ? 'border-primary bg-primary/10 ring-2 ring-primary/50' : 'border-border bg-accent/30 hover:bg-accent/70 hover:border-border/80'
                      }`}>
                        <input 
                          type="radio" 
                          name="model" 
                          value={model}
                          checked={formData.model === model}
                          onChange={(e) => setFormData({...formData, model: e.target.value})}
                          className="sr-only"
                        />
                        <div className="font-medium text-sm">{model}</div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <SlidersHorizontal size={16} /> System Prompt & Instructions
                  </label>
                  <textarea 
                    value={formData.prompt}
                    onChange={(e) => setFormData({...formData, prompt: e.target.value})}
                    placeholder="Describe how this agent should behave, what tools it should prefer, and its general personality..."
                    className="w-full bg-accent/50 border border-border rounded-lg px-4 py-3 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Shield size={16} /> Project Access Level
                  </label>
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
                
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-500 text-sm flex gap-3">
                  <Sparkles size={20} className="shrink-0" />
                  <p>Your agent is ready to be deployed! Once created, you can assign tasks to it from the Kanban board.</p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-accent/30 flex justify-between items-center">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1}
            className="px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>
          
          {step < 3 ? (
            <button
              key="continue-btn"
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Continue
            </button>
          ) : (
            <button
              key="deploy-btn"
              type="submit"
              form="create-agent-form"
              className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Sparkles size={16} /> Deploy Agent
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
