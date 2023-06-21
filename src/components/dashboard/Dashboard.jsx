import './Dashboard.css';
import { useContext, useEffect, useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import TodoListItem from './todoListItem/TodoListItem';
import ProfileInfo from './profileInfo/ProfileInfo';
import Users from './users/Users';
import AuthContext from '../../index';

const Dashboard = () =>{

    const {authUser, isAuthenticated} = useContext(AuthContext);
    const [todos, setTodos] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{

        (async function fetchTodos()
        {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/`,{
                    credentials: "include"
                });

                const data = await response.json();

                // console.log(data);

                if(!data.success)
                throw data;
                
                setTodos(data.data);

            } catch (error) {                
                // console.log(error);
            }

        })();

    },[])

    if(!isAuthenticated)
    return <Navigate to="/" />

    return(
        <div className="dashboard-container">

            <section className="dashboard-profile">
                <span className="dashboard-profile-name">Welcome {authUser.name}{authUser.role != null ? "(Admin)" : null}</span>

                <ProfileInfo profileImage = {authUser.profileImage}/>
            </section>

            {authUser.role != null ? 
            
            <Users/> : 
            
            <section className="dashboard-todos">
                <button className="dashboard-todos-addTodoButton" onClick={ () => navigate("/addtodo") }>ADD TODO</button>
                <h2 className="dashboard-todos-heading">My Todos</h2>
                <div className="dashboard-todos-list">
                    {todos.map( (todo, index) => {
                        return <TodoListItem key={todo.id} setTodos = {setTodos} serialNo={index+1} todoId = {todo.id} title={todo.title} body={todo.body} completed={todo.completed}/>
                    })}   
                </div>
            </section>
            }

            
        </div>
    )
}

export default Dashboard;