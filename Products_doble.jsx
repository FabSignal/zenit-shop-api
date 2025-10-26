import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
//import { useCart } from "../context/useCart";
// Productos desde el json / import { products, categories } from "../data/products";

// _______ Estados ___________
function Products() {
  // Estado para productos obtenidos desde la API
  const [products, setProducts] = useState([]);

  // Estado para categorías (desde fakestoreapi)
  const [categories, setCategories] = useState(["all"]);

  // Estado de filtro (por defecto : all)
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Estados de carga y error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // _________Cargar categorías (fakestoreapi devuelve un array de strings)_______
  useEffect(() => {
    let isActive = true;

    const loadCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        if (!res.ok) throw new Error("No se pudieron obtener las categorías");
        const data = await res.json();
        if (!Array.isArray(data))
          throw new Error("Formato de categorías inválido");
        // Insertamos 'all' al inicio para tu botón "Todas"
        if (isActive) setCategories(["all", ...data]);
      } catch (e) {
        // En caso de error con categorías, mantenemos al menos 'all'
        console.error(e);
      }
    };

    loadCategories();
    return () => {
      isActive = false;
    };
  }, []);

  // ___________ Cargar productos cada vez que cambia la categoría seleccionada _______________
  useEffect(() => {
    let isActive = true;

    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      // URL según el filtro
      const url =
        selectedCategory && selectedCategory !== "all"
          ? `https://fakestoreapi.com/products/category/${encodeURIComponent(
              selectedCategory
            )}`
          : "https://fakestoreapi.com/products";

      try {
        const res = await fetch(url);
        if (!res.ok)
          throw new Error("No se pudo obtener la lista de productos");
        const data = await res.json();
        const array = Array.isArray(data) ? data : [];

        // Se mapean las variables para crear endpoints en entrega final
        const normalized = array.map((p) => ({
          ...p,
          name: typeof p.title === "string" ? p.title : "",
          stock: 10,
          featured: false,
        }));

        if (isActive) setProducts(normalized);
      } catch (e) {
        if (isActive) setError(e.message || "Error al cargar productos");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadProducts();
    return () => {
      isActive = false;
    };
  }, [selectedCategory]);

  if (loading) {
    return <div className="container py-5 text-white-50">Cargando…</div>;
  }

  if (error) {
    return (
      <div className="container py-5" style={{ color: "crimson" }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: "var(--gradient-space)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-white mb-3">
            🛍️ Todos los Productos
          </h1>
          <p className="lead text-white-50">
            Explora nuestro catálogo completo de productos astronómicos
          </p>
        </div>

        {/* Filtros por categoría (strings desde API) */}
        <div className="mb-5">
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`btn px-4 py-2 fw-semibold ${
                  selectedCategory === cat ? "btn-primary" : "btn-outline-light"
                }`}
                onClick={() => setSelectedCategory(cat)}
                style={{ borderRadius: "25px", transition: "all 0.3s ease" }}
              >
                {/* Si antes mostrabas íconos, aquí solo se tiene el nombre plano */}
                {cat === "all" ? "🌌 Todas las categorías" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Contador de productos */}
        <div className="mb-4">
          <p className="text-white-50 text-center">
            Mostrando {products.length}{" "}
            {products.length === 1 ? "producto" : "productos"}
            {selectedCategory !== "all" && (
              <span className="text-white ms-2">en {selectedCategory}</span>
            )}
          </p>
        </div>

        {/* Grid de productos */}
        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-lg-3">
              {/* Entregamos a ProductCard el objeto ya normalizado */}
              <ProductCard product={product} />
              {/* Si quieres linkear al detalle, descomenta la línea siguiente y asegúrate de tener la ruta /productos/:id */}
              {/* <div className="mt-2">
                <Link to={`/productos/${product.id}`} className="btn btn-outline-light btn-sm">
                  Ver detalle
                </Link>
              </div> */}
            </div>
          ))}
        </div>

        {/* Mensaje si no hay productos */}
        {products.length === 0 && (
          <div className="text-center py-5">
            <div className="mb-3" style={{ fontSize: "4rem" }}>
              🔍
            </div>
            <h3 className="text-white mb-2">
              No hay productos en esta categoría
            </h3>
            <p className="text-white-50">Prueba seleccionando otra categoría</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;

// ________________________________________ Con JSON __________________________________________
// import ProductCard from "../components/ProductCard";
// import { products, categories } from "../data/products";
//
// function Products() {
//   // Estado para filtro de categoría
//   const [selectedCategory, setSelectedCategory] = useState("all");
//
//   // Filtrar productos según categoría seleccionada
//   const filteredProducts =
//     selectedCategory === "all"
//       ? products
//       : products.filter((product) => product.category === selectedCategory);
//
//   return (
//     <div
//       className="min-vh-100 py-5"
//       style={{ background: "var(--gradient-space)" }}
//     >
//       <div className="container">
//         {/* Header */}
//         <div className="text-center mb-5">
//           <h1 className="display-4 fw-bold text-white mb-3">
//             🛍️ Todos los Productos
//           </h1>
//           <p className="lead text-white-50">
//             Explora nuestro catálogo completo de productos astronómicos
//           </p>
//         </div>
//
//         {/* Filtros por categoría */}
//         <div className="mb-5">
//           <div className="d-flex flex-wrap justify-content-center gap-3">
//             {/* Botón "Todas" */}
//             <button
//               className={`btn px-4 py-2 fw-semibold ${
//                 selectedCategory === "all" ? "btn-primary" : "btn-outline-light"
//               }`}
//               onClick={() => setSelectedCategory("all")}
//               style={{
//                 borderRadius: "25px",
//                 transition: "all 0.3s ease",
//               }}
//             >
//               🌌 Todas las categorías
//             </button>
//
//             {/* Botones por categoría */}
//             {categories.map((category) => (
//               <button
//                 key={category.id}
//                 className={`btn px-4 py-2 fw-semibold ${
//                   selectedCategory === category.id
//                     ? "btn-primary"
//                     : "btn-outline-light"
//                 }`}
//                 onClick={() => setSelectedCategory(category.id)}
//                 style={{
//                   borderRadius: "25px",
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 {category.icon} {category.name}
//               </button>
//             ))}
//           </div>
//         </div>
//
//         {/* Contador de productos */}
//         <div className="mb-4">
//           <p className="text-white-50 text-center">
//             Mostrando {filteredProducts.length}{" "}
//             {filteredProducts.length === 1 ? "producto" : "productos"}
//             {selectedCategory !== "all" && (
//               <span className="text-white ms-2">
//                 en {categories.find((c) => c.id === selectedCategory)?.name}
//               </span>
//             )}
//           </p>
//         </div>
//
//         {/* Grid de productos */}
//         <div className="row g-4">
//           {filteredProducts.map((product) => (
//             <div key={product.id} className="col-12 col-sm-6 col-lg-3">
//               <ProductCard product={product} />
//             </div>
//           ))}
//         </div>
//
//         {/* Mensaje si no hay productos */}
//         {filteredProducts.length === 0 && (
//           <div className="text-center py-5">
//             <div className="mb-3" style={{ fontSize: "4rem" }}>
//               🔍
//             </div>
//             <h3 className="text-white mb-2">
//               No hay productos en esta categoría
//             </h3>
//             <p className="text-white-50">Prueba seleccionando otra categoría</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
//
// export default Products;"""
