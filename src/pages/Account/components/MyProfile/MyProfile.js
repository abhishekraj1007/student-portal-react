import { Box, Card, Grid } from "@mui/material";

export default function MyProfile() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8} md={4}>
          <Card sx={{ height: "400px" }} elevation={2}>
            
          </Card>
        </Grid>
        <Grid item container xs={12} md={8} spacing={2}>
          <Grid item xs={12}>
            <Card sx={{ height: "300px" }} elevation={2}></Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ height: "300px" }} elevation={2}></Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
