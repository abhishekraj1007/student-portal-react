import axios from "axios";
import { BASE_API_URL } from "../../globalVariables";

const signIN = async (signInDeatils) => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/api/v1/super-admin/login/`,
      {
        username: signInDeatils.username,
        password: signInDeatils.password
      }
    );

    return response.data;
  } catch (e) {
    console.log("error", e);
    if (!axios.isCancel(e)) {
      throw e;
    }
  }
  return {};
};

const createCollege = async (collegeData) => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/api/v1/college/`,
      {
        college_name: collegeData.collegeName,
        username: collegeData.username,
        email: collegeData.email,
        password: collegeData.password,
       }
    );

    return response.data;
  } catch (e) {
    console.log("error", e);
    if (!axios.isCancel(e)) {
      throw e;
    }
  }
  return {};
};

const superAdminApi = {
  signIN,
  createCollege,
};

export default superAdminApi;
