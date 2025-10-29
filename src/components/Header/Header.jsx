import { Nav } from "../Nav/Nav";
import { Link } from 'react-router-dom';
import './Header.css'; 
export const Header = () => {
    return (
        <header>
            <div className="logo-container">
                <Link to="/">
                <img 
                    src="/images/logoCafe.png" 
                    className="logo-img" 
                />
                </Link> 
            </div>
            <Nav/>
        </header>


    );
};