import "./ProfileInfo.css";
import {useRef, useEffect} from 'react';
import { FaUserTie } from 'react-icons/fa';
import UpdateProfile from '../updateProfile/UpdateProfile';

export default function ProfileInfo( {profileImage} )
{
    const profileRef = useRef();

    useEffect(()=>{
        function handleClick(event){

            if(profileRef.current == null)
            return; 

            const toggleProfileButton = profileRef.current.firstChild;
    
            const isProfileDropdownButton = event.target === toggleProfileButton;

            if(!isProfileDropdownButton && event.target.closest(".dashboard-profile-info") != null ) return

            if(isProfileDropdownButton)
            {
                profileRef.current.classList.toggle("active");
            }
            else
            {
                profileRef.current.classList.remove("active");
            }
        }
        document.addEventListener("click", handleClick)

        return ()=>document.removeEventListener("click", handleClick)
    },[])

    return(
        
    <div ref = {profileRef} className="dashboard-profile-info">
        
        <button className="dashboard-profile-info-button">
            {
            profileImage == null ? 
            <FaUserTie  className="dashboard-profile-info-image" size={"5rem"} color="#009fbd"/>
            :
            <img className="dashboard-profile-info-image" src={`${process.env.REACT_APP_SERVER_URL}/${profileImage}`} />
            }   
        </button>
        
        <div className="dashboard-profile-info-content">
            <UpdateProfile/>
        </div>    
    </div>
    )
}