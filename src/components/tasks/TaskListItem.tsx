import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import {
  RadioButtonUnchecked,
  CheckCircle,
  Delete,
  Event,
} from "@mui/icons-material";
import { task } from "../../types/taskapi";

interface TaskListItemProps {
  task: task;
  onToggle: (task: task) => void;
  onDelete: (task: task) => void;
}

// Helper to format due date nicely
const formatDueDate = (date: Date | string | undefined) => {
  if (!date) return null;
  
  const dueDate = typeof date === "string" ? new Date(date) : date;
  if (isNaN(dueDate.getTime())) return null;

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isOverdue = dueDate < today && dueDate.toDateString() !== today.toDateString();
  const timeStr = dueDate.getHours() !== 0 || dueDate.getMinutes() !== 0
    ? dueDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : null;

  let dateLabel = "";
  if (dueDate.toDateString() === today.toDateString()) {
    dateLabel = "Today";
  } else if (dueDate.toDateString() === tomorrow.toDateString()) {
    dateLabel = "Tomorrow";
  } else {
    dateLabel = dueDate.toLocaleDateString([], { month: "short", day: "numeric" });
  }

  return {
    label: timeStr ? `${dateLabel}, ${timeStr}` : dateLabel,
    isOverdue,
  };
};

export default function TaskListItem({
  task,
  onToggle,
  onDelete,
}: TaskListItemProps) {
  const dueDateInfo = formatDueDate(task.dueDate);

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton
          edge="end"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task);
          }}
          size="small"
          sx={{
            opacity: 0,
            transition: "opacity 0.2s",
            ".MuiListItem-root:hover &": { opacity: 0.7 },
            "&:hover": { opacity: 1 },
          }}
        >
          <Delete fontSize="small" />
        </IconButton>
      }
      sx={{
        "&:hover .MuiIconButton-root": { opacity: 0.7 },
      }}
    >
      <ListItemButton
        onClick={() => onToggle(task)}
        dense
        sx={{ py: 0.75, px: 2, alignItems: "flex-start" }}
      >
        <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
          <Checkbox
            checked={task.completed}
            icon={<RadioButtonUnchecked sx={{ fontSize: 20 }} />}
            checkedIcon={<CheckCircle sx={{ fontSize: 20 }} color="primary" />}
            sx={{ p: 0 }}
            tabIndex={-1}
          />
        </ListItemIcon>
        <Box sx={{ overflow: "hidden", flex: 1 }}>
          <ListItemText
            primary={task.name}
            primaryTypographyProps={{
              variant: "body2",
              sx: {
                textDecoration: task.completed ? "line-through" : "none",
                opacity: task.completed ? 0.6 : 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              },
            }}
          />
          {task.description && !task.completed && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {task.description}
            </Typography>
          )}
          {/* Due Date Chip */}
          {dueDateInfo && !task.completed && (
            <Chip
              icon={<Event sx={{ fontSize: 14 }} />}
              label={dueDateInfo.label}
              size="small"
              color={dueDateInfo.isOverdue ? "error" : "primary"}
              variant="outlined"
              sx={{
                mt: 0.5,
                height: 22,
                fontSize: "0.7rem",
                "& .MuiChip-icon": {
                  fontSize: 14,
                },
              }}
            />
          )}
        </Box>
      </ListItemButton>
    </ListItem>
  );
}
