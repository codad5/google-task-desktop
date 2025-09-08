import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
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
  taskObjectState,
  taskCategoriesListState,
  messageState,
  isOnlineSelector,
} from "../config/states";
import { Task } from "../helpers/task";
import TaskColumn from "./ui/TaskColumn";
import AddTaskFab from "./ui/AddTaskFab";

export default function TaskPage() {
  const [taskObject, setTaskObject] = useRecoilState(taskObjectState);
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

  useEffect(() => {
    console.log("before task object", taskObject, access_token);
    const newtaskObject = new Task(access_token);
    newtaskObject.setErrorHandler((err) => {
      console.log("error", err);
      if (toastMessage) return;
      setToastMessage({ title: "Error", body: err.message, type: "error" });
    });
    setTaskObject(newtaskObject);
  }, []);

  useEffect(() => {
    console.log("after task object", taskObject);
    taskObject
      .getTaskCategories()
      .then((data) => {
        setTaskCategoryList(data);
        return data;
      })
      .then(() => {
        taskObject
          .getTasksByCategoryPosition(
            activeTaskCategory >= 0 ? activeTaskCategory : 0
          )
          .then((data) => {
            setActiveCategoryTasks(data);
            setLoading(false);
          });
      });
  }, [taskObject]);

  useEffect(() => {
    console.log("active task or online changed", navigator.onLine);
    setLoading(true);
    if (activeTaskCategory < 0) return;
    taskObject.getTasksByCategoryPosition(activeTaskCategory).then((data) => {
      setActiveCategoryTasks(data);
      setLoading(false);
    });
  }, [activeTaskCategory, isOnline]);

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
