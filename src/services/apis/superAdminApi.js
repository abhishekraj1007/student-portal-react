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
      `${BASE_API_URL}/api/v1/colleges/`,
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

const getColleges = async () => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/api/v1/get-colleges/`
    );

    return response.data;

    // const response = await fetch(`${BASE_API_URL}/api/v1/colleges/`, {
    //   method: "GET",
    //   mode: "cors",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // console.log("response...", response)

    // return response.json();
  } catch (e) {
    console.log("error", e);
    if (!axios.isCancel(e)) {
      throw e;
    }
  }
  return {};
};

const deleteColleges = async ({ id }) => {
  try {
    const response = await axios.delete(
      `${BASE_API_URL}/api/v1/college/${id}/`
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

const logout = async () => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/api/v1/super-admin/logout/`
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
  getColleges,
  deleteColleges,
  logout,
};

export default superAdminApi;
