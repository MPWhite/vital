import React from "react";
import classNames from "classnames";
import "./Sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faBell } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

const LINKS = [
  {
    path: "/integrations",
    icon: faBell,
    messageId: "sidebar__home-link",
    messageDefault: "Feed",
    subLinks: [
      {
        subPath: "",
      },
    ],
  },
  {
    path: "/metrics",
    icon: faChartBar,
    messageId: "sidebar__home-link",
    messageDefault: "Boulders",
    subLinks: [
      {
        subPath: "",
      },
    ],
  },
  {
    path: "/inventory",
    icon: faChartBar,
    messageId: "sidebar__home-link",
    messageDefault: "Status",
    subLinks: [],
  },
];

const renderLinkItem = (
  { path, icon, messageId, messageDefault, subLinks },
  pathname,
  closeSidebar
) => (
  <li key={path}>
    <Link to={path}>
      <div
        className={`sidebar__link ${
          pathname === path ? "sidebar--link-active" : ""
        }`}
      >
        <span className="sidebar__icon-container">
          <FontAwesomeIcon icon={icon} />
        </span>
        <span className="noDecoration sidebar__link-text">
          {messageDefault}
        </span>
      </div>
    </Link>
  </li>
);

const Sidebar = ({ location, sidebarOpen, openSidebar, closeSidebar }) => {
  const sidebarClassNames = classNames("sidebar", {
    "sidebar--open": sidebarOpen,
  });

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => closeSidebar(),
  });

  return (
    <>
      <div className="sidebar__swipe-pane" {...handlers} />
      <nav className={sidebarClassNames}>
        <div className="sidebar__logo-wrap"></div>
        <ul className="sidebar__links">
          {LINKS.map((item) =>
            renderLinkItem(item, location.pathname, closeSidebar)
          )}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
