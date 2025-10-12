import './Item.css';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext'; 


export const Item=({ id, name, type, price, stock, image, children }) => {
const { addToCart } = useCartContext(); 
    const isOutOfStock = stock === 0;
    //funcion para el carrito
    const handleAddToCart = () => {
        // Creamos el objeto con los datos necesarios (incluimos image para el carrito)
        const productToAdd = { id, name, price, image, stock }; 
        addToCart(productToAdd);
    };
    
    return(
 <article className="product-card"> 
     
        <h2>{name} </h2>
            <p className="item-type">Tipo: {type}</p>
            <p className="item-price">Precio: **${price}**</p>
            
            <p className="item-stock" style={{ color: isOutOfStock ? 'red' : 'green' }}>
                Stock: {isOutOfStock ? 'Agotado' : stock}
            </p>
            
        <Link to={`/detail/${id}`}> 
        
        <button className="add-button" >
                Ver Detalle
            
            </button>
            </Link>

             <button 
                className="add-button" 
                disabled={isOutOfStock}
            onClick={handleAddToCart}
            >

                {isOutOfStock ? 'SIN STOCK' : 'Enviar al Carrito'}
            </button>
        </article>
    );
};