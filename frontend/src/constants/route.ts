import * as React from "react";
const PreviewProfile = React.lazy(() => import("../container/previewProfile"));
const ChatBox = React.lazy(() => import("../container/chatBox"));
const LoginPage = React.lazy(() => import("../container/login"));
const RegisterPage = React.lazy(() => import("../container/register"));
const MatchPage = React.lazy(() => import("../container/match"));
const Setting = React.lazy(() => import("../container/setting"));
const MyProfile = React.lazy(() => import("../container/myProfile"));
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
    isLoginRequire: true,
  },
  { link: "/me", component: PreviewProfile, isLoginRequire: true },
  {
    link: "/*",
    component: MatchPage,
    isLoginRequire: true,
  },
];

export const sideBarRoute: route[] = [
  {
    link: "/me",
    component: MyProfile,
    isLoginRequire: true,
  },
  {
    link: "/setting",
    component: Setting,
    isLoginRequire: true,
  },
];
