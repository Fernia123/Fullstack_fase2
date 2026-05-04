import { useParams } from "react-router-dom";
import ProductFrom from '../components/ProductFrom';

export default function ProductPage({ productos = [], onSave, modo}) {
    const { id } = useParams();

    const productosEditar = modo === 'editar'
    ? productos.find(p =>p.id === id)
    : null;
    
    return (
        <section>
            <h2>{modo === 'crear' ? 'Registrar Prodcutos' : 'editar Prodcutos'}</h2>
            <ProductFrom datosIniciales={productosEditar} onSave={onSave}/>
        </section>
    );
}