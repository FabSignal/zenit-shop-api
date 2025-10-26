/**
 * Minimal checkout page (protected).
 * Shows a simple summary of current cart total.
 */
export default function Checkout({ items }) {
  const total = items.reduce((acc, it) => acc + it.qty * it.price, 0);

  return (
    <>
      <h1 style={{ marginTop: 0 }}>Checkout</h1>
      <p>Resumen: {items.length} productos</p>
      <p>
        Total a pagar: <strong>${total.toFixed(2)}</strong>
      </p>
      <button type="button" className="btn" title="Confirm purchase">
        Confirmar pedido
      </button>
    </>
  );
}
