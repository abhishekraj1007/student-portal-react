import { Accordion, AccordionDetails, AccordionSummary, Box, Card, Divider, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
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
    const [formettedData, setFormettedData] = useState({})

    // const departmentName = useSelector((state) => state.account.studentProfileData?.department_id?.department_name || "");

    const getFormettedData = (sems) => {
      // let obj = {
      //   [`${sem}`]: {
      //     [`${course_name}`]: [],
      //     exam_terms: []
      //   }

      // }
      let obj = {};
      let semesters = [];
      Object.keys(sems)?.map((sem) => semesters.push(`${sem}`));
      for(let i = 0 ; i < semesters.length -1 ; i++) {
        
      }
      console.log(semesters);
    }

    const getCourses = async () => {
      setLoading(true);
      try {
        const response = await membersApi.studentExamResult(college);

        if (response) {
          setLoading(false);
          console.log(response.data);
          setSems(response.data);
          let sems = response.data;
          getFormettedData(sems);
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
                          {/* <Box sx={{ py: 1 }}>
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
                          </Box> */}
                        </Stack>
                      </AccordionSummary>
                      <Divider />
                      <AccordionDetails>
                        <Card>
                          <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }}>
                              <TableHead
                                sx={{
                                  fontWeight: "600",
                                  textTransform: "uppercase",
                                  textAlign: "center",
                                }}
                              >
                                <TableRow>
                                  <TableCell>Subject</TableCell>
                                  <TableCell sx={{ textAlign: "center" }}>
                                    Mid Term
                                  </TableCell>
                                  <TableCell sx={{ textAlign: "center" }}>
                                    Final Term
                                  </TableCell>
                                  <TableCell sx={{ textAlign: "center" }}>
                                    Total
                                  </TableCell>
                                  <TableCell />
                                </TableRow>
                                <TableRow spacing={2}>
                                  <TableCell />
                                  <TableCell>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                      }}
                                    >
                                      <Box component="span">{"FM"}</Box>
                                      <Box component="span">{"SM"}</Box>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                      }}
                                    >
                                      <Box component="span">{"FM"}</Box>
                                      <Box component="span">{"SM"}</Box>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                      }}
                                    >
                                      <Box component="span">{"FM"}</Box>
                                      <Box component="span">{"SM"}</Box>
                                    </Box>
                                  </TableCell>
                                  <TableCell sx={{ textAlign: "center" }}>
                                    Credit
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {sems &&
                                  sems[`${sem}`]?.map((item, index) => (
                                    <Fragment
                                      key={`${item.course_name}_${index}`}
                                    >
                                      {item.course_name && (
                                        <TableRow
                                          sx={{
                                            "&:last-child td, &:last-child th":
                                              {
                                                border: 0,
                                              },
                                          }}
                                        >
                                          <TableCell>
                                            {item.course_name}
                                          </TableCell>
                                          {item.exam?.map((data, jndex) => (
                                            <TableCell
                                              key={`${data.exam_type}_${jndex}`}
                                            >
                                              <Box
                                                sx={{
                                                  display: "flex",
                                                  justifyContent:
                                                    "space-around",
                                                }}
                                              >
                                                <Box component="span">
                                                  {data.total_marks}
                                                </Box>
                                                <Box component="span">
                                                  {data.secured_marks}
                                                </Box>
                                              </Box>
                                            </TableCell>
                                          ))}
                                          <TableCell sx={{ textAlign: "center" }}>
                                            {item.credit}
                                          </TableCell>
                                        </TableRow>
                                      )}
                                    </Fragment>
                                  ))}
                                <TableRow>
                                  <TableCell>Total</TableCell>
                                  <TableCell>
                                    {sems[`${sem}`].map((data, i) => (
                                        data?.mid_term_total && (
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "space-around",
                                            }}
                                          >
                                            <Box component="span">
                                              {
                                                data?.mid_term_total
                                                  ?.total_marks
                                              }
                                            </Box>
                                            <Box component="span">
                                              {
                                                data?.mid_term_total
                                                  ?.secured_marks
                                              }
                                            </Box>
                                          </Box>
                                        )
                                      ))}
                                  </TableCell>
                                  <TableCell>
                                    {sems[`${sem}`].map((data, i) => (
                                        data?.final_term_total && (
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "space-around",
                                            }}
                                          >
                                            <Box component="span">
                                              {
                                                data?.final_term_total
                                                  ?.total_marks
                                              }
                                            </Box>
                                            <Box component="span">
                                              {
                                                data?.final_term_total
                                                  ?.secured_marks
                                              }
                                            </Box>
                                          </Box>
                                        )
                                      ))}
                                  </TableCell>
                                  <TableCell>
                                    {sems[`${sem}`].map((data, i) => (
                                        data?.grand_total && (
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "space-around",
                                            }}
                                          >
                                            <Box component="span">
                                              {
                                                data?.grand_total
                                                  ?.total_marks
                                              }
                                            </Box>
                                            <Box component="span">
                                              {
                                                data?.grand_total
                                                  ?.secured_marks
                                              }
                                            </Box>
                                          </Box>
                                        )
                                      ))}
                                  </TableCell>
                                  <TableCell sx={{ textAlign: "center" }}>
                                    {sems[`${sem}`].map((data, i) => (
                                        data?.grand_total && (`${data.grand_total?.total_credit}`)
                                      ))}
                                  </TableCell>
                                </TableRow>
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