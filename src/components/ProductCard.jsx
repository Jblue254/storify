// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; 

function ProductCard({ id, name, price, category, description, image }) {
  // Pull the global dispatch function cleanly from your hook
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    // 1. Prevent the event from bubbling up and triggering the parent <Link> navigation
    e.preventDefault();
    e.stopPropagation();
    
    // 2. Add the item package to the global cart state exactly once
    addToCart({ id, title: name, price, image, category });
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      {/* Product Interactive Context Link wrapping internal elements */}
      <Link to={`/product/${id}`} className="flex flex-col h-full">
        
        {/* Aspect Ratio Controlled Image Wrapper */}
        <div className="relative flex aspect-square items-center justify-center bg-white p-6 overflow-hidden border-b">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle Branded Category Badge Overlay */}
          <span className="absolute top-3 left-3 rounded-full bg-secondary/80 backdrop-blur px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-secondary-foreground">
            {category}
          </span>
        </div>

        {/* Informational Text Payload Layout */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-semibold text-base leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
            {name}
          </h3>
          
          <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">
            {description}
          </p>

          <div className="mt-auto flex items-center justify-between pt-2">
            {/* Formatted Pricing Presentation */}
            <span className="text-lg font-bold tracking-tight text-foreground">
              ${price.toFixed(2)}
            </span>

            {/* Interactive Functional CTA Button Trigger */}
            <button
              onClick={handleAddToCart}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 text-xs font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Add to Cart
            </button>
          </div>
        </div>

      </Link>
    </div>
  );
}

export default ProductCard;