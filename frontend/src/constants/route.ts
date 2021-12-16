import * as React from "react";
import ChatBox from "../container/chatBox";
import MatchList from "../container/matchList";
import MessageSection from "../container/messageSection";

const LoginPage = React.lazy(() => import("../container/login"));
const RegisterPage = React.lazy(() => import("../container/register"));
const MatchPage = React.lazy(() => import("../container/match"));

interface route {
  link: string;
  component: any;
  exact?: boolean;
  isLoginRequire?: boolean;
}
export const contentRoutes: route[] = [
  {
    link: "/login",
    component: LoginPage,
  },
  {
    link: "/register",
    component: RegisterPage,
  },
  {
    link: "/messages/:id",
    component: ChatBox,
    isLoginRequire: false,
  },
  {
    link: "/*",
    component: MatchPage,
  },
];

export const sideBarRoute: route[] = [
  {
    link: "/",
    component: MatchList,
    isLoginRequire: true,
  },
  {
    link: "/messages/*",
    component: MessageSection,
    isLoginRequire: true,
  },
];
