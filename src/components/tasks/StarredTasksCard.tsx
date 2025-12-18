/**
 * Starred Tasks Card
 * 
 * Displays all starred tasks in a single card.
 * Shows task's parent list name for context.
 */

import {
  Paper,
  List,
  Typography,
  Box,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import { useRecoilValue } from "recoil";
import { taskListsAtom, starredTaskIdsAtom } from "../../store";
import { useTasks } from "../../hooks";
import { AppTask } from "../../types/app";
import TaskListItem from "./TaskListItem";

export default function StarredTasksCard() {
  const taskLists = useRecoilValue(taskListsAtom);
  const starredIds = useRecoilValue(starredTaskIdsAtom);
  const { toggleTaskComplete, toggleTaskStar, deleteTask, moveTaskToList } = useTasks();

  // Get all starred tasks from all lists
  const starredTasks: (AppTask & { listName: string })[] = [];
  
  taskLists.forEach(list => {
    list.tasks.forEach(task => {
      if (starredIds.has(task.id)) {
        starredTasks.push({ ...task, isStarred: true, listName: list.title });
      }
    });
  });

  const handleTaskToggle = async (task: AppTask) => {
    await toggleTaskComplete(task.listId, task.id);
  };

  const handleTaskStar = async (task: AppTask) => {
    await toggleTaskStar(task.listId, task.id);
  };

  const handleTaskDelete = async (task: AppTask) => {
    await deleteTask(task.listId, task.id);
  };

  const handleTaskMove = async (task: AppTask, toListId: string) => {
    await moveTaskToList(task.listId, task.id, toListId);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: 320,
        minWidth: 320,
        minHeight: 200,
        maxHeight: "calc(100vh - 150px)",
        flexShrink: 0,
        bgcolor: "background.paper",
        borderRadius: 2,
        border: 1,
        borderColor: "warning.main",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 1.5,
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "warning.dark",
          color: "warning.contrastText",
        }}
      >
        <Star fontSize="small" />
        <Typography variant="subtitle1" fontWeight={500}>
          Starred
        </Typography>
        <Typography variant="caption" sx={{ ml: "auto" }}>
          {starredTasks.length} task{starredTasks.length !== 1 ? "s" : ""}
        </Typography>
      </Box>

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
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": { background: "transparent", borderRadius: 3 },
          "&:hover::-webkit-scrollbar-thumb": { background: "rgba(155, 155, 155, 0.5)" },
        }}
      >
        {starredTasks.length === 0 ? (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Star sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              No starred tasks
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Click the star icon on any task to add it here
            </Typography>
          </Box>
        ) : (
          starredTasks.map((task) => (
            <Box key={task.id}>
              <TaskListItem
                task={task}
                onToggle={handleTaskToggle}
                onStar={handleTaskStar}
                onDelete={handleTaskDelete}
                onMove={handleTaskMove}
              />
              {/* Show which list this task belongs to */}
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ pl: 6, display: "block", mt: -0.5, mb: 0.5 }}
              >
                in {task.listName}
              </Typography>
            </Box>
          ))
        )}
      </List>
    </Paper>
  );
}
