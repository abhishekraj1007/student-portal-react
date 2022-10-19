import React, { useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { BASE_API_URL } from "../../globalVariables";
// import { style } from "@mui/system";

export function PdfDocument(props) {
  // console.log("pdf props", props?.data);
  // let startDate = "";
  // let endDate = "";
  // for (let i=0; i< props.data.length; i++) {
  //   startDate = props.data[i].session_start;
  //   endDate = props.data[i].session_end;
  // }
  // let startYear = new Date(startDate).getFullYear();
  // let endYear = new Date(endDate).getFullYear()
  // // console.log("State date", startDate);
  // // console.log("End Date", endDate);
  // // console.log("State year", startYear);
  // // console.log("End Year", endYear);

  return (
    <Document>
      <Page>
        {props?.data
          ? props.data.map((item, index) => {
              return (
                <View
                  key={item.student_id}
                  style={{ border: "1px solid #000", margin: "8px" }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      margin: "4px 0",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      <Image
                        source={`${BASE_API_URL}/${item.college_logo}`}
                        style={{ height: "60px", width: "60px" }}
                      />
                    </View>
                    <View
                      style={{
                        textTransform: "uppercase",
                        textAlign: "center",
                        width: "100%",
                        padding: "0 4px",
                        margin: "2px 0",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "26px",
                          fontWeight: "800",
                          marginBottom: "8px",
                        }}
                      >
                        {item.college_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          marginBottom: "8px",
                        }}
                      >{`Examination Card (${new Date(
                        item.session_start
                      ).getFullYear()} - ${new Date(
                        item.session_end
                      ).getFullYear()})`}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      margin: "8px",
                    }}
                  >
                    <View
                      style={{
                        width: "80%",
                        border: "0.5px solid #000",
                        textTransform: "uppercase",
                        fontWeight: "800",
                        fontSize: "14px",
                      }}
                    >
                      <Text
                        style={{
                          padding: "10px 4px",
                          border: "0.5px solid #000",
                          fontWeight: "800",
                        }}
                      >
                        {`Department:\u00A0 \u00A0 ${item.department}`}
                      </Text>
                      <Text
                        style={{
                          padding: "10px 4px",
                          border: "0.5px solid #000",
                          fontWeight: "800",
                        }}
                      >
                        {`College Code:\u00A0 \u00A0 ${item.college_code}`}
                      </Text>
                      <Text
                        style={{
                          padding: "10px 4px",
                          border: "0.5px solid #000",
                          fontWeight: "800",
                        }}
                      >
                        {`Examination type:\u00A0 \u00A0 ${item.exam_type}`}
                      </Text>
                      <Text
                        style={{
                          padding: "10px 4px",
                          border: "0.5px solid #000",
                          fontWeight: "800",
                        }}
                      >
                        {`Name of the Student:\u00A0 \u00A0 ${item.name}`}
                      </Text>
                    </View>
                    <View style={{ width: "20%", maxHeight: "145px" }}>
                      <Image
                        source={item.student_image !== "profile.jpg" ? `${BASE_API_URL}/${item.student_image}` : `/static/blank-profile-picture.jpg`}
                        style={{ height: "100%", width: "100%" }}
                      />
                    </View>
                  </View>
                  <View style={{ border: "0.5px solid #000", margin: "8px" }}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        fontSize: "12px",
                        fontWeight: "900",
                      }}
                    >
                      <Text
                        style={{ border: "0.5px solid #000", width: "20%", textAlign: "center", padding: "8px 4px" }}
                      >
                        Semester
                      </Text>
                      <Text
                        style={{ border: "0.5px solid #000", width: "80%", textAlign: "center", padding: "8px 4px" }}
                      >
                        Subject of Examination
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        fontSize: "12px",
                      }}
                    >
                      <View style={{ width: "20%" }}>
                        <Text style={{ border: "0.5px solid #000", padding: "8px 4px" }}>{item.semester}</Text>
                      </View>
                      <View style={{ display: "flex", flexDirection: "row",width: "80%" }}>
                        {item.courses.map((course) => (
                          <Text style={{ border: "0.5px solid #000", padding: "8px 4px" }}>{course.course_name}</Text>
                        ))}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })
          : ""}
      </Page>
    </Document>
  );
}
