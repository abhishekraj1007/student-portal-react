import { Box, Card, Grid, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SkeletonTypography from "../../components/ui/SkeletonTypography";
import membersApi from "../../services/apis/membersApi";

export default function Courses() {
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState(null);

    const getCourses = async () => {
      setLoading(true);
      try {
        const response = await membersApi.studentCourses();

        if (response) {
          setLoading(false);
          console.log(response.data);
          setCourses(response.data);
        }
      } catch (error) {
        setLoading(false);
        toast.error("Something Went Wrong");
        console.log(error);
      }
    };

    useEffect(() => {
      console.log("course render");
      getCourses();
    }, []);

    const cardLoadingData = [
        {variant_1: "h3", variant_2: "caption", variant_3: "h1"},
        {variant_1: "h3", variant_2: "caption", variant_3: "h1"},
        {variant_1: "h3", variant_2: "caption", variant_3: "h1"},
        {variant_1: "h3", variant_2: "caption", variant_3: "h1"}
    ]

    return (
      <Box>
        {loading && (
          <Grid container padding={2} spacing={2}>
            {cardLoadingData?.map((data, index) => (
              <Grid item xs={11} md={6} key={`${data.variant_1}_${index}`}>
                <Card elevation={6}>
                  <Stack padding={2}>
                    {Object.keys(data).map((item, jndex) => (
                      <SkeletonTypography
                        key={`${data[item]}_${jndex}`}
                        variant={data[item]}
                      />
                    ))}
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && (
          <Grid container padding={2} spacing={2}>
            {courses?.map((course, index) => (
              <Grid item xs={10} md={6} key={`${course.course_name}_${index}`}>
                <Card elevation={6}>
                  <Stack spacing={2} padding={2}>
                    <Paper variant="outlined" sx={{ backgroundColor: "rgba(242, 242, 242, 0.2)", p: 1, }}>
                      <Box mb={1.5}>
                        <Typography variant="h5">
                          {course.course_name}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">
                          {`Credit: ${course.credit}`}
                        </Typography>
                      </Box>
                    </Paper>
                    <Box>
                      <Typography variant="subtitle1">
                        {course.course_description}
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    );
}