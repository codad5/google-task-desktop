/**
 * Add Category Dialog
 * 
 * Dialog for creating a new task list.
 */

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useTaskLists } from "../../hooks";

interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AddCategoryDialog({
  open,
  onClose,
}: AddCategoryDialogProps) {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const { createTaskList } = useTaskLists();

  const handleAdd = async () => {
    if (!categoryName.trim()) return;

    setLoading(true);
    try {
      await createTaskList(categoryName.trim());
      setCategoryName("");
      onClose();
    } catch (error) {
      console.error("Error adding list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCategoryName("");
    onClose();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !loading && categoryName.trim()) {
      handleAdd();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle>Create New List</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            label="List Name"
            fullWidth
            variant="outlined"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          variant="contained"
          disabled={!categoryName.trim() || loading}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
