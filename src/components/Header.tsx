import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Heart, Search, PackageCheck, GraduationCap, Download } from 'lucide-react';
import { NotificationsPopover } from './NotificationsPopover';

interface HeaderProps {
  onSearchFocus?: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenDownloadModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, onOpenDownloadModal }) => {
  const { cart, wishlist, setIsCartOpen, role, setRole, orders, setTrackingOrder } = useApp();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleTrackLatest = () => {
    if (orders.length > 0) {
      setTrackingOrder(orders[0]);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setRole('customer')}
              className="text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-300 font-black flex items-center justify-center text-sm shadow-sm group-hover:scale-105 transition-transform">
                  M
                </span>
                <div>
                  <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-900 transition-colors">
                    MarketingHub
                  </span>
                  <span className="hidden sm:inline-block ml-1.5 text-[11px] text-emerald-800 font-semibold tracking-wide">
                    Online Platform
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Search bar in middle */}
          <div className="hidden md:flex flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search Grocery, Cosmetics, Furniture, Electronics, Ladies One-Piece..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-xs rounded-lg border border-transparent focus:border-emerald-600 focus:outline-none transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Zone 2: 4 Clean Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setRole('customer')}
              className={`hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                role === 'customer' ? 'text-emerald-800 font-bold' : ''
              }`}
            >
              Storefront
            </button>
            <button
              onClick={() => {
                setRole('customer');
                const flashElem = document.getElementById('flash-sale-section');
                flashElem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1"
            >
              <span>Flash Sales</span>
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
            </button>
            <button
              onClick={handleTrackLatest}
              className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1"
            >
              <PackageCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Track Orders</span>
            </button>
            <button
              onClick={() => setRole('cse_hub')}
              className={`hover:text-indigo-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1 ${
                role === 'cse_hub' ? 'text-indigo-800 font-bold' : ''
              }`}
            >
              <GraduationCap className="w-4 h-4 text-indigo-700" />
              <span>CSE Project Hub</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action Area */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Live Notifications */}
            <NotificationsPopover />

            {/* Wishlist Button */}
            <button
              onClick={() => setRole('customer')}
              className="relative p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer hidden sm:block"
              title="Saved items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold text-white bg-slate-800 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Download Project ZIP Button */}
            <button
              onClick={onOpenDownloadModal}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              title="Download full project code as ZIP for VS Code"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Download ZIP</span>
            </button>

            {/* Shopping Bag Button (Primary CTA) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-98 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Shopping Bag</span>
              <span className="bg-emerald-950 px-1.5 py-0.5 rounded text-[11px] font-bold tabular-nums">
                {totalCartCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
