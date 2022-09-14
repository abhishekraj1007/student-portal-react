import * as React from "react";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";

export default function SkeletonTypography({ variant }) {
  return (
    <Box>
      <Typography component="div" variant={variant}>
        <Skeleton />
      </Typography>
    </Box>
  );
}
