import { useState, useRef } from "react";
import { Box, Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { EditOutlined, Add } from "@mui/icons-material";

interface AddTaskInputProps {
  onAdd: (title: string) => void;
}

export default function AddTaskInput({ onAdd }: AddTaskInputProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleAdd = () => {
    if (taskTitle.trim()) {
      onAdd(taskTitle.trim());
      setTaskTitle("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd();
    } else if (e.key === "Escape") {
      setIsExpanded(false);
      setTaskTitle("");
    }
  };

  const handleBlur = () => {
    if (!taskTitle.trim()) {
      setIsExpanded(false);
    }
  };

  if (!isExpanded) {
    return (
      <Box sx={{ px: 2, py: 1 }}>
        <Button
          startIcon={<EditOutlined sx={{ fontSize: 18 }} />}
          onClick={handleExpand}
          sx={{
            textTransform: "none",
            color: "text.secondary",
            justifyContent: "flex-start",
            "&:hover": {
              color: "primary.main",
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
      <TextField
        fullWidth
        size="small"
        placeholder="Add a task"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        onKeyDown={handleKeyPress}
        onBlur={handleBlur}
        inputRef={inputRef}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          endAdornment: taskTitle.trim() && (
            <InputAdornment position="end">
              <IconButton onClick={handleAdd} size="small" color="primary">
                <Add fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiInputBase-input": {
            py: 0.5,
          },
        }}
      />
    </Box>
  );
}
