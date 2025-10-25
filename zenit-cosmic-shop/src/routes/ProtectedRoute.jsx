/**
 * Protects children based on an isAuthenticated boolean.
 * If not authenticated, renders a simple access message.
 * (Alternative: redirect to /login using <Navigate/>)
 */
export default function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return (
      <div>
        <h2>Acceso restringido</h2>
        <p>Debes iniciar sesión para continuar.</p>
      </div>
    );
  }
  return children;
}
