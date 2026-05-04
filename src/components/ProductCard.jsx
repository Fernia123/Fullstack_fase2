import { Link } from 'react-router-dom';

export default function ProductCard({ producto, onEleminar}) {
    return (
        <div className='card'>
            <h3>{producto.nombre}</h3>
            <p><strong>Categoria:</strong> {producto.categoria}</p>
            <p><strong>Precio:</strong> ${producto.precio}</p>
            <p><strong>Stcok:</strong> {producto.stock} uds</p>
            <div className='card-actions'>
                <Link to={`/editar${producto.id}`} className="btn-secondary"> Editar</Link>
                <button onClick={() => onEleminar(producto.id)} className='btn-danger'> eleminar</button>
            </div>
        </div>
    );
}