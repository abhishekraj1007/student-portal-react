import axios from "axios";
import { BASE_API_URL } from "../../globalVariables";
// /api/v1/member/login/
const signIN = async (signInDeatils) => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/college/iit/api/v1/college/login/`,
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

const studentProfile = async () => {
  let token = JSON.parse(localStorage.getItem("member"));
  // console.log("Member Token", 'Bearer ' + token.access_token);
  try {
    const response = await axios.post(
      `${BASE_API_URL}/college/iit/api/v1/student-profile/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`
        }
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

const studentCourses = async () => {
  let token = JSON.parse(localStorage.getItem("member"));
  // console.log("Member Token", 'Bearer ' + token.access_token);
  try {
    const response = await axios.post(
      `${BASE_API_URL}/college/iit/api/v1/student-course/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`
        }
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

const logout = async () => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/api/v1/member/logout/`
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

const membersApi = {
  signIN,
  logout,
  studentProfile,
  studentCourses,
};

export default membersApi;
