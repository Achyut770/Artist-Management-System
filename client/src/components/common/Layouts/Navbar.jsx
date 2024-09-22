import React, { useState } from "react";
import { FaPersonShelter, FaUserGroup } from "react-icons/fa6";
import { GiFishingNet, GiMusicSpell } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import "./styles/navbar.css";
import { RolesNavigate } from "../../../context/AuthProvider";

const Navbar = () => {
  const [isRes, setIsRes] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    {
      name: "Users",
      link: <FaUserGroup />,
      to: "/users",
      role: ["super_admin"],
    },
    {
      name: "Artists",
      link: <FaPersonShelter />,
      to: "/artist",
      role: ["super_admin", "artist_manager"],
    },
    {
      name: "My Songs",
      link: <GiMusicSpell />,
      to: "/mysong",
      role: ["artist"],
    },
  ];

  const clickRes = () => setIsRes((prevRes) => !prevRes);

  return (
    <>
      <div
        className={isRes ? "resHam fixResHam" : "resHam "}
        onClick={clickRes}
      >
        <RxHamburgerMenu />
      </div>
      <nav className={isRes ? "navContainer resNavContainer" : "navContainer"}>
        <Link
          to={user && `/${RolesNavigate[user.role]}`}
          className="indvLinks logo"
        >
          <span className="icon iconLogo">{<GiFishingNet />}</span>
          <span className="neters">neters</span>
        </Link>

        {navLinks.map((navLink, index) => {
          return (
            navLink.role.includes(user?.role) && (
              <NavLink
                key={index}
                to={navLink.to}
                className="indvLinks navLinks"
              >
                <span className="icon">{navLink.link}</span>
                <span className="linkName">{navLink.name}</span>
              </NavLink>
            )
          );
        })}
        <div className="indvLinks navLinks" onClick={() => logout()}>
          <span className="icon">
            {" "}
            <MdLogout />{" "}
          </span>
          <span className="linkName">Log Out</span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
