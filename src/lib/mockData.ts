export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  progress: number;
  dueDate: string;
  team: string[];
}

export const mockProjects: Project[] = [
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

export const mockBoards = {
  // Website Redesign (id: 1)
  1: {
    columns: {
      "todo": { id: "todo", title: "To Do", color: "border-blue-500/50", taskIds: ["1_t1", "1_t2"] },
      "in-progress": { id: "in-progress", title: "In Progress", color: "border-orange-500/50", taskIds: ["1_t3"] },
      "in-review": { id: "in-review", title: "In Review", color: "border-purple-500/50", taskIds: ["1_t4"] },
      "done": { id: "done", title: "Done", color: "border-green-500/50", taskIds: ["1_t5"] },
    },
    tasks: {
      "1_t1": { id: "1_t1", title: "Design System Updates", tag: "Design", priority: "High", date: "Oct 24" },
      "1_t2": { id: "1_t2", title: "API Integration", tag: "Dev", priority: "Medium", date: "Oct 25" },
      "1_t3": { id: "1_t3", title: "Client Feedback Review", tag: "Management", priority: "Low", date: "Oct 26" },
      "1_t4": { id: "1_t4", title: "Landing Page Copy", tag: "Marketing", priority: "Medium", date: "Oct 27" },
      "1_t5": { id: "1_t5", title: "Initial Wireframes", tag: "Design", priority: "High", date: "Oct 21" },
    },
    columnOrder: ["todo", "in-progress", "in-review", "done"],
  },
  // Mobile App Launch (id: 2)
  2: {
    columns: {
      "todo": { id: "todo", title: "To Do", color: "border-blue-500/50", taskIds: ["2_t1", "2_t2"] },
      "in-progress": { id: "in-progress", title: "In Progress", color: "border-orange-500/50", taskIds: [] },
      "in-review": { id: "in-review", title: "In Review", color: "border-purple-500/50", taskIds: [] },
      "done": { id: "done", title: "Done", color: "border-green-500/50", taskIds: ["2_t3"] },
    },
    tasks: {
      "2_t1": { id: "2_t1", title: "Dashboard Implementation", tag: "Dev", priority: "High", date: "Oct 24" },
      "2_t2": { id: "2_t2", title: "User Research Analysis", tag: "Research", priority: "Medium", date: "Oct 25" },
      "2_t3": { id: "2_t3", title: "Project Setup", tag: "Dev", priority: "High", date: "Oct 20" },
    },
    columnOrder: ["todo", "in-progress", "in-review", "done"],
  },
  // Q3 Marketing Campaign (id: 3)
  3: {
    columns: {
      "todo": { id: "todo", title: "To Do", color: "border-blue-500/50", taskIds: ["3_t1"] },
      "in-progress": { id: "in-progress", title: "In Progress", color: "border-orange-500/50", taskIds: ["3_t2"] },
      "in-review": { id: "in-review", title: "In Review", color: "border-purple-500/50", taskIds: [] },
      "done": { id: "done", title: "Done", color: "border-green-500/50", taskIds: [] },
    },
    tasks: {
      "3_t1": { id: "3_t1", title: "Login Authentication", tag: "Dev", priority: "High", date: "Oct 23" },
      "3_t2": { id: "3_t2", title: "Weekly Report", tag: "Management", priority: "Low", date: "Oct 23" },
    },
    columnOrder: ["todo", "in-progress", "in-review", "done"],
  },
  // Database Migration (id: 4)
  4: {
    columns: {
      "todo": { id: "todo", title: "To Do", color: "border-blue-500/50", taskIds: [] },
      "in-progress": { id: "in-progress", title: "In Progress", color: "border-orange-500/50", taskIds: [] },
      "in-review": { id: "in-review", title: "In Review", color: "border-purple-500/50", taskIds: [] },
      "done": { id: "done", title: "Done", color: "border-green-500/50", taskIds: ["4_t1", "4_t2"] },
    },
    tasks: {
      "4_t1": { id: "4_t1", title: "Schema Design", tag: "Dev", priority: "High", date: "Oct 23" },
      "4_t2": { id: "4_t2", title: "Data Backup", tag: "Dev", priority: "High", date: "Oct 23" },
    },
    columnOrder: ["todo", "in-progress", "in-review", "done"],
  }
};

export const defaultEmptyBoard = {
  columns: {
    "todo": { id: "todo", title: "To Do", color: "border-blue-500/50", taskIds: [] },
    "in-progress": { id: "in-progress", title: "In Progress", color: "border-orange-500/50", taskIds: [] },
    "in-review": { id: "in-review", title: "In Review", color: "border-purple-500/50", taskIds: [] },
    "done": { id: "done", title: "Done", color: "border-green-500/50", taskIds: [] },
  },
  tasks: {},
  columnOrder: ["todo", "in-progress", "in-review", "done"],
};

export interface User {
  id: number;
  name: string;
  avatar: string;
  role: string;
}

export const mockUsers: User[] = [
  { id: 1, name: "Alex Morgan", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", role: "Product Manager" },
  { id: 2, name: "Sarah Connor", avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d", role: "Lead Designer" },
  { id: 3, name: "John Doe", avatar: "https://i.pravatar.cc/150?u=a04258114e29026703d", role: "Frontend Dev" },
];

export const mockUserTasks = {
  // Alex Morgan
  1: {
    columns: {
      "todo": { id: "todo", title: "To Do", color: "border-blue-500/50", taskIds: ["u1_t1"] },
      "in-progress": { id: "in-progress", title: "In Progress", color: "border-orange-500/50", taskIds: ["u1_t2"] },
      "done": { id: "done", title: "Done", color: "border-green-500/50", taskIds: ["u1_t3"] },
    },
    tasks: {
      "u1_t1": { id: "u1_t1", title: "Review Team Collaboration flow", tag: "VibePlan App", priority: "Medium", date: "Oct 26" },
      "u1_t2": { id: "u1_t2", title: "Build Kanban Board functionality", tag: "VibePlan App", priority: "High", date: "Oct 25" },
      "u1_t3": { id: "u1_t3", title: "Finalize System Design Document", tag: "VibePlan App", priority: "High", date: "Oct 20" },
    },
    columnOrder: ["todo", "in-progress", "done"],
  },
  // Sarah Connor
  2: {
    columns: {
      "todo": { id: "todo", title: "To Do", color: "border-blue-500/50", taskIds: ["u2_t1"] },
      "in-progress": { id: "in-progress", title: "In Progress", color: "border-orange-500/50", taskIds: [] },
      "done": { id: "done", title: "Done", color: "border-green-500/50", taskIds: ["u2_t2"] },
    },
    tasks: {
      "u2_t1": { id: "u2_t1", title: "Design System Updates", tag: "VibePlan App", priority: "High", date: "Oct 24" },
      "u2_t2": { id: "u2_t2", title: "Initial Wireframes", tag: "VibePlan App", priority: "High", date: "Oct 21" },
    },
    columnOrder: ["todo", "in-progress", "done"],
  },
  // John Doe
  3: {
    columns: {
      "todo": { id: "todo", title: "To Do", color: "border-blue-500/50", taskIds: ["u3_t1"] },
      "in-progress": { id: "in-progress", title: "In Progress", color: "border-orange-500/50", taskIds: ["u3_t2"] },
      "done": { id: "done", title: "Done", color: "border-green-500/50", taskIds: [] },
    },
    tasks: {
      "u3_t1": { id: "u3_t1", title: "Setup Database Schema", tag: "Backend Services", priority: "High", date: "Oct 27" },
      "u3_t2": { id: "u3_t2", title: "Write API Documentation", tag: "Backend Services", priority: "Low", date: "Nov 01" },
    },
    columnOrder: ["todo", "in-progress", "done"],
  }
};

export const defaultEmptyUserBoard = {
  columns: {
    "todo": { id: "todo", title: "To Do", color: "border-blue-500/50", taskIds: [] },
    "in-progress": { id: "in-progress", title: "In Progress", color: "border-orange-500/50", taskIds: [] },
    "done": { id: "done", title: "Done", color: "border-green-500/50", taskIds: [] },
  },
  tasks: {},
  columnOrder: ["todo", "in-progress", "done"],
};

export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "idle" | "working";
  tasksCount: number;
  description: string;
  model: string;
}

export const mockAgents: Agent[] = [
  {
    id: "agent_1",
    name: "CodeBot Alpha",
    role: "Frontend Developer",
    avatar: "Bot",
    status: "working",
    tasksCount: 3,
    description: "Expert in React and Next.js. Writes clean, maintainable UI code.",
    model: "GPT-4"
  },
  {
    id: "agent_2",
    name: "DesignMind",
    role: "UI/UX Designer",
    avatar: "Palette",
    status: "idle",
    tasksCount: 0,
    description: "Specializes in creating beautiful and accessible user interfaces.",
    model: "Claude 3 Opus"
  },
  {
    id: "agent_3",
    name: "DataCruncher",
    role: "Data Analyst",
    avatar: "LineChart",
    status: "working",
    tasksCount: 1,
    description: "Analyzes metrics and generates comprehensive reports.",
    model: "Gemini 1.5 Pro"
  }
];
