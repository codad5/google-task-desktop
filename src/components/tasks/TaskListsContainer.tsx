import { useRef } from "react";
import { Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useRecoilValue } from "recoil";
import {
  taskCategoriesListSelector,
  activeTaskCategorySelector,
} from "../../config/states";
import { taskCategory } from "../../types/taskapi";
import TaskListCard from "./TaskListCard";

export default function TaskListsContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const taskCategories = useRecoilValue(taskCategoriesListSelector) as taskCategory[];
  const activeTaskCategory = useRecoilValue(activeTaskCategorySelector);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 300;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        flex: 1,
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      {/* Left scroll button */}
      <IconButton
        onClick={() => scroll("left")}
        sx={{
          position: "absolute",
          left: 8,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          bgcolor: "background.paper",
          boxShadow: 2,
          opacity: 0.8,
          "&:hover": {
            opacity: 1,
            bgcolor: "background.paper",
          },
        }}
        size="small"
      >
        <ChevronLeft />
      </IconButton>

      {/* Scrollable container */}
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          overflowY: "hidden",
          flexWrap: "nowrap",
          py: 2,
          px: 6,
          height: "100%",
          alignItems: "flex-start",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          // Custom scrollbar styling
          "&::-webkit-scrollbar": {
            height: 8,
          },
          "&::-webkit-scrollbar-track": {
            bgcolor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "action.disabled",
            borderRadius: 4,
            "&:hover": {
              bgcolor: "action.active",
            },
          },
        }}
      >
        {taskCategories.map((category, index) => (
          <Box
            key={category.id}
            sx={{
              scrollSnapAlign: "start",
            }}
          >
            <TaskListCard
              category={category}
              isActive={activeTaskCategory === index}
            />
          </Box>
        ))}
      </Box>

      {/* Right scroll button */}
      <IconButton
        onClick={() => scroll("right")}
        sx={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          bgcolor: "background.paper",
          boxShadow: 2,
          opacity: 0.8,
          "&:hover": {
            opacity: 1,
            bgcolor: "background.paper",
          },
        }}
        size="small"
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );
}
