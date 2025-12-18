/**
 * Task List Item
 * 
 * Individual task row with checkbox, star, and options menu.
 * Supports subtasks with indentation.
 */

import { useState } from "react";
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
  Menu,
  MenuItem,
  ListItemIcon as MenuItemIcon,
  Divider,
  Tooltip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  RadioButtonUnchecked,
  CheckCircle,
  StarBorder,
  Star,
  MoreVert,
  Delete,
  DriveFileMove,
  Event,
  Check,
  SubdirectoryArrowRight,
  FormatIndentDecrease,
  FormatIndentIncrease,
  AddTask,
} from "@mui/icons-material";
import { AppTask } from "../../types/app";
import { useRecoilValue } from "recoil";
import { taskListsAtom } from "../../store";

interface TaskListItemProps {
  task: AppTask;
  onToggle: (task: AppTask) => void;
  onStar: (task: AppTask) => void;
  onDelete: (task: AppTask) => void;
  onMove: (task: AppTask, toListId: string) => void;
  onAddSubtask?: (task: AppTask, title: string) => void;
  onIndent?: (task: AppTask) => void;
  onUnindent?: (task: AppTask) => void;
  parentTaskTitle?: string; // For showing tooltip on subtasks
}

// Helper to format due date
const formatDueDate = (date: string | undefined) => {
  if (!date) return null;
  
  const dueDate = new Date(date);
  if (isNaN(dueDate.getTime())) return null;

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isOverdue = dueDate < today && dueDate.toDateString() !== today.toDateString();
  
  let dateLabel = "";
  if (dueDate.toDateString() === today.toDateString()) {
    dateLabel = "Today";
  } else if (dueDate.toDateString() === tomorrow.toDateString()) {
    dateLabel = "Tomorrow";
  } else {
    dateLabel = dueDate.toLocaleDateString([], { month: "short", day: "numeric" });
  }

  return { label: dateLabel, isOverdue };
};

