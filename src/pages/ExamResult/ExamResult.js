import { Accordion, AccordionDetails, AccordionSummary, Box, Card, Divider, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import SkeletonTypography from "../../components/ui/SkeletonTypography";
import membersApi from "../../services/apis/membersApi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SkeletonTypography from "../../components/ui/SkeletonTypography";

export default function ExamResult() {
    const { college } = useParams();
    const [loading, setLoading] = useState(false);
    const [sems, setSems] = useState({});

    // const departmentName = useSelector((state) => state.account.studentProfileData?.department_id?.department_name || "");

    const getCourses = async () => {
      setLoading(true);
      try {
        const response = await membersApi.studentExamResult(college);

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
      console.log("Exam Result render");
      getCourses();
    }, []);

    // const cardLoadingData = [
    //   { variant_1: "h3", variant_2: "caption", variant_3: "h1" },
    //   { variant_1: "h3", variant_2: "caption", variant_3: "h1" },
    //   { variant_1: "h3", variant_2: "caption", variant_3: "h1" },
    //   { variant_1: "h3", variant_2: "caption", variant_3: "h1" },
    // ];

    return (
      <Box>
        {loading && (
          <Grid container padding={2} spacing={2}>
            <Grid item xs={12}>
              <Card elevation={6}>
                <Box sx={{ px: 2, py: 1 }}>
                  <SkeletonTypography variant="h3" />
                </Box>
              </Card>
            </Grid>
          </Grid>
        )}

        {!loading && (
          <>
            <Grid container padding={2} spacing={2}>
              <Grid item xs={12}>
                {Object.keys(sems)?.map((sem, index) => (
                  <Card elevation={6} key={`sem_${index}`} sx={{ mb: 2 }}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ p: 2 }}
                      >
                        <Stack>
                          <Typography variant="h5">{sem}</Typography>
                          <Box sx={{ py: 1 }}>
                            {sems[`${sem}`]?.map((item) => {
                              return (
                                <>
                                  {item?.SM && (
                                    <Typography
                                      variant="subtitle2"
                                      sx={{
                                        mr: 1,
                                        fontWeight: "600",
                                        fontSize: "0.9rem",
                                        color: "rgba(0, 0, 0, 0.68)",
                                      }}
                                    >{`Secured Marks: ${item.SM}`}</Typography>
                                  )}
                                </>
                              );
                            })}
                            {sems[`${sem}`]?.map((item) => {
                              return (
                                <>
                                  {item?.FM && (
                                    <Typography
                                      variant="subtitle2"
                                      sx={{
                                        mr: 1,
                                        fontWeight: "600",
                                        fontSize: "0.9rem",
                                        color: "rgba(0, 0, 0, 0.68)",
                                      }}
                                    >{`Full Marks: ${item.FM}`}</Typography>
                                  )}
                                </>
                              );
                            })}
                          </Box>
                        </Stack>
                      </AccordionSummary>
                      <Divider />
                      <AccordionDetails>
                        <Card>
                          <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }}>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Course Name</TableCell>
                                  <TableCell>Term</TableCell>
                                  <TableCell>Secured Marks</TableCell>
                                  <TableCell>Total Marks</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {sems &&
                                  sems[`${sem}`]?.map((course, index) => (
                                    <TableRow
                                      key={`${course.course_name}_${index}`}
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell>
                                        {course.course_name}
                                      </TableCell>
                                      <TableCell>{course.exam_type}</TableCell>
                                      <TableCell>
                                        {course.secured_marks}
                                      </TableCell>
                                      <TableCell>
                                        {course.total_marks}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Card>
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