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
  let token = JSON.parse(localStorage.getItem("auth"));
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

const editStudentProfile = async (college, formData) => {
  let token = JSON.parse(localStorage.getItem("auth"));
  let obj = { ...formData };
  // console.log("Member Token", 'Bearer ' + token.access_token);
  try {
    const response = await axios.post(
      `${BASE_API_URL}/college/${college}/api/v1/student-profile/`,
      { ...obj },
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
  let token = JSON.parse(localStorage.getItem("auth"));
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

const studentExamResult = async (college) => {
  let token = JSON.parse(localStorage.getItem("auth"));
  // console.log("Member Token", 'Bearer ' + token.access_token);
  try {
    const response = await axios.post(
      `${BASE_API_URL}/college/${college}/api/v1/student-result/`,
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
  let token = JSON.parse(localStorage.getItem("auth"));
  // console.log("Member Token", 'Bearer ' + token.access_token);
  try {
    const response = await axios.post(
      `${BASE_API_URL}/college/${college}/api/v1/student-exam/`,
      {
        exam_type: formData.examType,
        exam_session: formData.examSession,
        fee_paid_amount: formData.feeAmount,
        fee_reciept_ref_no: formData.feeRecieptNo,
        semester: formData.semester
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
  let token = JSON.parse(localStorage.getItem("auth"));
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

const getSemesters = async (college) => {
  let token = JSON.parse(localStorage.getItem("auth"));
  try {
    const response = await axios.post(
      `${BASE_API_URL}/college/${college}/api/v1/student-semester/`,
      {},
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

const getExamTerms = async (college) => {
  // let token = JSON.parse(localStorage.getItem("auth"));
  try {
    const response = await axios.post(
      `${BASE_API_URL}/college/${college}/api/v1/student-exam-type/`,
      {},
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

const getAdmitCard = async (college, id) => {
  let token = JSON.parse(localStorage.getItem("auth"));
  // console.log("Member Token", 'Bearer ' + token.access_token);
  try {
    const response = await axios.post(
      `${BASE_API_URL}/college/${college}/api/v1/student/admit-card/${id}/`,
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


const logout = async (college) => {
  let token = JSON.parse(localStorage.getItem("auth"));
  try {
    const response = await axios.post(
      `${BASE_API_URL}/college/${college}/api/v1/college/logout/`,
      {},
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

const requestPasswordReset = async (college, email) => {
  // let token = JSON.parse(localStorage.getItem("auth"));
  try {
    const response = await axios.post(
      `${BASE_API_URL}/college/${college}/api/v1/college/request-reset-email/`,
      {
        email
      },
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

const resetPassword = async (college, resetData) => {
  // let token = JSON.parse(localStorage.getItem("auth"));
  try {
    const response = await axios.patch(
      `${BASE_API_URL}/college/${college}/api/v1/college/password-reset-complete/`,
      {
       ...resetData
      },
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
  getSemesters,
  getExamTerms,
  studentExamResult,
  getAdmitCard,
  editStudentProfile,
  requestPasswordReset,
  resetPassword
};

export default membersApi;
