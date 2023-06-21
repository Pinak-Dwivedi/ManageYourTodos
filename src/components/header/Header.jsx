import './Header.css'
import {Link} from 'react-router-dom'
import Logout from '../logout/Logout';
import {IconContext} from 'react-icons';
import {FaHome} from 'react-icons/fa'
import {RiLoginCircleFill} from 'react-icons/ri'
import {MdSpaceDashboard} from 'react-icons/md'
import AuthContext from '../../index';
import { useContext, useRef } from 'react';
import logo from "../../assets/images/manage-your-todos.png";

function Header()
{
    const navBarRef = useRef();

    function openNavBar()
    {
        navBarRef.current.classList.toggle('active');
    }

    const {isAuthenticated} = useContext(AuthContext);

    return(
        <header className='header'>
            <div className="header-brand">
                <img className="header-logo" src={logo} alt="logo" />
                Manage Your Todos
            </div>
            <nav ref={navBarRef} className="header-nav">
                <ul className="header-nav-list">
                    <IconContext.Provider value={{ size: "1rem"}}>

                    {
                    isAuthenticated === false && 
                    <li className="header-nav-list-item">
                        <Link className="header-nav-list-item-link" to="/">Home <FaHome className="header-nav-list-item-link-icon"/></Link>
                    </li>
                    }

                    {
                    isAuthenticated &&
                    <li className="header-nav-list-item">
                        <Link className="header-nav-list-item-link" to="/dashboard">Dashboard <MdSpaceDashboard className="header-nav-list-item-link-icon"/></Link>
                    </li>
                    }

                    {isAuthenticated === false &&
                    <li className="header-nav-list-item">
                        <Link className="header-nav-list-item-link" to="/login">Login <RiLoginCircleFill className="header-nav-list-item-link-icon"/></Link>
                    </li>
                    }

                    {
                    isAuthenticated === false &&
                    <li className="header-nav-list-item">
                        <Link className="header-nav-list-item-link" to="/register">Sign Up <RiLoginCircleFill className="header-nav-list-item-link-icon"/></Link>
                    </li>
                    }

                    {isAuthenticated && 
                    <li className="header-nav-list-item">
                        <Logout/>
                    </li>
                    }
                    </IconContext.Provider>
                </ul>
            </nav>

            <div className="header-hamburger" onClick={openNavBar}>
                <div className="hamburger-slice"></div>
                <div className="hamburger-slice"></div>
                <div className="hamburger-slice"></div>
            </div>
        </header>
    )
}

export default Header;


