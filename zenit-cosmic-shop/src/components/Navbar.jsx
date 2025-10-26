import { NavLink } from "react-router-dom";

/**
 * Navbar with navigation and simple auth toggle.
 * Shows the cart item count as a badge.
 */
export default function Navbar({ cartCount, isAuthenticated, onToggleAuth }) {
  const linkStyle = ({ isActive }) => ({
    padding: "0.5rem 0.75rem",
    borderRadius: 10,
    textDecoration: "none",
    color: "#e6e8ee",
    background: isActive ? "#0f1a33" : "transparent",
    border: isActive ? "1px solid #1d2433" : "1px solid transparent",
    fontWeight: 600,
  });

  return (
    <header>
      <nav
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0.75rem 1rem",
          display: "flex",
          gap: "0.75rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span className="badge" aria-label="brand">
            Zenit — Cosmic Shop
          </span>
          <NavLink to="/" style={linkStyle}>
            Inicio
          </NavLink>
          <NavLink to="/cart" style={linkStyle}>
            Carrito {cartCount > 0 ? `(${cartCount})` : ""}
          </NavLink>
          <NavLink to="/checkout" style={linkStyle}>
            Checkout
          </NavLink>
        </div>

        <button
          type="button"
          className="btn"
          aria-pressed={isAuthenticated}
          onClick={onToggleAuth}
          title={isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
        >
          {isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
        </button>
      </nav>
    </header>
  );
}
