import axios from "axios";
import { BASE_API_URL } from "../../globalVariables";
// /api/v1/member/login/
const signIN = async (signInDeatils, college) => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/college/${college}/api/v1/college/login/`,
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

const studentProfile = async (college) => {
  let token = JSON.parse(localStorage.getItem("member"));
  // console.log("Member Token", 'Bearer ' + token.access_token);
  try {
    const response = await axios.post(
      `${BASE_API_URL}/college/${college}/api/v1/student-profile/`,
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

const studentCourses = async (college) => {
  let token = JSON.parse(localStorage.getItem("member"));
  // console.log("Member Token", 'Bearer ' + token.access_token);
  try {
    const response = await axios.post(
      `${BASE_API_URL}/college/${college}/api/v1/student-course/`,
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

const studentExamForm = async (college, formData) => {
  let token = JSON.parse(localStorage.getItem("member"));
  // console.log("Member Token", 'Bearer ' + token.access_token);
  try {
    const response = await axios.post(
      `${BASE_API_URL}/college/${college}/api/v1/student-exam/`,
      {
        exam_type: formData.examType,
        exam_session: formData.examSession,
        fee_paid_amount: formData.feeAmount,
        fee_reciept_ref_no: formData.feeRecieptNo
      },
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

const studentExamFormData = async (college) => {
  let token = JSON.parse(localStorage.getItem("member"));
  // console.log("Member Token", 'Bearer ' + token.access_token);
  try {
    const response = await axios.post(
      `${BASE_API_URL}/college/${college}/api/v1/student-exam-submitted/`,
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


const getCollegeLogo = async (collegeName) => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/api/v1/college-logo/`,
      {
        name: collegeName
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
  getCollegeLogo,
  studentExamForm,
  studentExamFormData,
};

export default membersApi;
