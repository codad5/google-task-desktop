import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";
import { taskCategory } from "../../types/taskapi";
import TaskListCard from "./TaskListCard";

interface SortableTaskCardProps {
  category: taskCategory;
  isActive: boolean;
  categoryIndex: number;
}

export default function SortableTaskCard({
  category,
  isActive,
  categoryIndex,
}: SortableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        scrollSnapAlign: "start",
        touchAction: "none",
      }}
    >
      <TaskListCard
        category={category}
        isActive={isActive}
        categoryIndex={categoryIndex}
      />
    </Box>
  );
}
