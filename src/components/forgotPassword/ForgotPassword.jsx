import "./ForgotPassword.css";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import AuthContext from "../../index";
import { Navigate } from "react-router-dom";

export default function ForgotPassword()
{
    const {isAuthenticated, loading, setLoading} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [error, setError] = useState({});

    if(isAuthenticated)
    return <Navigate to="/dashboard"/>

    async function forgotPassword(e)
    {
      e.preventDefault();

      setLoading(true);

      try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/forgotpassword`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email
        })
      });
      const data = await response.json();

      // console.log(data);

      setError({});

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
         else
         toast.error(err.error);
      }
    }

    return(
        <div className="forgotPassword-container">
        <form className="forgotPassword-form" onSubmit={ (e) => {
            if(loading)
            {
              e.preventDefault();
              return;
            }

            forgotPassword(e)
          }}>

            <div className="forgotPassword-heading">Forgot Password</div>

            <div className="forgotPassword-form-field">
              <label className="forgotPassword-form-label" htmlFor="email">Email address</label>
              <input className="forgotPassword-form-input" type="text" id="email" name="email" placeholder="Enter Email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
              <span className="forgotPassword-form-error">{error.email}</span>
            </div>

            <button className="forgotPassword-form-submitButton"type="submit">Send Email</button>
          </form>
        </div>
    )
}