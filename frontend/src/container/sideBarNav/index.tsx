import { NavLink } from "react-router-dom";

interface SideBarNavProps {}

const SideBarNav: React.FunctionComponent<SideBarNavProps> = () => {
  return (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? "relative font-semibold line" : "relative font-semibold"
        }
        to="/match"
      >
        Matched
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive
            ? "ml-4 font-semibold relative line"
            : "ml-4 font-semibold relative"
        }
        to="/messages"
      >
        Messages
      </NavLink>
    </>
  );
};

export default SideBarNav;
