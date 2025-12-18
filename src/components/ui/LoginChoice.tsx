/**
 * Login Choice Component
 * 
 * Shows options to continue as last logged in user or sign in with a different account.
 */

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  Paper,
  Divider,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { getUserProfileFromStorage, deleteAccessToken } from "../../helpers/auth";
import { UserProfile } from "../../types/googleapis";

interface LoginChoiceProps {
  onContinueAsUser: () => void;
  onSignInAnother: () => void;
}

export default function LoginChoice({ onContinueAsUser, onSignInAnother }: LoginChoiceProps) {
  const [cachedUser, setCachedUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for cached user profile
    getUserProfileFromStorage()
      .then(profile => {
        setCachedUser(profile);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSignInAnother = async () => {
    // Clear existing tokens before signing in as another user
    try {
      await deleteAccessToken();
    } catch (e) {
      // Token might not exist, that's fine
    }
    localStorage.removeItem("lastLogin");
    onSignInAnother();
  };

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
        <Typography color="text.secondary">Loading...</Typography>
      </Box>
    );
  }

  // If there's a cached user, show choice
  if (cachedUser) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flex={1}
        gap={2}
      >
        <Typography variant="h6" color="text.primary" gutterBottom>
          Welcome back!
        </Typography>

        {/* Continue as user card */}
        <Paper
          elevation={2}
          sx={{
            p: 2,
            width: 280,
            cursor: "pointer",
            transition: "all 0.2s",
            border: 2,
            borderColor: "primary.main",
            "&:hover": {
              bgcolor: "action.hover",
              transform: "translateY(-2px)",
            },
          }}
          onClick={onContinueAsUser}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src={cachedUser.picture ?? undefined}
              alt={cachedUser.name ?? undefined}
              sx={{ width: 48, height: 48 }}
            />
            <Box flex={1} minWidth={0}>
              <Typography variant="subtitle2" noWrap>
                Continue as
              </Typography>
              <Typography variant="body1" fontWeight="500" noWrap>
                {cachedUser.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {cachedUser.email}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Divider sx={{ width: 280, my: 1 }}>
          <Typography variant="caption" color="text.secondary">
            or
          </Typography>
        </Divider>

        {/* Sign in with another account */}
        <Button
          variant="outlined"
          startIcon={<Google />}
          onClick={handleSignInAnother}
          sx={{
            textTransform: "none",
            py: 1.5,
            px: 3,
            borderRadius: 2,
          }}
        >
          Sign in with another account
        </Button>
      </Box>
    );
  }

  // No cached user, show simple sign in button
  return (
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
        startIcon={<Google />}
        onClick={onSignInAnother}
        sx={{ textTransform: "none", py: 1.5, px: 4 }}
      >
        Sign in with Google
      </Button>
    </Box>
  );
}
