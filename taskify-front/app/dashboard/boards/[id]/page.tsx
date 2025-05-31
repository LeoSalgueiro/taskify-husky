"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Plus } from "lucide-react";
import { CreateTaskModal } from "@/components/boards/CreateTaskModal";

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  description?: string;
  columnId: string;
}

interface Board {
  id: string;
  title: string;
  description: string;
  columns: Column[];
}

export default function BoardPage() {
  const params = useParams();
  const [board, setBoard] = useState<Board | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);

  useEffect(() => {
    fetchBoard();
  }, [params.id]);

  const fetchBoard = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/boards/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al cargar el tablero");
      }

      const data = await response.json();
      setBoard(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateColumn = async () => {
    if (!newColumnTitle.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/boards/${params.id}/columns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newColumnTitle }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la columna");
      }

      const newColumn = await response.json();
      setBoard((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          columns: [...prev.columns, newColumn],
        };
      });
      setNewColumnTitle("");
      setIsAddingColumn(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCreateTask = async (data: { title: string; description: string }) => {
    if (!selectedColumn) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/boards/${params.id}/columns/${selectedColumn.id}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al crear la tarea");
      }

      const newTask = await response.json();
      setBoard((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          columns: prev.columns.map((col) =>
            col.id === selectedColumn.id
              ? { ...col, tasks: [...col.tasks, newTask] }
              : col
          ),
        };
      });
      setIsAddingTask(false);
      setSelectedColumn(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-foreground">Tablero no encontrado</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{board.title}</h1>
          {board.description && (
            <p className="text-muted-foreground">{board.description}</p>
          )}
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4">
          {board.columns.map((column) => (
            <div
              key={column.id}
              className="flex-shrink-0 w-80 bg-card rounded-lg p-4"
            >
              <h3 className="font-semibold text-foreground mb-4">{column.title}</h3>
              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-background/50 p-3 rounded-md border border-border"
                  >
                    <h4 className="font-medium text-foreground">{task.title}</h4>
                    {task.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {task.description}
                      </p>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => {
                    setSelectedColumn(column);
                    setIsAddingTask(true);
                  }}
                  className="w-full p-2 text-sm text-primary hover:bg-background/50 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Agregar tarea
                </button>
              </div>
            </div>
          ))}

          {isAddingColumn ? (
            <div className="flex-shrink-0 w-80 bg-card rounded-lg p-4">
              <input
                type="text"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                placeholder="Título de la columna"
                className="w-full px-3 py-2 bg-background/50 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary text-foreground placeholder-foreground/50"
                autoFocus
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleCreateColumn}
                  className="px-3 py-1 text-sm font-medium text-primary-foreground bg-primary hover:bg-secondary rounded-md transition-colors"
                >
                  Agregar
                </button>
                <button
                  onClick={() => setIsAddingColumn(false)}
                  className="px-3 py-1 text-sm font-medium text-foreground hover:bg-background/50 rounded-md transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingColumn(true)}
              className="flex-shrink-0 w-80 h-[200px] bg-card hover:bg-card/80 border-2 border-dashed border-primary/30 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Plus className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary">Agregar columna</span>
            </button>
          )}
        </div>
      </div>

      {selectedColumn && (
        <CreateTaskModal
          isOpen={isAddingTask}
          onClose={() => {
            setIsAddingTask(false);
            setSelectedColumn(null);
          }}
          onSubmit={handleCreateTask}
          columnTitle={selectedColumn.title}
        />
      )}
    </div>
  );
} 