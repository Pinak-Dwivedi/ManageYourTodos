import {Link} from 'react-router-dom';
import './Footer.css'
import {FaFacebook, FaTwitter, FaYoutube} from 'react-icons/fa';
import logo from "../../assets/images/manage-your-todos.png";

export default function Footer()
{
    return(
        <footer className="footer">
            <div className="footer-brand">
            <img className="footer-logo" src={logo} alt="logo" />
            Manage Your Todos
            </div>

            <div className="footer-socialmedia">
                <ul className="footer-socialmedia-list">
                    <li className="footer-socialmedia-list-item">
                        <Link className="footer-socialmedia-list-item-link" to="https://www.facebook.com">Facebook <FaFacebook className="footer-socialmedia-list-link-icon"/></Link>
                    </li>
                    <li className="footer-socialmedia-list-item">
                        <Link className="footer-socialmedia-list-item-link" to="https://www.twitter.com">Twitter <FaTwitter className="footer-socialmedia-list-link-icon"/></Link>
                    </li>
                    <li className="footer-socialmedia-list-item">
                        <Link className="footer-socialmedia-list-item-link" to="https://www.youtube.com">Youtube <FaYoutube className="footer-socialmedia-list-link-icon"/></Link>
                    </li>
                </ul>
            </div>
            
        </footer>
    )
}