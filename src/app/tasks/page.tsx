"use client";

import { MoreHorizontal, Plus, Filter, Search, Users } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { mockUsers, mockUserTasks, defaultEmptyUserBoard } from "@/lib/mockData";
import { useSearchParams, useRouter } from "next/navigation";

function TasksBoardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const userIdParam = searchParams.get("userId");
  const initialUserId = userIdParam ? parseInt(userIdParam) : null;
  
  const [selectedUserId, setSelectedUserId] = useState<number | null>(initialUserId);
  const [data, setData] = useState(() => {
    if (initialUserId && mockUserTasks[initialUserId as keyof typeof mockUserTasks]) {
      return mockUserTasks[initialUserId as keyof typeof mockUserTasks];
    }
    return defaultEmptyUserBoard;
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update data when user changes
  useEffect(() => {
    if (selectedUserId && mockUserTasks[selectedUserId as keyof typeof mockUserTasks]) {
      setData(mockUserTasks[selectedUserId as keyof typeof mockUserTasks]);
    } else {
      setData(defaultEmptyUserBoard);
    }
  }, [selectedUserId]);

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = parseInt(e.target.value);
    setSelectedUserId(newId);
    router.push(`/tasks?userId=${newId}`);
  };

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
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-7xl mx-auto">
      {/* Board Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Tasks</h1>
            <p className="text-muted-foreground">Manage and track individual tasks across the team.</p>
          </div>
          
          <div className="h-10 w-px bg-border hidden md:block mx-2"></div>
          
          {/* User Selector */}
          <div className="w-full md:w-64">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Select Team Member</label>
            <div className="relative">
              <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
              <select 
                value={selectedUserId || ""}
                onChange={handleUserChange}
                className="w-full appearance-none bg-primary/10 text-primary font-medium border border-primary/20 rounded-lg pl-10 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
              >
                <option value="" disabled>Choose a member...</option>
                {mockUsers.map(u => (
                  <option key={u.id} value={u.id}>{u.name} - {u.role}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 md:gap-4 w-full xl:w-auto">
          <div className="relative flex-1 min-w-[200px] xl:min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" size={16} />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="w-full bg-accent/50 border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button className="bg-accent hover:bg-accent/80 text-foreground px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors border border-border flex-1 md:flex-none">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button 
            disabled={!selectedUserId}
            className={`px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors flex-1 md:flex-none ${!selectedUserId ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`}
          >
            <Plus size={20} />
            <span className="whitespace-nowrap">Add Task</span>
          </button>
        </div>
      </div>

      {!selectedUserId ? (
        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-2xl bg-card/30">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
            <Users size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-2">No Team Member Selected</h2>
          <p className="text-muted-foreground text-center max-w-md">
            Please select a team member from the dropdown menu above to view and manage their assigned tasks.
          </p>
        </div>
      ) : (
        /* Kanban Columns */
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
                                    <div className="flex items-center gap-3">
                                      <span className={`text-[10px] uppercase font-bold tracking-wider ${
                                        task.priority === 'High' ? 'text-red-500' : 
                                        task.priority === 'Medium' ? 'text-orange-500' : 'text-green-500'
                                      }`}>
                                        {task.priority}
                                      </span>
                                      <span className="text-xs text-muted-foreground">{task.date}</span>
                                    </div>
                                    <img src={mockUsers.find(u => u.id === selectedUserId)?.avatar} alt="avatar" className="w-6 h-6 rounded-full border border-border" />
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
      )}
    </div>
  );
}

export default function TasksPage() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center text-muted-foreground">Loading tasks...</div>}>
      <TasksBoardContent />
    </Suspense>
  );
}
