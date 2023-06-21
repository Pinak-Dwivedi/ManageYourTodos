import "./AddTodo.css"
import {useState, useContext, useRef, useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../../../index';
import toast from "react-hot-toast";

export default function AddTodo()
{

    const {authUser, isAuthenticated, loading, setLoading} = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState({});
    const titleRef = useRef();
    const bodyRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    
    const userId = location.state !=null ? location.state.userId : null;

    // if(!isAuthenticated)
    // return <Navigate to="/"/>

    useEffect(()=>{
        
        if(!isAuthenticated)
        navigate("/");
        
        titleRef.current.style.height = "1px";
        titleRef.current.style.height = (1+titleRef.current.scrollHeight)+"px";

        bodyRef.current.style.height = "1px";
        bodyRef.current.style.height = (5+bodyRef.current.scrollHeight)+"px";

    },[title, body])

    async function addTodo(e)
    {
        setLoading(true);
        e.preventDefault();
        try {
            
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos?userId=${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials:"include",
                body:JSON.stringify({
                    title, body
                })
            })

            const data = await response.json();

            // console.log(data);

            setError({});

            if(!data.success)
            throw data;

            if(authUser.role === "admin")
            navigate(-1);

            navigate("/dashboard");
            setLoading(false);

            toast.success(data.message);

        } catch (err) {

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

    return(
        <div className="addTodo-container">
            <form className="addTodo-form" onSubmit={(e) => {

                if(loading)
                return false;

                addTodo(e)
            }}>

            <div className="addTodo-heading">Add Todo</div>

                <div className="addTodo-form-field">
                    <label className="addTodo-form-label" htmlFor="title">Title</label>
                    <textarea ref={titleRef} className="addTodo-form-textarea" type="text" id="title" name="title" placeholder="Enter Title" value={title} required onChange={(e) => setTitle(e.target.value)}></textarea>
                    <span className="addTodo-form-error">{error.title}</span>
                </div>

                <div className="addTodo-form-field">
                    <label className="addTodo-form-label" htmlFor="body">Body</label>
                    <textarea ref={bodyRef} className="addTodo-form-textarea" type="text" id="body" name="body" placeholder="Enter Body" value={body} required onChange={(e) => setBody(e.target.value)}></textarea>
                    <span className="addTodo-form-error">{error.body}</span>
                </div>

                <button className="addTodo-form-submitButton"type="submit">Add Todo</button>
            </form>
        </div>
    )
}