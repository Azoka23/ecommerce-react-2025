import { Link } from 'react-router-dom';
import './Nav.css';
export const Nav = () => {
    return (
        <nav>
            <ul>
                
                <li>
                    <Link to="/Categorias">Categorias</Link>
                </li>
                <li>
                    <Link to="/Contacto">Contactanos</Link>
                </li>
            </ul>
        </nav>

    );
};