import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Flame, Clock, Copy, Check, Users } from 'lucide-react';

export const MarketingBanner: React.FC = () => {
  const { activeCampaign, applyCoupon } = useApp();
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });
  const [activeShoppers, setActiveShoppers] = useState(384);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    const shopperTimer = setInterval(() => {
      setActiveShoppers(prev => Math.floor(350 + Math.random() * 80));
    }, 12000);

    return () => {
      clearInterval(timer);
      clearInterval(shopperTimer);
    };
  }, []);

  const handleCopyCoupon = () => {
    navigator.clipboard?.writeText('DESHI20');
    setCopied(true);
    applyCoupon('DESHI20');
    setTimeout(() => setCopied(false), 2500);
  };

  if (!activeCampaign.active) return null;

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Campaign badge & description */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>FLASH DEAL</span>
          </div>
          <p className="font-medium text-slate-200">
            {activeCampaign.title} <span className="hidden sm:inline text-slate-400">· {activeCampaign.subtitle}</span>
          </p>
        </div>

        {/* Center / Right: Countdown timer & Coupon promo button */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Active Shoppers */}
          <div className="hidden lg:flex items-center gap-1.5 text-slate-400 text-[11px]">
            <Users className="w-3 h-3 text-emerald-400" />
            <span><strong className="text-slate-200">{activeShoppers}</strong> shopping online</span>
          </div>

          {/* Flash Sale Countdown */}
          <div className="flex items-center gap-1.5 text-slate-300 font-mono text-[11px] tabular-nums">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Ends in</span>
            <span className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300 font-semibold">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>

          {/* Coupon Quick Copy */}
          <button
            onClick={handleCopyCoupon}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded font-medium transition-colors cursor-pointer"
            title="Click to apply DESHI20 coupon"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-white" />
                <span>Applied 20% Off!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-emerald-200" />
                <span>Use Code <strong>DESHI20</strong></span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
