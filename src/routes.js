import Loadable from "./components/ui/Loadable";
import { lazy } from "react";

const SignIn = Loadable(lazy(() => import("./pages/SignIn/SignIn")));
const Dashboard = Loadable(lazy(() => import("./pages/Dashboard/Dashboard")));


const routes = [
  {
    path: "",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];

export default routes;
