import "./UpdateProfile.css";
import {useState, useContext} from 'react';
import AuthContext from '../../../index';
import toast from "react-hot-toast";

export default function UpdateProfile()
{
    const { authUser, setAuthUser, loading, setLoading } = useContext(AuthContext);

    const [updateName, setUpdateName] = useState(authUser.name);
    const [updateEmail, setUpdateEmail] = useState(authUser.email);
    const [error, setError] = useState({});

    async function updateProfile(e)
    {
        setLoading(true);
        e.preventDefault();
        try {
            
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${authUser.id}`,{
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name: updateName,
                    email: updateEmail
                })
            })

            const data = await response.json();
            // console.log(data)

            setError({});
            
            if(!data.success)
            throw data;

            setAuthUser(data.user);

            setLoading(false);
            toast.success(data.message);

        } catch (err) {

            // console.log(err);
            setLoading(false);
            //validation errors
            if(typeof err.error === "object")
            {
                const e = {}; 
                err.error.forEach( err => {

                    for(let key in err)
                    e[key] = err[key][0]

                });
                setError(e);
            }
            else
            toast.error(err.message);
        }
    }

    return(
    <form onSubmit={(e)=>
        {
            if(loading)
            return false;
            
            updateProfile(e)
        }}className="profile-update-form">

        <div className="profile-update-form-field">
            <label className="profile-update-form-label" htmlFor="name">Name</label>
            <input className="profile-update-form-input" required type="text" id="name" value={updateName} onChange={event => setUpdateName(event.target.value)}/>

            <span className="profile-update-form-error">{error.name}</span>
        </div>

        <div className="profile-update-form-field">
            <label className="profile-update-form-label" htmlFor="email">Email</label>
            <input className="profile-update-form-input" required type="text" id="email" value={updateEmail} onChange={event => setUpdateEmail(event.target.value)}/>

            <span className="profile-update-form-error">{error.email}</span>
        </div>

        <button className="profile-update-form-submitButton" type="submit">Update Profile</button>
    </form>   
    )
}