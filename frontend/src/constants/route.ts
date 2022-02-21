import { lazy } from "react";
import EmptyComponent from "../component/emptyComponent";
import MatchAndChatDesktop from "../container/SideBarLayout/matchAndChatDesktop";
//lazy import
const MatchAndChatMobile = lazy(
  () => import("../container/SideBarLayout/matchAndChatMobile")
);
const PreviewProfile = lazy(() => import("../container/previewProfile"));
const ChatBox = lazy(() => import("../container/chatBox"));
const LoginPage = lazy(() => import("../container/login"));
const RegisterPage = lazy(() => import("../container/register"));
const MatchPage = lazy(() => import("../container/SideBarLayout/match"));
const Setting = lazy(() => import("../container/setting"));
const MyProfile = lazy(() => import("../container/myProfile"));
export interface route {
  link: string;
  component: any;
  exact?: boolean;
  isLoginRequire?: boolean;
  isMobileRoute?: boolean;
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
  { link: "/setting", component: PreviewProfile, isLoginRequire: true },
  {
    link: "/matchandchat",
    component: EmptyComponent,
    isLoginRequire: true,
    isMobileRoute: true,
  },
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
  {
    link: "/matchandchat",
    component: MatchAndChatMobile,
    isLoginRequire: true,
    isMobileRoute: true,
  },
  {
    link: "/",
    component: MatchAndChatDesktop,
    isLoginRequire: true,
    isMobileRoute: false,
  },
];
