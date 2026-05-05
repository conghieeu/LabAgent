import { Mail, MoreHorizontal, Plus, Shield, ShieldAlert, ShieldCheck, Users } from "lucide-react";

export default function TeamPage() {
  const teamMembers = [
    { id: 1, name: "Alex Morgan", role: "Product Manager", access: "Owner", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    { id: 2, name: "Sarah Chen", role: "Lead Designer", access: "Admin", avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d" },
    { id: 3, name: "Michael Chang", role: "Frontend Developer", access: "Editor", avatar: "https://i.pravatar.cc/150?u=a04258114e29026703d" },
    { id: 4, name: "Emma Watson", role: "Backend Developer", access: "Editor", avatar: "https://i.pravatar.cc/150?u=a04258114e29026704d" },
    { id: 5, name: "David Kim", role: "QA Tester", access: "Viewer", avatar: "https://i.pravatar.cc/150?u=a04258114e29026705d" },
    { id: 6, name: "Jessica Smith", role: "Marketing Lead", access: "Viewer", avatar: "https://i.pravatar.cc/150?u=a04258114e29026706d" },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Team Collaboration</h1>
          <p className="text-muted-foreground">Manage your team members, roles, and project access.</p>
        </div>
        
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
          <Plus size={20} />
          <span>Invite Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/50 transition-colors flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="w-full h-full rounded-full border-4 border-card object-cover"
                />
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
            <p className="text-muted-foreground text-sm mb-4">{member.role}</p>
            
            <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-sm">
                {member.access === 'Owner' && <ShieldAlert size={16} className="text-red-500" />}
                {member.access === 'Admin' && <ShieldCheck size={16} className="text-purple-500" />}
                {(member.access === 'Editor' || member.access === 'Viewer') && <Shield size={16} className="text-blue-500" />}
                <span className="font-medium text-foreground/80">{member.access}</span>
              </div>
              
              <button className="text-sm font-medium text-primary hover:underline flex items-center gap-1.5">
                <Mail size={14} />
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
