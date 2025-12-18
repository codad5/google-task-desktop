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

interface TaskListHeaderProps {
  title: string;
  onRename?: () => void;
  onDelete?: () => void;
  onMoveToFirst?: () => void;
  onDeleteCompleted?: () => void;
  onCleanupOld?: () => void;
  onSortChange?: (sortBy: string) => void;
  currentSort?: string;
}

export default function TaskListHeader({
  title,
  onRename,
  onDelete,
  onMoveToFirst,
  onDeleteCompleted,
  onCleanupOld,
  onSortChange,
  currentSort = "my_order",
}: TaskListHeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const sortOpen = Boolean(sortAnchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
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

  const sortOptions = [
    { value: "my_order", label: "My order" },
    { value: "date", label: "Date" },
    { value: "deadline", label: "Deadline" },
    { value: "starred", label: "Starred recently" },
    { value: "title", label: "Title" },
  ];

  return (
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
        {/* Sort By Submenu Trigger */}
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

        <MenuItem onClick={() => { onRename?.(); handleClose(); }}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Rename list</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => { onDelete?.(); handleClose(); }}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete list</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => { onMoveToFirst?.(); handleClose(); }}>
          <ListItemIcon>
            <VerticalAlignTop fontSize="small" />
          </ListItemIcon>
          <ListItemText>Move list to first position</ListItemText>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem onClick={() => { onDeleteCompleted?.(); handleClose(); }}>
          <ListItemIcon>
            <DeleteSweep fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete all completed tasks</ListItemText>
        </MenuItem>

        <MenuItem 
          onClick={() => { onCleanupOld?.(); handleClose(); }}
          sx={{ color: "text.secondary" }}
        >
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
  );
}
