import { useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  getAccessToken,
  saveAuthCode,
  handleInitialLogin,
  handleLoadFrom,
  handleLogin,
  handleLogout,
} from "./helpers/auth";
import { loadContextmenu } from "./helpers/windowhelper";
import TaskPage from "./components/TaskPage";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  activeTaskCategoryState,
  attemptLoginState,
  attemptLogoutState,
  authLoadingState,
  isOnlineSelector,
  loggedInSelector,
  messageState,
} from "./config/states";
import Header from "./components/ui/Header";
import SplashScreen from "./components/ui/SplashScreen";
import { Sidebar, DisclaimerBanner } from "./components/layout";
import { listen_for_auth_code } from "./helpers/eventlistner";
import { SettingsStore } from "./helpers/DBStores";
import settings from "./config/settings";

// disable default context menu on build
loadContextmenu();

function App() {
  const [loading, setLoading] = useRecoilState<boolean>(authLoadingState);
  const activeCategoryValue = useRecoilValue(activeTaskCategoryState);
  const loggedIn = useRecoilValue(loggedInSelector);
  const [attemptedLogin, setAttemptedLogin] =
    useRecoilState<boolean>(attemptLoginState);
  const [attemptedLogout, setAttemptedLogout] =
    useRecoilState<boolean>(attemptLogoutState);
  const [toastMessage, setToastMessage] = useRecoilState(messageState);
  const setIsOnline = useSetRecoilState(isOnlineSelector);
  const refreshIsOnline = () => setIsOnline(() => navigator.onLine);

  // Handle toast messages with MUI Snackbar
  const handleCloseToast = () => {
    setToastMessage(null);
  };

  useEffect(() => {
    if (attemptedLogin) {
      handleLogin();
      setAttemptedLogin(false);
    }
  }, [attemptedLogin]);

  useEffect(() => {
    if (attemptedLogout) {
      handleLogout();
      setAttemptedLogout(false);
    }
  }, [attemptedLogout]);

  useEffect(() => {
    SettingsStore.set(
      settings.storage.constants.last_active_category,
      activeCategoryValue
    ).then(() => {
      console.log("Setting active category");
    });
  }, [activeCategoryValue]);

  // Generate port and listen for auth code
  useEffect(() => {
    listen_for_auth_code({
      onSucess: (code) => {
        console.log(code, "code generated");
        if (code) {
          saveAuthCode(code).then(() => {
            console.log("code saved");
          });
          getAccessToken(code).then((accessTokenBody) => {
            handleLoadFrom(accessTokenBody);
          });
        }
      },
      onError: (err) => {
        console.log(err);
        setLoading(false);
        setToastMessage({
          title: "Error",
          body: "Error signing in",
          type: "error",
        });
      },
    });
  }, []);

  // Check offline data for access token
  useEffect(() => {
    setLoading(true);
    handleInitialLogin()
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setToastMessage({
          title: "Error",
          body: "Error signing in",
          type: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Network status listeners
  window.addEventListener("online", () => {
    setToastMessage({
      title: "Network Changed",
      body: "Internet restored",
      type: "success",
    });
    refreshIsOnline();
  });

  window.addEventListener("offline", () => {
    setToastMessage({
      title: "Network Changed",
      body: "No internet",
      type: "error",
    });
    refreshIsOnline();
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      {/* Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Main Layout */}
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar - only show when logged in */}
        {loggedIn && <Sidebar />}

        {/* Main Content Area */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Header />

          {/* Content */}
          {loggedIn ? (
            <TaskPage />
          ) : loading ? (
            <SplashScreen message="Connecting to Google" />
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              flex={1}
              textAlign="center"
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => setAttemptedLogin(true)}
                sx={{ textTransform: "none", py: 1.5, px: 4 }}
              >
                Sign in with Google
              </Button>
            </Box>
          )}

          {/* Footer */}
          <Box
            component="footer"
            textAlign="center"
            py={1.5}
            sx={{ borderTop: 1, borderColor: "divider" }}
          >
            <Typography variant="caption" color="text.secondary">
              <a
                href="https://codad5.me"
                target="_blank"
                rel="noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                codad5
              </a>
              {" © "}
              {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Toast Messages */}
      <Snackbar
        open={!!toastMessage}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={
            toastMessage &&
            ["error", "warning", "info", "success"].includes(toastMessage.type)
              ? (toastMessage.type as "error" | "warning" | "info" | "success")
              : "info"
          }
          variant="filled"
        >
          <div>{toastMessage ? toastMessage.title : ""}</div>
          {toastMessage && toastMessage.body && (
            <>
              <br />
              {toastMessage.body}
            </>
          )}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;