/**
 * Cart page shows items, allows decreasing qty, removing items, and clearing the cart.
 * Totals are derived from items (no duplicated state).
 */
export default function Cart({ items, onDecrease, onRemove, onClear }) {
  const totalItems = items.reduce((acc, it) => acc + it.qty, 0);
  const totalPrice = items.reduce((acc, it) => acc + it.qty * it.price, 0);

  return (
    <>
      <h1 style={{ marginTop: 0 }}>Carrito</h1>

      {items.length === 0 ? (
        <p style={{ color: "#aab1c3" }}>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "grid",
              gap: "0.75rem",
            }}
          >
            {items.map((it) => (
              <li
                key={it.id}
                className="card"
                style={{
                  display: "grid",
                  gridTemplateColumns: "64px 1fr auto auto",
                  gap: "0.75rem",
                  alignItems: "center",
                }}
              >
                <img
                  src={it.image}
                  alt={it.title}
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: "contain",
                    borderRadius: 8,
                    background: "#0f172a",
                  }}
                />
                <div>
                  <strong>{it.title}</strong>
                  <div style={{ color: "#aab1c3" }}>
                    ${it.price.toFixed(2)} × {it.qty}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn"
                  onClick={() => onDecrease(it.id)}
                  title="Disminuir cantidad"
                >
                  −1
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onRemove(it.id)}
                  title="Quitar del carrito"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>

          <hr className="sep" />
          <p>
            <strong>Items:</strong> {totalItems}
          </p>
          <p>
            <strong>Total:</strong> ${totalPrice.toFixed(2)}
          </p>

          <button type="button" className="btn" onClick={onClear}>
            Vaciar carrito
          </button>
        </>
      )}
    </>
  );
}
