import './App.css';
import { lazy, Suspense } from 'react';
import {Routes, Route} from 'react-router-dom';
import {Toaster} from "react-hot-toast";

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Loading from './components/loading/Loading';

const Login = lazy( () => import("./components/login/Login"));
const Register = lazy( () => import("./components/register/Register"));
const Home = lazy( () => import("./components/home/Home"));
const Dashboard = lazy( () => import("./components/dashboard/Dashboard"));
const AddTodo = lazy( () => import("./components/dashboard/addTodo/AddTodo"));
const UserTodos = lazy( () => import("./components/dashboard/users/UserTodos"));
const ForgotPassword = lazy( () => import("./components/forgotPassword/ForgotPassword"));
const ResetPassword = lazy( () => import("./components/resetPassword/ResetPassword"));


function App() {
  return (
    <div className="App">
      <Header/>
      
        <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/addtodo" element={<AddTodo/>}/>
          <Route path="/usertodos/:id" element={<UserTodos/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/resetpassword/:id/:token" element={<ResetPassword/>}/>
          <Route path="*" element={<Home/>}/>
        </Routes>
        </Suspense>

      <Toaster/>

      <Footer/>
    </div>
  );
}

export default App;
