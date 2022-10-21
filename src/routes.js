import Loadable from "./components/ui/Loadable";
import { lazy } from "react";
import MainLayout from './components/Layout/MainLayout';

const SignIn = Loadable(lazy(() => import("./pages/SignIn/SignIn")));
const CollegeSignIn = Loadable(lazy(() => import("./pages/SignIn/SignIn")));
const MemberSignIn = Loadable(lazy(() => import("./pages/SignIn/SignIn")));

const Dashboard = Loadable(lazy(() => import("./pages/Dashboard/Dashboard")));
const CreateCollege = Loadable(lazy(() => import("./pages/CreateCollege/CreateCollege")));
const ViewColleges = Loadable(lazy(() => import("./pages/ViewColleges/ViewColleges")));
const RegisterMember = Loadable(lazy(() => import("./pages/RegisterMember/RegisterMember")));
const StudentAccount = Loadable(lazy(() => import("./pages/Account/Account")));
const StudentCourses = Loadable(lazy(() => import("./pages/Courses/Courses")));
const StudentExamForm = Loadable(lazy(() => import("./pages/Exams/Exams")));
const ViewCollegeMembers = Loadable(lazy(() => import("./pages/ViewColleges/components/CollegeSchema/CollegeSchema")));
const StudentExamResult = Loadable(lazy(() => import("./pages/ExamResult/ExamResult")));
const ResetPassword = Loadable(lazy(() => import("./pages/ResetPassword/ResetPassword")));

const NotFound = Loadable(lazy(() => import("./pages/error/NotFound")));


const routes = [
  {
    path: "/admin/login",
    element: <SignIn />,
  },

  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "create-college",
        element: <CreateCollege />,
      },
      {
        path: "colleges",
        element: <ViewColleges />,
      },
      {
        path: "colleges/:schema_name",
        element: <ViewCollegeMembers />,
      },
      {
        path: "register-member",
        element: <RegisterMember />,
      },
    ],
  },

  {
    path: "/:college/login",
    element: <CollegeSignIn />,
  },

  {
    path: "/:college/student/login",
    element: <MemberSignIn />,
  },

  {
    path: "/:college/student/forget-password",
    element: <ResetPassword />,
  },

  {
    path: ":college/student",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "account",
        element: <StudentAccount />,
      },
      {
        path: "courses",
        element: <StudentCourses />,
      },
      {
        path: "exam-form",
        element: <StudentExamForm />,
      },
      {
        path: "exam-result",
        element: <StudentExamResult />,
      },
    ],
  },

  {
    path: '*',
    children: [
      // {
      //   path: '',
      //   exact: true,
      //   element: <Navigate to="/dashboard/um" />,
      // },
      // {
      //   path: 'login',
      //   element: <Login />,
      // },
      // {
      //   path: '401',
      //   element: <AuthorizationError />,
      // },
      // {
      //   path: '500',
      //   element: <ServerError />,
      // },
      {
        path: '404',
        element: <NotFound />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
