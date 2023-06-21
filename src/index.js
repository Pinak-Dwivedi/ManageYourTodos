import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Navigate} from 'react-router-dom';
import App from './App';

const AuthContext = React.createContext();
export default AuthContext;

function AuthWrapper()
{
  const [authUser, setAuthUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  
  console.log(process.env.REACT_APP_SERVER_URL);
  const value = {
    authUser,
    setAuthUser,
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading
  }

  useEffect( () => {

    (async () =>{
      try {
        const response = await fetch(`https://manage-your-todos-backend.onrender.com/users/checkIfAuthenticated`,{
        credentials: "include"
        })

        const data = await response.json();

        // console.log(data);

        if(!data.success)
        throw data;

        if(data.success)
        {
          setIsAuthenticated(true)
          setAuthUser(data.user);
        }

        <Navigate to="/dashboard"/>
        
      } catch (error) {
        setIsAuthenticated(false)
        setAuthUser({});

        // console.log(error); 
        
        <Navigate to="/"/>
      }
    })();

  }, [])

  return(
    <React.StrictMode>  
      <AuthContext.Provider value={value}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </AuthContext.Provider>
    </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthWrapper/>
);
