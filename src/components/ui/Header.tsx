import {
  Box,
  Button,
  useTheme,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { attemptLoginState, loggedInSelector } from "../../config/states";
import LoggedInHeader from "./LoggedInHeader";

export default function Header() {
  const loggedIn = useRecoilValue(loggedInSelector);
  const setAttemptLogin = useSetRecoilState(attemptLoginState);
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "transparent",
        borderBottom: 1,
        borderColor: "divider",
        mb: 2,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 500 }}>
          Google Tasks Desktop
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {loggedIn ? (
            <LoggedInHeader />
          ) : (
            <Button
              variant="contained"
              onClick={() => setAttemptLogin(true)}
              sx={{ textTransform: "none" }}
            >
              Sign in with Google
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
