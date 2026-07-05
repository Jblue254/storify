// src/components/Navbar.jsx
import React, { useContext } from 'react'; // 👈 Using standard useContext
import { CartContext } from '@/context/CartContext'; // 👈 Cleaned up alias path to use your main context
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, LogOut, User } from 'lucide-react'; 

export default function Navbar() {
  // 1. Consume the raw cart array directly from your context provider
  const { cart } = useContext(CartContext);
  const { user, logout } = useAuth();

  // 2. Safely compute total items quantity sum inline to drive your badge bubble
  const cartCount = cart ? cart.reduce((total, item) => total + (item.quantity || 1), 0) : 0;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center space-x-2 focus-visible:outline-none rounded-md">
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Storify
          </span>
        </Link>

        {/* Navigation Links Control Deck */}
        <div className="flex items-center space-x-4 sm:space-x-6 text-sm font-medium">
          <Link to="/" className="transition-colors hover:text-primary text-muted-foreground hover:text-foreground">
            Browse
          </Link>
          
          {/* Cart Icon Link Component */}
          <Link 
            to="/cart" 
            className="relative transition-colors text-muted-foreground hover:text-foreground flex items-center p-2 rounded-md focus-visible:outline-none"
          >
            <ShoppingCart size={18} className="mr-1" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground animate-in zoom-in-50">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Dynamic Authentication Context Split */}
          {user ? (
            <div className="flex items-center gap-3 border-l pl-4 border-muted">
              {/* Profile Greeting Tag */}
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs text-muted-foreground">Hello,</span>
                <span className="text-xs font-semibold max-w-[100px] truncate capitalize">{user.name || 'shopper'}</span>
              </div>

              {/* Compact Logout Button Trigger */}
              <Button 
                variant="ghost" 
                size="sm"
                onClick={logout} 
                className="h-8 gap-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <Button asChild size="sm" className="h-8">
              <Link to="/login">
                <User size={14} className="mr-1.5" />
                Sign In
              </Link>
            </Button>
          )}
        </div>

      </div>
    </nav>
  );
}