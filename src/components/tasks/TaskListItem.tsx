/**
 * Task List Item
 * 
 * Individual task row with:
 * - Checkbox to toggle complete (separate from text)
 * - Click text to expand full edit form
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
  Popover,
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
  CalendarMonth,
  AccessTime,
  OpenWith,
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
  onUpdate?: (task: AppTask, title: string, notes?: string, due?: Date) => void;
  onAddSubtask?: (task: AppTask, title: string) => void;
  onIndent?: (task: AppTask) => void;
  onUnindent?: (task: AppTask) => void;
  parentTaskTitle?: string;
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
  const [editNotes, setEditNotes] = useState(task.notes || "");
  const [editDue, setEditDue] = useState<Date | null>(task.due ? new Date(task.due) : null);
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [dateAnchorEl, setDateAnchorEl] = useState<HTMLElement | null>(null);
  const [timeAnchorEl, setTimeAnchorEl] = useState<HTMLElement | null>(null);
  
  const editInputRef = useRef<HTMLInputElement>(null);
  const subtaskInputRef = useRef<HTMLInputElement>(null);
  
  const taskLists = useRecoilValue(taskListsAtom);
  const dueDateInfo = formatDueDate(task.due);
  const isSubtask = !!task.parent;

  // Reset edit state when task changes
  useEffect(() => {
    setEditTitle(task.title);
    setEditNotes(task.notes || "");
    setEditDue(task.due ? new Date(task.due) : null);
  }, [task.title, task.notes, task.due]);

  // Focus edit input when editing starts
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
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
      setIsEditing(true);
    }
  };

  const handleEditSave = () => {
    if (editTitle.trim() && onUpdate) {
      const hasChanged = 
        editTitle !== task.title || 
        editNotes !== (task.notes || "") ||
        editDue?.toISOString() !== (task.due ? new Date(task.due).toISOString() : undefined);
      
      if (hasChanged) {
        onUpdate(task, editTitle.trim(), editNotes || undefined, editDue || undefined);
      }
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditTitle(task.title);
    setEditNotes(task.notes || "");
    setEditDue(task.due ? new Date(task.due) : null);
    setIsEditing(false);
  };

  const handleSetToday = () => {
    const today = new Date();
    today.setHours(23, 59, 0, 0);
    setEditDue(today);
  };

  const handleSetTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(23, 59, 0, 0);
    setEditDue(tomorrow);
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
  const todayDate = new Date().toDateString();
  const tomorrowDate = new Date(Date.now() + 86400000).toDateString();

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
              // Full edit form like Google Tasks
              <Box sx={{ width: "100%" }}>
                {/* Title input - text replaces title */}
                <TextField
                  fullWidth
                  size="small"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  inputRef={editInputRef}
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    "& .MuiInputBase-input": {
                      py: 0.5,
                      fontSize: "0.95rem",
                      fontWeight: 500,
                    },
                  }}
                />

                {/* Details input */}
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Details"
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  variant="standard"
                  multiline
                  maxRows={3}
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    mt: 0.5,
                    "& .MuiInputBase-input": {
                      py: 0.5,
                      fontSize: "0.85rem",
                      color: "text.secondary",
                    },
                  }}
                />

                {/* Date/Time controls */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, flexWrap: "wrap" }}>
                  <Chip
                    label="Today"
                    size="small"
                    onClick={handleSetToday}
                    variant={editDue?.toDateString() === todayDate ? "filled" : "outlined"}
                    color={editDue?.toDateString() === todayDate ? "primary" : "default"}
                    sx={{ borderRadius: 2 }}
                  />
                  <Chip
                    label="Tomorrow"
                    size="small"
                    onClick={handleSetTomorrow}
                    variant={editDue?.toDateString() === tomorrowDate ? "filled" : "outlined"}
                    color={editDue?.toDateString() === tomorrowDate ? "primary" : "default"}
                    sx={{ borderRadius: 2 }}
                  />
                  <IconButton
                    size="small"
                    onClick={(e) => setDateAnchorEl(e.currentTarget)}
                    sx={{ border: 1, borderColor: "divider" }}
                  >
                    <CalendarMonth fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(e) => setTimeAnchorEl(e.currentTarget)}
                    sx={{ border: 1, borderColor: "divider" }}
                  >
                    <AccessTime fontSize="small" />
                  </IconButton>
                  
                  {/* Move to list icon */}
                  <IconButton
                    size="small"
                    onClick={handleMoveClick}
                    sx={{ border: 1, borderColor: "divider", ml: "auto" }}
                  >
                    <OpenWith fontSize="small" />
                  </IconButton>
                </Box>

                {/* Show selected date if any */}
                {editDue && (
                  <Chip
                    icon={<Event sx={{ fontSize: 14 }} />}
                    label={editDue.toLocaleDateString([], { month: "short", day: "numeric" })}
                    size="small"
                    onDelete={() => setEditDue(null)}
                    color="primary"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                )}

                {/* Save/Cancel buttons - hidden, save on blur or clicking elsewhere */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, gap: 1 }}>
                  <Button size="small" onClick={handleEditCancel} sx={{ textTransform: "none" }}>
                    Cancel
                  </Button>
                  <Button 
                    size="small" 
                    variant="contained" 
                    onClick={handleEditSave}
                    sx={{ textTransform: "none" }}
                  >
                    Save
                  </Button>
                </Box>

                {/* Date Picker Popover */}
                <Popover
                  open={Boolean(dateAnchorEl)}
                  anchorEl={dateAnchorEl}
                  onClose={() => setDateAnchorEl(null)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                  <Box sx={{ p: 2 }}>
                    <TextField
                      type="date"
                      fullWidth
                      size="small"
                      onChange={(e) => {
                        if (e.target.value) {
                          const newDate = new Date(e.target.value);
                          newDate.setHours(editDue?.getHours() || 23, editDue?.getMinutes() || 59);
                          setEditDue(newDate);
                          setDateAnchorEl(null);
                        }
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                </Popover>

                {/* Time Picker Popover */}
                <Popover
                  open={Boolean(timeAnchorEl)}
                  anchorEl={timeAnchorEl}
                  onClose={() => setTimeAnchorEl(null)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                  <Box sx={{ p: 2 }}>
                    <TextField
                      type="time"
                      fullWidth
                      size="small"
                      label="Set time"
                      onChange={(e) => {
                        if (e.target.value) {
                          const [hours, minutes] = e.target.value.split(":").map(Number);
                          const newDate = editDue ? new Date(editDue) : new Date();
                          newDate.setHours(hours, minutes, 0, 0);
                          setEditDue(newDate);
                          setTimeAnchorEl(null);
                        }
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                </Popover>
              </Box>
            ) : (
              <>
                <Typography
                  variant="body2"
                  onClick={handleTextClick}
                  sx={{
                    cursor: task.status !== "completed" ? "pointer" : "default",
                    textDecoration: task.status === "completed" ? "line-through" : "none",
                    opacity: task.status === "completed" ? 0.6 : 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease",
                    "&:hover": task.status !== "completed" ? {
                      bgcolor: "action.hover",
                      borderRadius: 0.5,
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      overflow: "visible",
                    } : {},
                  }}
                >
                  {task.title}
                </Typography>
                {task.notes && task.status !== "completed" && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    onClick={handleTextClick}
                    sx={{
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        overflow: "visible",
                      },
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

          {/* Action buttons - hide when editing */}
          {!isEditing && (
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
          )}
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
