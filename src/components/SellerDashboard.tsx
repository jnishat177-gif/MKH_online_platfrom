import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { INITIAL_CATEGORIES } from '../data/mockData';
import { 
  Plus, 
  Package, 
  DollarSign, 
  Star, 
  Trash2, 
  Edit3, 
  AlertTriangle, 
  CheckCircle, 
  RotateCcw, 
  Truck, 
  X,
  TrendingUp,
  Store
} from 'lucide-react';

export const SellerDashboard: React.FC = () => {
  const { 
    activeStoreId, 
    sellers, 
    products, 
    orders, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus, 
    processRefund 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'returns'>('inventory');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for new product
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState(INITIAL_CATEGORIES[0].name);
  const [newPrice, setNewPrice] = useState(1200);
  const [newStock, setNewStock] = useState(15);
  const [newOrigin, setNewOrigin] = useState('Dhaka');
  const [newDesc, setNewDesc] = useState('');

  const currentSeller = sellers.find(s => s.id === activeStoreId) || sellers[0];
  const sellerProducts = products.filter(p => p.sellerId === currentSeller.id);
  const sellerOrders = orders.filter(o => o.items.some(it => it.sellerId === currentSeller.id));
  const sellerReturns = orders.filter(
    o => o.items.some(it => it.sellerId === currentSeller.id) && 
    (o.orderStatus === 'refund_requested' || o.orderStatus === 'refunded')
  );

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addProduct({
      title: newTitle,
      category: newCategory,
      priceBDT: Number(newPrice),
      stock: Number(newStock),
      origin: newOrigin,
      description: newDesc || 'Authentic regional product directly from artisan workshop.'
    });
    setShowAddModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Seller Store Banner & KPIs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 bg-slate-100 rounded-xl">{currentSeller.logo}</span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900">{currentSeller.storeName}</h1>
                {currentSeller.verified && (
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 px-2 py-0.5 rounded">
                    Verified Seller
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{currentSeller.description}</p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* 4 Financial & Operational KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
              <DollarSign className="w-4 h-4 text-emerald-700" />
              <span>Total Revenue</span>
            </div>
            <p className="text-xl font-bold font-mono text-slate-900 tabular-nums">
              ৳{currentSeller.totalRevenueBDT.toLocaleString()}
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>Available Balance</span>
            </div>
            <p className="text-xl font-bold font-mono text-emerald-800 tabular-nums">
              ৳{currentSeller.balanceBDT.toLocaleString()}
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
              <Package className="w-4 h-4 text-purple-600" />
              <span>Store Orders</span>
            </div>
            <p className="text-xl font-bold font-mono text-slate-900 tabular-nums">
              {sellerOrders.length}
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
              <Star className="w-4 h-4 text-amber-500" />
              <span>Customer Rating</span>
            </div>
            <p className="text-xl font-bold font-mono text-slate-900 tabular-nums">
              {currentSeller.rating} / 5.0
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-3 px-3 transition-colors cursor-pointer border-b-2 ${
            activeTab === 'inventory'
              ? 'border-emerald-800 text-emerald-950 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Product Catalog & Stock ({sellerProducts.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-3 transition-colors cursor-pointer border-b-2 ${
            activeTab === 'orders'
              ? 'border-emerald-800 text-emerald-950 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Orders Fulfillment ({sellerOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('returns')}
          className={`pb-3 px-3 transition-colors cursor-pointer border-b-2 ${
            activeTab === 'returns'
              ? 'border-emerald-800 text-emerald-950 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Return & Refund Claims ({sellerReturns.length})
        </button>
      </div>

      {/* TAB 1: Inventory Table */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price (BDT)</th>
                  <th className="py-3 px-4">Stock Ledger</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sellerProducts.map(prod => {
                  const isLow = prod.stock > 0 && prod.stock <= prod.lowStockThreshold;
                  const isOut = prod.stock <= 0;

                  return (
                    <tr key={prod.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={prod.imageUrl}
                          alt={prod.title}
                          className="w-12 h-12 object-cover rounded-lg border border-slate-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{prod.title}</p>
                          <span className="text-[11px] text-slate-400 font-mono">ID: {prod.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-medium">{prod.category}</td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 tabular-nums">
                        ৳{prod.priceBDT.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            value={prod.stock}
                            onChange={e => updateProduct(prod.id, { stock: parseInt(e.target.value) || 0 })}
                            className="w-16 px-2 py-1 border border-slate-200 rounded font-mono font-bold text-slate-800 text-center"
                          />
                          {isLow && (
                            <span className="text-[10px] bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded font-bold border border-amber-200">
                              Low Stock
                            </span>
                          )}
                          {isOut && (
                            <span className="text-[10px] bg-rose-50 text-rose-800 px-1.5 py-0.5 rounded font-bold border border-rose-200">
                              Sold Out
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Live on Store
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Orders Fulfillment */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {sellerOrders.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
              No orders received yet for this store.
            </div>
          ) : (
            sellerOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 font-mono">Order #{order.id}</span>
                    <span className="text-slate-400 ml-2">· {order.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold uppercase text-[10px]">
                      {order.paymentMethod} ({order.paymentStatus})
                    </span>
                    <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full font-bold text-[11px] uppercase">
                      {order.orderStatus.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <h5 className="font-bold text-slate-700 mb-1">Customer Delivery Details</h5>
                    <p className="text-slate-900 font-semibold">{order.customerName}</p>
                    <p className="text-slate-500 font-mono">{order.customerPhone}</p>
                    <p className="text-slate-600">{order.shippingAddress}, {order.district}</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-700 mb-1">Items to Pack</h5>
                    <div className="space-y-1">
                      {order.items.map(it => (
                        <div key={it.productId} className="flex justify-between text-slate-800">
                          <span>{it.productTitle} × {it.quantity}</span>
                          <span className="font-mono font-bold">৳{it.totalBDT.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Fulfillment Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500">
                    Courier Status: <strong className="text-slate-700">{order.courierNotes || 'Awaiting Handover'}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    {order.orderStatus === 'processing' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'picked_by_courier', 'Packed and handed to Pathao Courier Hub.')}
                        className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg cursor-pointer"
                      >
                        Handover to Courier
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: Return & Refund Claims */}
      {activeTab === 'returns' && (
        <div className="space-y-4">
          {sellerReturns.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
              No return or refund claims currently active.
            </div>
          ) : (
            sellerReturns.map(order => (
              <div key={`ret-${order.id}`} className="bg-white rounded-xl border border-rose-200 p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-rose-600" />
                    <span className="font-bold text-slate-900 font-mono">Claim for Order #{order.id}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-rose-50 text-rose-800 border border-rose-200 rounded font-bold uppercase text-[10px]">
                    {order.orderStatus === 'refunded' ? 'Refund Completed' : 'Pending Review'}
                  </span>
                </div>

                <div className="bg-rose-50/50 p-3 rounded-lg border border-rose-100">
                  <span className="font-semibold text-rose-900 block mb-1">Customer Reason:</span>
                  <p className="text-slate-800">&quot;{order.returnReason || 'Product did not meet expectations'}&quot;</p>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-500">
                    Total Amount: <strong className="text-slate-900 font-mono">৳{order.totalBDT}</strong>
                  </span>

                  {order.orderStatus === 'refund_requested' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => processRefund(order.id, true)}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg cursor-pointer"
                      >
                        Approve & Disburse Refund
                      </button>
                      <button
                        onClick={() => processRefund(order.id, false)}
                        className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg cursor-pointer"
                      >
                        Decline Claim
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal: Add New Product */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Publish Product to {currentSeller.storeName}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Tangail Cotton Handloom Sharee"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  >
                    {INITIAL_CATEGORIES.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Price (৳ BDT)</label>
                  <input
                    type="number"
                    min="50"
                    required
                    value={newPrice}
                    onChange={e => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Initial Stock</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newStock}
                    onChange={e => setNewStock(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Origin / District</label>
                  <input
                    type="text"
                    value={newOrigin}
                    onChange={e => setNewOrigin(e.target.value)}
                    placeholder="e.g. Tangail, Narayanganj"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Describe material, dimensions, artisan story..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl cursor-pointer"
                >
                  Publish to Marketplace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
