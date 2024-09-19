import React, { useState } from 'react';
import { FaPersonShelter, FaUserGroup } from "react-icons/fa6";
import { GiFishingNet, GiMusicSpell } from "react-icons/gi";
import { MdLogout } from 'react-icons/md';
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import "./styles/navbar.css";


const Navbar = () => {
    const [res, setRes] = useState(false)
    const { user, logout } = useAuth()

    const navLinks = [
        {
            name: "Users",
            link: <FaUserGroup />,
            to: "/users",
            role: ["super_admin"]
        },
        {
            name: "Artists",
            link: <FaPersonShelter />,
            to: "/artist",
            role: ["super_admin", "artist_manager"]

        },
        {
            name: "My Songs",
            link: <GiMusicSpell />,
            to: "/songs",
            role: ["super_admin", "artist_manager", "artist"]
        }
    ]

    const clickRes = () => {
        setRes((x) => !x)
    }
    return (<>
        <div className={res ? "resHam fixResHam" : "resHam "} onClick={clickRes}><RxHamburgerMenu /></div>
        <nav className={res ? 'navContainer resNavContainer' : 'navContainer'}>
            <div className='indvLinks'>
                <span className='icon iconLogo'>{<GiFishingNet />}</span>
                <span className='neters'>neters</span>
            </div>
            {
                navLinks.map((items, id) => {
                    return items.role.includes(user?.role) ? <NavLink key={id} to={items.to} className="indvLinks navLinks">
                        <span className='icon'>{items.link}</span>
                        <span className='linkName'>{items.name}</span>
                    </NavLink> : null


                })
            }
            <div className='indvLinks navLinks' onClick={() => logout()} >
                <span className='icon'> <MdLogout /> </span>
                <span className='linkName'>Log Out</span>
            </div>
        </nav>
    </>
    )
}

export default Navbar