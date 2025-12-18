import { Box, Typography, Link } from "@mui/material";

export default function DisclaimerBanner() {
  return (
    <Box
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.03)",
        borderBottom: 1,
        borderColor: "divider",
        py: 0.5,
        px: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ fontSize: "0.7rem" }}
      >
        This is an open-source project • Not affiliated with or endorsed by Google •{" "}
        <Link
          href="https://github.com/codad5/google-task-desktop"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          underline="hover"
          sx={{ fontSize: "inherit" }}
        >
          View on GitHub
        </Link>
      </Typography>
    </Box>
  );
}
