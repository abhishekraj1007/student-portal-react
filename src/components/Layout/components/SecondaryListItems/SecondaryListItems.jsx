import * as React from "react";
import { CollegeItems, SuperAdminItems, MemberItems } from "./components";
import { useSelector } from "react-redux";

export const SecondaryListItems = () => {
  const superAdmin = useSelector((state) => state.auth.isSuperAdmin);
  const collegeAdmin = useSelector((state) => state.auth.isCollege);
  const member = useSelector((state) => state.auth.userType);

  return (
    <React.Fragment>
      {superAdmin && <SuperAdminItems />}

      {collegeAdmin && <CollegeItems />}

      {member && <MemberItems />}
    </React.Fragment>
  );
};

export default SecondaryListItems;
