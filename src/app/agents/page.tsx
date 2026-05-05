"use client";

import { useState } from "react";

import { Plus, Bot, Sparkles, Search, Filter } from "lucide-react";
import { mockAgents } from "@/lib/mockData";
import { AgentCard } from "@/components/agents/AgentCard";
import { CreateAgentModal } from "@/components/agents/CreateAgentModal";

export default function AgentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgents = mockAgents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="max-w-7xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Bot className="text-primary" size={32} />
                AI Agents
              </h1>
              <p className="text-muted-foreground mt-1">Manage and deploy your digital workforce.</p>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Create Agent</span>
              <span className="sm:hidden">Create</span>
            </button>
          </div>

          {/* Stats & Tools */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Agents</p>
                <p className="text-3xl font-bold">{mockAgents.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Bot size={24} />
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Now</p>
                <p className="text-3xl font-bold">{mockAgents.filter(a => a.status === 'working').length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Sparkles size={24} />
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-center gap-4 md:col-span-1">
               <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  type="text" 
                  placeholder="Search agents..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-accent/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <button className="p-2.5 rounded-lg border border-border bg-accent/50 hover:bg-accent text-muted-foreground transition-colors shrink-0">
                <Filter size={20} />
              </button>
            </div>
          </div>

          {/* Agents Grid */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Your Team</h2>
            {filteredAgents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAgents.map(agent => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-accent/20 rounded-xl border border-dashed border-border">
                <Bot className="mx-auto text-muted-foreground mb-4 opacity-50" size={48} />
                <h3 className="text-lg font-medium">No agents found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your search or create a new agent.</p>
              </div>
            )}
          </div>
      </div>

      <CreateAgentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
