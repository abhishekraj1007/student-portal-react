import axios from "axios";
import { BASE_API_URL } from "../../globalVariables";

const signIN = async (signInDeatils) => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/api/v1/college/login/`,
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

const changeCollegePass = async (passwordData) => {
  let token = JSON.parse(localStorage.getItem("collegeAdmin"));
  console.log("college Token", token.access_token);
  try {
    const response = await axios.put(
      `${BASE_API_URL}/api/v1/college/change_password/`,
      {
        old_password: passwordData.oldPassword,
        new_password: passwordData.newPassword
      },
      {
        headers: {
          Authorization: 'Bearer ' + token.access_token
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

const changeMemberPass = async (passwordData) => {
  try {
    const response = await axios.put(
      `${BASE_API_URL}/api/v1/member/change_password/`,
      {
        old_password: passwordData.oldPassword,
        new_password: passwordData.newPassword
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

const registerMember = async (registerData) => {
  let token = JSON.parse(localStorage.getItem("collegeAdmin"));
  console.log("college Token", token.access_token);
  try {
    const response = await axios.post(
      `${BASE_API_URL}/api/v1/member/register/`,
      {
        username: registerData.username,
        email: registerData.email,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token.access_token
        }
      }
    );

    return response.data;
  } catch(e) {
    console.log("error", e); 
    if (!axios.isCancel(e)) {
      throw e;
    }
  }
  return {};
}

const logout = async () => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/api/v1/college/logout/`
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

const collegeApi = {
  signIN,
  logout,
  registerMember,
  changeCollegePass,
  changeMemberPass,
};

export default collegeApi;
