import React, {useState, useContext} from 'react';
import './Register.css';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import AuthContext from '../../index';
import toast from "react-hot-toast";


function Register()
{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState();
    const [error, setError] = useState({});

    const {setAuthUser, isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(AuthContext);

    const navigate = useNavigate();

    if(isAuthenticated)
    return <Navigate to="/dashboard"/>
  
    async function register(event)
    {
      event.preventDefault();
      
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("profileImage", profileImage);

      
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users`,{
        method: "POST",
        credentials: "include",
        body: formData
      })
      const data = await response.json();

      setError({})

      // console.log(data)
      
      if(!data.success)
      throw data;


      setIsAuthenticated(true);
      setAuthUser(data.user);

      navigate("/dashboard")
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
        else if(err.error === "Only png|jpg|jpeg file formats are allowed")
        setError({
          profileImage: "Only png|jpg|jpeg file formats are allowed"
        })

        else
        toast.error(err.error);
      }
    }
  
    return (
        <div className="register-container">
          <form className="register-form" encType="multipart/form-data" onSubmit={ (e) => {
            if(loading)
            {
              e.preventDefault();
              return;
            }

            register(e)
          }}>

            <div className="register-heading">Sign Up</div>

            <div className="register-form-field">
              <label className="register-form-label" htmlFor="name">Name</label>
              <input className="register-form-input" type="text" id="name" name="text" placeholder="Enter Name" value={name} required onChange={(e) => setName(e.target.value)}/>
              <span className="register-form-error">{error.name}</span>
            </div>

            <div className="register-form-field">
              <label className="register-form-label" htmlFor="email">Email address</label>
              <input className="register-form-input" type="text" id="email" name="email" placeholder="Enter Email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
              <span className="register-form-error">{error.email}</span>
            </div>

            <div className="register-form-field">
              <label className="register-form-label" htmlFor="password">Password</label>
              <input className="register-form-input" type="password" id="password" name="password" placeholder="Enter Password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
              <span className="register-form-error">{error.password}</span>
            </div>

            <div className="register-form-field">
              <label className="register-form-label" htmlFor="confirmPassword">Re-Enter Password</label>
              <input className="register-form-input" type="password" id="confirmPassword" name="confirmPassword" placeholder="Re-Enter Password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)}/>
              <span className="register-form-error">{error.confirmPassword}</span>
            </div>

            <div className="register-form-field">
            <label className="register-form-label image-label" htmlFor="profileImage">Profile Image</label>
            <input className="register-form-input" type="file" id="profileImage" name="profileImage" onChange={(e) => setProfileImage(e.target.files[0])}/>
            <span className="register-form-error">{error.profileImage}</span>
            
            </div>

            <button className="register-form-submitButton"type="submit">Sign Up</button>

            <div className='already-have-account'>
                Already have an account? <Link className="already-have-account-link" to="/login">LogIn</Link>
            </div>
          </form>
        </div>
    )
}

export default Register;