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
} from "@mui/material";
import {
  Add,
  TaskAlt,
  StarBorder,
  ExpandLess,
  ExpandMore,
  FormatListBulleted,
} from "@mui/icons-material";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  taskCategoriesListSelector,
  activeTaskCategoryState,
} from "../../config/states";
import { taskCategory } from "../../types/taskapi";
import AddCategoryDialog from "../ui/AddCategoryDialog";

interface SidebarProps {
  onCategorySelect?: (index: number) => void;
}

export default function Sidebar({ onCategorySelect }: SidebarProps) {
  const [listsExpanded, setListsExpanded] = useState(true);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [activeCategory, setActiveCategory] = useRecoilState(activeTaskCategoryState);
  const taskCategories = useRecoilValue(taskCategoriesListSelector) as taskCategory[];

  const handleCategoryClick = (index: number) => {
    setActiveCategory(index);
    onCategorySelect?.(index);
  };

  const getTaskCount = (category: taskCategory) => {
    return category.tasks?.filter((t) => !t.completed).length ?? 0;
  };

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
          <ListItemButton
            selected={activeCategory === -1}
            onClick={() => handleCategoryClick(-1)}
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

          <ListItemButton
            sx={{
              borderRadius: "0 24px 24px 0",
              mr: 2,
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <StarBorder fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Starred"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItemButton>
        </List>

        <Divider sx={{ my: 1 }} />

        {/* Lists Section Header */}
        <ListItemButton
          onClick={() => setListsExpanded(!listsExpanded)}
          style={{
            height: "48px",
            flexGrow: 0,
          }}
          sx={{ }}
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

        {/* Task Categories List - with max-height */}
        <Collapse in={listsExpanded} timeout="auto">
          <List
            sx={{
              py: 0,
              maxHeight: 300,
              overflowY: "auto",
              overflowX: "hidden",
              // Subtle scrollbar
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": {
                width: 4,
              },
              "&::-webkit-scrollbar-thumb": {
                bgcolor: "action.disabled",
                borderRadius: 2,
              },
            }}
          >
            {taskCategories.map((category, index) => (
              <ListItemButton
                key={category.id}
                selected={activeCategory === index}
                onClick={() => handleCategoryClick(index)}
                sx={{
                  borderRadius: "0 24px 24px 0",
                  mr: 2,
                  py: 0.75,
                  "&.Mui-selected": {
                    bgcolor: "action.selected",
                    "&:hover": {
                      bgcolor: "action.selected",
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <FormatListBulleted fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={category.name}
                  primaryTypographyProps={{
                    variant: "body2",
                    noWrap: true,
                  }}
                />
                {getTaskCount(category) > 0 && (
                  <Typography variant="caption" color="text.secondary">
                    {getTaskCount(category)}
                  </Typography>
                )}
              </ListItemButton>
            ))}

            {/* Create new list option */}
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
