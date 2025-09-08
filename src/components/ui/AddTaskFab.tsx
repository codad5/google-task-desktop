import { useState, useRef, useEffect } from "react";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  taskObjectState,
  taskCategoriesListSelector,
  activeTaskCategorySelector,
  activeCategoryTasksState,
} from "../../config/states";
import { task } from "../../types/taskapi";
import { isRegistered, register } from "@tauri-apps/api/globalShortcut";

// No props interface needed - this is a standalone FAB component
export default function AddTaskFab() {
  const [open, setOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const titleInputRef = useRef<HTMLInputElement>(null);

  const taskObject = useRecoilValue(taskObjectState);
  const taskCategoryList = useRecoilValue(taskCategoriesListSelector);
  const activeTaskCategory = useRecoilValue(activeTaskCategorySelector);
  const [activeCategoryTasks, setActiveCategoryTasks] = useRecoilState(
    activeCategoryTasksState
  );

  useEffect(() => {
    // Register global shortcut for adding tasks
    isRegistered("CommandOrControl+Shift+N").then((data) => {
      if (data) return;
      console.log("registering shortcut");
      register("CommandOrControl+Shift+N", () => {
        console.log("Shortcut triggered");
        handleOpen();
      })
        .then(() => {
          console.log("Shortcut registered");
        })
        .catch((err) => {
          console.log("Shortcut registration failed", err);
        });
    });
  }, []);

  const handleOpen = () => {
    setOpen(true);
    // Focus the input after dialog opens
    setTimeout(() => {
      titleInputRef.current?.focus();
    }, 100);
  };

  const handleClose = () => {
    setOpen(false);
    setTaskTitle("");
    setTaskDescription("");
  };

  const handleAddTask = async () => {
    if (!taskTitle.trim()) return;
    if (activeTaskCategory < 0) return;

    const newTask: task = {
      id: (activeCategoryTasks?.length ?? 0) + 1,
      name: taskTitle.trim(),
      description: taskDescription.trim(),
      dueDate: new Date(),
      completed: false,
    };

    // Optimistically update the state
    const oldTasks = activeCategoryTasks;
    setActiveCategoryTasks((active) => [newTask, ...active]);

    try {
      const result = await taskObject.addToTask(
        newTask,
        taskCategoryList[activeTaskCategory].id
      );
      if (!result) {
        console.log("task not added");
        // Revert optimistic update
        setActiveCategoryTasks(oldTasks);
        return;
      }

      await taskObject.clearPositionCache(activeTaskCategory);

      // Refresh the tasks from the server
      const updatedTasks = await taskObject.getTasksByCategoryPosition(
        activeTaskCategory
      );
      setActiveCategoryTasks(updatedTasks);

      console.log("done adding");
      handleClose();
    } catch (err) {
      console.log("error adding task", err);
      // Revert optimistic update
      setActiveCategoryTasks(oldTasks);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && event.ctrlKey) {
      handleAddTask();
    }
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="add task"
        onClick={handleOpen}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <Add />
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Task Title"
              fullWidth
              variant="outlined"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              inputRef={titleInputRef}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Description (Optional)"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleAddTask}
            variant="contained"
            disabled={!taskTitle.trim()}
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
