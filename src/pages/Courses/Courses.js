import { Accordion, AccordionDetails, AccordionSummary, Box, Card, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SkeletonTypography from "../../components/ui/SkeletonTypography";
import membersApi from "../../services/apis/membersApi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Courses() {
    const { college } = useParams();
    const [loading, setLoading] = useState(false);
    const [sems, setSems] = useState({});

    const departmentName = useSelector((state) => state.account.studentProfileData?.department_id?.department_name || "");

    const getCourses = async () => {
      setLoading(true);
      try {
        const response = await membersApi.studentCourses(college);

        if (response) {
          setLoading(false);
          console.log(response.data);
          setSems(response.data);
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
      { variant_1: "h3", variant_2: "caption", variant_3: "h1" },
      { variant_1: "h3", variant_2: "caption", variant_3: "h1" },
      { variant_1: "h3", variant_2: "caption", variant_3: "h1" },
      { variant_1: "h3", variant_2: "caption", variant_3: "h1" },
    ];

    return (
      <Box>
        {loading && (
          <Grid container padding={2} spacing={2}>
            <Grid item xs={12}>
              <SkeletonTypography variant="h1" />
            </Grid>
            <Grid item xs={12}>
              <Card elevation={6}>
                <Box sx={{ px: 2, py: 1 }}>
                  <SkeletonTypography variant="h3" />
                </Box>
                <Divider />
                <Grid container spacing={2} padding={2}>
                  {cardLoadingData?.map((data, index) => (
                    <Grid
                      item
                      xs={11}
                      md={6}
                      key={`${data.variant_1}_${index}`}
                    >
                      <Card elevation={3}>
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
              </Card>
            </Grid>
          </Grid>
        )}

        {!loading && (
          <>
            <Grid container padding={2} spacing={2}>
              <Grid item xs={12} sx={{ my: 2 }}>
                <Typography variant="h3">{departmentName}</Typography>
              </Grid>
              <Grid item xs={12}>
                {Object.keys(sems)?.map((sem, index) => (
                  <Card elevation={6} key={`sem_${index}`} sx={{ mb: 2 }}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ p: 2 }}
                      >
                        <Typography variant="h5">{sem}</Typography>
                      </AccordionSummary>
                      <Divider />
                      <AccordionDetails>
                        <Grid container spacing={2} padding={2}>
                          {sems &&
                            sems[`${sem}`]?.map((course, index) => (
                              <Grid
                                item
                                xs={10}
                                md={6}
                                key={`${course.course_name}_${index}`}
                              >
                                <Card elevation={3}>
                                  <Stack spacing={2} padding={2}>
                                    <Paper
                                      variant="outlined"
                                      sx={{
                                        backgroundColor:
                                          "rgba(242, 242, 242, 0.2)",
                                        p: 1,
                                      }}
                                    >
                                      <Box mb={1.5}>
                                        <Typography variant="h6">
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
                                        {course.description}
                                      </Typography>
                                    </Box>
                                  </Stack>
                                </Card>
                              </Grid>
                            ))}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Card>
                ))}
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    );
}