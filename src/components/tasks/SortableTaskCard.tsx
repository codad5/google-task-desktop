/**
 * Sortable Task Card Wrapper
 * 
 * Makes TaskListCard draggable using @dnd-kit/sortable.
 */

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";
import { AppTaskList } from "../../types/app";
import TaskListCard from "./TaskListCard";

interface SortableTaskCardProps {
  taskList: AppTaskList;
  isActive: boolean;
}

export default function SortableTaskCard({
  taskList,
  isActive,
}: SortableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: taskList.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={{
        scrollSnapAlign: "start",
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
      }}
    >
      {/* Drag handle is the whole card, but we use a wrapper to not interfere with clicks */}
      <Box
        {...attributes}
        {...listeners}
        sx={{ 
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        <TaskListCard
          taskList={taskList}
          isActive={isActive}
        />
      </Box>
    </Box>
  );
}
