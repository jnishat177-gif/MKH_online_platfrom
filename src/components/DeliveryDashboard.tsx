import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Truck, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Navigation, 
  Clock, 
  Package, 
  ShieldCheck 
} from 'lucide-react';

export const DeliveryDashboard: React.FC = () => {
  const { orders, updateOrderStatus } = useApp();

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">Courier Logistics & Delivery Hub</h1>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/30">
                Pathao & Paperfly Dispatch Network
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live routing across 64 districts in Bangladesh with Cash on Delivery collection & delivery OTP verification.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6">
          <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700">
            <span className="text-slate-400 text-xs block mb-1">Active Deliveries</span>
            <p className="text-xl font-bold font-mono text-amber-400 tabular-nums">
              {orders.filter(o => o.orderStatus !== 'delivered' && o.orderStatus !== 'cancelled').length}
            </p>
          </div>
          <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700">
            <span className="text-slate-400 text-xs block mb-1">Delivered Today</span>
            <p className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
              {orders.filter(o => o.orderStatus === 'delivered').length}
            </p>
          </div>
          <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700 col-span-2 sm:col-span-1">
            <span className="text-slate-400 text-xs block mb-1">Average Delivery Time</span>
            <p className="text-xl font-bold font-mono text-white tabular-nums">
              24–48 Hours
            </p>
          </div>
        </div>
      </div>

      {/* Package Dispatches */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
          Shipment Consignment Queue
        </h3>

        {orders.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
            No active shipments currently assigned to courier fleet.
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-emerald-800" />
                  <span className="font-bold text-slate-900 font-mono text-sm">Consignment #{order.id}</span>
                  <span className="text-slate-400">· {order.createdAt}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold uppercase text-[10px]">
                    Pay: {order.paymentMethod} ({order.paymentStatus === 'paid' ? 'Paid Online' : 'Collect Cash'})
                  </span>
                  <span className="px-2.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-full font-bold uppercase text-[10px]">
                    {order.orderStatus.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Customer & Destination</span>
                  <p className="font-bold text-slate-900">{order.customerName}</p>
                  <p className="font-mono text-slate-600 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-slate-400" /> {order.customerPhone}
                  </p>
                  <p className="text-slate-600 flex items-start gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{order.shippingAddress}, <strong>{order.district}</strong></span>
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Package Contents</span>
                  <div className="space-y-1">
                    {order.items.map(it => (
                      <p key={it.productId} className="text-slate-800 font-medium">
                        {it.productTitle} × {it.quantity}
                      </p>
                    ))}
                  </div>
                  <div className="mt-2 font-mono font-bold text-slate-900">
                    Total Value: ৳{order.totalBDT.toLocaleString()}
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-slate-500 font-semibold block mb-1">Courier Routing Status</span>
                    <p className="text-emerald-800 font-medium">
                      {order.courierNotes || 'Ready for sorting hub transfer.'}
                    </p>
                  </div>

                  {/* Step Action Buttons */}
                  <div className="space-y-1.5">
                    {order.orderStatus === 'processing' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'picked_by_courier', 'Picked up from vendor workshop. Sorting hub scan complete.')}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg cursor-pointer transition-colors"
                      >
                        Pick Up from Seller
                      </button>
                    )}

                    {order.orderStatus === 'picked_by_courier' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'out_for_delivery', 'Rider assigned. Package out for doorstep delivery.')}
                        className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg cursor-pointer transition-colors"
                      >
                        Dispatch Out for Delivery
                      </button>
                    )}

                    {order.orderStatus === 'out_for_delivery' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'delivered', 'Doorstep delivery completed. Customer signature recorded.')}
                        className="w-full py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm Successful Delivery</span>
                      </button>
                    )}

                    {order.orderStatus === 'delivered' && (
                      <div className="text-center py-1 text-emerald-800 font-bold flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Delivery Completed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
