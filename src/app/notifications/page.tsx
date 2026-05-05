import { Check, CheckSquare, Clock, Filter, MessageSquare, MoreHorizontal, AlertCircle } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    { id: 1, title: "Sarah mentioned you", desc: "in Project Redesign comments: 'Hey @Alex, can you review the latest Figma file?'", time: "5m ago", icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/10", unread: true, project: "VibePlan App" },
    { id: 2, title: "Task deadline approaching", desc: "Finalize System Design is due tomorrow at 5:00 PM.", time: "2h ago", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10", unread: true, project: "Backend Services" },
    { id: 3, title: "Payment failed", desc: "Your workspace subscription payment failed. Please update your billing info.", time: "1d ago", icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10", unread: false, project: "Workspace Settings" },
    { id: 4, title: "System updated", desc: "VibePlan has been updated to v2.4 with new Kanban features.", time: "2d ago", icon: Check, color: "text-green-500", bg: "bg-green-500/10", unread: false, project: "System" },
    { id: 5, title: "Michael assigned you a task", desc: "Implement Dashboard UI components", time: "3d ago", icon: CheckSquare, color: "text-purple-500", bg: "bg-purple-500/10", unread: false, project: "VibePlan App" },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Inbox</h1>
          <p className="text-muted-foreground">Catch up on all your notifications and team activities.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-accent hover:bg-accent/80 text-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm border border-border">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="text-primary hover:bg-primary/10 px-4 py-2 rounded-lg font-medium transition-colors text-sm">
            Mark all as read
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        {/* Inbox Tabs */}
        <div className="flex items-center gap-6 px-6 border-b border-border bg-accent/20">
          <button className="py-4 font-medium border-b-2 border-primary text-primary">All Activity</button>
          <button className="py-4 font-medium border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors">Unread</button>
          <button className="py-4 font-medium border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors">Mentions</button>
          <button className="py-4 font-medium border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors">Assigned to me</button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <div key={notif.id} className={`p-6 border-b border-border/50 hover:bg-accent/30 transition-colors flex gap-4 group ${notif.unread ? 'bg-accent/10' : ''}`}>
                <div className={`mt-1 p-3 rounded-full shrink-0 ${notif.bg} ${notif.color}`}>
                  <Icon size={20} />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-base ${notif.unread ? 'font-bold text-foreground' : 'font-medium text-foreground/90'}`}>
                        {notif.title}
                      </h3>
                      {notif.unread && <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-muted-foreground bg-accent px-2 py-1 rounded-md">
                        {notif.project}
                      </span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{notif.time}</span>
                      <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground/90 leading-relaxed max-w-3xl">
                    {notif.desc}
                  </p>
                  
                  {notif.id === 1 && (
                    <div className="mt-4 flex gap-3">
                      <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-1.5 rounded-lg font-medium transition-colors text-xs">
                        Reply
                      </button>
                      <button className="bg-accent hover:bg-accent/80 text-foreground px-4 py-1.5 rounded-lg font-medium transition-colors text-xs border border-border">
                        View Project
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
