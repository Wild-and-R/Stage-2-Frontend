import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/button'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import { AuthProvider } from './context/AuthProvider'
import Login from './pages/Login'
import { useAuth } from './hooks/useAuth'
import PrivateRoute from './lib/PrivateRoute'
import ThemeToggle from './components/ui/ThemeToggle'
import { CartProvider } from './context/CartProvider'
import { useCart } from './context/CartContext'
import Cart from './pages/Cart'

function Header() {
  const { token, Logout } = useAuth();
  const { cart } = useCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="w-full flex justify-center gap-4 my-4 border-b pb-4">
      <Button asChild variant="outline">
        <Link to="/">Home</Link>
      </Button>

      <Button asChild variant="outline">
        <Link to="/about">About</Link>
      </Button>

      {token && (
        <Button asChild variant="outline">
          <Link to="/products">Products</Link>
        </Button>
      )}

      {token && (
  <Button asChild variant="outline">
    <Link to="/cart">Cart ({totalItems})</Link>
  </Button>
)}

      {token ? (
        <Button onClick={Logout} variant="destructive">
          Logout
        </Button>
      ) : ( 
        <Button asChild variant="outline">
          <Link to="/login">Login</Link>
        </Button>
      )}

      <ThemeToggle />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
           <Route
              path="/products"
              element={
                <PrivateRoute>
                  <Products />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;