/**
 * Sidebar Component
 * 
 * Navigation sidebar with starred view, task list management, and collapse functionality.
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
  Tooltip,
} from "@mui/material";
import {
  Add,
  TaskAlt,
  StarBorder,
  Star,
  ExpandLess,
  ExpandMore,
  FormatListBulleted,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useRecoilState, useRecoilValue } from "recoil";
import { viewStateAtom, starredTaskIdsAtom } from "../../store";
import { useTaskLists } from "../../hooks";
import AddCategoryDialog from "../ui/AddCategoryDialog";

interface SidebarProps {
  onViewChange?: (view: "all" | "starred" | "list", listId?: string) => void;
}

export default function Sidebar({ onViewChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    console.log("Toggling visibility for list:", listId);
    toggleListVisibility(listId);
  };

  const starredCount = starredIds.size;
  const sidebarWidth = isCollapsed ? 64 : 240;

  return (
    <>
      <Box
        sx={{
          width: sidebarWidth,
          minWidth: sidebarWidth,
          height: "100%",
          borderRight: 1,
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
          overflow: "hidden",
          transition: "width 0.2s ease-in-out, min-width 0.2s ease-in-out",
        }}
      >
        {/* Collapse Toggle */}
        <Box
          sx={{
            display: "flex",
            justifyContent: isCollapsed ? "center" : "flex-end",
            p: 1,
          }}
        >
          <Tooltip title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
            <IconButton size="small" onClick={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? <ChevronRight fontSize="small" /> : <ChevronLeft fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Box>

        {/* Create Button */}
        {!isCollapsed && (
          <Box sx={{ px: 2, pb: 2 }}>
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
        )}

        {/* Collapsed: Just icons */}
        {isCollapsed ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, py: 2 }}>
            <Tooltip title="Create new list" placement="right">
              <IconButton onClick={() => setShowAddCategory(true)}>
                <Add />
              </IconButton>
            </Tooltip>
            <Divider sx={{ width: "80%", my: 1 }} />
            <Tooltip title="All tasks" placement="right">
              <IconButton 
                onClick={handleViewAll}
                color={viewState.view === "all" ? "primary" : "default"}
              >
                <TaskAlt />
              </IconButton>
            </Tooltip>
            <Tooltip title={`Starred (${starredCount})`} placement="right">
              <IconButton 
                onClick={handleViewStarred}
                color={viewState.view === "starred" ? "warning" : "default"}
              >
                {viewState.view === "starred" ? <Star /> : <StarBorder />}
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <>
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
                    "&:hover": { bgcolor: "primary.dark" },
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
                    "&:hover": { bgcolor: "warning.dark" },
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
                        sx: { textDecoration: list.isVisible ? "none" : "line-through" },
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
          </>
        )}
      </Box>

      <AddCategoryDialog
        open={showAddCategory}
        onClose={() => setShowAddCategory(false)}
      />
    </>
  );
}
