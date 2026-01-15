/**
 * Task Page
 * 
 * Main page that displays task lists.
 * Bridges old auth system with new hooks.
 */

import { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { accessTokenSelector } from "../config/states";
import { accessTokenAtom } from "../store";
import { useTaskLists } from "../hooks";
import { TaskListsContainer } from "./tasks";

export default function TaskPage() {
  // Get access token from OLD auth system
  const access_token = useRecoilValue(accessTokenSelector);
  
  // Set access token in NEW store system
  const setNewAccessToken = useSetRecoilState(accessTokenAtom);

  // Get task lists state from NEW hooks
  const { taskLists, loading, error, fetchTaskLists } = useTaskLists();

  // Sync access token from old system to new system
  useEffect(() => {
    if (access_token) {
      console.log("TaskPage: syncing access token to new store");
      setNewAccessToken(access_token);
    }
  }, [access_token, setNewAccessToken]);

  // Fetch task lists when access token is available
  useEffect(() => {
    if (access_token) {
      console.log("TaskPage: fetching task lists");
      fetchTaskLists();
    }
  }, [access_token, fetchTaskLists]);

  if (!access_token) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
        <Typography>Not logged in</Typography>
      </Box>
    );
  }

  if (loading && taskLists.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        overflow: "hidden",
        display: "flex",
        bgcolor: "background.default",
      }}
    >
      <TaskListsContainer />
    </Box>
  );
}
