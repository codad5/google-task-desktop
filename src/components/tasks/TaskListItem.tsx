/**
 * Task List Item
 * 
 * Individual task row with:
 * - Checkbox to toggle complete (separate from text)
 * - Click text to edit inline
 * - Star button
 * - Options menu with subtask, indent, unindent, move, delete
 * - Inline subtask input (no dialog)
 * - Subtask indentation
 */

import { useState, useRef, useEffect } from "react";
import {
  ListItem,
  ListItemIcon,
  Box,
  Typography,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon as MenuItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  TextField,
  IconButton,
  Checkbox,
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
  Close,
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
  onUpdate?: (task: AppTask, title: string, notes?: string) => void;
  onAddSubtask?: (task: AppTask, title: string) => void;
  onIndent?: (task: AppTask) => void;
  onUnindent?: (task: AppTask) => void;
  parentTaskTitle?: string;
  showSubtaskInput?: boolean; // External control for subtask input
  onSubtaskInputClose?: () => void;
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
  onUpdate,
  onAddSubtask,
  onIndent,
  onUnindent,
  parentTaskTitle,
}: TaskListItemProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [moveAnchorEl, setMoveAnchorEl] = useState<null | HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState("");
  
  const editInputRef = useRef<HTMLInputElement>(null);
  const subtaskInputRef = useRef<HTMLInputElement>(null);
  
  const taskLists = useRecoilValue(taskListsAtom);
  const dueDateInfo = formatDueDate(task.due);
  const isSubtask = !!task.parent;

  // Focus edit input when editing starts
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  // Focus subtask input when it shows
  useEffect(() => {
    if (showSubtaskInput && subtaskInputRef.current) {
      subtaskInputRef.current.focus();
    }
  }, [showSubtaskInput]);

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

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(task);
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStar(task);
  };

  const handleTextClick = () => {
    if (task.status !== "completed") {
      setEditTitle(task.title);
      setIsEditing(true);
    }
  };

  const handleEditSave = () => {
    if (editTitle.trim() && editTitle !== task.title && onUpdate) {
      onUpdate(task, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEditSave();
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  const handleAddSubtask = () => {
    setShowSubtaskInput(true);
    handleCloseMenu();
  };

  const handleSubtaskSubmit = () => {
    if (subtaskTitle.trim() && onAddSubtask) {
      onAddSubtask(task, subtaskTitle.trim());
      setSubtaskTitle("");
      setShowSubtaskInput(false);
    }
  };

  const handleSubtaskKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubtaskSubmit();
    } else if (e.key === "Escape") {
      setSubtaskTitle("");
      setShowSubtaskInput(false);
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
    <>
      <ListItem
        disablePadding
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          pl: isSubtask ? 4 : 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            width: "100%",
            py: 0.75,
            px: 2,
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

          {/* Checkbox */}
          <ListItemIcon sx={{ minWidth: 32, mt: 0.25 }}>
            <Checkbox
              checked={task.status === "completed"}
              onClick={handleCheckboxClick}
              icon={<RadioButtonUnchecked sx={{ fontSize: 20 }} />}
              checkedIcon={<CheckCircle sx={{ fontSize: 20 }} color="primary" />}
              sx={{ p: 0 }}
            />
          </ListItemIcon>

          {/* Title/Edit area */}
          <Box sx={{ flex: 1, minWidth: 0, mr: 1 }}>
            {isEditing ? (
              <TextField
                fullWidth
                size="small"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleEditKeyDown}
                onBlur={handleEditSave}
                inputRef={editInputRef}
                variant="standard"
                InputProps={{ disableUnderline: true }}
                sx={{
                  "& .MuiInputBase-input": {
                    py: 0.5,
                    fontSize: "0.875rem",
                  },
                }}
              />
            ) : (
              <>
                <Typography
                  variant="body2"
                  onClick={handleTextClick}
                  sx={{
                    cursor: task.status !== "completed" ? "text" : "default",
                    textDecoration: task.status === "completed" ? "line-through" : "none",
                    opacity: task.status === "completed" ? 0.6 : 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    "&:hover": task.status !== "completed" ? {
                      bgcolor: "action.hover",
                      borderRadius: 0.5,
                    } : {},
                  }}
                >
                  {task.title}
                </Typography>
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
                      "& .MuiChip-icon": { fontSize: 14 },
                    }}
                  />
                )}
              </>
            )}
          </Box>

          {/* Action buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
            <IconButton
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
            <IconButton
              onClick={handleMenuClick}
              size="small"
              sx={{
                opacity: isHovered ? 0.7 : 0,
                transition: "opacity 0.2s",
              }}
            >
              <MoreVert fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Options Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {!isSubtask && onAddSubtask && (
            <MenuItem onClick={handleAddSubtask}>
              <MenuItemIcon><AddTask fontSize="small" /></MenuItemIcon>
              <ListItemText>Add subtask</ListItemText>
            </MenuItem>
          )}
          {!isSubtask && onIndent && (
            <MenuItem onClick={handleIndent}>
              <MenuItemIcon><FormatIndentIncrease fontSize="small" /></MenuItemIcon>
              <ListItemText>Indent</ListItemText>
            </MenuItem>
          )}
          {isSubtask && onUnindent && (
            <MenuItem onClick={handleUnindent}>
              <MenuItemIcon><FormatIndentDecrease fontSize="small" /></MenuItemIcon>
              <ListItemText>Unindent</ListItemText>
            </MenuItem>
          )}
          <MenuItem onClick={handleMoveClick}>
            <MenuItemIcon><DriveFileMove fontSize="small" /></MenuItemIcon>
            <ListItemText>Move to list</ListItemText>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>▶</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleDelete}>
            <MenuItemIcon><Delete fontSize="small" /></MenuItemIcon>
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
              <MenuItem key={list.id} onClick={() => handleMoveToList(list.id)}>
                <MenuItemIcon sx={{ minWidth: 32 }}>
                  {task.listId === list.id && <Check fontSize="small" />}
                </MenuItemIcon>
                <ListItemText>{list.title}</ListItemText>
              </MenuItem>
            ))
          )}
        </Menu>
      </ListItem>

      {/* Inline Subtask Input */}
      {showSubtaskInput && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            pl: 7,
            pr: 2,
            py: 0.75,
            bgcolor: "action.hover",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <SubdirectoryArrowRight fontSize="small" sx={{ color: "text.disabled" }} />
          <TextField
            fullWidth
            size="small"
            placeholder="Add subtask..."
            value={subtaskTitle}
            onChange={(e) => setSubtaskTitle(e.target.value)}
            onKeyDown={handleSubtaskKeyDown}
            inputRef={subtaskInputRef}
            variant="standard"
            InputProps={{ disableUnderline: true }}
            sx={{
              "& .MuiInputBase-input": {
                py: 0.5,
                fontSize: "0.875rem",
              },
            }}
          />
          <Button 
            size="small" 
            onClick={handleSubtaskSubmit}
            disabled={!subtaskTitle.trim()}
            sx={{ minWidth: "auto", textTransform: "none" }}
          >
            Add
          </Button>
          <IconButton 
            size="small" 
            onClick={() => { setSubtaskTitle(""); setShowSubtaskInput(false); }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>
      )}
    </>
  );

  // Wrap with tooltip if it's a subtask
  if (isSubtask && parentTaskTitle) {
    return (
      <Tooltip title={`Subtask of: ${parentTaskTitle}`} placement="left">
        <Box>{taskContent}</Box>
      </Tooltip>
    );
  }

  return taskContent;
}
