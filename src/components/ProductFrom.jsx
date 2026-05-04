import { useFormik } from 'formik';      // ✅ Hook correcto
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const esquemaValidacion = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio').min(3, 'Mínimo 3 caracteres'),
  categoria: Yup.string().required('Selecciona una categoría'),
  precio: Yup.number().required('El precio es obligatorio').positive('Debe ser positivo').typeError('Ingresa un número válido'),
  stock: Yup.number().required('El stock es obligatorio').integer('Debe ser entero').min(0, 'No puede ser negativo')
});

export default function ProductFrom ({ datosIniciales, onSave}) {
    const navigate = useNavigate();
    console.log('🔍 ProductForm props:', { datosIniciales, onSave });
    console.log('🔍 typeof onSave:', typeof onSave); 

    const formik = useFormik({
          initialValues: datosIniciales || {nombre:'', categoria:'', precio:'', stock: ''},
          validateYupSchema: esquemaValidacion,
          onSubmit: (valores) => {
              if (typeof onSave !== 'function') {
                console.error('❌ onSave NO es una función. Recibido:', onSave);
                alert('Error interno: No se puede guardar el producto');
                return; // Detiene la ejecución para evitar el crash
              }
            console.log('✅ Datos válidos, guardando:', valores);
            onSave(valores);
            navigate('/');
        }
    });


    return (
    <form onSubmit={formik.handleSubmit} className="form-container">
      <label>Nombre:
        <input name="nombre" value={formik.values.nombre} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.touched.nombre && formik.errors.nombre && <span className="error">{formik.errors.nombre}</span>}
      </label>

      <label>Categoría:
        <select name="categoria" value={formik.values.categoria} onChange={formik.handleChange} onBlur={formik.handleBlur}>
          <option value="">Seleccionar...</option>
          <option value="Laptop">Laptop</option>
          <option value="Periférico">Periférico</option>
          <option value="Monitor">Monitor</option>
        </select>
        {formik.touched.categoria && formik.errors.categoria && <span className="error">{formik.errors.categoria}</span>}
      </label>

      <label>Precio:
        <input type="number" name="precio" value={formik.values.precio} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.touched.precio && formik.errors.precio && <span className="error">{formik.errors.precio}</span>}
      </label>

      <label>Stock:
        <input type="number" name="stock" value={formik.values.stock} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.touched.stock && formik.errors.stock && <span className="error">{formik.errors.stock}</span>}
      </label>

      <button 
        type="submit" 
        className="btn-primary"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? 'Guardando...' : '💾 Guardar'}
      </button>
    </form>
  );
}