import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { ShoppingCart, Store, ShieldCheck, Truck, BookMarked, GraduationCap, Store as StoreIcon } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { role, setRole, activeStoreId, setActiveStoreId, sellers } = useApp();

  const rolesConfig: { id: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'customer',
      label: 'Customer Store',
      icon: <ShoppingCart className="w-3.5 h-3.5" />,
      desc: 'Browse, Bag, bKash/Nagad Checkout & Track'
    },
    {
      id: 'seller',
      label: 'Seller Dashboard',
      icon: <Store className="w-3.5 h-3.5" />,
      desc: 'Stock, Products CRUD, Sales & Returns'
    },
    {
      id: 'admin',
      label: 'Admin Portal',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      desc: 'Platform GMV, Approvals, Categories & Coupons'
    },
    {
      id: 'delivery',
      label: 'Delivery Manager',
      icon: <Truck className="w-3.5 h-3.5" />,
      desc: 'Courier Logistics, Route Tracking & Dispatch'
    },
    {
      id: 'cse_hub',
      label: 'CSE Defense Hub',
      icon: <BookMarked className="w-3.5 h-3.5" />,
      desc: 'System Architecture, 20-Table ER, Roadmap & Viva'
    },
    {
      id: 'thesis_report',
      label: 'Thesis Report (PDF)',
      icon: <GraduationCap className="w-3.5 h-3.5" />,
      desc: '50-60 Page 12-Chapter Report, Vector Diagrams & Student Certificate'
    }
  ];

  return (
    <div className="bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Left: Role Switcher Segmented Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto p-1 bg-slate-200/80 rounded-lg">
          <span className="text-[11px] font-bold text-slate-500 uppercase px-2 shrink-0 hidden sm:inline">
            Active Role:
          </span>
          {rolesConfig.map(item => {
            const isActive = role === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setRole(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
                title={item.desc}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Contextual metadata (e.g. Active Store if in Seller mode) */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {role === 'seller' ? (
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-md border border-slate-200 text-xs shadow-2xs">
              <StoreIcon className="w-3.5 h-3.5 text-emerald-700" />
              <span className="text-slate-500">Managing Store:</span>
              <select
                value={activeStoreId}
                onChange={e => setActiveStoreId(e.target.value)}
                className="font-semibold text-slate-900 bg-transparent border-none focus:outline-none cursor-pointer"
              >
                {sellers.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.storeName} ({s.district})
                  </option>
                ))}
              </select>
            </div>
          ) : role === 'admin' ? (
            <div className="text-[11px] text-slate-500">
              Logged in as <strong className="text-slate-800">Super Administrator</strong> (Full Access)
            </div>
          ) : role === 'delivery' ? (
            <div className="text-[11px] text-slate-500">
              Logistics Dispatcher: <strong className="text-slate-800">Pathao / Paperfly Hub Dhaka</strong>
            </div>
          ) : role === 'cse_hub' ? (
            <div className="text-[11px] text-indigo-700 font-semibold bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
              CSE Final Year Project Blueprint &amp; Viva Review Mode
            </div>
          ) : role === 'thesis_report' ? (
            <div className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              12-Chapter A4 Thesis Report &amp; Academic Certificate
            </div>
          ) : (
            <div className="text-[11px] text-slate-500 hidden sm:flex items-center gap-2">
              <span>Standard Delivery: Dhaka (৳60) · Rest of BD (৳120)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
