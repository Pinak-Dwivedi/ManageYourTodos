import "./Users.css";
import { useState, useEffect } from "react";
import UserInfo from "./UserInfo";

export default function Users()
{
    const [users, setUsers] = useState([]);


    useEffect( () => {
        
        (async () => {

            try {     
                
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users`,{
                    credentials: "include"
                });

                const data = await response.json();    

                if(!data.success)
                throw data;

                setUsers(data.data);
            } catch (error) {
                
                // console.log(error);
            }

        })();
    },[])

    return(
        <div className="users-container">
            <div className="users-table">
                <div className="users-table-row">
                    <div className="user-info user-info-heading">
                        <div className="user-id">Id</div>
                        <div className="user-info-field">Name</div>
                        <div className="user-info-field">Email</div>
                    </div>
                </div>
                {users.map( user => {
                    return(
                    <div key = {user.id} className="users-table-row">
                        <UserInfo setUsers = {setUsers} userId = {user.id} userName={user.name} userEmail={user.email}/>
                    </div>
                    ) 
                })}
                
            </div>
        </div>
    )
}