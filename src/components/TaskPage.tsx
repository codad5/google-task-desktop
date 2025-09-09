import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import { taskCategory, task } from "../types/taskapi";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  accessTokenSelector,
  activeCategoryTasksState,
  activeTaskCategoryState,
  taskCategoriesListState,
  messageState,
  isOnlineSelector,
  taskObjectSelector,
} from "../config/states";
import TaskColumn from "./ui/TaskColumn";
import AddTaskFab from "./ui/AddTaskFab";

export default function TaskPage() {
  const taskObject = useRecoilValue(taskObjectSelector);
  const access_token = useRecoilValue(accessTokenSelector);

  if (!access_token) return <div>Not logged in</div>;

  const [taskCategoryList, setTaskCategoryList] = useRecoilState<
    taskCategory[]
  >(taskCategoriesListState);
  const [activeTaskCategory, setActiveTaskCategory] = useRecoilState<number>(
    activeTaskCategoryState
  );
  const setActiveCategoryTasks = useSetRecoilState<task[]>(
    activeCategoryTasksState
  );
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useRecoilState(messageState);
  const isOnline = useRecoilValue(isOnlineSelector);

  // This effect runs when taskObject changes (which happens when accessToken changes)
  useEffect(() => {
    console.log("TaskPage: taskObject changed, loading categories and tasks");

    if (!taskObject || !access_token) {
      console.log("TaskPage: no taskObject or access_token, skipping load");
      return;
    }

    setLoading(true);

    // Load task categories
    taskObject
      .getTaskCategories()
      .then((data) => {
        console.log("TaskPage: got categories", data);
        setTaskCategoryList(data);

        // Load tasks for the active category
        const categoryIndex = activeTaskCategory >= 0 ? activeTaskCategory : 0;
        return taskObject.getTasksByCategoryPosition(categoryIndex);
      })
      .then((tasks) => {
        console.log("TaskPage: got tasks", tasks);
        setActiveCategoryTasks(tasks);
        setLoading(false);
      })
      .catch((error) => {
        console.error("TaskPage: error loading data", error);
        setToastMessage({
          title: "Error",
          body: "Failed to load tasks",
          type: "error",
        });
        setLoading(false);
      });
  }, [taskObject, access_token]); // Only depend on taskObject and access_token

  // This effect runs when active category or online status changes
  useEffect(() => {
    console.log("TaskPage: active category or online status changed");

    if (!taskObject || activeTaskCategory < 0) {
      console.log(
        "TaskPage: skipping category change - no taskObject or invalid category"
      );
      return;
    }

    // Don't set loading if we're already loading from the first effect
    const shouldSetLoading = taskCategoryList.length > 0;
    if (shouldSetLoading) {
      setLoading(true);
    }

    taskObject
      .getTasksByCategoryPosition(activeTaskCategory)
      .then((data) => {
        console.log(
          "TaskPage: got tasks for category",
          activeTaskCategory,
          data
        );
        setActiveCategoryTasks(data);
        if (shouldSetLoading) {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("TaskPage: error loading tasks for category", error);
        setToastMessage({
          title: "Error",
          body: "Failed to load tasks for category",
          type: "error",
        });
        if (shouldSetLoading) {
          setLoading(false);
        }
      });
  }, [activeTaskCategory, isOnline, taskCategoryList.length]); // Added taskCategoryList.length as dependency

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTaskCategory(newValue);
  };

  if (loading || taskCategoryList?.length <= 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      {/* Header with navigation tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={activeTaskCategory >= 0 ? activeTaskCategory : 0}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {taskCategoryList.map((category, index) => (
            <Tab key={index} label={category.name} />
          ))}
        </Tabs>
      </Box>

      {/* Task columns in grid layout */}
      <Grid container spacing={3}>
        {taskCategoryList.map((category, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
            <TaskColumn
              category={category}
              isActive={activeTaskCategory === index}
            />
          </Grid>
        ))}
      </Grid>

      {/* Floating action button */}
      {taskCategoryList.length > 0 && activeTaskCategory >= 0 && <AddTaskFab />}
    </Container>
  );
}
