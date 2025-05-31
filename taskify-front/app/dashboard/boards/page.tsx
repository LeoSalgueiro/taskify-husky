"use client";

import { useState, useEffect } from "react";
import { BoardCard } from "@/components/boards/BoardCard";
import { CreateBoardModal } from "@/components/boards/CreateBoardModal";

interface Board {
  id: string;
  title: string;
  description: string;
}

export default function BoardsPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/boards", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al cargar los tableros");
      }

      const data = await response.json();
      setBoards(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBoard = async (data: { title: string; description: string }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al crear el tablero");
      }

      const newBoard = await response.json();
      setBoards([...boards, newBoard]);
      setIsModalOpen(false);
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

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Mis Tableros</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <BoardCard
              key={board.id}
              id={board.id}
              title={board.title}
              description={board.description}
            />
          ))}
          <BoardCard isNew onClick={() => setIsModalOpen(true)} />
        </div>
      </div>

      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateBoard}
      />
    </div>
  );
} 