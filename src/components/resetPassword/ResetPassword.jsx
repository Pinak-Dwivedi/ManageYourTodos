import "./ResetPassword.css";
import {useState, useContext} from "react";
import toast from "react-hot-toast";
import {useParams, Navigate, useNavigate} from "react-router-dom";
import AuthContext from "../../index";


export default function ResetPassword()
{
    const {isAuthenticated, loading, setLoading} = useContext(AuthContext);
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const {id, token} = useParams();


    if(isAuthenticated)
    return <Navigate to="/dashboard"/>

    async function resetPassword(e)
    {
      e.preventDefault();

      setLoading(true);

      try {
          const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/resetpassword/${id}/${token}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              password,
              confirmPassword
            })
          });

          const data = await response.json();

          // console.log(data);

          setError({});

          if(!data.success)
          throw data;

          navigate("/");
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
        <div className="resetPassword-container">
          <form className="resetPassword-form" onSubmit={ (e) => {

              if(loading)
              {
                e.preventDefault();
                return;
              }

              resetPassword(e);
            }}>

            <div className="resetPassword-heading">Reset Password</div>

            <div className="resetPassword-form-field">
              <label className="resetPassword-form-label" htmlFor="password">Password</label>
              <input className="resetPassword-form-input" type="password" id="password" name="password" placeholder="Enter Password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
              <span className="resetPassword-form-error">{error.password}</span>
            </div>

            <div className="resetPassword-form-field">
              <label className="resetPassword-form-label" htmlFor="confirmPassword">Re-Enter Password</label>
              <input className="resetPassword-form-input" type="password" id="confirmPassword" name="confirmPassword" placeholder="Re-Enter Password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)}/>
              <span className="resetPassword-form-error">{error.confirmPassword}</span>
            </div>

            <button className="resetPassword-form-submitButton"type="submit">Sign Up</button>
          </form>
        </div>
    )
}