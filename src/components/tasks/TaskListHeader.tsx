/**
 * Task List Header
 * 
 * Shows list title with options menu for list operations.
 */

import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  MoreVert,
  Edit,
  Delete,
  VerticalAlignTop,
  DeleteSweep,
  CleaningServices,
  SwapVert,
  Check,
} from "@mui/icons-material";
import { useTaskLists, useTasks } from "../../hooks";

interface TaskListHeaderProps {
  title: string;
  listId: string;
  currentSort?: string;
  onSortChange?: (sortBy: string) => void;
}

export default function TaskListHeader({ 
  title, 
  listId, 
  currentSort = "my_order",
  onSortChange 
}: TaskListHeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const { renameTaskList, deleteTaskList } = useTaskLists();
  const { clearCompletedTasks } = useTasks();

  const open = Boolean(anchorEl);
  const sortOpen = Boolean(sortAnchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSortAnchorEl(null);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortSelect = (sortBy: string) => {
    onSortChange?.(sortBy);
    handleClose();
  };

  const handleRename = async () => {
    if (newTitle.trim() && newTitle !== title) {
      await renameTaskList(listId, newTitle.trim());
    }
    setRenameDialogOpen(false);
    handleClose();
  };

  const handleDelete = async () => {
    await deleteTaskList(listId);
    handleClose();
  };

  const handleClearCompleted = async () => {
    await clearCompletedTasks(listId);
    handleClose();
  };

  const sortOptions = [
    { value: "my_order", label: "My order" },
    { value: "date", label: "Date" },
    { value: "deadline", label: "Deadline" },
    { value: "starred", label: "Starred recently" },
    { value: "title", label: "Title" },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.5,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Typography
          variant="subtitle1"
          component="h2"
          sx={{
            fontWeight: 500,
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>

        <IconButton
          size="small"
          onClick={handleMenuClick}
          sx={{ ml: 1, opacity: 0.7, "&:hover": { opacity: 1 } }}
        >
          <MoreVert fontSize="small" />
        </IconButton>

        {/* Main Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: { minWidth: 220 },
          }}
        >
          <MenuItem onClick={handleSortClick}>
            <ListItemIcon>
              <SwapVert fontSize="small" />
            </ListItemIcon>
            <ListItemText>Sort by</ListItemText>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              ▶
            </Typography>
          </MenuItem>

          <Divider sx={{ my: 0.5 }} />

          <MenuItem onClick={() => { setRenameDialogOpen(true); handleClose(); }}>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            <ListItemText>Rename list</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <Delete fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete list</ListItemText>
          </MenuItem>

          <MenuItem onClick={() => handleClose()}>
            <ListItemIcon>
              <VerticalAlignTop fontSize="small" />
            </ListItemIcon>
            <ListItemText>Move list to first position</ListItemText>
          </MenuItem>

          <Divider sx={{ my: 0.5 }} />

          <MenuItem onClick={handleClearCompleted}>
            <ListItemIcon>
              <DeleteSweep fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete all completed tasks</ListItemText>
          </MenuItem>

          <MenuItem sx={{ color: "text.secondary" }}>
            <ListItemIcon>
              <CleaningServices fontSize="small" sx={{ color: "text.secondary" }} />
            </ListItemIcon>
            <ListItemText>Clean up old tasks</ListItemText>
          </MenuItem>
        </Menu>

        {/* Sort By Submenu */}
        <Menu
          anchorEl={sortAnchorEl}
          open={sortOpen}
          onClose={() => setSortAnchorEl(null)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{
            sx: { minWidth: 180, ml: 0.5 },
          }}
        >
          {sortOptions.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleSortSelect(option.value)}
              selected={currentSort === option.value}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                {currentSort === option.value && <Check fontSize="small" />}
              </ListItemIcon>
              <ListItemText>{option.label}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onClose={() => setRenameDialogOpen(false)}>
        <DialogTitle>Rename list</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRenameDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleRename} variant="contained">Rename</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
