// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, ArrowLeft, ShoppingCart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedMessage, setAddedMessage] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/products/products.json")
      .then((resp) => {
        if (!resp.ok) throw new Error("Could not access catalog matrix database data.");
        return resp.json();
      })
      .then((data) => {
        // Enforce shared matching data type alignment checks
        const foundProduct = data.find((p) => String(p.id) === String(productId));
        if (!foundProduct) throw new Error("Requested merchandise record does not exist.");
        
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category
    });

    // Flash a temporary visual confirmation banner
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground font-medium">Fetching specifications...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto max-w-md px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-destructive mb-2">Item Not Found</h2>
        <p className="text-muted-foreground mb-6">{error || "This specific product is unavailable."}</p>
        <Button asChild variant="outline">
          <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Return to Catalog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      {/* Return Navigation Anchor Link */}
      <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to store grid
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 mb-12">
        {/* Left Side Gallery Frame Screen Wrapper */}
        <div className="lg:col-span-6 flex items-center justify-center bg-white p-8 border rounded-2xl aspect-square max-h-[500px]">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-full max-w-full object-contain object-center transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Right Side Primary Transaction Summary Board Area */}
        <div className="lg:col-span-6 flex flex-col justify-between py-2">
          <div>
            <span className="text-xs font-bold tracking-wider uppercase bg-secondary px-3 py-1 rounded-full text-secondary-foreground">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mt-4 mb-2 leading-tight">
              {product.title}
            </h1>
            
            <p className="text-2xl font-extrabold text-foreground tracking-tight my-4">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
              {product.description}
            </p>
          </div>

          <div className="space-y-4">
            {/* Added confirmation banner alert */}
            {addedMessage && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-4 py-2 rounded-lg animate-in fade-in slide-in-from-bottom-2">
                ✓ Added successfully! Your checkout cart has been updated.
              </div>
            )}

            <Button onClick={handleAddToCart} size="lg" className="w-full font-medium text-base h-12 shadow-md">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Shopping Cart
            </Button>

            {/* Reassurance value propositions footer layout row */}
            <div className="grid grid-cols-3 gap-2 border-t pt-4 text-[11px] font-medium text-muted-foreground mt-4 text-center">
              <div className="flex flex-col items-center gap-1">
                <Truck size={16} className="text-primary" />
                <span>Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw size={16} className="text-primary" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={16} className="text-primary" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Segmented Auxiliary Information Subsystem (Project Tabs Requirement) */}
      <Tabs defaultValue="overview" className="w-full border rounded-xl p-6 bg-card">
        <TabsList className="grid w-full grid-cols-3 max-w-[400px] mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 text-sm leading-relaxed text-muted-foreground mt-2">
          <h3 className="text-base font-bold text-foreground">Product Description Summary</h3>
          <p>{product.description}</p>
          <p>Designed with premium composite hardware components to guarantee multi-environment lifetime durability metrics.</p>
        </TabsContent>
        
        <TabsContent value="specs" className="mt-2">
          <h3 className="text-base font-bold text-foreground mb-4">Technical Parameter Matrix</h3>
          <div className="border rounded-lg overflow-hidden text-sm">
            <div className="grid grid-cols-2 border-b p-3 bg-muted/40">
              <span className="font-semibold text-muted-foreground">SKU Identification Code</span>
              <span className="font-medium text-foreground">STFY-{product.id || "00"}{product.category?.slice(0,2).toUpperCase()}</span>
            </div>
            <div className="grid grid-cols-2 border-b p-3">
              <span className="font-semibold text-muted-foreground">Department Classification</span>
              <span className="font-medium text-foreground capitalize">{product.category}</span>
            </div>
            <div className="grid grid-cols-2 p-3 bg-muted/40">
              <span className="font-semibold text-muted-foreground">Inventory Condition</span>
              <span className="font-medium text-emerald-600 font-semibold">In Stock — Dispatches Next Business Day</span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="space-y-4 mt-2 text-sm text-muted-foreground">
          <h3 className="text-base font-bold text-foreground">Customer Sentiment Reviews</h3>
          <div className="border border-dashed p-6 text-center rounded-lg">
            <p className="font-medium mb-1">★★★★★ 4.8 out of 5 stars average rating index</p>
            <p className="text-xs text-muted-foreground">Based on certified customer tracking survey responses. Verified purchases only.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};