import axios from "axios";
import { BASE_API_URL } from "../../globalVariables";

const signIN = async (signInDeatils) => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/api/v1/super-admin/login/`,
      {
        username: signInDeatils.username,
        password: signInDeatils.password,
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
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const response = await axios.post(
      `${BASE_API_URL}/api/v1/colleges/`,
      collegeData,
      config
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
    const response = await axios.post(`${BASE_API_URL}/api/v1/get-colleges/`);

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

const getCollegeMembers = async ({ college_name }) => {
  let token = JSON.parse(localStorage.getItem("auth"));
  // console.log("admin get member token", token);
  // console.log("get member college_name", college_name);
  try {
    const response = await axios.post(
      `${BASE_API_URL}/api/v1/college/members/`,
      {
        college_name,
      },
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
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
  getCollegeMembers,
};

export default superAdminApi;
