/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MarketingBanner } from './components/MarketingBanner';
import { Header } from './components/Header';
import { RoleSwitcher } from './components/RoleSwitcher';
import { CustomerStorefront } from './components/CustomerStorefront';
import { SellerDashboard } from './components/SellerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { DeliveryDashboard } from './components/DeliveryDashboard';
import { ProjectHub } from './components/ProjectHub';
import { CartDrawer } from './components/CartDrawer';
import { PaymentModal } from './components/PaymentModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { DownloadProjectModal } from './components/DownloadProjectModal';
import { ShieldCheck, Download } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { role, setRole } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Real-Time Marketing Flash Sale Banner Ticker */}
      <MarketingBanner />

      {/* 2. Top Bar Navigation Contract */}
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
      />

      {/* 3. Multi-Role Switcher Bar */}
      <RoleSwitcher />

      {/* 4. Active Role View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {role === 'customer' && <CustomerStorefront searchQuery={searchQuery} />}
        {role === 'seller' && <SellerDashboard />}
        {role === 'admin' && <AdminDashboard />}
        {role === 'delivery' && <DeliveryDashboard />}
        {role === 'cse_hub' && <ProjectHub />}
      </main>

      {/* 5. Drawers and Modals */}
      <CartDrawer />
      <PaymentModal />
      <OrderTrackingModal />
      <DownloadProjectModal 
        isOpen={isDownloadModalOpen} 
        onClose={() => setIsDownloadModalOpen(false)} 
      />

      {/* 6. Professional Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-emerald-800 text-amber-300 font-black flex items-center justify-center text-xs">
                  M
                </span>
                <span className="font-extrabold text-slate-900 text-sm">MarketingHub Online Platform</span>
              </div>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Real-Time Marketing & Multi-Vendor E-Commerce Platform for Grocery, Cosmetics, Furniture, Electronics, Ladies Fashion & Bangladeshi Crafts.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">Marketplace Modules</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><button onClick={() => setRole('customer')} className="hover:text-emerald-800 cursor-pointer">Customer Storefront</button></li>
                <li><button onClick={() => setRole('seller')} className="hover:text-emerald-800 cursor-pointer">Seller Merchant Portal</button></li>
                <li><button onClick={() => setRole('admin')} className="hover:text-emerald-800 cursor-pointer">Super Admin Console</button></li>
                <li><button onClick={() => setRole('delivery')} className="hover:text-emerald-800 cursor-pointer">Courier Logistics Hub</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">Payment Partners</h5>
              <div className="space-y-1.5 text-[11px]">
                <p className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-[#D12053]" /> bKash Merchant Checkout API
                </p>
                <p className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-[#F7941D]" /> Nagad Online Gateway
                </p>
                <p className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-700" /> Cash on Delivery (COD)
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">Academic Architecture</h5>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Designed as a complete CSE Final Year Project featuring 20 relational database tables, Django Channels WebSockets, and DRF APIs.
              </p>
              <button
                onClick={() => setRole('cse_hub')}
                className="text-indigo-800 font-bold hover:underline cursor-pointer text-[11px] block pt-1"
              >
                Open Project Defense Hub →
              </button>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <p>© {new Date().getFullYear()} MarketingHub Online Platform · Built for CSE Final Year Project.</p>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>TLS 1.3 256-bit Encrypted Payments</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
