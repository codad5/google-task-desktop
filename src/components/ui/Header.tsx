import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  attemptLogoutState,
  loggedInSelector,
  userProfileSelector,
} from "../../config/states";

export default function Header() {
  const loggedIn = useRecoilValue(loggedInSelector);
  const profile = useRecoilValue(userProfileSelector);
  const setAttemptLogout = useSetRecoilState(attemptLogoutState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAttemptLogout(true);
    handleMenuClose();
  };

  if (!loggedIn || !profile) {
    return null;
  }

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "transparent",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "flex-end",
          minHeight: "48px !important",
          py: 0.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={handleMenuOpen} size="small">
            <Avatar
              sx={{ width: 28, height: 28 }}
              src={profile?.picture ?? ""}
              alt={profile?.name ?? "User"}
            >
              {profile?.name?.charAt(0) ?? "U"}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                minWidth: 200,
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem disabled>
              <Avatar
                src={profile?.picture ?? ""}
                sx={{ width: 32, height: 32, mr: 1.5 }}
              />
              <ListItemText
                primary={profile?.name}
                secondary={profile?.email}
                primaryTypographyProps={{ variant: "body2" }}
                secondaryTypographyProps={{ variant: "caption" }}
              />
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Sign out" />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
