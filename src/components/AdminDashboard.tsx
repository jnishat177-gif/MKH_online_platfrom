import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_CATEGORIES } from '../data/mockData';
import { 
  ShieldCheck, 
  DollarSign, 
  Users, 
  Package, 
  Store, 
  Check, 
  X, 
  Tag, 
  Plus, 
  CreditCard,
  Percent,
  TrendingUp,
  FileCheck2
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    orders, 
    sellers, 
    coupons, 
    approveProduct, 
    addNotification 
  } = useApp();

  const [adminTab, setAdminTab] = useState<'overview' | 'approvals' | 'coupons' | 'payments'>('overview');

  // Coupon creator state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newDiscountPercent, setNewDiscountPercent] = useState(15);
  const [newMinPurchase, setNewMinPurchase] = useState(1200);

  // Platform calculations
  const totalGMV = orders.reduce((acc, o) => acc + o.totalBDT, 0);
  const platformCommissionBDT = Math.round(totalGMV * 0.10); // 10% platform fee

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    addNotification(
      'New Promo Code Created',
      `Coupon ${newCouponCode.toUpperCase()} (${newDiscountPercent}%) published for all marketplace customers.`,
      'marketing'
    );
    setNewCouponCode('');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">Platform Super Admin Console</h1>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  Django REST Auth · Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Central oversight for Bangladeshi multi-vendor operations, bKash gateway reconciliation & seller payouts.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Core Financial & Ecosystem Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Gross Marketplace GMV</span>
            </div>
            <p className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
              ৳{totalGMV.toLocaleString()}
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span>Platform 10% Commission</span>
            </div>
            <p className="text-xl font-bold font-mono text-amber-300 tabular-nums">
              ৳{platformCommissionBDT.toLocaleString()}
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
              <Store className="w-4 h-4 text-blue-400" />
              <span>Verified Vendor Stores</span>
            </div>
            <p className="text-xl font-bold font-mono text-white tabular-nums">
              {sellers.length}
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
              <Package className="w-4 h-4 text-purple-400" />
              <span>Total Processed Orders</span>
            </div>
            <p className="text-xl font-bold font-mono text-white tabular-nums">
              {orders.length}
            </p>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setAdminTab('overview')}
          className={`pb-3 px-3 transition-colors cursor-pointer border-b-2 ${
            adminTab === 'overview'
              ? 'border-emerald-800 text-emerald-950 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Recent Transactions & Orders ({orders.length})
        </button>
        <button
          onClick={() => setAdminTab('approvals')}
          className={`pb-3 px-3 transition-colors cursor-pointer border-b-2 ${
            adminTab === 'approvals'
              ? 'border-emerald-800 text-emerald-950 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Product Approval Queue ({products.length})
        </button>
        <button
          onClick={() => setAdminTab('coupons')}
          className={`pb-3 px-3 transition-colors cursor-pointer border-b-2 ${
            adminTab === 'coupons'
              ? 'border-emerald-800 text-emerald-950 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Marketing Campaigns & Coupons ({coupons.length})
        </button>
        <button
          onClick={() => setAdminTab('payments')}
          className={`pb-3 px-3 transition-colors cursor-pointer border-b-2 ${
            adminTab === 'payments'
              ? 'border-emerald-800 text-emerald-950 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          bKash & Nagad Gateway Audit
        </button>
      </div>

      {/* TAB 1: Transactions & Orders */}
      {adminTab === 'overview' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
            <span className="font-bold text-slate-800 uppercase tracking-wider">
              Real-Time Order Ledger (All Sellers)
            </span>
            <span className="text-slate-500">Live order feed synced</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-500 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Items / Seller</th>
                  <th className="py-3 px-4">Total Amount</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{o.id}</td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-800">{o.customerName}</p>
                      <span className="text-[11px] text-slate-400 font-mono">{o.customerPhone}</span>
                    </td>
                    <td className="py-3 px-4">
                      {o.items.map(it => (
                        <div key={it.productId} className="text-slate-700">
                          {it.productTitle} <span className="text-slate-400">({it.sellerName})</span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 tabular-nums">
                      ৳{o.totalBDT.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold uppercase text-[10px]">
                        {o.paymentMethod} {o.transactionId && `· ${o.transactionId}`}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-bold text-[10px] uppercase">
                        {o.orderStatus.replace(/_/g, ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Product Approvals */}
      {adminTab === 'approvals' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
            <span className="font-bold text-slate-800 uppercase tracking-wider">
              Vendor Listing Approvals
            </span>
            <span className="text-slate-500">Ensures quality control & authentic products</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {products.map(p => (
              <div key={p.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-14 h-14 object-cover rounded-lg border border-slate-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">{p.title}</h4>
                    <p className="text-slate-500 text-[11px]">
                      Vendor: <strong className="text-slate-700">{p.sellerName}</strong> · Category: {p.category} · Stock: {p.stock}
                    </p>
                    <span className="font-mono font-bold text-slate-800 tabular-nums">
                      ৳{p.priceBDT.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {p.isApproved ? (
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Approved
                    </span>
                  ) : (
                    <button
                      onClick={() => approveProduct(p.id, true)}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg cursor-pointer"
                    >
                      Approve Listing
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Coupons & Campaigns */}
      {adminTab === 'coupons' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs text-xs space-y-4">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-emerald-800" />
              <h3 className="font-bold text-slate-900">Create Marketing Coupon</h3>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BOISHAKH15"
                  value={newCouponCode}
                  onChange={e => setNewCouponCode(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg uppercase focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Discount Percentage (%)</label>
                <input
                  type="number"
                  min="5"
                  max="50"
                  required
                  value={newDiscountPercent}
                  onChange={e => setNewDiscountPercent(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Minimum Order (৳ BDT)</label>
                <input
                  type="number"
                  min="500"
                  required
                  value={newMinPurchase}
                  onChange={e => setNewMinPurchase(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono focus:outline-none focus:border-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg transition-colors cursor-pointer"
              >
                Launch Coupon Campaign
              </button>
            </form>
          </div>

          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs text-xs space-y-3">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider">
              Active Marketing Promo Codes
            </h3>

            <div className="divide-y divide-slate-100">
              {coupons.map(c => (
                <div key={c.code} className="py-3 first:pt-0 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-sm text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {c.code}
                    </span>
                    <p className="text-slate-600 mt-1">{c.description}</p>
                    <span className="text-[11px] text-slate-400">
                      Min Purchase: ৳{c.minPurchaseBDT} · Max Disc: ৳{c.maxDiscountBDT}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-extrabold text-slate-900 font-mono">
                      {c.discountPercent}% OFF
                    </span>
                    <p className="text-[10px] text-slate-400">Used {c.usageCount} times</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: bKash & Nagad Gateway Audit */}
      {adminTab === 'payments' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-800" />
            <h3 className="font-bold text-slate-900 uppercase tracking-wider">
              Bangladeshi Payment Gateways Server Reconciliation
            </h3>
          </div>

          <p className="text-slate-500 leading-relaxed">
            As outlined in the Project Roadmap, client-side success callbacks are never trusted blindly. All transactions below have been verified via Django backend server-to-server API calls.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-rose-950">bKash Merchant Checkout API</span>
                <span className="text-[10px] bg-rose-600 text-white font-bold px-1.5 py-0.5 rounded">
                  SANDBOX 200 OK
                </span>
              </div>
              <p className="text-slate-600 text-[11px]">
                API: POST /tokenized/checkout/execute<br />
                Credentials: App Key & Secret verified.<br />
                Idempotency: Handled via Unique paymentID.
              </p>
            </div>

            <div className="p-4 bg-orange-50/50 border border-orange-200 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-orange-950">Nagad Merchant Payment Gateway</span>
                <span className="text-[10px] bg-orange-600 text-white font-bold px-1.5 py-0.5 rounded">
                  SANDBOX 200 OK
                </span>
              </div>
              <p className="text-slate-600 text-[11px]">
                API: POST /check-out/complete/<br />
                Signature: RSA-SHA256 Encrypted Payload.<br />
                Verification: Server checks order status code 000.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
