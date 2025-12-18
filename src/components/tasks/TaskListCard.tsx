/**
 * Task List Card
 * 
 * Displays a single task list as a sticky-note style card.
 */

import { useState } from "react";
import {
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { AppTaskList, AppTask } from "../../types/app";
import { useTasks } from "../../hooks";
import TaskListHeader from "./TaskListHeader";
import TaskListItem from "./TaskListItem";
import AddTaskInput from "./AddTaskInput";

interface TaskListCardProps {
  taskList: AppTaskList;
  isActive: boolean;
  isDragOverlay?: boolean;
}

export default function TaskListCard({ 
  taskList, 
  isActive, 
  isDragOverlay = false 
}: TaskListCardProps) {
  const [showCompleted, setShowCompleted] = useState(false);
  const { 
    createTask, 
    createSubtask,
    toggleTaskComplete, 
    toggleTaskStar, 
    deleteTask, 
    moveTaskToList,
    indentTask,
    unindentTask,
  } = useTasks();

  // Separate incomplete and completed tasks
  const incompleteTasks = taskList.tasks.filter((task) => task.status === "needsAction");
  const completedTasks = taskList.tasks.filter((task) => task.status === "completed");

  // Create a map of task IDs to titles for parent lookup
  const taskTitleMap = new Map(taskList.tasks.map(t => [t.id, t.title]));

  const handleAddTask = async (title: string, dueDate?: Date) => {
    await createTask({
      title,
      due: dueDate,
      listId: taskList.id,
    });
  };

  const handleTaskToggle = async (task: AppTask) => {
    await toggleTaskComplete(taskList.id, task.id);
  };

  const handleTaskStar = async (task: AppTask) => {
    await toggleTaskStar(taskList.id, task.id);
  };

  const handleTaskDelete = async (task: AppTask) => {
    await deleteTask(taskList.id, task.id);
  };

  const handleTaskMove = async (task: AppTask, toListId: string) => {
    await moveTaskToList(taskList.id, task.id, toListId);
  };

  const handleAddSubtask = async (task: AppTask, title: string) => {
    await createSubtask(taskList.id, task.id, title);
  };

  const handleIndentTask = async (task: AppTask) => {
    await indentTask(taskList.id, task.id);
  };

  const handleUnindentTask = async (task: AppTask) => {
    await unindentTask(taskList.id, task.id);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: 280,
        minWidth: 280,
        minHeight: 200,
        maxHeight: isDragOverlay ? "none" : "calc(100vh - 150px)",
        flexShrink: 0,
        bgcolor: "background.paper",
        borderRadius: 2,
        border: 1,
        borderColor: isActive ? "primary.main" : "divider",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s",
        overflow: "hidden",
        pointerEvents: isDragOverlay ? "none" : "auto",
      }}
    >
      {/* Header */}
      <TaskListHeader 
        title={taskList.title} 
        listId={taskList.id}
      />

      {/* Add Task */}
      <AddTaskInput onAdd={handleAddTask} />

      {/* Task List */}
      <List
        sx={{
          py: 0,
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "thin",
          scrollbarColor: "transparent transparent",
          "&:hover": {
            scrollbarColor: "rgba(155, 155, 155, 0.5) transparent",
          },
          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "transparent",
            borderRadius: 3,
          },
          "&:hover::-webkit-scrollbar-thumb": {
            background: "rgba(155, 155, 155, 0.5)",
          },
        }}
      >
        {incompleteTasks.length === 0 && completedTasks.length === 0 && (
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
            onStar={handleTaskStar}
            onDelete={handleTaskDelete}
            onMove={handleTaskMove}
            onAddSubtask={handleAddSubtask}
            onIndent={handleIndentTask}
            onUnindent={handleUnindentTask}
            parentTaskTitle={task.parent ? taskTitleMap.get(task.parent) : undefined}
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
                  onStar={handleTaskStar}
                  onDelete={handleTaskDelete}
                  onMove={handleTaskMove}
                  onUnindent={handleUnindentTask}
                  parentTaskTitle={task.parent ? taskTitleMap.get(task.parent) : undefined}
                />
              ))}
            </Collapse>
          </>
        )}
      </List>
    </Paper>
  );
}
