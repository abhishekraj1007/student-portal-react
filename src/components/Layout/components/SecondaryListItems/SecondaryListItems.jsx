import { SuperAdminItems, StudentItems } from "./components";
import { useSelector } from "react-redux";
import { useEffect, Fragment, useState } from "react";

export const SecondaryListItems = () => {
  const [superAdmin, setSuperAdmin] = useState(null);
  const [student, setStudent] = useState(null);
  // const superAdmin = useSelector((state) => state.auth.isSuperAdmin);
  // const collegeAdmin = useSelector((state) => state.auth.isCollege);
  // const member = useSelector((state) => state.auth.userType);
  // const student = useSelector((state) => state.auth.isStudent);
  useEffect(() => {
    let obj = JSON.parse(localStorage.getItem("auth"));
    if(obj?.isSuperAdmin) {
      setSuperAdmin(true);
    }
    if(obj?.isStudent) {
      setStudent(true);
    }
  }, [])

  return (
    <Fragment>
      {superAdmin && <SuperAdminItems />}

      {/* {collegeAdmin && <CollegeItems />}

      {member && <MemberItems />} */}

      {student && <StudentItems />}
    </Fragment>
  );
};

export default SecondaryListItems;
