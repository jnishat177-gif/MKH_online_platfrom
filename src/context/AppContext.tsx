import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Product,
  CartItem,
  Order,
  OrderStatus,
  PaymentMethod,
  Coupon,
  NotificationItem,
  SellerProfile,
  MarketingCampaign
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_SELLERS,
  INITIAL_ORDERS,
  INITIAL_COUPONS,
  INITIAL_NOTIFICATIONS,
  ACTIVE_CAMPAIGN
} from '../data/mockData';
import jamdaniImg from '../assets/images/handicraft_jamdani_collection_1794475842819.jpg';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeStoreId: string;
  setActiveStoreId: (storeId: string) => void;
  sellers: SellerProfile[];
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  wishlist: string[];
  coupons: Coupon[];
  activeCoupon: Coupon | null;
  notifications: NotificationItem[];
  activeCampaign: MarketingCampaign;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;
  trackingOrder: Order | null;
  setTrackingOrder: (order: Order | null) => void;

  // Cart operations
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;

  // Coupon operations
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Order & Payment operations
  placeOrder: (shippingDetails: {
    name: string;
    phone: string;
    address: string;
    district: string;
    paymentMethod: PaymentMethod;
  }) => Promise<{ success: boolean; orderId: string; trxId?: string }>;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, courierNotes?: string) => void;
  requestRefund: (orderId: string, reason: string) => void;
  processRefund: (orderId: string, approve: boolean) => void;

  // Product management (Seller/Admin)
  addProduct: (productData: Partial<Product>) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  approveProduct: (productId: string, approved: boolean) => void;

  // Real-time notifications
  addNotification: (title: string, message: string, type: 'order' | 'marketing' | 'stock' | 'payment') => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Calculations
  cartSubtotal: number;
  cartDiscount: number;
  cartShippingFee: number;
  cartTotal: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('customer');
  const [activeStoreId, setActiveStoreId] = useState<string>('seller-1');
  const [sellers] = useState<SellerProfile[]>(INITIAL_SELLERS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['prod-1']);
  const [coupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeCampaign] = useState<MarketingCampaign>(ACTIVE_CAMPAIGN);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);

  // Periodic real-time marketing simulation (e.g. simulated live purchase notification or stock alert)
  useEffect(() => {
    const timer = setInterval(() => {
      const activities = [
        {
          title: 'Live Purchase Verified',
          message: 'Someone in Mirpur, Dhaka just ordered Pure Sundarbans Honey via bKash!',
          type: 'marketing' as const
        },
        {
          title: 'Flash Sale Hot Item',
          message: 'Royal Crimson Jamdani Saree has 2 new people viewing right now.',
          type: 'marketing' as const
        }
      ];
      const randomActivity = activities[Math.floor(Math.random() * activities.length)];
      // Append silently to recent notifications
      setNotifications(prev => [
        {
          id: `sim-${Date.now()}`,
          title: randomActivity.title,
          message: randomActivity.message,
          timestamp: 'Just now',
          read: false,
          type: randomActivity.type
        },
        ...prev.slice(0, 15)
      ]);
    }, 45000); // Every 45s

    return () => clearInterval(timer);
  }, []);

  const addNotification = (title: string, message: string, type: 'order' | 'marketing' | 'stock' | 'payment') => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    if (product.stock <= 0) {
      addNotification('Out of Stock', `${product.title} is currently out of stock.`, 'stock');
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
    });

    addNotification('Added to Bag', `${product.title} (x${quantity}) added to your shopping cart.`, 'marketing');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId) {
          const validQty = Math.min(quantity, item.product.stock);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Cart financial calculations
  const cartSubtotal = cart.reduce((acc, item) => {
    const unitPrice = item.product.isFlashDeal && item.product.flashDiscountPercent
      ? Math.round(item.product.priceBDT * (1 - item.product.flashDiscountPercent / 100))
      : item.product.priceBDT;
    return acc + unitPrice * item.quantity;
  }, 0);

  const cartDiscount = activeCoupon
    ? Math.min(
        Math.round((cartSubtotal * activeCoupon.discountPercent) / 100),
        activeCoupon.maxDiscountBDT
      )
    : 0;

  // Standard delivery: ৳60 inside Dhaka, free over ৳2,500 with FREESHIP coupon
  const cartShippingFee = cart.length === 0 ? 0 : (activeCoupon?.code === 'FREESHIP' ? 0 : 60);
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShippingFee);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = coupons.find(c => c.code === clean);
    if (!found) {
      return { success: false, message: 'Invalid promo code. Try DESHI20 or BKASH10.' };
    }
    if (cartSubtotal < found.minPurchaseBDT) {
      return {
        success: false,
        message: `Coupon requires minimum order of ৳${found.minPurchaseBDT}. Current subtotal: ৳${cartSubtotal}.`
      };
    }
    setActiveCoupon(found);
    addNotification('Coupon Applied', `Code "${found.code}" applied! You saved ৳${Math.min(Math.round((cartSubtotal * found.discountPercent) / 100), found.maxDiscountBDT)}.`, 'marketing');
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
  };

  // Order Placement
  const placeOrder = async (shippingDetails: {
    name: string;
    phone: string;
    address: string;
    district: string;
    paymentMethod: PaymentMethod;
  }) => {
    const orderId = `ORD-BD-${Math.floor(1000 + Math.random() * 9000)}`;
    const trxId =
      shippingDetails.paymentMethod === 'bkash'
        ? `BKSH${Math.random().toString(36).substring(2, 8).toUpperCase()}9`
        : shippingDetails.paymentMethod === 'nagad'
        ? `NGD${Math.random().toString(36).substring(2, 8).toUpperCase()}0`
        : undefined;

    const orderItems = cart.map(item => ({
      productId: item.product.id,
      productTitle: item.product.title,
      sellerId: item.product.sellerId,
      sellerName: item.product.sellerName,
      priceBDT: item.product.priceBDT,
      quantity: item.quantity,
      totalBDT: item.product.priceBDT * item.quantity,
      imageUrl: item.product.imageUrl
    }));

    const newOrder: Order = {
      id: orderId,
      customerId: 'cust-current',
      customerName: shippingDetails.name,
      customerPhone: shippingDetails.phone,
      shippingAddress: shippingDetails.address,
      district: shippingDetails.district,
      items: orderItems,
      subtotalBDT: cartSubtotal,
      discountBDT: cartDiscount,
      couponCode: activeCoupon?.code,
      shippingFeeBDT: cartShippingFee,
      totalBDT: cartTotal,
      paymentMethod: shippingDetails.paymentMethod,
      paymentStatus: shippingDetails.paymentMethod === 'cod' ? 'pending' : 'paid',
      transactionId: trxId,
      orderStatus: 'processing',
      courierNotes: 'Order received. Sent to seller sorting hub.',
      createdAt: new Date().toLocaleString(),
      estimatedDelivery: '3-4 Business Days'
    };

    // Decrement inventory stock
    setProducts(prevProducts =>
      prevProducts.map(p => {
        const orderedItem = cart.find(ci => ci.product.id === p.id);
        if (orderedItem) {
          const updatedStock = Math.max(0, p.stock - orderedItem.quantity);
          if (updatedStock <= p.lowStockThreshold) {
            addNotification(
              'Low Stock Warning',
              `${p.title} has only ${updatedStock} units left in warehouse!`,
              'stock'
            );
          }
          return { ...p, stock: updatedStock };
        }
        return p;
      })
    );

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setIsPaymentModalOpen(false);

    addNotification(
      'Order Confirmed!',
      `Order #${orderId} confirmed via ${shippingDetails.paymentMethod.toUpperCase()}. Total: ৳${newOrder.totalBDT}.`,
      'order'
    );

    setTrackingOrder(newOrder);

    return { success: true, orderId, trxId };
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, courierNotes?: string) => {
    setOrders(prev =>
      prev.map(ord =>
        ord.id === orderId
          ? {
              ...ord,
              orderStatus: newStatus,
              courierNotes: courierNotes || ord.courierNotes
            }
          : ord
      )
    );
    addNotification(
      'Order Updated',
      `Order #${orderId} status changed to "${newStatus.replace(/_/g, ' ').toUpperCase()}".`,
      'order'
    );
  };

  const requestRefund = (orderId: string, reason: string) => {
    setOrders(prev =>
      prev.map(ord =>
        ord.id === orderId
          ? {
              ...ord,
              orderStatus: 'refund_requested',
              returnReason: reason
            }
          : ord
      )
    );
    addNotification(
      'Refund Requested',
      `Refund claim submitted for Order #${orderId}. Reason: ${reason}`,
      'order'
    );
  };

  const processRefund = (orderId: string, approve: boolean) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            orderStatus: approve ? 'refunded' : 'processing',
            paymentStatus: approve ? 'refunded' : ord.paymentStatus,
            courierNotes: approve ? 'Refund processed via bKash Gateway' : 'Refund request declined by store manager'
          };
        }
        return ord;
      })
    );
    addNotification(
      'Refund Resolved',
      `Order #${orderId} refund ${approve ? 'Approved & Disbursed' : 'Rejected'}.`,
      'payment'
    );
  };

  // Product management
  const addProduct = (productData: Partial<Product>) => {
    const currentSeller = sellers.find(s => s.id === activeStoreId) || sellers[0];
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      sellerId: currentSeller.id,
      sellerName: currentSeller.storeName,
      title: productData.title || 'Untitled Product',
      category: productData.category || 'Fashion & Handlooms',
      description: productData.description || '',
      priceBDT: productData.priceBDT || 500,
      originalPriceBDT: productData.originalPriceBDT,
      discountPercentage: productData.discountPercentage || 0,
      stock: productData.stock || 10,
      lowStockThreshold: productData.lowStockThreshold || 3,
      rating: 5.0,
      reviewCount: 0,
      imageUrl: productData.imageUrl || jamdaniImg,
      tags: productData.tags || ['Deshi', 'Authentic'],
      isApproved: true,
      origin: productData.origin || 'Dhaka',
      viewsCount: 1,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [newProd, ...prev]);
    addNotification('Product Created', `${newProd.title} published to your storefront.`, 'stock');
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    addNotification('Product Removed', `Product removed from store.`, 'stock');
  };

  const approveProduct = (productId: string, approved: boolean) => {
    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, isApproved: approved } : p))
    );
    addNotification('Admin Action', `Product #${productId} ${approved ? 'approved' : 'rejected'}.`, 'order');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeStoreId,
        setActiveStoreId,
        sellers,
        products,
        orders,
        cart,
        wishlist,
        coupons,
        activeCoupon,
        notifications,
        activeCampaign,
        isCartOpen,
        setIsCartOpen,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        selectedProductForDetail,
        setSelectedProductForDetail,
        trackingOrder,
        setTrackingOrder,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        applyCoupon,
        removeCoupon,
        placeOrder,
        updateOrderStatus,
        requestRefund,
        processRefund,
        addProduct,
        updateProduct,
        deleteProduct,
        approveProduct,
        addNotification,
        markNotificationRead,
        markAllNotificationsRead,
        cartSubtotal,
        cartDiscount,
        cartShippingFee,
        cartTotal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
