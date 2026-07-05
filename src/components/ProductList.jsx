// src/components/ProductList.jsx
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Controlled Input State for Search (Project Requirement)
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/products/products.json")
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`Server error: ${resp.status} ${resp.statusText}`);
        }
        return resp.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Unable to load products. The local catalog server encountered an issue.");
        setLoading(false);
      });
  }, []);

  // Filter products inline based on the controlled input state
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <h2 className="text-xl font-medium text-muted-foreground animate-pulse">
          Loading products...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto my-12 max-w-md rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
        <h2 className="text-2xl font-bold text-destructive mb-2">Oops!</h2>
        <p className="text-sm text-muted-foreground mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="inline-flex h-9 items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground shadow hover:bg-destructive/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header Banner Area */}
      <div className="mb-8 flex flex-col items-center justify-between gap-4 border-b pb-6 sm:flex-row">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Product List</h2>
          <p className="text-sm text-muted-foreground">Welcome to Storify catalog.</p>
        </div>

        {/* Controlled Search Box Element */}
        <div className="w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
      </div>

      {/* Responsive Grid Setup mapping to individual items */}
      {filteredProducts.length === 0 ? (
        <p className="text-center py-12 text-muted-foreground">
          No items match your search for "{searchTerm}".
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.title} // Matches your prop configuration
              price={product.price}
              category={product.category}
              description={product.description}
              image={product.image}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;