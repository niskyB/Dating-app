import * as React from "react";

const LoginPage = React.lazy(() => import("../container/login"));
const RegisterPage = React.lazy(() => import("../container/register"));
const MatchPage = React.lazy(() => import("../container/match"));

interface route {
  link: string;
  component: any;
  exact?: boolean;
  isLoginRequire?: boolean;
}
export const routes: route[] = [
  {
    link: "/login",
    component: LoginPage,
  },
  {
    link: "/register",
    component: RegisterPage,
  },
  {
    link: "/",
    component: MatchPage,
  },
];
