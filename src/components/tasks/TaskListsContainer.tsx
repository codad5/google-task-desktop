import { useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  taskCategoriesListState,
  activeTaskCategorySelector,
} from "../../config/states";
import { taskCategory } from "../../types/taskapi";
import TaskListCard from "./TaskListCard";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableTaskCard from "./SortableTaskCard";

export default function TaskListsContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [taskCategories, setTaskCategories] = useRecoilState(taskCategoriesListState);
  const activeTaskCategory = useRecoilValue(activeTaskCategorySelector);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Start drag after moving 8px
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 300;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = taskCategories.findIndex((cat) => cat.id === active.id);
      const newIndex = taskCategories.findIndex((cat) => cat.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newCategories = arrayMove(taskCategories, oldIndex, newIndex);
        setTaskCategories(newCategories);
      }
    }
  };

  const activeCategory = activeId
    ? taskCategories.find((cat) => cat.id === activeId)
    : null;

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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={taskCategories.map((cat) => cat.id)}
          strategy={horizontalListSortingStrategy}
        >
          <Box
            ref={containerRef}
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              overflowY: "hidden",
              flexWrap: "nowrap",
              py: 2,
              pl: 6,
              pr: 6,
              height: "100%",
              alignItems: "flex-start",
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {taskCategories.map((category, index) => (
              <SortableTaskCard
                key={category.id}
                category={category}
                isActive={activeTaskCategory === index}
                categoryIndex={index}
              />
            ))}
          </Box>
        </SortableContext>

        {/* Drag Overlay - shows the dragging item */}
        <DragOverlay>
          {activeCategory ? (
            <Box sx={{ opacity: 0.9, transform: "rotate(3deg)" }}>
              <TaskListCard
                category={activeCategory}
                isActive={false}
                categoryIndex={-1}
              />
            </Box>
          ) : null}
        </DragOverlay>
      </DndContext>

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
