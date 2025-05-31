import { Plus } from "lucide-react";
import Link from "next/link";

interface BoardCardProps {
  id?: string;
  title?: string;
  description?: string;
  isNew?: boolean;
  onClick?: () => void;
}

export function BoardCard({ id, title, description, isNew, onClick }: BoardCardProps) {
  if (isNew) {
    return (
      <button
        onClick={onClick}
        className="w-full h-48 bg-card hover:bg-card/80 border-2 border-dashed border-primary/30 rounded-lg p-6 flex flex-col items-center justify-center gap-4 transition-colors group"
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Plus className="w-6 h-6 text-primary" />
        </div>
        <span className="text-lg font-medium text-primary">Crear nuevo tablero</span>
      </button>
    );
  }

  return (
    <Link
      href={`/dashboard/boards/${id}`}
      className="w-full h-48 bg-card hover:bg-card/80 border border-border rounded-lg p-6 flex flex-col transition-colors"
    >
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground text-sm line-clamp-3">{description}</p>
      )}
    </Link>
  );
} 