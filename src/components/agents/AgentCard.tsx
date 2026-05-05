import { Bot, Palette, LineChart, BrainCircuit, Activity, CheckCircle2 } from "lucide-react";
import { Agent } from "@/lib/mockData";

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  // Select icon based on avatar string
  const getIcon = () => {
    switch (agent.avatar) {
      case "Bot": return <Bot size={24} className="text-blue-500" />;
      case "Palette": return <Palette size={24} className="text-pink-500" />;
      case "LineChart": return <LineChart size={24} className="text-emerald-500" />;
      default: return <BrainCircuit size={24} className="text-purple-500" />;
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-primary/10" />

      <div className="flex items-start justify-between mb-4 relative">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/50 flex items-center justify-center border border-border/50 shadow-inner">
            {getIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{agent.name}</h3>
            <span className="text-sm text-muted-foreground">{agent.role}</span>
          </div>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
          agent.status === 'working' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-accent text-muted-foreground'
        }`}>
          {agent.status === 'working' ? (
            <Activity size={12} className="animate-pulse" />
          ) : (
            <CheckCircle2 size={12} />
          )}
          <span className="capitalize">{agent.status}</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-6 line-clamp-2 relative">
        {agent.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50 relative">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-1">Model</span>
          <span className="text-sm font-medium">{agent.model}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-muted-foreground mb-1">Active Tasks</span>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold">{agent.tasksCount}</span>
            {agent.tasksCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
