"use client";

import { Mail, MoreHorizontal, Plus, Shield, ShieldAlert, ShieldCheck, Users, X, UserCog, Trash2, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function CustomSelect({ value, onChange, options }: { value: string, onChange: (v: string) => void, options: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 flex justify-between items-center transition-colors hover:bg-accent/80"
      >
        <span className="font-medium text-foreground/90">{value}</span>
        <ChevronDown size={16} className={`text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-[120] w-full mt-2 bg-card border border-border rounded-xl shadow-xl animate-in fade-in zoom-in-95 duration-150 top-full left-0">
          <div className="p-1 max-h-60 overflow-y-auto flex flex-col gap-0.5 rounded-xl">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center justify-between transition-colors ${value === option ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent text-foreground/80 hover:text-foreground"}`}
              >
                {option}
                {value === option && <Check size={16} className="text-primary" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TeamPage() {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [inviteRole, setInviteRole] = useState("Viewer");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<number | null>(null);
  const [changingRoleMember, setChangingRoleMember] = useState<any>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Alex Morgan", role: "Product Manager", access: "Owner", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    { id: 2, name: "Sarah Chen", role: "Lead Designer", access: "Admin", avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d" },
    { id: 3, name: "Michael Chang", role: "Frontend Developer", access: "Editor", avatar: "https://i.pravatar.cc/150?u=a04258114e29026703d" },
    { id: 4, name: "Emma Watson", role: "Backend Developer", access: "Editor", avatar: "https://i.pravatar.cc/150?u=a04258114e29026704d" },
    { id: 5, name: "David Kim", role: "QA Tester", access: "Viewer", avatar: "https://i.pravatar.cc/150?u=a04258114e29026705d" },
    { id: 6, name: "Jessica Smith", role: "Marketing Lead", access: "Viewer", avatar: "https://i.pravatar.cc/150?u=a04258114e29026706d" },
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

  const confirmRemoveMember = () => {
    if (memberToRemove) {
      setTeamMembers(teamMembers.filter(m => m.id !== memberToRemove));
      setMemberToRemove(null);
    }
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate adding a member
    const newMember = {
      id: Date.now(),
      name: "New Member",
      role: "Guest",
      access: inviteRole,
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
    };
    setTeamMembers([...teamMembers, newMember]);
    setIsInviteModalOpen(false);
  };

  const handleChangeRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTeamMembers(teamMembers.map(m => m.id === changingRoleMember.id ? changingRoleMember : m));
    setChangingRoleMember(null);
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">Team Collaboration</h1>
          <p className="text-sm md:text-base text-muted-foreground">Manage your team members, roles, and project access.</p>
        </div>
        
        <button 
          onClick={() => setIsInviteModalOpen(true)}
          className="w-full lg:w-auto justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          <span>Invite Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/50 transition-colors flex flex-col relative group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="w-full h-full rounded-full border-4 border-card object-cover bg-accent"
                />
              </div>
              <div className="relative">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === member.id ? null : member.id);
                  }}
                  className={`p-1.5 rounded-lg transition-all ${openMenuId === member.id ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100'}`}
                >
                  <MoreHorizontal size={20} />
                </button>
                
                {openMenuId === member.id && (
                  <div 
                    ref={menuRef}
                    className="absolute right-0 top-10 w-48 bg-card border border-border rounded-xl shadow-xl p-1 z-50 animate-in fade-in zoom-in-95"
                  >
                    <button 
                      onClick={() => {
                        setChangingRoleMember(member);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-accent rounded-lg text-sm transition-colors flex items-center gap-2"
                    >
                      <UserCog size={16} />
                      Change Role
                    </button>
                    {member.access !== 'Owner' && (
                      <>
                        <div className="h-px bg-border my-1"></div>
                        <button 
                          onClick={() => {
                            setMemberToRemove(member.id);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-destructive/10 hover:text-destructive rounded-lg text-sm transition-colors flex items-center gap-2"
                        >
                          <Trash2 size={16} />
                          Remove Member
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
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

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-card border border-border w-full max-w-md rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col relative">
            <div className="p-6 border-b border-border flex items-center justify-between bg-accent/30 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded border border-primary/50 bg-primary/10 text-primary flex items-center justify-center">
                  <Users size={16} />
                </div>
                <h2 className="text-xl font-bold">Invite Team Member</h2>
              </div>
              <button onClick={() => setIsInviteModalOpen(false)} className="p-1 hover:bg-accent rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleInviteSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <input 
                  type="email" 
                  placeholder="colleague@example.com"
                  className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Access Level</label>
                <CustomSelect 
                  value={inviteRole}
                  onChange={setInviteRole}
                  options={["Admin", "Editor", "Viewer"]}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Viewers can only see projects. Editors can create and edit tasks.
                </p>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <Mail size={16} />
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Remove Confirmation Modal */}
      {memberToRemove && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-card border border-border w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-4">
                <ShieldAlert size={24} />
              </div>
              <h2 className="text-xl font-bold">Remove Member?</h2>
              <p className="text-muted-foreground text-sm">
                Are you sure you want to remove this member from the team? They will lose access to all projects. This action cannot be undone.
              </p>
            </div>
            
            <div className="p-6 border-t border-border flex gap-3 bg-accent/10">
              <button 
                onClick={() => setMemberToRemove(null)}
                className="flex-1 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmRemoveMember}
                className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm font-medium hover:bg-destructive/90 transition-colors shadow-lg shadow-destructive/20"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Role Modal */}
      {changingRoleMember && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-card border border-border w-full max-w-md rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col relative">
            <div className="p-6 border-b border-border flex items-center justify-between bg-accent/30 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded border border-primary/50 bg-primary/10 text-primary flex items-center justify-center">
                  <UserCog size={16} />
                </div>
                <h2 className="text-xl font-bold">Change Role</h2>
              </div>
              <button onClick={() => setChangingRoleMember(null)} className="p-1 hover:bg-accent rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="px-6 py-4 flex items-center gap-4 bg-accent/20 border-b border-border/50">
              <img src={changingRoleMember.avatar} alt={changingRoleMember.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h3 className="font-bold">{changingRoleMember.name}</h3>
                <p className="text-sm text-muted-foreground">{changingRoleMember.role}</p>
              </div>
            </div>

            <form onSubmit={handleChangeRoleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">New Access Level</label>
                <CustomSelect 
                  value={changingRoleMember.access}
                  onChange={(val) => setChangingRoleMember({ ...changingRoleMember, access: val })}
                  options={["Owner", "Admin", "Editor", "Viewer"]}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Select the appropriate access level. Changing to Owner will transfer ownership of the workspace.
                </p>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setChangingRoleMember(null)}
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
    </div>
  );
}
