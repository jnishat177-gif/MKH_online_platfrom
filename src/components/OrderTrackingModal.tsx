import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '../types';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Truck, 
  PackageCheck, 
  RotateCcw, 
  AlertCircle, 
  MapPin, 
  Phone 
} from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const { trackingOrder, setTrackingOrder, requestRefund, orders } = useApp();
  const [refundReason, setRefundReason] = useState('');
  const [showRefundForm, setShowRefundForm] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string>(trackingOrder?.id || '');

  if (!trackingOrder) return null;

  // Keep synced with state
  const currentOrder = orders.find(o => o.id === (selectedOrderId || trackingOrder.id)) || trackingOrder;

  const steps: { status: OrderStatus; label: string; desc: string }[] = [
    { status: 'pending', label: 'Order Placed', desc: 'Order received & verified' },
    { status: 'processing', label: 'Seller Processing', desc: 'Item being packaged by vendor' },
    { status: 'picked_by_courier', label: 'Picked by Courier', desc: 'In sorting hub' },
    { status: 'out_for_delivery', label: 'Out for Delivery', desc: 'Courier rider on the way' },
    { status: 'delivered', label: 'Delivered', desc: 'Delivered to customer' }
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 0;
      case 'processing': return 1;
      case 'picked_by_courier': return 2;
      case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      case 'refund_requested': return 4;
      case 'refunded': return 4;
      default: return 0;
    }
  };

  const currentStepIdx = getStepIndex(currentOrder.orderStatus);

  const handleRefundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refundReason.trim()) return;
    requestRefund(currentOrder.id, refundReason);
    setShowRefundForm(false);
    setRefundReason('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-emerald-800" />
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Real-Time Order Tracking
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">
                Order #{currentOrder.id}
              </span>
            </div>
          </div>
          <button
            onClick={() => setTrackingOrder(null)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Order Selector if customer has multiple orders */}
          {orders.length > 1 && (
            <div className="flex items-center gap-2 text-xs bg-slate-100 p-2 rounded-lg">
              <span className="text-slate-500 font-medium">Select Order:</span>
              <select
                value={currentOrder.id}
                onChange={e => setSelectedOrderId(e.target.value)}
                className="font-bold text-slate-800 bg-transparent border-none focus:outline-none cursor-pointer"
              >
                {orders.map(o => (
                  <option key={o.id} value={o.id}>
                    {o.id} - ৳{o.totalBDT} ({o.orderStatus})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Progress Timeline */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Shipment Journey
            </h4>

            <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {steps.map((step, idx) => {
                const isPassed = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;

                return (
                  <div key={step.status} className="relative flex items-start gap-3">
                    <span
                      className={`absolute -left-[23px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                        isPassed
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-white border-slate-300 text-slate-400'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-xs font-bold ${isCurrent ? 'text-emerald-800' : 'text-slate-800'}`}>
                          {step.label}
                        </p>
                        {isCurrent && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase">
                            Current Stage
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Refund Notice if Refund Claim active */}
          {currentOrder.orderStatus === 'refund_requested' && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Return & Refund Claim Under Review</span>
              </div>
              <p className="text-amber-800">
                Reason: &quot;{currentOrder.returnReason}&quot;. Our vendor support will inspect and refund via original payment channel.
              </p>
            </div>
          )}

          {currentOrder.orderStatus === 'refunded' && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Refund Processed & Disbursed</span>
              </div>
              <p className="text-emerald-800">
                Total refund of ৳{currentOrder.totalBDT} returned via {currentOrder.paymentMethod.toUpperCase()} transaction refund.
              </p>
            </div>
          )}

          {/* Order & Shipment Summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Recipient Name</span>
              <span className="font-bold text-slate-800">{currentOrder.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Phone Contact</span>
              <span className="font-mono text-slate-800">{currentOrder.customerPhone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Shipping Address</span>
              <span className="font-medium text-slate-800">{currentOrder.shippingAddress}, {currentOrder.district}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Payment Channel</span>
              <span className="font-semibold text-slate-900 uppercase">
                {currentOrder.paymentMethod} {currentOrder.transactionId && `(${currentOrder.transactionId})`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Courier Note</span>
              <span className="font-medium text-emerald-700">{currentOrder.courierNotes || 'Scheduled'}</span>
            </div>
          </div>

          {/* Return & Refund Request Trigger */}
          {currentOrder.orderStatus === 'delivered' && !showRefundForm && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowRefundForm(true)}
                className="w-full py-2.5 border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>Request Return or Refund for Damaged/Wrong Item</span>
              </button>
            </div>
          )}

          {/* Refund Request Form */}
          {showRefundForm && (
            <form onSubmit={handleRefundSubmit} className="p-4 border border-rose-200 bg-rose-50/50 rounded-xl space-y-3 text-xs">
              <h5 className="font-bold text-rose-950">Initiate Return & Refund Claim</h5>
              <p className="text-slate-600">
                Please state the reason for returning this item (e.g., damaged package, wrong size, defective product):
              </p>
              <textarea
                rows={2}
                required
                value={refundReason}
                onChange={e => setRefundReason(e.target.value)}
                placeholder="Describe reason for return/refund..."
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-rose-600 text-xs"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg cursor-pointer"
                >
                  Submit Refund Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowRefundForm(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
