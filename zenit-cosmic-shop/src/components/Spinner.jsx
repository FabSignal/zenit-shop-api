/**
 * Minimal spinner for loading states.
 */
export default function Spinner({ label = "Cargando…" }) {
  return (
    <div role="status" aria-live="polite" style={{ color: "#aab1c3" }}>
      {label}
    </div>
  );
}
