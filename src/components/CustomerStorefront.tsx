import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { INITIAL_CATEGORIES } from '../data/mockData';
import jamdaniImg from '../assets/images/handicraft_jamdani_collection_1794475842819.jpg';
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  ArrowRight, 
  AlertCircle, 
  Check, 
  MapPin, 
  X, 
  Zap, 
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';

interface CustomerStorefrontProps {
  searchQuery: string;
}

export const CustomerStorefront: React.FC<CustomerStorefrontProps> = ({ searchQuery }) => {
  const { 
    products, 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    setIsPaymentModalOpen, 
    setIsCartOpen,
    selectedProductForDetail, 
    setSelectedProductForDetail 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating' | 'flash'>('featured');

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.isApproved)
      .filter(p => {
        if (selectedCategory === 'all') return true;
        return p.category.toLowerCase().includes(selectedCategory.toLowerCase());
      })
      .filter(p => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.sellerName.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.priceBDT - b.priceBDT;
        if (sortBy === 'price_high') return b.priceBDT - a.priceBDT;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'flash') return (b.isFlashDeal ? 1 : 0) - (a.isFlashDeal ? 1 : 0);
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleBuyNow = (product: Product) => {
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Campaign Spotlight */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold tracking-wide">
              <span>MARKETINGHUB ONLINE PLATFORM</span>
              <span aria-hidden="true">·</span>
              <span>100% VERIFIED SELLERS</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white" style={{ textWrap: 'balance' }}>
              Everything You Need — Groceries, Cosmetics, Furniture, Electronics & Fashion.
            </h1>
            
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
              Bangladesh&apos;s real-time multi-vendor marketplace. Shop daily grocery essentials, skincare cosmetics, teak furniture, smart electronics, and ladies one-piece dresses with instant bKash & Nagad checkout.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  const elem = document.getElementById('catalog-grid');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Marketplace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  bKash & Nagad Verified
                </span>
                <span aria-hidden="true">·</span>
                <span>COD Available</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 aspect-4/3 group">
              <img
                src={jamdaniImg}
                alt="Authentic Bangladeshi Jamdani Weave"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-[11px] font-bold text-amber-300 tracking-wider uppercase mb-1">
                  Artisan Feature
                </span>
                <h3 className="text-lg font-bold text-white mb-1">
                  Royal Crimson Dhakai Jamdani
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1">
                  Hand-woven 84-count pure cotton with intricate gold zari kalgi embroidery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills & Filters */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              All Products ({products.filter(p => p.isApproved).length})
            </button>
            {INITIAL_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.name
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0 text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="featured">Featured Picks</option>
              <option value="flash">Flash Deals First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Top Customer Ratings</option>
            </select>
          </div>
        </div>
      </section>

      {/* Product Catalog Grid */}
      <section id="catalog-grid" className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Showing <strong className="text-slate-800">{filteredProducts.length}</strong> items</span>
            {selectedCategory !== 'all' && (
              <>
                <span aria-hidden="true">·</span>
                <span>Category: <strong className="text-slate-800">{selectedCategory}</strong></span>
              </>
            )}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
            <p className="text-sm text-slate-600 font-medium mb-2">No matching products found.</p>
            <p className="text-xs text-slate-400 mb-4">Try clearing your search query or choosing another category.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-lg border border-emerald-200 hover:bg-emerald-100"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => {
              const isWishlisted = wishlist.includes(product.id);
              const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;
              const isOutOfStock = product.stock <= 0;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group"
                >
                  {/* Product Image Header (Lead with imagery 65-75%) */}
                  <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />

                    {/* Wishlist quick action */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-xs text-slate-600 hover:text-rose-600 transition-colors shadow-xs cursor-pointer"
                      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <Heart
                        className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`}
                      />
                    </button>

                    {/* Flash Deal or Discount Indicator */}
                    {product.isFlashDeal && (
                      <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                        <Zap className="w-3 h-3 fill-white" />
                        <span>FLASH DEAL</span>
                      </div>
                    )}

                    {/* Out of Stock Scrim */}
                    {isOutOfStock && (
                      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center">
                        <span className="text-white text-xs font-bold uppercase tracking-wider bg-slate-900 px-3 py-1 rounded">
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Details Section */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      {/* Quiet unboxed metadata */}
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="uppercase tracking-wider font-semibold text-slate-700">
                          {product.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-0.5 text-slate-500">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {product.origin}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => setSelectedProductForDetail(product)}
                        className="text-sm font-bold text-slate-900 hover:text-emerald-800 transition-colors line-clamp-2 cursor-pointer"
                      >
                        {product.title}
                      </h3>

                      {/* Store name */}
                      <p className="text-xs text-slate-500 line-clamp-1">
                        Sold by <span className="font-semibold text-slate-700">{product.sellerName}</span>
                      </p>

                      {/* Rating & reviews */}
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <div className="flex items-center text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="ml-1 font-bold text-slate-800 tabular-nums">
                            {product.rating}
                          </span>
                        </div>
                        <span aria-hidden="true">·</span>
                        <span>({product.reviewCount} reviews)</span>
                      </div>
                    </div>

                    {/* Stock Alert Warning */}
                    {isLowStock && (
                      <div className="flex items-center gap-1 text-[11px] text-amber-700 font-semibold bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>Only {product.stock} units remaining in warehouse!</span>
                      </div>
                    )}

                    {/* Price and Action Buttons */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-extrabold text-slate-900 font-mono tabular-nums">
                            ৳{product.priceBDT.toLocaleString()}
                          </span>
                          {product.originalPriceBDT && (
                            <span className="text-xs text-slate-400 line-through tabular-nums">
                              ৳{product.originalPriceBDT.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 block">incl. all VAT & Taxes</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => addToCart(product, 1)}
                          disabled={isOutOfStock}
                          className="p-2 text-slate-700 hover:text-emerald-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                          title="Add to shopping bag"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleBuyNow(product)}
                          disabled={isOutOfStock}
                          className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Featured Collection: Flash Sale Highlight */}
      <section id="flash-sale-section" className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4 fill-rose-400" />
              <span>Real-Time Marketing Spotlight</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold">Limited-Hour Flash Deals</h2>
          </div>
          <div className="text-xs text-slate-400">
            Instant 10%–25% savings automatically deducted at checkout
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.filter(p => p.isFlashDeal).slice(0, 2).map(deal => (
            <div
              key={`deal-${deal.id}`}
              className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center"
            >
              <img
                src={deal.imageUrl}
                alt={deal.title}
                className="w-full sm:w-36 h-36 object-cover rounded-lg shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-2 flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold text-amber-400">
                  {deal.category} · {deal.origin}
                </span>
                <h4 className="text-sm font-bold text-white line-clamp-2">
                  {deal.title}
                </h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-emerald-400 tabular-nums">
                    ৳{deal.priceBDT.toLocaleString()}
                  </span>
                  {deal.originalPriceBDT && (
                    <span className="text-xs text-slate-400 line-through tabular-nums">
                      ৳{deal.originalPriceBDT.toLocaleString()}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleBuyNow(deal)}
                  className="w-full sm:w-auto px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Claim Flash Deal
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Details Modal (Contiguous Purchase Module PDP) */}
      {selectedProductForDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">
                Product Specifications & Vendor Details
              </span>
              <button
                onClick={() => setSelectedProductForDetail(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-h-[80vh] overflow-y-auto">
              <div>
                <img
                  src={selectedProductForDetail.imageUrl}
                  alt={selectedProductForDetail.title}
                  className="w-full aspect-4/3 object-cover rounded-xl border border-slate-200 mb-4"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sold by</span>
                    <span className="font-semibold text-slate-900">{selectedProductForDetail.sellerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Region / Origin</span>
                    <span className="font-semibold text-slate-900">{selectedProductForDetail.origin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Stock Availability</span>
                    <span className="font-semibold text-emerald-800">{selectedProductForDetail.stock} units ready</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Return Policy</span>
                    <span className="font-semibold text-slate-900">7-Day Easy Return</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{selectedProductForDetail.category}</span>
                    <span aria-hidden="true">·</span>
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="ml-1 font-bold text-slate-800">{selectedProductForDetail.rating}</span>
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 leading-snug">
                    {selectedProductForDetail.title}
                  </h2>

                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                      ৳{selectedProductForDetail.priceBDT.toLocaleString()}
                    </span>
                    {selectedProductForDetail.originalPriceBDT && (
                      <span className="text-sm text-slate-400 line-through tabular-nums">
                        ৳{selectedProductForDetail.originalPriceBDT.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedProductForDetail.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-800 mb-2">Supported Payment Gateways</h4>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-1 bg-rose-50 text-rose-800 font-bold border border-rose-200 rounded">bKash</span>
                      <span className="px-2 py-1 bg-orange-50 text-orange-800 font-bold border border-orange-200 rounded">Nagad</span>
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 font-bold border border-slate-200 rounded">Cash on Delivery</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      addToCart(selectedProductForDetail, 1);
                      setSelectedProductForDetail(null);
                      setIsCartOpen(true);
                    }}
                    className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag & Checkout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
