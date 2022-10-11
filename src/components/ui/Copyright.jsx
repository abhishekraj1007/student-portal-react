import { Typography, Link, Box } from "@mui/material";

export default function Copyright(props) {
  return (
    <Box {...props}>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
      >
        {"SDMS Version 1.0"}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
      >
        {"Copyright © Xappsoft Technologies "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}
