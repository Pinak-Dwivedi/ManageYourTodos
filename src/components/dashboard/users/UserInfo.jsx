import {useState, useRef, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {BsFillPencilFill} from "react-icons/bs"
import ConfirmBox from "../../confirmBox/ConfirmBox";
import toast from "react-hot-toast";
import AuthContext from "../../../index";

export default function UserInfo({setUsers, userId, userName, userEmail})
{
    const {loading, setLoading} = useContext(AuthContext);

    const [updateName, setUpdateName] = useState(userName);
    const [updateEmail, setUpdateEmail] = useState(userEmail);
    const [error, setError] = useState([]);

    const navigate = useNavigate();

    const confirmBoxRef = useRef();

    async function updateUser()
    {
        setLoading(true);
        try {
            
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`,{
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

            // console.log(data);

            setError({});

            if(!data.success)
            throw data;


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
        toast.error(err.error);
        }
    }

    async function deleteUser()
    {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`,{
                method: "DELETE",
                credentials: "include"
            })

            const data = await response.json();

            // console.log(data);

            if(!data.success)
            throw data;

            setUsers( prevUsers => {
                return prevUsers.filter( user => {
                    return user.id !== userId
                })
            })

            setLoading(false);
            toast.success(data.message);

        } catch (err) {
            // console.log(error)
            setLoading(false);
            toast.error(err.error);
        }   
    }

    return(
        <>
        <ConfirmBox confirmBoxRef = {confirmBoxRef} deleteFunction = {deleteUser}/>

        <div className="user-info">
            <div className="user-id">{userId}</div>

            <div className="user-info-field">
                <div className="user-info-field-input">
                <BsFillPencilFill/>
                <input className="user-name" type="text" value={updateName} onChange={ (e) => setUpdateName(e.target.value)} />
                </div>
                <span className="user-info-field-error">{error.name}</span>
            </div>
            
            <div className="user-info-field">
                <div className="user-info-field-input">
                <BsFillPencilFill/>
                <input className="user-email" type="text" value={updateEmail} onChange={ (e) => setUpdateEmail(e.target.value)}/>
                </div>
                <span className="user-info-field-error">{error.email}</span>
            </div>
        </div>

        <div className="user-buttons">
            <button className="user-view-todos-button user-button" onClick={() => navigate(`/usertodos/${userId}`, {state: {userName: updateName}})}>View Todos</button>
            <button className="user-update-button user-button" onClick={updateUser}>Update</button>
            <button className="user-delete-button user-button" onClick={() => confirmBoxRef.current.classList.add("active") }>Delete</button>
        </div>
        </>
    )
}