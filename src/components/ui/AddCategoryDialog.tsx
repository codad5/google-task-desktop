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
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  taskObjectSelector,
  taskCategoriesListState,
} from "../../config/states";

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

  const taskObject = useRecoilValue(taskObjectSelector);
  const setTaskCategories = useSetRecoilState(taskCategoriesListState);

  const handleAdd = async () => {
    if (!categoryName.trim()) return;

    setLoading(true);
    try {
      const result = await taskObject.addNewTaskCategory(categoryName.trim());
      if (!result) {
        console.log("category not added");
        return;
      }

      const updatedCategories = await taskObject.getTaskCategories();
      setTaskCategories(updatedCategories);

      setCategoryName("");
      onClose();
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCategoryName("");
    onClose();
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
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
            onKeyPress={handleKeyPress}
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
