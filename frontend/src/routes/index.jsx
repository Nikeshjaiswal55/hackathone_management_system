import { lazy } from "react";

const Home = lazy(() => import("../page/home/index"));
const Dashboard = lazy(() => import("../page/dashboard"));
const HackathonDetail = lazy(() => import("../page/hackathonDetail"));
const ViewMoreHackathon = lazy(() => import("../page/viewMoreHackathon"));
const HackathonForm = lazy(() => import("../page/hackathonForm"));
const LoginForm = lazy(() => import("../page/login"));
const RegistrationForm = lazy(() => import("../page/registration"));

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/manage-contest", element: <Dashboard />, isProtected: true },
  { path: "/detail/:id", element: <HackathonDetail />, isProtected: true },
  {
    path: "/more-hackthon/:id",
    element: <ViewMoreHackathon />,
    isProtected: true,
  },
  { path: "/create-hackathon", element: <HackathonForm />, isProtected: true },
  { path: "/login", element: <LoginForm /> },
  { path: "/register", element: <RegistrationForm /> },
];
