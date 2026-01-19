/**
 * Task Lists Container
 * 
 * Horizontal scrollable container for task list cards with drag-and-drop.
 * Also shows StarredTasksCard when in starred view.
 */

import { useRef, useState, useEffect } from "react";
import { Box, IconButton, Typography, CircularProgress } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
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
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTaskLists } from "../../hooks";
import { useRecoilValue } from "recoil";
import { viewStateAtom } from "../../store";
import TaskListCard from "./TaskListCard";
import SortableTaskCard from "./SortableTaskCard";
import StarredTasksCard from "./StarredTasksCard";

export default function TaskListsContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { taskLists, loading, error, fetchTaskLists, reorderTaskLists } = useTaskLists();
  const viewState = useRecoilValue(viewStateAtom);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Fetch task lists on mount
  useEffect(() => {
    fetchTaskLists();
  }, [fetchTaskLists]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
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
    document.body.style.cursor = "grabbing";
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    document.body.style.cursor = "";

    if (over && active.id !== over.id) {
      const oldIndex = taskLists.findIndex((list) => list.id === active.id);
      const newIndex = taskLists.findIndex((list) => list.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        reorderTaskLists(oldIndex, newIndex);
      }
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
    document.body.style.cursor = "";
  };

  const activeList = activeId
    ? taskLists.find((list) => list.id === activeId)
    : null;

  // Filter visible lists
  const visibleLists = taskLists.filter(list => list.isVisible);

  if (loading && taskLists.length === 0) {
    return (
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (taskLists.length === 0) {
    return (
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography color="text.secondary">
          No task lists yet. Create one to get started!
        </Typography>
      </Box>
    );
  }

  // Show StarredTasksCard when in starred view
  if (viewState.view === "starred") {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          py: 2,
          px: 4,
        }}
      >
        <StarredTasksCard />
      </Box>
    );
  }

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
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={visibleLists.map((list) => list.id)}
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
            {visibleLists.map((list) => (
              <SortableTaskCard
                key={list.id}
                taskList={list}
                isActive={viewState.activeListId === list.id}
              />
            ))}
          </Box>
        </SortableContext>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeList ? (
            <Box 
              sx={{ 
                opacity: 0.9, 
                transform: "rotate(3deg)",
                cursor: "grabbing",
              }}
            >
              <TaskListCard
                taskList={activeList}
                isActive={false}
                isDragOverlay
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
