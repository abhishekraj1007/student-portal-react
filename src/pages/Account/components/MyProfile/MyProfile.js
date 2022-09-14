import { Avatar, Box, Card, Divider, Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BASE_API_URL } from "../../../../globalVariables";

export default function MyProfile() {
  const isSuperAdmin = useSelector((state) => state.auth.isSuperAdmin);
  const profilePic = useSelector((state) => state.account.studentProfileData?.profile);
  
  const profileData = useSelector((state) => state.account.studentProfileData);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8} md={4}>
          <Card elevation={2}>
            <Stack
              justifyContent="center"
              alignItems="center"
              spacing={2}
              p={2}
            >
              <Box>
                <Avatar
                  src={!isSuperAdmin ? `${BASE_API_URL}${profilePic}` : ""}
                  sx={{ width: 100, height: 100 }}
                />
              </Box>
              <Box
                sx={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                {`${profileData?.user?.first_name} ${profileData?.user?.last_name}`}
              </Box>
            </Stack>
            <Divider />
            <Stack p={2} spacing={1}>
              <Box>
                <Box
                  component="span"
                  sx={{ fontSize: "0.9rem", fontWeight: "600" }}
                >
                  {`Student ID: `}
                </Box>
                <Box component="span">{profileData?.studentID}</Box>
              </Box>
              <Box>
                <Box
                  component="span"
                  sx={{ fontSize: "0.9rem", fontWeight: "600" }}
                >
                  {`Department: `}
                </Box>
                <Box component="span">{profileData?.department_id?.department_name}</Box>
              </Box>
            </Stack>
          </Card>
        </Grid>
        <Grid item container xs={12} md={8} spacing={2}>
          <Grid item xs={12}>
            <Card sx={{ p: 2 }} elevation={2}>
              <Box component="h4" sx={{ margin: 1 }}>
                {"Personal Information"}
              </Box>
              <Grid
                container
                sx={{
                  border: "1px solid rgba(209, 209, 209, 0.5)",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                <Grid
                  container
                  item
                  xs={12}
                  sx={{ border: "1px solid rgba(209, 209, 209, 0.5)" }}
                >
                  <Grid item xs={4} padding={1}>
                    {"First Name"}
                  </Grid>
                  <Grid
                    item
                    xs={0.5}
                    sx={{
                      textAlign: "center",
                      borderInline: "1px solid rgba(209, 209, 209, 0.5)",
                    }}
                    padding={1}
                  >
                    {":"}
                  </Grid>
                  <Grid item xs={7} padding={1}>
                    {profileData?.user?.first_name}
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sx={{ border: "1px solid rgba(209, 209, 209, 0.5)" }}
                >
                  <Grid item xs={4} padding={1}>
                    {"Last Name"}
                  </Grid>
                  <Grid
                    item
                    xs={0.5}
                    sx={{
                      textAlign: "center",
                      borderInline: "1px solid rgba(209, 209, 209, 0.5)",
                    }}
                    padding={1}
                  >
                    {":"}
                  </Grid>
                  <Grid item xs={7} padding={1}>
                    {profileData?.user?.last_name}
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sx={{ border: "1px solid rgba(209, 209, 209, 0.5)" }}
                >
                  <Grid item xs={4} padding={1}>
                    {"Email"}
                  </Grid>
                  <Grid
                    item
                    xs={0.5}
                    sx={{
                      textAlign: "center",
                      borderInline: "1px solid rgba(209, 209, 209, 0.5)",
                    }}
                    padding={1}
                  >
                    {":"}
                  </Grid>
                  <Grid item xs={7} padding={1} sx={{ textTransform: "none", }}>
                    {profileData?.user?.email}
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sx={{ border: "1px solid rgba(209, 209, 209, 0.5)" }}
                >
                  <Grid item xs={4} padding={1}>
                    {"Mobile"}
                  </Grid>
                  <Grid
                    item
                    xs={0.5}
                    sx={{
                      textAlign: "center",
                      borderInline: "1px solid rgba(209, 209, 209, 0.5)",
                    }}
                    padding={1}
                  >
                    {":"}
                  </Grid>
                  <Grid item xs={7} padding={1}>
                    {profileData?.user?.mobile}
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sx={{ border: "1px solid rgba(209, 209, 209, 0.5)" }}
                >
                  <Grid item xs={4} padding={1}>
                    {"Gender"}
                  </Grid>
                  <Grid
                    item
                    xs={0.5}
                    sx={{
                      textAlign: "center",
                      borderInline: "1px solid rgba(209, 209, 209, 0.5)",
                    }}
                    padding={1}
                  >
                    {":"}
                  </Grid>
                  <Grid item xs={7} padding={1}>
                    {profileData?.gender}
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ p: 2 }} elevation={2}>
              <Box component="h4" sx={{ margin: 1 }}>
                {"General Information"}
              </Box>
              <Grid
                container
                sx={{
                  border: "1px solid rgba(209, 209, 209, 0.5)",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                <Grid
                  container
                  item
                  xs={12}
                  sx={{ border: "1px solid rgba(209, 209, 209, 0.5)" }}
                >
                  <Grid item xs={4} padding={1}>
                    {"Academic Year"}
                  </Grid>
                  <Grid
                    item
                    xs={0.5}
                    sx={{
                      textAlign: "center",
                      borderInline: "1px solid rgba(209, 209, 209, 0.5)",
                    }}
                    padding={1}
                  >
                    {":"}
                  </Grid>
                  <Grid item xs={7} padding={1}>
                    {profileData?.year_of_admission}
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sx={{ border: "1px solid rgba(209, 209, 209, 0.5)" }}
                >
                  <Grid item xs={4} padding={1}>
                    {"Father's Name"}
                  </Grid>
                  <Grid
                    item
                    xs={0.5}
                    sx={{
                      textAlign: "center",
                      borderInline: "1px solid rgba(209, 209, 209, 0.5)",
                    }}
                    padding={1}
                  >
                    {":"}
                  </Grid>
                  <Grid item xs={7} padding={1}>
                    {profileData?.father_name}
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sx={{ border: "1px solid rgba(209, 209, 209, 0.5)" }}
                >
                  <Grid item xs={4} padding={1}>
                    {"Mobile No"}
                  </Grid>
                  <Grid
                    item
                    xs={0.5}
                    sx={{
                      textAlign: "center",
                      borderInline: "1px solid rgba(209, 209, 209, 0.5)",
                    }}
                    padding={1}
                  >
                    {":"}
                  </Grid>
                  <Grid item xs={7} padding={1}>
                    {profileData?.father_mobile_no}
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sx={{ border: "1px solid rgba(209, 209, 209, 0.5)" }}
                >
                  <Grid item xs={4} padding={1}>
                    {"Mother's Name"}
                  </Grid>
                  <Grid
                    item
                    xs={0.5}
                    sx={{
                      textAlign: "center",
                      borderInline: "1px solid rgba(209, 209, 209, 0.5)",
                    }}
                    padding={1}
                  >
                    {":"}
                  </Grid>
                  <Grid item xs={7} padding={1}>
                    {profileData?.mother_name}
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sx={{ border: "1px solid rgba(209, 209, 209, 0.5)" }}
                >
                  <Grid item xs={4} padding={1}>
                    {"Mobile No"}
                  </Grid>
                  <Grid
                    item
                    xs={0.5}
                    sx={{
                      textAlign: "center",
                      borderInline: "1px solid rgba(209, 209, 209, 0.5)",
                    }}
                    padding={1}
                  >
                    {":"}
                  </Grid>
                  <Grid item xs={7} padding={1}>
                    {profileData?.mother_mobile_no}
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sx={{ border: "1px solid rgba(209, 209, 209, 0.5)" }}
                >
                  <Grid item xs={4} padding={1}>
                    {"Local Guardian Name"}
                  </Grid>
                  <Grid
                    item
                    xs={0.5}
                    sx={{
                      textAlign: "center",
                      borderInline: "1px solid rgba(209, 209, 209, 0.5)",
                    }}
                    padding={1}
                  >
                    {":"}
                  </Grid>
                  <Grid item xs={7} padding={1}>
                    {profileData?.local_guardian_name}
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sx={{ border: "1px solid rgba(209, 209, 209, 0.5)" }}
                >
                  <Grid item xs={4} padding={1}>
                    {"Mobile No"}
                  </Grid>
                  <Grid
                    item
                    xs={0.5}
                    sx={{
                      textAlign: "center",
                      borderInline: "1px solid rgba(209, 209, 209, 0.5)",
                    }}
                    padding={1}
                  >
                    {":"}
                  </Grid>
                  <Grid item xs={7} padding={1}>
                    {profileData?.local_guardian_mobile_no}
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sx={{ border: "1px solid rgba(209, 209, 209, 0.5)" }}
                >
                  <Grid item xs={4} padding={1}>
                    {"HOD"}
                  </Grid>
                  <Grid
                    item
                    xs={0.5}
                    sx={{
                      textAlign: "center",
                      borderInline: "1px solid rgba(209, 209, 209, 0.5)",
                    }}
                    padding={1}
                  >
                    {":"}
                  </Grid>
                  <Grid item xs={7} padding={1}>
                    {profileData?.department_id?.instructor?.username}
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ p: 2 }} elevation={2}>
              <Box component="h4" sx={{ margin: 1 }}>
                {"Department Information"}
              </Box>
              <Box
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  padding: 1,
                }}
              >
                {profileData?.department_id?.department_description}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
