import { lazy } from "react";
import RegistrationForm from "../page/registration";

const Home = lazy(() => import("../page/home/index"));
const Dashboard = lazy(() => import("../page/dashboard"));
const HackathonDetail = lazy(() => import("../page/hackathonDetail"));
const ViewMoreHackathon = lazy(() => import("../page/viewMoreHackathon"));
const HackathonForm = lazy(() => import("../page/hackathonForm"));
const LoginForm = lazy(() => import("../page/login"));

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/manage-contest", element: <Dashboard /> },
  { path: "/detail/:id", element: <HackathonDetail /> },
  { path: "/more-hackthon/:id", element: <ViewMoreHackathon /> },
  { path: "/create-hackathon", element: <HackathonForm /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/register", element: <RegistrationForm /> },
];
