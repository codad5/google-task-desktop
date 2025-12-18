import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { RadioButtonUnchecked, CheckCircle, Delete } from "@mui/icons-material";
import { task } from "../../types/taskapi";

interface TaskListItemProps {
  task: task;
  onToggle: (task: task) => void;
  onDelete: (task: task) => void;
}

export default function TaskListItem({
  task,
  onToggle,
  onDelete,
}: TaskListItemProps) {
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
        sx={{ py: 0.5, px: 2 }}
      >
        <ListItemIcon sx={{ minWidth: 32 }}>
          <Checkbox
            checked={task.completed}
            icon={<RadioButtonUnchecked sx={{ fontSize: 20 }} />}
            checkedIcon={<CheckCircle sx={{ fontSize: 20 }} color="primary" />}
            sx={{ p: 0 }}
            tabIndex={-1}
          />
        </ListItemIcon>
        <Box sx={{ overflow: "hidden" }}>
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
        </Box>
      </ListItemButton>
    </ListItem>
  );
}
