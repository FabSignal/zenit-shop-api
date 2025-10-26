import { Link } from "react-router-dom";

/**
 * Displays a product card with image, title, price and actions.
 * - "Ver detalle" navigates to /product/:id
 * - "Agregar al carrito" triggers parent callback
 */
export default function ProductCard({ product, onAddToCart }) {
  const { id, title, price, image } = product;

  return (
    <article className="card">
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: 180,
          objectFit: "contain",
          borderRadius: 8,
          background: "#0f172a",
        }}
      />
      <h3 style={{ margin: 0, fontSize: "1rem" }}>{title}</h3>
      <p className="price">${price.toFixed(2)}</p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Link
          to={`/product/${id}`}
          className="btn"
          style={{ textDecoration: "none" }}
        >
          Ver detalle
        </Link>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onAddToCart({ id, title, price, image })}
        >
          Agregar
        </button>
      </div>
    </article>
  );
}
