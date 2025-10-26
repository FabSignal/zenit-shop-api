import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api.js";
import Spinner from "../components/Spinner.jsx";
import ProductCard from "../components/ProductCard.jsx";

/**
 * Home loads product list from API and renders a responsive grid.
 * Manages loading and error states with useState + useEffect.
 */
export default function Home({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts();
        if (!cancelled) setProducts(data);
      } catch (err) {
        if (!cancelled) setError(err.message || "Error desconocido");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <Spinner label="Cargando productos…" />;
  if (error) return <p style={{ color: "#ef4444" }}>Error: {error}</p>;

  return (
    <>
      <h1 style={{ marginTop: 0 }}>Productos destacados</h1>
      <p style={{ color: "#aab1c3", marginTop: 0 }}>
        Explora el universo desde tu hogar.
      </p>
      <section className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
        ))}
      </section>
    </>
  );
}
