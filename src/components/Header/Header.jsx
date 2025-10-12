import { Nav } from "../Nav/Nav";
import './Header.css'; 
export const Header = () => {
    return (
        <header>
            <div className="logo-container"> 
                <img 
                    src="/images/logoCafe.png" 
            
                    className="logo-img" 
                />
            </div>
            <Nav/>
        </header>


    );
};