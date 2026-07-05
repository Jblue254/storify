// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Storify
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link to="/products" className="transition-colors hover:text-primary">
            Browse Products
          </Link>
          
          <Link to="/cart" className="relative transition-colors hover:text-primary flex items-center">
            Cart
            {cartCount > 0 && (
              <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in-50">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <button 
              onClick={logout} 
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="transition-colors hover:text-primary">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}