import { useState } from "react";
import { X } from "lucide-react";

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string }) => void;
}

export function CreateBoardModal({ isOpen, onClose, onSubmit }: CreateBoardModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: "", description: "" });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card w-full max-w-md rounded-lg shadow-lg border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Crear nuevo tablero</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-medium text-foreground">
              Título
            </label>
            <input
              id="title"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 bg-background/50 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary text-foreground placeholder-foreground/50"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="description" className="text-sm font-medium text-foreground">
              Descripción
            </label>
            <textarea
              id="description"
              rows={3}
              className="mt-1 block w-full px-3 py-2 bg-background/50 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary text-foreground placeholder-foreground/50"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-foreground hover:bg-background/50 rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-secondary rounded-md transition-colors"
            >
              Crear tablero
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 