import { useState, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  IconButton,
  Chip,
  Popover,
} from "@mui/material";
import {
  EditOutlined,
  Today,
  CalendarMonth,
} from "@mui/icons-material";

interface AddTaskInputProps {
  onAdd: (title: string, dueDate?: Date) => void;
}

export default function AddTaskInput({ onAdd }: AddTaskInputProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleAdd = () => {
    if (taskTitle.trim()) {
      onAdd(taskTitle.trim(), dueDate || undefined);
      setTaskTitle("");
      setTaskDetails("");
      setDueDate(null);
      setIsExpanded(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    } else if (e.key === "Escape") {
      setIsExpanded(false);
      setTaskTitle("");
      setTaskDetails("");
      setDueDate(null);
    }
  };

  const handleSetToday = () => {
    const today = new Date();
    today.setHours(23, 59, 0, 0);
    setDueDate(today);
  };

  const handleSetTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(23, 59, 0, 0);
    setDueDate(tomorrow);
  };

  const formatDueDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    }
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  if (!isExpanded) {
    return (
      <Box sx={{ px: 2, py: 1, borderBottom: 1, borderColor: "divider" }}>
        <Button
          startIcon={<EditOutlined sx={{ fontSize: 18 }} />}
          onClick={handleExpand}
          sx={{
            textTransform: "none",
            color: "primary.main",
            justifyContent: "flex-start",
            fontWeight: 500,
            "&:hover": {
              bgcolor: "transparent",
            },
          }}
          size="small"
        >
          Add a task
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: "divider" }}>
      {/* Title Input */}
      <TextField
        fullWidth
        size="small"
        placeholder="Title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        onKeyDown={handleKeyPress}
        inputRef={inputRef}
        variant="standard"
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          "& .MuiInputBase-input": {
            py: 0.5,
            fontSize: "0.95rem",
          },
        }}
      />

      {/* Details Input */}
      <TextField
        fullWidth
        size="small"
        placeholder="Details"
        value={taskDetails}
        onChange={(e) => setTaskDetails(e.target.value)}
        onKeyDown={handleKeyPress}
        variant="standard"
        multiline
        maxRows={3}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <Box sx={{ mr: 1, color: "text.secondary", display: "flex", alignItems: "center" }}>
              ≡
            </Box>
          ),
        }}
        sx={{
          mt: 1,
          "& .MuiInputBase-input": {
            py: 0.5,
            fontSize: "0.85rem",
          },
        }}
      />

      {/* Date/Time Buttons */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5, flexWrap: "wrap" }}>
        <Chip
          label="Today"
          size="small"
          onClick={handleSetToday}
          variant={dueDate?.toDateString() === new Date().toDateString() ? "filled" : "outlined"}
          color={dueDate?.toDateString() === new Date().toDateString() ? "primary" : "default"}
          sx={{ borderRadius: 2 }}
        />
        <Chip
          label="Tomorrow"
          size="small"
          onClick={handleSetTomorrow}
          variant={
            dueDate?.toDateString() ===
            new Date(Date.now() + 86400000).toDateString()
              ? "filled"
              : "outlined"
          }
          color={
            dueDate?.toDateString() ===
            new Date(Date.now() + 86400000).toDateString()
              ? "primary"
              : "default"
          }
          sx={{ borderRadius: 2 }}
        />
        <IconButton
          size="small"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{ border: 1, borderColor: "divider" }}
        >
          <CalendarMonth fontSize="small" />
        </IconButton>

        {/* Show selected date */}
        {dueDate && (
          <Chip
            icon={<Today sx={{ fontSize: 16 }} />}
            label={formatDueDate(dueDate)}
            size="small"
            onDelete={() => setDueDate(null)}
            color="primary"
            variant="outlined"
            sx={{ ml: "auto" }}
          />
        )}
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1.5, gap: 1 }}>
        <Button
          size="small"
          onClick={() => {
            setIsExpanded(false);
            setTaskTitle("");
            setTaskDetails("");
            setDueDate(null);
          }}
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          disabled={!taskTitle.trim()}
          onClick={handleAdd}
          sx={{ textTransform: "none" }}
        >
          Save
        </Button>
      </Box>

      {/* Date Picker Popover */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box sx={{ p: 2, minWidth: 200 }}>
          <TextField
            type="date"
            fullWidth
            size="small"
            value={dueDate ? dueDate.toISOString().split('T')[0] : ''}
            onChange={(e) => {
              if (e.target.value) {
                const newDate = new Date(e.target.value);
                newDate.setHours(23, 59, 0, 0); // End of day
                setDueDate(newDate);
                setAnchorEl(null);
              }
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </Popover>
    </Box>
  );
}
