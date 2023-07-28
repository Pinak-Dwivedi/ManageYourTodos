import "./Users.css";
import { useParams, useLocation, Navigate, useNavigate } from "react-router-dom"
import {useState, useEffect, useContext} from "react";
import TodoListItem from "../todoListItem/TodoListItem";
import AuthContext from "../../../index";

export default function UserTodos()
{
    const {authUser, isAuthenticated} = useContext(AuthContext);

    const {id} = useParams();
    const [userTodos, setUserTodos] = useState([]);
    const location = useLocation();

    const navigate = useNavigate();

    useEffect(()=>{

        (async function fetchTodos()
        {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos?id=${id}`,{
                    credentials: "include"
                });

                const data = await response.json();

                // console.log(data);

                if(!data.success)
                throw data;
                
                setUserTodos(data.data);

            } catch (error) {                
                // console.log(error);
            }

        })();

    },[id])
    
    if(authUser.role == null || !isAuthenticated)
    return <Navigate to="/"/>

    return(
        <div className="userTodos-container">
            <div className="userTodos-heading">{location.state != null ? location.state.userName+"'s" : null} Todos</div>
            <button className="userTodos-addTodoButton" onClick={ () => navigate("/addtodo", {state: {userId : id}}) }>ADD TODO</button>

            <div className="userTodos-list">
                {userTodos.map( (userTodo, index) => {
                    return(
                    <TodoListItem key={userTodo.id} setTodos = {setUserTodos} serialNo={index+1} todoId = {userTodo.id} title={userTodo.title} body={userTodo.body} completed={userTodo.completed}/>
                    )
                })}   
            </div>  
        </div>
    )
}