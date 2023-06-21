import React, {useState, useEffect, useContext} from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../index';
import toast from "react-hot-toast";

function Login()
{

  const {authUser,setAuthUser,isAuthenticated,setIsAuthenticated, loading, setLoading} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const navigate = useNavigate();

    //using Navigate component instead of useNavigate because will have to call it inside useEffect on component did mount and update without dependencies array

    useEffect(()=>{

      if(isAuthenticated)
      return navigate("/dashboard")

    })

    async function login(event)
    {
      setLoading(true);
      try {
        event.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/login`,{
        method: "POST",
        credentials: "include",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      const data = await response.json();

      setError({});

      // console.log(data)
      if(!data.success)
      throw data;

      setIsAuthenticated(true);
      setAuthUser(data.user);
      
      navigate("/dashboard");
      setLoading(false);
      toast.success(data.message);
      
      } catch (err) {

        setIsAuthenticated(false);
        setAuthUser({});
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
  
    return (
        <div className="login-container">
          <form className="login-form" onSubmit={(e) => {
            if(loading)
            return false;

            login(e);
          }}>

            <div className="login-heading">Log In</div>

            <div className="login-form-field">
              <label className="login-form-label" htmlFor="email">Email address</label>
              <input className="login-form-input" type="text" id="email" name="email" placeholder="Enter Email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
              <span className="login-form-error">{error.email}</span>
            </div>

            <div className="login-form-field">
              <label className="login-form-label" htmlFor="password">Password</label>
              <input className="login-form-input" type="password" id="password" name="password" placeholder="Enter Password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
              <span className="login-form-error">{error.password}</span>
            </div>

            <button className="login-form-submitButton"type="submit">LogIn</button>

            <div className='forgotPass-noAccount'>
                <div className='forgotPass'>
                Forgot Passowrd? <Link className="forgotPass-noAccount-link" to="/forgotpassword">Forgot Password</Link>
                </div>

                <div className='noAccount'>
                Do not have an accont? <Link className="forgotPass-noAccount-link" to="/register">SignUp</Link>
                </div>
            </div>
          </form>
        </div>
    )
}

export default Login;