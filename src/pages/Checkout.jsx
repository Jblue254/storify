import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CreditCard, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Checkout = () => {
  const { cart, cartSubtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Controlled form values platform
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Dynamically wipe out error flags once a user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  // Validations schema mapping
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.address.trim()) newErrors.address = 'Shipping address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim() || formData.zipCode.length < 5) newErrors.zipCode = 'Valid ZIP code is required';
    if (!formData.cardNumber.trim() || formData.cardNumber.length < 16) newErrors.cardNumber = 'Valid 16-digit card number is required';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulated gateway submission transaction delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsCompleted(true);
      clearCart(); // Safely reset basket on transactional success
    } catch (err) {
      console.error('Payment gateway failure:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Order Success Layout Shield
  if (isCompleted) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center p-4 text-center">
        <div className="rounded-full bg-emerald-50 p-4 text-emerald-600 mb-4 animate-bounce">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Order Placed Successfully!</h2>
        <p className="text-muted-foreground mt-2 max-w-sm mb-6">
          Thank you for shopping with Storify. Your delivery receipt is on its way to your inbox.
        </p>
        <Button asChild>
          <Link to="/">Back to Storefront</Link>
        </Button>
      </div>
    );
  }

  // Fallback state if cart gets accessed blankly
  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
        <h2 className="text-xl font-bold">No active items found</h2>
        <p className="text-muted-foreground mt-1 mb-4">Please populate items into your cart to complete verification steps.</p>
        <Button asChild variant="outline">
          <Link to="/">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-12 lg:py-12">
      {/* Shipping details input fields form wrapper */}
      <div className="lg:col-span-7">
        <Card className="shadow-md border-muted">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Shipping & Billing Information</CardTitle>
            <CardDescription>Fill out all standard fields to finalize dispatch instructions.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-4">
              
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} disabled={isSubmitting} placeholder="Jane Doe" />
                {errors.fullName && <span className="text-xs font-medium text-destructive">{errors.fullName}</span>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} disabled={isSubmitting} placeholder="jane@example.com" />
                {errors.email && <span className="text-xs font-medium text-destructive">{errors.email}</span>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleChange} disabled={isSubmitting} placeholder="123 Main St" />
                {errors.address && <span className="text-xs font-medium text-destructive">{errors.address}</span>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleChange} disabled={isSubmitting} placeholder="New York" />
                  {errors.city && <span className="text-xs font-medium text-destructive">{errors.city}</span>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                  <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} disabled={isSubmitting} placeholder="10001" maxLength={5} />
                  {errors.zipCode && <span className="text-xs font-medium text-destructive">{errors.zipCode}</span>}
                </div>
              </div>

              <div className="grid gap-2 border-t pt-4 mt-2">
                <Label htmlFor="cardNumber">Payment Card Details</Label>
                <div className="relative">
                  <Input id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} disabled={isSubmitting} placeholder="4111 2222 3333 4444" maxLength={16} className="pr-10" />
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                {errors.cardNumber && <span className="text-xs font-medium text-destructive">{errors.cardNumber}</span>}
              </div>

            </CardContent>
            <CardFooter className="pt-2">
              <Button type="submit" className="w-full font-medium" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Secure Payment...
                  </>
                ) : (
                  `Pay $${cartSubtotal.toFixed(2)}`
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      {/* Condensed Sidebar Summary Review Panel */}
      <div className="lg:col-span-5">
        <Card className="bg-muted/40 border-muted sticky top-24">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Review Order</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[320px] overflow-y-auto space-y-3 pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 flex-shrink-0 rounded bg-white p-1 border flex items-center justify-center">
                    <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="truncate">
                    <p className="font-medium text-foreground truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold text-foreground ml-2">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </CardContent>
          <CardFooter className="border-t pt-4 flex-col gap-2 items-stretch bg-muted/20">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Standard Logistics</span>
              <span className="text-emerald-600 font-medium">Free Tracker Carrier</span>
            </div>
            <div className="flex justify-between text-base font-bold text-foreground mt-1">
              <span>Grand Total</span>
              <span>${cartSubtotal.toFixed(2)}</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};