import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Truck 
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartShippingFee,
    cartTotal,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    setIsPaymentModalOpen
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success?: boolean; text?: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback({ success: res.success, text: res.message });
    if (res.success) setCouponInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-250">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-800" />
              <h3 className="font-bold text-sm text-slate-900">Your Shopping Bag</h3>
              <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-semibold tabular-nums">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">Your bag is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs">
                  Discover authentic Jamdani sarees, Sundarbans organic honey, and gadgets from verified sellers.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold hover:bg-emerald-900 cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.product.id} className="pt-3 first:pt-0 flex gap-3">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      className="w-18 h-18 object-cover rounded-lg border border-slate-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-500">
                        {item.product.sellerName}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-slate-200 rounded-md">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-slate-100 text-slate-600 rounded-l cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-slate-800 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="p-1 hover:bg-slate-100 text-slate-600 rounded-r cursor-pointer disabled:opacity-40"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <span className="text-xs font-bold text-slate-900 font-mono tabular-nums">
                            ৳{(item.product.priceBDT * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-2 text-right">
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-slate-400 hover:text-rose-600 underline cursor-pointer"
                  >
                    Clear shopping bag
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer & Calculations */}
          {cart.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-4">
              {/* Promo Code Input */}
              <div className="space-y-1.5">
                <form onSubmit={handleApply} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Promo Code (DESHI20 / BKASH10)"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs uppercase placeholder:normal-case focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {activeCoupon && (
                  <div className="flex items-center justify-between text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    <span className="flex items-center gap-1 font-semibold">
                      <Check className="w-3 h-3" /> Coupon {activeCoupon.code} active
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {couponFeedback && !activeCoupon && (
                  <p className={`text-[11px] ${couponFeedback.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {couponFeedback.text}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-3">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-mono tabular-nums text-slate-900">৳{cartSubtotal.toLocaleString()}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({activeCoupon?.code})</span>
                    <span className="font-mono tabular-nums">-৳{cartDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-slate-400" /> Standard Courier Delivery
                  </span>
                  <span className="font-mono tabular-nums text-slate-900">৳{cartShippingFee}</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-base text-emerald-800 font-mono tabular-nums">
                    ৳{cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Encrypted bKash & Nagad Merchant Checkout</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 active:scale-99 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
