import "./Home.css";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../index";
import heroImage from "../../assets/images/hero-image.jpg";
import mentalPeaceImage from "../../assets/images/mental-peace-image.jpg";

export default function Home() {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <div className="home-container">
      <section className="home-hero">
        <h2 className="hero-title">Manage Your Todos</h2>

        <img
          src={heroImage}
          className="hero-image"
          alt="hero section - getting things done"
        />
      </section>

      <section className="mental-peace-section">
        <h2 className="mental-peace-title">
          Achieve mental peace with
          <span className="mental-peace-title--highlighted">
            Manage Your Todos
          </span>
        </h2>

        <img
          src={mentalPeaceImage}
          className="mental-peace-image"
          alt="mental peace section - peace"
        />
      </section>
    </div>
  );
}
