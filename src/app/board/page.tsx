"use client";

import { MoreHorizontal, Plus, Filter, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

const initialData = {
  columns: {
    "todo": {
      id: "todo",
      title: "To Do",
      color: "border-blue-500/50",
      taskIds: ["t1", "t2", "t3", "t4"],
    },
    "in-progress": {
      id: "in-progress",
      title: "In Progress",
      color: "border-orange-500/50",
      taskIds: ["t5", "t6"],
    },
    "in-review": {
      id: "in-review",
      title: "In Review",
      color: "border-purple-500/50",
      taskIds: ["t7", "t8", "t9"],
    },
    "done": {
      id: "done",
      title: "Done",
      color: "border-green-500/50",
      taskIds: ["t10", "t11"],
    },
  },
  tasks: {
    "t1": { id: "t1", title: "Design System Updates", tag: "Design", priority: "High", date: "Oct 24" },
    "t2": { id: "t2", title: "API Integration", tag: "Dev", priority: "Medium", date: "Oct 25" },
    "t3": { id: "t3", title: "Client Feedback Review", tag: "Management", priority: "Low", date: "Oct 26" },
    "t4": { id: "t4", title: "Landing Page Copy", tag: "Marketing", priority: "Medium", date: "Oct 27" },
    "t5": { id: "t5", title: "Dashboard Implementation", tag: "Dev", priority: "High", date: "Oct 24" },
    "t6": { id: "t6", title: "User Research Analysis", tag: "Research", priority: "Medium", date: "Oct 25" },
    "t7": { id: "t7", title: "Login Authentication", tag: "Dev", priority: "High", date: "Oct 23" },
    "t8": { id: "t8", title: "Weekly Report", tag: "Management", priority: "Low", date: "Oct 23" },
    "t9": { id: "t9", title: "Social Media Assets", tag: "Marketing", priority: "Medium", date: "Oct 23" },
    "t10": { id: "t10", title: "Project Setup", tag: "Dev", priority: "High", date: "Oct 20" },
    "t11": { id: "t11", title: "Initial Wireframes", tag: "Design", priority: "High", date: "Oct 21" },
  },
  columnOrder: ["todo", "in-progress", "in-review", "done"],
};

export default function KanbanBoard() {
  const [data, setData] = useState(initialData);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = data.columns[source.droppableId as keyof typeof data.columns];
    const finish = data.columns[destination.droppableId as keyof typeof data.columns];

    // Moving within the same list
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };
      setData({
        ...data,
        columns: { ...data.columns, [newColumn.id]: newColumn },
      });
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, taskIds: finishTaskIds };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };

  if (!isMounted) return null; // Avoid hydration mismatch

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Board Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Kanban Board</h1>
          <p className="text-muted-foreground">Manage your project tasks by moving them across columns.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" size={16} />
            <input 
              type="text" 
              placeholder="Search board..." 
              className="bg-accent/50 border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button className="bg-accent hover:bg-accent/80 text-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors border border-border">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
            <Plus size={20} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Kanban Columns */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex-1 overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max h-full">
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId as keyof typeof data.columns];
              const tasks = column.taskIds.map(taskId => data.tasks[taskId as keyof typeof data.tasks]);

              return (
                <div key={column.id} className="w-[320px] flex flex-col h-full">
                  {/* Column Header */}
                  <div className={`flex items-center justify-between mb-4 pb-2 border-b-2 ${column.color}`}>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{column.title}</h3>
                      <span className="bg-accent text-xs px-2 py-0.5 rounded-full font-medium">
                        {tasks.length}
                      </span>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>

                  {/* Column Tasks Container */}
                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 bg-accent/20 rounded-xl p-3 flex flex-col gap-3 overflow-y-auto border border-border/50 transition-colors ${snapshot.isDraggingOver ? 'bg-accent/40 border-primary/30' : ''}`}
                      >
                        {tasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <div 
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-card border border-border rounded-lg p-4 shadow-sm hover:border-primary/50 transition-colors ${snapshot.isDragging ? 'shadow-lg border-primary/70 rotate-2' : ''}`}
                                style={provided.draggableProps.style}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <span className="text-xs px-2 py-1 rounded-md bg-accent font-medium text-foreground/80">
                                    {task.tag}
                                  </span>
                                  <button className="text-muted-foreground hover:text-foreground">
                                    <MoreHorizontal size={16} />
                                  </button>
                                </div>
                                <h4 className="font-medium mb-3 text-sm leading-snug">{task.title}</h4>
                                
                                <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
                                  <div className="flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-card z-10"></div>
                                    <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-card z-0"></div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className={`text-[10px] uppercase font-bold tracking-wider ${
                                      task.priority === 'High' ? 'text-red-500' : 
                                      task.priority === 'Medium' ? 'text-orange-500' : 'text-green-500'
                                    }`}>
                                      {task.priority}
                                    </span>
                                    <span className="text-xs text-muted-foreground">{task.date}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        
                        {/* Add Task Button */}
                        <button className="w-full py-3 mt-2 rounded-lg border border-dashed border-border text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:border-primary/50 transition-all flex items-center justify-center gap-2 text-sm font-medium">
                          <Plus size={16} />
                          Add Task
                        </button>
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
