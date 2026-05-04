import { useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Home({ productos, onEliminar, onBuscar }) {
  const [busqueda, setBusqueda] = useState('');

  const handleBuscar = (e) => {
    e.preventDefault();
    onBuscar({ q: busqueda });
  };

  return (
    <section>
      <h2> Listado de Productos</h2>
      <form onSubmit={handleBuscar} className="search-bar">
        <input 
          value={busqueda} 
          onChange={e => setBusqueda(e.target.value)} 
          placeholder="Buscar por nombre..." 
        />
        <button type="submit">🔍</button>
      </form>
      {/* ... resto del listado ... */}
    </section>
  );
}