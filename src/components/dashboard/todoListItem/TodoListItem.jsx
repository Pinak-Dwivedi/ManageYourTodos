import "./TodoListItem.css";
import {useState, useEffect, useRef, useContext} from 'react';
import {BsFillPencilFill} from "react-icons/bs"
import toast from "react-hot-toast";
import ConfirmBox from "../../confirmBox/ConfirmBox";
import AuthContext from "../../../index";

export default function TodoListItem({setTodos, serialNo, todoId, title, body, completed})
{
    const {loading, setLoading} = useContext(AuthContext);

    const [todoTitle, setTodoTitle] = useState(title);
    const [todoBody, setTodoBody] = useState(body);
    const [todoCompleted, setTodoCompleted] = useState(completed === 1 ? true : false);
    const [error, setError] = useState({});
    const titleRef = useRef();
    const bodyRef = useRef();

    const confirmBoxRef = useRef();

    useEffect(()=>{
        
        titleRef.current.style.height = "1px";
        titleRef.current.style.height = (1+titleRef.current.scrollHeight)+"px";

        bodyRef.current.style.height = "1px";
        bodyRef.current.style.height = (5+bodyRef.current.scrollHeight)+"px";

    },[todoTitle, todoBody])

    async function updateTodo()
    {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${todoId}`,{
                method:"PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body:JSON.stringify({
                    title: todoTitle,
                    body: todoBody,
                    completed: todoCompleted
                })
            })
    
            const data = await response.json();
            setError({});

            // console.log(data);
            
            if(!data.success)
            throw data;

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
        }
    }

    async function deleteTodo()
    {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${todoId}`,{
                method:"DELETE",
                credentials: "include",
            })
    
            const data = await response.json();

            // console.log(data);

            if(!data.success)
            throw data;

            setTodos(preTodos => {
                return preTodos.filter( todo => {
                    return todo.id !== data.data.todoId
                })
            })
            
            setLoading(false);
            toast.success(data.message);

        } catch (err) {

            setLoading(false);
            // console.log(err)
            toast.error(err.message);
        }
    }

    return(
    <>
        <ConfirmBox confirmBoxRef = {confirmBoxRef} deleteFunction = {deleteTodo}/>

        <div className="todos-list-item">
            <div className="todos-list-item-todoSerialNo">{serialNo}

            <div className="checkBox-container">
                <input className="checkBox-input" type="checkbox" checked = {todoCompleted} onChange={(e) => setTodoCompleted(e.target.checked)}/>
                <label className="checkBox-label"></label>
            </div>
            
            </div>

            <div className="todos-list-item-todoTitle">

                <div className="todoContent-wrapper">
                    <BsFillPencilFill/>
                    <textarea ref={titleRef} className="todoTitle-content" type="text" value={todoTitle} onChange={ (e) => setTodoTitle(e.target.value) }></textarea>
                </div>
                <span className="updateTodo-error">{error.title}</span>

            </div>

            <div className="todos-list-item-todoBody">

                <div className="todoContent-wrapper">
                    <BsFillPencilFill/>
                    <textarea ref={bodyRef} className="todoBody-content" type="text" value={todoBody} onChange={ (e) => setTodoBody(e.target.value) }></textarea>
                </div>
                <span className="updateTodo-error">{error.body}</span>

            </div>
            
            <div className="todos-list-item-todoButtons">
                <button className="todos-list-item-updateTodoButton" onClick={ () => {
                    if(loading)
                    return false;

                    updateTodo();

                }}>Update</button>
                <button className="todos-list-item-deleteTodoButton" onClick={ () => confirmBoxRef.current.classList.add("active") }>Delete</button>
            </div>
        </div>  
    </>
    )
}