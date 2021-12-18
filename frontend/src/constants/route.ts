import * as React from "react";
import PreviewProfile from "../container/previewProfile";
import ChatBox from "../container/chatBox";
import MyProfile from "../container/myProfile";
import Setting from "../container/setting";

const LoginPage = React.lazy(() => import("../container/login"));
const RegisterPage = React.lazy(() => import("../container/register"));
const MatchPage = React.lazy(() => import("../container/match"));

export interface route {
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
  { link: "/me", component: PreviewProfile, isLoginRequire: false },
  {
    link: "/*",
    component: MatchPage,
  },
];

export const sideBarRoute: route[] = [
  {
    link: "/me",
    component: MyProfile,
    isLoginRequire: false,
  },
  {
    link: "/setting",
    component: Setting,
    isLoginRequire: false,
  },
];
