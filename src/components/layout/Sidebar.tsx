/**
 * Sidebar Component
 * 
 * Navigation sidebar with starred view and task list management.
 */

import { useState } from "react";
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  Divider,
  Checkbox,
  IconButton,
} from "@mui/material";
import {
  Add,
  TaskAlt,
  StarBorder,
  Star,
  ExpandLess,
  ExpandMore,
  FormatListBulleted,
} from "@mui/icons-material";
import { useRecoilState, useRecoilValue } from "recoil";
import { viewStateAtom, starredTaskIdsAtom } from "../../store";
import { useTaskLists } from "../../hooks";
import AddCategoryDialog from "../ui/AddCategoryDialog";

interface SidebarProps {
  onViewChange?: (view: "all" | "starred" | "list", listId?: string) => void;
}

export default function Sidebar({ onViewChange }: SidebarProps) {
  const [listsExpanded, setListsExpanded] = useState(true);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [viewState, setViewState] = useRecoilState(viewStateAtom);
  const starredIds = useRecoilValue(starredTaskIdsAtom);
  const { taskLists, toggleListVisibility } = useTaskLists();

  const handleViewAll = () => {
    setViewState({ view: "all", activeListId: undefined, activeListIndex: -1 });
    onViewChange?.("all");
  };

  const handleViewStarred = () => {
    setViewState({ view: "starred", activeListId: undefined, activeListIndex: -2 });
    onViewChange?.("starred");
  };

  const handleListClick = (listId: string, index: number) => {
    setViewState({ view: "list", activeListId: listId, activeListIndex: index });
    onViewChange?.("list", listId);
  };

  const handleToggleVisibility = (e: React.MouseEvent, listId: string) => {
    e.stopPropagation();
    toggleListVisibility(listId);
  };

  const starredCount = starredIds.size;

  return (
    <>
      <Box
        sx={{
          width: 240,
          minWidth: 240,
          height: "100%",
          borderRight: 1,
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
          overflow: "hidden",
        }}
      >
        {/* Create Button */}
        <Box sx={{ p: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => setShowAddCategory(true)}
            sx={{
              borderRadius: 6,
              textTransform: "none",
              py: 1.5,
              px: 3,
              width: "fit-content",
              bgcolor: "background.paper",
              borderColor: "divider",
              "&:hover": {
                bgcolor: "action.hover",
                borderColor: "primary.main",
              },
            }}
          >
            Create
          </Button>
        </Box>

        {/* Navigation Items */}
        <List sx={{ py: 0 }}>
          {/* All Tasks */}
          <ListItemButton
            selected={viewState.view === "all"}
            onClick={handleViewAll}
            sx={{
              borderRadius: "0 24px 24px 0",
              mr: 2,
              "&.Mui-selected": {
                bgcolor: "primary.dark",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <TaskAlt fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="All tasks"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItemButton>

          {/* Starred */}
          <ListItemButton
            selected={viewState.view === "starred"}
            onClick={handleViewStarred}
            sx={{
              borderRadius: "0 24px 24px 0",
              mr: 2,
              "&.Mui-selected": {
                bgcolor: "warning.dark",
                "&:hover": {
                  bgcolor: "warning.dark",
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {viewState.view === "starred" ? (
                <Star fontSize="small" color="warning" />
              ) : (
                <StarBorder fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText
              primary="Starred"
              primaryTypographyProps={{ variant: "body2" }}
            />
            {starredCount > 0 && (
              <Typography variant="caption" color="text.secondary">
                {starredCount}
              </Typography>
            )}
          </ListItemButton>
        </List>

        <Divider sx={{ my: 1 }} />

        {/* Lists Section Header */}
        <ListItemButton
          onClick={() => setListsExpanded(!listsExpanded)}
          sx={{ height: "48px", flexGrow: 0 }}
        >
          <ListItemText
            primary="Lists"
            primaryTypographyProps={{
              variant: "caption",
              color: "text.secondary",
              fontWeight: 500,
            }}
          />
          {listsExpanded ? (
            <ExpandLess fontSize="small" />
          ) : (
            <ExpandMore fontSize="small" />
          )}
        </ListItemButton>

        {/* Task Lists */}
        <Collapse in={listsExpanded} timeout="auto">
          <List
            sx={{
              py: 0,
              maxHeight: 300,
              overflowY: "auto",
              overflowX: "hidden",
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": { width: 4 },
              "&::-webkit-scrollbar-thumb": {
                bgcolor: "action.disabled",
                borderRadius: 2,
              },
            }}
          >
            {taskLists.map((list, index) => (
              <ListItemButton
                key={list.id}
                selected={viewState.activeListId === list.id}
                onClick={() => handleListClick(list.id, index)}
                sx={{
                  borderRadius: "0 24px 24px 0",
                  mr: 2,
                  py: 0.75,
                  opacity: list.isVisible ? 1 : 0.5,
                  "&.Mui-selected": {
                    bgcolor: "action.selected",
                    "&:hover": { bgcolor: "action.selected" },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <Checkbox
                    size="small"
                    checked={list.isVisible}
                    onClick={(e) => handleToggleVisibility(e, list.id)}
                    sx={{ p: 0.5 }}
                  />
                </ListItemIcon>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <FormatListBulleted fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={list.title}
                  primaryTypographyProps={{
                    variant: "body2",
                    noWrap: true,
                  }}
                />
                {list.incompleteCount > 0 && (
                  <Typography variant="caption" color="text.secondary">
                    {list.incompleteCount}
                  </Typography>
                )}
              </ListItemButton>
            ))}

            {/* Create new list */}
            <ListItemButton
              onClick={() => setShowAddCategory(true)}
              sx={{
                borderRadius: "0 24px 24px 0",
                mr: 2,
                py: 0.75,
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Add fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Create new list"
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.secondary",
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </Box>

      <AddCategoryDialog
        open={showAddCategory}
        onClose={() => setShowAddCategory(false)}
      />
    </>
  );
}
