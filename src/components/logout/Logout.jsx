import { Link } from 'react-router-dom';
import {RiLogoutCircleFill} from 'react-icons/ri'
import AuthContext from '../../index';
import { useContext } from 'react';
import toast from "react-hot-toast";


export default function Logout()
{

    const {setAuthUser, isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(AuthContext);

    async function logOut(event)
    {
        setLoading(true);
        try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/logout`,{
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "application/json"
            }
        });
        const data = await response.json();

        // console.log(data)

        if(!data.success)
        throw data;

        setIsAuthenticated(false)
        setAuthUser({})

        // navigate("/")
        setLoading(false);
        toast.success(data.message)

        } catch (error) {
            
            if(isAuthenticated)
            {
                setIsAuthenticated(false);
                setAuthUser({});
            }

            setLoading(false);
            // console.log(error);     
            // navigate("/")
            toast.error(error.message);
        }
    }

    return (
        <Link to="/" className="header-nav-list-item-link" onClick={(e) => {
            if(loading)
            return false;

            logOut(e);
        }}>LogOut <RiLogoutCircleFill className="header-nav-list-item-link-icon"/></Link>
    )
}