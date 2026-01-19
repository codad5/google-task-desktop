/**
 * Sortable Task Item Wrapper
 * 
 * Makes TaskListItem draggable using @dnd-kit/sortable.
 * Has a drag handle on the left side.
 */

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";
import { DragIndicator } from "@mui/icons-material";
import { AppTask } from "../../types/app";
import TaskListItem from "./TaskListItem";

interface SortableTaskItemProps {
  task: AppTask;
  onToggle: (task: AppTask) => void;
  onStar: (task: AppTask) => void;
  onDelete: (task: AppTask) => void;
  onMove: (task: AppTask, toListId: string) => void;
  onUpdate?: (task: AppTask, title: string, notes?: string, due?: Date) => void;
  onAddSubtask?: (task: AppTask, title: string) => void;
  onIndent?: (task: AppTask) => void;
  onUnindent?: (task: AppTask) => void;
  parentTaskTitle?: string;
}

export default function SortableTaskItem({
  task,
  ...props
}: SortableTaskItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? "rgba(25, 118, 210, 0.08)" : undefined,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={{
        display: "flex",
        alignItems: "stretch",
        position: "relative",
        "&:hover .drag-handle": {
          opacity: 1,
        },
      }}
    >
      {/* Drag Handle - appears on hover */}
      <Box
        {...attributes}
        {...listeners}
        className="drag-handle"
        sx={{
          display: "flex",
          alignItems: "center",
          px: 0.5,
          cursor: isDragging ? "grabbing" : "grab",
          opacity: 0,
          transition: "opacity 0.2s",
          color: "text.secondary",
          "&:hover": {
            color: "primary.main",
          },
        }}
      >
        <DragIndicator fontSize="small" />
      </Box>

      {/* Task Item */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <TaskListItem task={task} {...props} />
      </Box>
    </Box>
  );
}
