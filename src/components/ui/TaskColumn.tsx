import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Collapse,
  Divider,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  RadioButtonUnchecked,
  CheckCircle,
  Delete,
  Add,
  ExpandLess,
  ExpandMore,
  Search,
} from "@mui/icons-material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  taskCategoriesListSelector,
  activeTaskCategorySelector,
  activeCategoryTasksState,
  messageState,
  taskObjectSelector,
} from "../../config/states";
import { task, taskCategory } from "../../types/taskapi";

interface TaskColumnProps {
  category: taskCategory;
  isActive: boolean;
}

export default function TaskColumn({ category, isActive }: TaskColumnProps) {
  const [showCompleted, setShowCompleted] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  const taskObject = useRecoilValue(taskObjectSelector);
  const taskCategoryList = useRecoilValue(taskCategoriesListSelector);
  const activeTaskCategory = useRecoilValue(activeTaskCategorySelector);
  const setActiveCategoryTasks = useSetRecoilState(activeCategoryTasksState);
  const setToastMessage = useSetRecoilState(messageState);

  // Get tasks for this specific category
  const [categoryTasks, setCategoryTasks] = useState<task[]>([]);

  useEffect(() => {
    if (category.tasks) {
      setCategoryTasks(category.tasks);
    }
  }, [category.tasks]);

  const incompleteTasks = categoryTasks.filter((task) => !task.completed);
  const completedTasks = categoryTasks.filter((task) => task.completed);

  const handleTaskToggle = async (task: task) => {
    const updatedTask = { ...task, completed: !task.completed };

    try {
      const result = await taskObject.markTask(updatedTask, category.id);
      if (!result) throw new Error("Task not updated");

      setToastMessage({
        title: updatedTask.completed ? "Task completed" : "Task unchecked",
        type: updatedTask.completed ? "success" : "info",
      });

      // Update local state
      setCategoryTasks((prev) =>
        prev.map((t) => (t.id === task.id ? updatedTask : t))
      );

      // Update global state if this is the active category
      if (isActive) {
        setActiveCategoryTasks((prev) =>
          prev.map((t) => (t.id === task.id ? updatedTask : t))
        );
      }

      taskObject.clearPositionCache(activeTaskCategory);
    } catch (error) {
      setToastMessage({
        title: "Error",
        body: (error as Error).message,
        type: "error",
      });
    }
  };

  const handleTaskDelete = async (task: task) => {
    try {
      const result = await taskObject.deleteTask(task, category.id);
      if (!result) throw new Error("Task not deleted");

      setCategoryTasks((prev) => prev.filter((t) => t.id !== task.id));

      if (isActive) {
        setActiveCategoryTasks((prev) => prev.filter((t) => t.id !== task.id));
      }

      taskObject.clearPositionCache(activeTaskCategory);
      setToastMessage({
        title: "Task deleted",
        type: "warning",
      });
    } catch (error) {
      setToastMessage({
        title: "Error",
        body: (error as Error).message,
        type: "error",
      });
    }
  };

  const handleAddTask = async () => {
    if (!newTaskText.trim()) return;

    const newTask: task = {
      id: (categoryTasks?.length ?? 0) + 1,
      name: newTaskText.trim(),
      description: "",
      dueDate: new Date(),
      completed: false,
    };

    try {
      const result = await taskObject.addToTask(newTask, category.id);
      if (!result) throw new Error("Task not added");

      setCategoryTasks((prev) => [newTask, ...prev]);

      if (isActive) {
        setActiveCategoryTasks((prev) => [newTask, ...prev]);
      }

      taskObject.clearPositionCache(activeTaskCategory);
      setNewTaskText("");
      setShowAddTask(false);
    } catch (error) {
      setToastMessage({
        title: "Error",
        body: (error as Error).message,
        type: "error",
      });
    }
  };

  const TaskListItem = ({ task }: { task: task }) => (
    <ListItem
      key={task.id}
      disablePadding
      secondaryAction={
        <IconButton
          edge="end"
          onClick={() => handleTaskDelete(task)}
          size="small"
          sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}
        >
          <Delete fontSize="small" />
        </IconButton>
      }
    >
      <ListItemButton onClick={() => handleTaskToggle(task)} dense>
        <ListItemIcon sx={{ minWidth: 36 }}>
          <Checkbox
            checked={task.completed}
            icon={<RadioButtonUnchecked />}
            checkedIcon={<CheckCircle />}
            sx={{ p: 0 }}
          />
        </ListItemIcon>
        <ListItemText
          primary={task.name}
          primaryTypographyProps={{
            variant: "body2",
            sx: {
              textDecoration: task.completed ? "line-through" : "none",
              opacity: task.completed ? 0.7 : 1,
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );

  return (
    <Paper
      elevation={1}
      sx={{
        height: "fit-content",
        minHeight: "400px",
        borderRadius: 2,
        overflow: "hidden",
        border: isActive ? 2 : 1,
        borderColor: isActive ? "primary.main" : "divider",
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 500 }}>
          {category.name}
        </Typography>
        <Button
          size="small"
          startIcon={<Add />}
          onClick={() => setShowAddTask(!showAddTask)}
          sx={{ mt: 1, textTransform: "none" }}
        >
          Add a task
        </Button>
      </Box>

      {/* Add Task Section */}
      {showAddTask && (
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Add a task"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAddTask();
              }
            }}
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleAddTask} size="small">
                    <Add />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}

      {/* Tasks List */}
      <List sx={{ py: 0 }}>
        {/* Incomplete Tasks */}
        {incompleteTasks.map((task) => (
          <TaskListItem key={`incomplete-${task.id}`} task={task} />
        ))}

        {/* Empty State */}
        {incompleteTasks.length === 0 && (
          <ListItem>
            <ListItemText
              primary="No tasks"
              primaryTypographyProps={{
                variant: "body2",
                color: "text.secondary",
                textAlign: "center",
                sx: { py: 4 },
              }}
            />
          </ListItem>
        )}

        {/* Completed Section */}
        {completedTasks.length > 0 && (
          <>
            <Divider />
            <ListItemButton onClick={() => setShowCompleted(!showCompleted)}>
              <ListItemText
                primary={`Completed (${completedTasks.length})`}
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.secondary",
                }}
              />
              {showCompleted ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={showCompleted} timeout="auto" unmountOnExit>
              {completedTasks.map((task) => (
                <TaskListItem key={`completed-${task.id}`} task={task} />
              ))}
            </Collapse>
          </>
        )}
      </List>
    </Paper>
  );
}
