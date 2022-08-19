import Loadable from "./components/ui/Loadable";
import { lazy } from "react";
import MainLayout from './components/Layout/MainLayout';

const SignIn = Loadable(lazy(() => import("./pages/SignIn/SignIn")));
const Dashboard = Loadable(lazy(() => import("./pages/Dashboard/Dashboard")));
const CreateCollege = Loadable(lazy(() => import("./pages/CreateCollege/CreateCollege")));

const routes = [
  {
    path: "",
    element: <SignIn />,
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
];

export default routes;