export default function TaskListItem({
  task,
  onToggle,
  onStar,
  onDelete,
  onMove,
  onAddSubtask,
  onIndent,
  onUnindent,
  parentTaskTitle,
}: TaskListItemProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [moveAnchorEl, setMoveAnchorEl] = useState<null | HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showSubtaskDialog, setShowSubtaskDialog] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState("");
  
  const taskLists = useRecoilValue(taskListsAtom);
  const dueDateInfo = formatDueDate(task.due);
  const isSubtask = !!task.parent;

  const handleMenuClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMoveAnchorEl(null);
  };

  const handleMoveClick = (e: React.MouseEvent<HTMLElement>) => {
    setMoveAnchorEl(e.currentTarget);
  };

  const handleMoveToList = (listId: string) => {
    onMove(task, listId);
    handleCloseMenu();
  };

  const handleDelete = () => {
    onDelete(task);
    handleCloseMenu();
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStar(task);
  };

  const handleAddSubtask = () => {
    setShowSubtaskDialog(true);
    handleCloseMenu();
  };

  const handleSubtaskSubmit = () => {
    if (subtaskTitle.trim() && onAddSubtask) {
      onAddSubtask(task, subtaskTitle.trim());
      setSubtaskTitle("");
      setShowSubtaskDialog(false);
    }
  };

  const handleIndent = () => {
    onIndent?.(task);
    handleCloseMenu();
  };

  const handleUnindent = () => {
    onUnindent?.(task);
    handleCloseMenu();
  };

  // Other lists (excluding current)
  const otherLists = taskLists.filter(list => list.id !== task.listId);

  const taskContent = (
    <ListItem
      disablePadding
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      secondaryAction={
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {/* Star Button - visible if starred OR on hover */}
          <IconButton
            edge="end"
            onClick={handleStarClick}
            size="small"
            sx={{
              opacity: task.isStarred ? 1 : isHovered ? 0.7 : 0,
              transition: "opacity 0.2s",
              color: task.isStarred ? "warning.main" : "inherit",
            }}
          >
            {task.isStarred ? <Star fontSize="small" /> : <StarBorder fontSize="small" />}
          </IconButton>

          {/* Options Menu Button - visible on hover */}
          <IconButton
            edge="end"
            onClick={handleMenuClick}
            size="small"
            sx={{
              opacity: isHovered ? 0.7 : 0,
              transition: "opacity 0.2s",
              "&:hover": { opacity: 1 },
            }}
          >
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>
      }
    >
      <ListItemButton
        onClick={() => onToggle(task)}
        dense
        sx={{ 
          py: 0.75, 
          pl: isSubtask ? 5 : 2, // Indent subtasks
          pr: 10, 
          alignItems: "flex-start" 
        }}
      >
        {/* Subtask indicator */}
        {isSubtask && (
          <SubdirectoryArrowRight 
            fontSize="small" 
            sx={{ 
              mr: 0.5, 
              mt: 0.5, 
              color: "text.disabled",
              fontSize: 16,
            }} 
          />
        )}
        <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
          <Checkbox
            checked={task.status === "completed"}
            icon={<RadioButtonUnchecked sx={{ fontSize: 20 }} />}
            checkedIcon={<CheckCircle sx={{ fontSize: 20 }} color="primary" />}
            sx={{ p: 0 }}
            tabIndex={-1}
          />
        </ListItemIcon>
        <Box sx={{ overflow: "hidden", flex: 1 }}>
          <ListItemText
            primary={task.title}
            primaryTypographyProps={{
              variant: "body2",
              sx: {
                textDecoration: task.status === "completed" ? "line-through" : "none",
                opacity: task.status === "completed" ? 0.6 : 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              },
            }}
          />
          {task.notes && task.status !== "completed" && (
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
              {task.notes}
            </Typography>
          )}
          {/* Due Date Chip */}
          {dueDateInfo && task.status !== "completed" && (
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

      {/* Options Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {/* Add Subtask (only for non-subtasks) */}
        {!isSubtask && onAddSubtask && (
          <MenuItem onClick={handleAddSubtask}>
            <MenuItemIcon>
              <AddTask fontSize="small" />
            </MenuItemIcon>
            <ListItemText>Add subtask</ListItemText>
          </MenuItem>
        )}
        
        {/* Indent (only for non-subtasks) */}
        {!isSubtask && onIndent && (
          <MenuItem onClick={handleIndent}>
            <MenuItemIcon>
              <FormatIndentIncrease fontSize="small" />
            </MenuItemIcon>
            <ListItemText>Indent</ListItemText>
          </MenuItem>
        )}
        
        {/* Unindent (only for subtasks) */}
        {isSubtask && onUnindent && (
          <MenuItem onClick={handleUnindent}>
            <MenuItemIcon>
              <FormatIndentDecrease fontSize="small" />
            </MenuItemIcon>
            <ListItemText>Unindent</ListItemText>
          </MenuItem>
        )}
        
        <MenuItem onClick={handleMoveClick}>
          <MenuItemIcon>
            <DriveFileMove fontSize="small" />
          </MenuItemIcon>
          <ListItemText>Move to list</ListItemText>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
            ▶
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete}>
          <MenuItemIcon>
            <Delete fontSize="small" />
          </MenuItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Move To List Submenu */}
      <Menu
        anchorEl={moveAnchorEl}
        open={Boolean(moveAnchorEl)}
        onClose={() => setMoveAnchorEl(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {otherLists.length === 0 ? (
          <MenuItem disabled>
            <ListItemText>No other lists</ListItemText>
          </MenuItem>
        ) : (
          otherLists.map((list) => (
            <MenuItem 
              key={list.id} 
              onClick={() => handleMoveToList(list.id)}
            >
              <MenuItemIcon sx={{ minWidth: 32 }}>
                {task.listId === list.id && <Check fontSize="small" />}
              </MenuItemIcon>
              <ListItemText>{list.title}</ListItemText>
            </MenuItem>
          ))
        )}
      </Menu>

      {/* Add Subtask Dialog */}
      <Dialog 
        open={showSubtaskDialog} 
        onClose={() => setShowSubtaskDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add subtask to "{task.title}"</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Subtask title"
            fullWidth
            variant="outlined"
            value={subtaskTitle}
            onChange={(e) => setSubtaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubtaskSubmit();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSubtaskDialog(false)}>Cancel</Button>
          <Button onClick={handleSubtaskSubmit} variant="contained" disabled={!subtaskTitle.trim()}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );

  // Wrap with tooltip if it's a subtask
  if (isSubtask && parentTaskTitle) {
    return (
      <Tooltip title={`Subtask of: ${parentTaskTitle}`} placement="left">
        {taskContent}
      </Tooltip>
    );
  }

  return taskContent;
}
