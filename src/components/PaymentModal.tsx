import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PaymentMethod } from '../types';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  ArrowLeft, 
  Truck, 
  MapPin, 
  Phone, 
  User, 
  Lock, 
  AlertCircle 
} from 'lucide-react';

const BD_DISTRICTS = [
  'Dhaka',
  'Chattogram',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Rangpur',
  'Mymensingh',
  'Narayanganj',
  'Gazipur',
  'Cumilla',
  'Bogura'
];

export const PaymentModal: React.FC = () => {
  const { 
    isPaymentModalOpen, 
    setIsPaymentModalOpen, 
    cartTotal, 
    cartSubtotal,
    cartDiscount,
    cartShippingFee,
    placeOrder,
    cart
  } = useApp();

  // Wizard steps: 'shipping' | 'gateway' | 'processing' | 'success'
  const [step, setStep] = useState<'shipping' | 'gateway' | 'processing' | 'success'>('shipping');

  // Customer shipping details
  const [customerName, setCustomerName] = useState('Nafis Imtiaz');
  const [customerPhone, setCustomerPhone] = useState('01712-345678');
  const [address, setAddress] = useState('House 18, Road 4, Dhanmondi');
  const [district, setDistrict] = useState('Dhaka');

  // Selected Gateway
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('bkash');

  // Gateway Simulation State
  const [gatewayStep, setGatewayStep] = useState<'phone' | 'otp' | 'pin'>('phone');
  const [mfsPhone, setMfsPhone] = useState('01712345678');
  const [mfsOtp, setMfsOtp] = useState('');
  const [mfsPin, setMfsPin] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  // Confirmation result
  const [confirmedOrder, setConfirmedOrder] = useState<{ orderId: string; trxId?: string } | null>(null);

  if (!isPaymentModalOpen) return null;

  const handleNextToGateway = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !address) return;
    setStep('gateway');
  };

  const handleFillDemoOtp = () => {
    setMfsOtp('492810');
  };

  const handleFillDemoPin = () => {
    setMfsPin('1234');
  };

  const executePayment = async () => {
    setIsVerifying(true);
    setVerificationError('');

    // Simulate server-to-server gateway verification latency (1.5s)
    setTimeout(async () => {
      try {
        const result = await placeOrder({
          name: customerName,
          phone: customerPhone,
          address,
          district,
          paymentMethod: selectedMethod
        });
        setConfirmedOrder(result);
        setIsVerifying(false);
        setStep('success');
      } catch (err) {
        setIsVerifying(false);
        setVerificationError('Gateway verification timed out. Please retry.');
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              {step === 'shipping' && '1. Delivery & Contact Details'}
              {step === 'gateway' && '2. Secure Payment Gateway'}
              {step === 'success' && 'Order Placed Successfully'}
            </h3>
          </div>
          {step !== 'processing' && (
            <button
              onClick={() => setIsPaymentModalOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* STEP 1: Shipping Details */}
        {step === 'shipping' && (
          <form onSubmit={handleNextToGateway} className="p-6 space-y-4">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-800 font-semibold block">Order Total</span>
                <span className="text-lg font-bold text-emerald-950 font-mono tabular-nums">৳{cartTotal.toLocaleString()}</span>
              </div>
              <span className="text-xs text-emerald-700 font-medium">({cart.length} items)</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="e.g. Tanvir Hossain"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Mobile Phone Number (017 / 018 / 019...)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    placeholder="01712-345678"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">District (বাংলাদেশ জেলা)</label>
                  <select
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-emerald-600"
                  >
                    {BD_DISTRICTS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Shipping Fee</label>
                  <div className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-mono font-semibold">
                    ৳{cartShippingFee} (Standard Courier)
                  </div>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Detailed Delivery Address</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="House/Holding no, Road no, Area, Ward/Thana..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Continue to Payment (৳{cartTotal.toLocaleString()})
            </button>
          </form>
        )}

        {/* STEP 2: Payment Gateways (bKash / Nagad / COD) */}
        {step === 'gateway' && (
          <div className="p-6 space-y-5">
            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => { setSelectedMethod('bkash'); setGatewayStep('phone'); }}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  selectedMethod === 'bkash'
                    ? 'border-[#D12053] bg-rose-50 text-[#D12053] shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span className="w-7 h-7 rounded-full bg-[#D12053] text-white flex items-center justify-center font-bold text-xs">
                  b
                </span>
                <span className="text-xs font-bold">bKash</span>
              </button>

              <button
                type="button"
                onClick={() => { setSelectedMethod('nagad'); setGatewayStep('phone'); }}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  selectedMethod === 'nagad'
                    ? 'border-[#F7941D] bg-orange-50 text-[#F7941D] shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span className="w-7 h-7 rounded-full bg-[#F7941D] text-white flex items-center justify-center font-bold text-xs">
                  ন
                </span>
                <span className="text-xs font-bold">Nagad</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('cod')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  selectedMethod === 'cod'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-800 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
                  <Truck className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold">Cash on Delivery</span>
              </button>
            </div>

            {/* bKash Hosted Gateway Sandbox Container */}
            {selectedMethod === 'bkash' && (
              <div className="border border-[#D12053]/40 rounded-xl overflow-hidden shadow-xs">
                {/* bKash Header */}
                <div className="bg-[#D12053] text-white p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold tracking-wider">bKash</span>
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded uppercase font-semibold">
                      Merchant Checkout Sandbox
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold">৳{cartTotal.toLocaleString()}</span>
                </div>

                <div className="p-4 bg-white space-y-3 text-xs">
                  {gatewayStep === 'phone' && (
                    <div className="space-y-3">
                      <p className="text-slate-600">
                        Enter your 11-digit personal <strong>bKash Account Number</strong> to proceed:
                      </p>
                      <input
                        type="text"
                        value={mfsPhone}
                        onChange={e => setMfsPhone(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-sm focus:outline-none focus:border-[#D12053]"
                      />
                      <button
                        type="button"
                        onClick={() => setGatewayStep('otp')}
                        className="w-full py-2 bg-[#D12053] hover:bg-[#b51845] text-white font-bold rounded-lg cursor-pointer"
                      >
                        Confirm Account & Get OTP
                      </button>
                    </div>
                  )}

                  {gatewayStep === 'otp' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-slate-600">Enter verification code sent to <strong>{mfsPhone}</strong>:</p>
                        <button
                          type="button"
                          onClick={handleFillDemoOtp}
                          className="text-[10px] text-[#D12053] font-bold underline cursor-pointer"
                        >
                          Auto-fill Demo OTP
                        </button>
                      </div>
                      <input
                        type="text"
                        value={mfsOtp}
                        onChange={e => setMfsOtp(e.target.value)}
                        placeholder="6-digit OTP code (e.g. 492810)"
                        maxLength={6}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-center tracking-widest text-base focus:outline-none focus:border-[#D12053]"
                      />
                      <button
                        type="button"
                        onClick={() => setGatewayStep('pin')}
                        disabled={!mfsOtp}
                        className="w-full py-2 bg-[#D12053] hover:bg-[#b51845] text-white font-bold rounded-lg cursor-pointer disabled:opacity-50"
                      >
                        Verify OTP Code
                      </button>
                    </div>
                  )}

                  {gatewayStep === 'pin' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-slate-600">Enter Sandbox bKash PIN to authorize <strong>৳{cartTotal.toLocaleString()}</strong>:</p>
                        <button
                          type="button"
                          onClick={handleFillDemoPin}
                          className="text-[10px] text-[#D12053] font-bold underline cursor-pointer"
                        >
                          Auto-fill Demo PIN
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="password"
                          value={mfsPin}
                          onChange={e => setMfsPin(e.target.value)}
                          placeholder="4-digit Sandbox PIN"
                          maxLength={5}
                          className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg font-mono text-sm focus:outline-none focus:border-[#D12053]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={executePayment}
                        disabled={isVerifying || !mfsPin}
                        className="w-full py-2.5 bg-[#D12053] hover:bg-[#b51845] text-white font-bold rounded-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isVerifying ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Verifying Merchant API...</span>
                          </>
                        ) : (
                          <span>Authorize Payment (৳{cartTotal.toLocaleString()})</span>
                        )}
                      </button>
                    </div>
                  )}

                  <p className="text-[10px] text-slate-400 text-center">
                    bKash Sandbox API v1.2.0 · End-to-End SSL Encrypted
                  </p>
                </div>
              </div>
            )}

            {/* Nagad Hosted Gateway Sandbox Container */}
            {selectedMethod === 'nagad' && (
              <div className="border border-[#F7941D]/40 rounded-xl overflow-hidden shadow-xs">
                {/* Nagad Header */}
                <div className="bg-[#F7941D] text-white p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold tracking-wider">Nagad</span>
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded uppercase font-semibold">
                      Online Gateway Sandbox
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold">৳{cartTotal.toLocaleString()}</span>
                </div>

                <div className="p-4 bg-white space-y-3 text-xs">
                  {gatewayStep === 'phone' && (
                    <div className="space-y-3">
                      <p className="text-slate-600">Enter your <strong>Nagad Account Number</strong>:</p>
                      <input
                        type="text"
                        value={mfsPhone}
                        onChange={e => setMfsPhone(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-sm focus:outline-none focus:border-[#F7941D]"
                      />
                      <button
                        type="button"
                        onClick={() => setGatewayStep('otp')}
                        className="w-full py-2 bg-[#F7941D] hover:bg-[#e07f0f] text-white font-bold rounded-lg cursor-pointer"
                      >
                        Proceed to OTP
                      </button>
                    </div>
                  )}

                  {gatewayStep === 'otp' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-slate-600">Enter OTP sent via SMS:</p>
                        <button
                          type="button"
                          onClick={handleFillDemoOtp}
                          className="text-[10px] text-[#F7941D] font-bold underline cursor-pointer"
                        >
                          Auto-fill Demo OTP
                        </button>
                      </div>
                      <input
                        type="text"
                        value={mfsOtp}
                        onChange={e => setMfsOtp(e.target.value)}
                        placeholder="6-digit OTP code"
                        maxLength={6}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-center tracking-widest text-base focus:outline-none focus:border-[#F7941D]"
                      />
                      <button
                        type="button"
                        onClick={() => setGatewayStep('pin')}
                        disabled={!mfsOtp}
                        className="w-full py-2 bg-[#F7941D] hover:bg-[#e07f0f] text-white font-bold rounded-lg cursor-pointer disabled:opacity-50"
                      >
                        Verify OTP
                      </button>
                    </div>
                  )}

                  {gatewayStep === 'pin' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-slate-600">Enter 4-digit Sandbox Nagad PIN:</p>
                        <button
                          type="button"
                          onClick={handleFillDemoPin}
                          className="text-[10px] text-[#F7941D] font-bold underline cursor-pointer"
                        >
                          Auto-fill PIN
                        </button>
                      </div>
                      <input
                        type="password"
                        value={mfsPin}
                        onChange={e => setMfsPin(e.target.value)}
                        placeholder="PIN"
                        maxLength={5}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-sm focus:outline-none focus:border-[#F7941D]"
                      />
                      <button
                        type="button"
                        onClick={executePayment}
                        disabled={isVerifying || !mfsPin}
                        className="w-full py-2.5 bg-[#F7941D] hover:bg-[#e07f0f] text-white font-bold rounded-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isVerifying ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Verifying Nagad Payment...</span>
                          </>
                        ) : (
                          <span>Confirm Nagad Payment (৳{cartTotal.toLocaleString()})</span>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Cash on Delivery Container */}
            {selectedMethod === 'cod' && (
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-800">Cash on Delivery (ক্যাশ অন ডেলিভারি)</h4>
                    <p className="text-slate-500 leading-relaxed mt-0.5">
                      Pay total <strong>৳{cartTotal.toLocaleString()}</strong> in cash to the delivery rider upon inspecting your package.
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-amber-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>A verification SMS will be sent to <strong>{customerPhone}</strong> prior to dispatch.</span>
                </div>

                <button
                  type="button"
                  onClick={executePayment}
                  disabled={isVerifying}
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming Order...</span>
                    </>
                  ) : (
                    <span>Confirm Order with Cash on Delivery</span>
                  )}
                </button>
              </div>
            )}

            {/* Back Button */}
            <div className="pt-2 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Shipping Details</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Success Screen */}
        {step === 'success' && confirmedOrder && (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Order Placed Successfully!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Thank you for supporting authentic Bangladeshi vendors.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Order Reference</span>
                <span className="font-bold text-slate-900 font-mono">{confirmedOrder.orderId}</span>
              </div>
              {confirmedOrder.trxId && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Gateway Transaction ID</span>
                  <span className="font-bold text-emerald-700 font-mono">{confirmedOrder.trxId}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Mode</span>
                <span className="font-semibold text-slate-900 uppercase">{selectedMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Address</span>
                <span className="font-medium text-slate-800">{address}, {district}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="flex-1 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Track Order Status
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
