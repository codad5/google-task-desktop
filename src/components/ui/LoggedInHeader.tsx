import { useState } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { Logout, Add } from "@mui/icons-material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { attemptLogoutState, userProfileSelector } from "../../config/states";
import AddCategoryDialog from "./AddCategoryDialog";

export default function LoggedInHeader() {
  const profile = useRecoilValue(userProfileSelector);
  const setAttemptLogout = useSetRecoilState(attemptLogoutState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showAddCategory, setShowAddCategory] = useState(false);

  if (!profile) return null;

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

  return (
    <>
      <Button
        startIcon={<Add />}
        onClick={() => setShowAddCategory(true)}
        sx={{
          mr: 2,
          textTransform: "none",
          borderRadius: 2,
        }}
        variant="outlined"
      >
        New List
      </Button>

      <IconButton onClick={handleMenuOpen} size="small">
        <Avatar
          sx={{ width: 32, height: 32 }}
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
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem disabled>
          <Avatar src={profile?.picture ?? ""} />
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

      <AddCategoryDialog
        open={showAddCategory}
        onClose={() => setShowAddCategory(false)}
      />
    </>
  );
}
