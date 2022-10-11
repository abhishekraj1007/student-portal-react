import React, { useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
} from "@react-pdf/renderer";

export function PdfDocument(props) {

  useEffect(() => {
    console.log("pdf props", props?.data);
  }, [props])
  return (
    <Document>
      <Page>
      {props?.data
          ? props.data.map((item, index) => {
              return (
                <>
                <View key={item.student_id}>
                    <Text>{`College Code: ${item.college_code}`}</Text>
                    <Text>{`College Name: ${item.college_name}`}</Text>
                    <Text>{`Department Name: ${item.department}`}</Text>
                    <Text>{`Exam Type: ${item.exam_type}`}</Text>
                    <Text>{`Student Name: ${item.name}`}</Text>
                    <Text>{`Semester: ${item.semester}`}</Text>
                    <Text>{`Student ID: ${item.student_id}`}</Text>
                </View>
                <View>
                    {item?.courses?.map((couseData, jndex) => (
                        <View key={`${couseData.course_code}_${jndex}`}>
                            <Text>{`Course Name: ${couseData.course_name}`}</Text>
                            <Text>{`Course Code: ${couseData.course_code}`}</Text>
                        </View>
                    ))}
                </View>
                </>
              );
            })
          : ""}
      </Page>
    </Document>
  );
}
