import { useState, useEffect } from "react";
import {
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  taskObjectSelector,
  activeTaskCategorySelector,
  activeCategoryTasksState,
  messageState,
  taskCategoriesListSelector,
} from "../../config/states";
import { task, taskCategory } from "../../types/taskapi";
import TaskListHeader from "./TaskListHeader";
import TaskListItem from "./TaskListItem";
import AddTaskInput from "./AddTaskInput";

interface TaskListCardProps {
  category: taskCategory;
  isActive: boolean;
  categoryIndex: number;
}

export default function TaskListCard({ category, isActive, categoryIndex }: TaskListCardProps) {
  const [showCompleted, setShowCompleted] = useState(false);
  const [categoryTasks, setCategoryTasks] = useState<task[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const taskObject = useRecoilValue(taskObjectSelector);
  const activeTaskCategory = useRecoilValue(activeTaskCategorySelector);
  const setActiveCategoryTasks = useSetRecoilState(activeCategoryTasksState);
  const setToastMessage = useSetRecoilState(messageState);
  const taskCategories = useRecoilValue(taskCategoriesListSelector);

  // Fetch tasks on mount if not already loaded
  useEffect(() => {
    const fetchTasks = async () => {
      if (hasFetched) return;
      if (category.tasks && category.tasks.length > 0) {
        setCategoryTasks(category.tasks);
        setHasFetched(true);
        return;
      }

      setLoading(true);
      try {
        const tasks = await taskObject.getTasksByCategoryPosition(categoryIndex);
        setCategoryTasks(tasks);
        setHasFetched(true);
      } catch (error) {
        console.error("Error fetching tasks for category:", category.name, error);
      } finally {
        setLoading(false);
      }
    };

    if (taskObject && categoryIndex >= 0) {
      fetchTasks();
    }
  }, [taskObject, categoryIndex, category.tasks, hasFetched, category.name]);

  // Update tasks when category.tasks changes
  useEffect(() => {
    if (category.tasks && category.tasks.length > 0) {
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

      setCategoryTasks((prev) =>
        prev.map((t) => (t.id === task.id ? updatedTask : t))
      );

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

  const handleAddTask = async (title: string, dueDate?: Date) => {
    const newTask: task = {
      id: (categoryTasks?.length ?? 0) + 1,
      name: title,
      description: "",
      dueDate: dueDate || new Date(),
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
    } catch (error) {
      setToastMessage({
        title: "Error",
        body: (error as Error).message,
        type: "error",
      });
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: 280,
        minWidth: 280,
        minHeight: 200,
        flexShrink: 0,
        bgcolor: "background.paper",
        borderRadius: 2,
        border: 1,
        borderColor: isActive ? "primary.main" : "divider",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s",
      }}
    >
      {/* Header */}
      <TaskListHeader title={category.name} />

      {/* Add Task */}
      <AddTaskInput onAdd={handleAddTask} />

      {/* Task List */}
      <List sx={{ py: 0 }}>
        {loading && (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <CircularProgress size={24} />
          </Box>
        )}

        {!loading && incompleteTasks.length === 0 && completedTasks.length === 0 && (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              No tasks
            </Typography>
          </Box>
        )}

        {incompleteTasks.map((task) => (
          <TaskListItem
            key={`incomplete-${task.id}`}
            task={task}
            onToggle={handleTaskToggle}
            onDelete={handleTaskDelete}
          />
        ))}

        {/* Completed Section */}
        {completedTasks.length > 0 && (
          <>
            <ListItemButton
              onClick={() => setShowCompleted(!showCompleted)}
              sx={{ py: 1, borderTop: 1, borderColor: "divider" }}
            >
              <ListItemText
                primary={`Completed (${completedTasks.length})`}
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.secondary",
                }}
              />
              {showCompleted ? (
                <ExpandLess fontSize="small" />
              ) : (
                <ExpandMore fontSize="small" />
              )}
            </ListItemButton>
            <Collapse in={showCompleted} timeout="auto" unmountOnExit>
              {completedTasks.map((task) => (
                <TaskListItem
                  key={`completed-${task.id}`}
                  task={task}
                  onToggle={handleTaskToggle}
                  onDelete={handleTaskDelete}
                />
              ))}
            </Collapse>
          </>
        )}
      </List>
    </Paper>
  );
}
