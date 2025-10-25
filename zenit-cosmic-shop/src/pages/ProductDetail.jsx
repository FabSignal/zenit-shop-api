import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../services/api.js";
import Spinner from "../components/Spinner.jsx";

/**
 * ProductDetail loads a single product by :id route param.
 * It displays structure and allows adding it to the cart.
 */
export default function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProduct(id);
        if (!cancelled) setProduct(data);
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
  }, [id]);

  if (loading) return <Spinner label="Cargando producto…" />;
  if (error) return <p style={{ color: "#ef4444" }}>Error: {error}</p>;
  if (!product) return <p>No se encontró el producto.</p>;

  const { title, image, description, price } = product;

  return (
    <article
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1.5rem",
        alignItems: "start",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: 360,
          objectFit: "contain",
          background: "#0f172a",
          borderRadius: 12,
        }}
      />
      <div>
        <h1 style={{ marginTop: 0 }}>{title}</h1>
        <p style={{ color: "#aab1c3" }}>{description}</p>
        <p className="price">${price.toFixed(2)}</p>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onAddToCart({ id: product.id, title, price, image })}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
}
