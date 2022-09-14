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
const Account = Loadable(lazy(() => import("./pages/Account/Account")));
const Courses = Loadable(lazy(() => import("./pages/Courses/Courses")));


const routes = [
  {
    path: "",
    element: <SignIn />,
  },

  {
    path: "/dav",
    element: <CollegeSignIn />,
  },

  {
    path: "/dav/member",
    element: <MemberSignIn />,
  },

  {
    path: '/account',
    element: (
      <MainLayout />
    ),
    children: [
      {
        path: '',
        element: <Account />,
      },
    ],
  },

  {
    path: '/dashboard',
    element: (
      <MainLayout />
    ),
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
    ],
  },

  {
    path: '/create-college',
    element: (
      <MainLayout />
    ),
    children: [
      {
        path: '',
        element: <CreateCollege />,
      },
    ],
  },

  {
    path: '/colleges',
    element: (
      <MainLayout />
    ),
    children: [
      {
        path: '',
        element: <ViewColleges />,
      },
    ],
  },

  {
    path: '/register-member',
    element: (
      <MainLayout />
    ),
    children: [
      {
        path: '',
        element: <RegisterMember />,
      },
    ],
  },

  {
    path: '/courses',
    element: (
      <MainLayout />
    ),
    children: [
      {
        path: '',
        element: <Courses />,
      },
    ],
  },
];

export default routes;
