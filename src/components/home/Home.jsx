import "./Home.css";
import {Navigate} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../index";

// may add some more content in home container
export default function Home(){

    const {isAuthenticated} = useContext(AuthContext);
    
    if(isAuthenticated)
    return <Navigate to="/dashboard" />

    return(
        <div className="home-container">
            <section className="home-hero">
            Manage Your Todos
            </section>

            <section className="mental-peace-section">
                Achieve mental peace with <span className="highlighted">Manage Your Todos</span>
            </section>
        </div>
    )
}