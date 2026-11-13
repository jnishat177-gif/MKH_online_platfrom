export type UserRole = 'customer' | 'seller' | 'admin' | 'delivery' | 'cse_hub' | 'thesis_report';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  storeId?: string;
  district?: string;
  joinedDate: string;
}

export interface SellerProfile {
  id: string;
  userId: string;
  storeName: string;
  storeSlug: string;
  rating: number;
  totalSalesCount: number;
  totalRevenueBDT: number;
  balanceBDT: number;
  verified: boolean;
  contactNumber: string;
  district: string;
  logo: string;
  description: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  banglaName: string;
  slug: string;
  iconName: string;
  productCount: number;
}

export interface Product {
  id: string;
  sellerId: string;
  sellerName: string;
  title: string;
  category: string;
  description: string;
  priceBDT: number;
  originalPriceBDT?: number;
  discountPercentage?: number;
  stock: number;
  lowStockThreshold: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  tags: string[];
  isApproved: boolean;
  isFlashDeal?: boolean;
  flashDiscountPercent?: number;
  origin: string; // e.g. "Tangail", "Rajshahi", "Dhaka", "Sundarbans"
  viewsCount: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'picked_by_courier' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'refund_requested' | 'refunded';

export type PaymentMethod = 'bkash' | 'nagad' | 'cod';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderItem {
  productId: string;
  productTitle: string;
  sellerId: string;
  sellerName: string;
  priceBDT: number;
  quantity: number;
  totalBDT: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  district: string;
  items: OrderItem[];
  subtotalBDT: number;
  discountBDT: number;
  couponCode?: string;
  shippingFeeBDT: number;
  totalBDT: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionId?: string;
  orderStatus: OrderStatus;
  deliveryManagerId?: string;
  courierNotes?: string;
  createdAt: string;
  estimatedDelivery: string;
  returnReason?: string;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscountBDT: number;
  minPurchaseBDT: number;
  expiresAt: string;
  description: string;
  usageCount: number;
}

export interface MarketingCampaign {
  id: string;
  title: string;
  subtitle: string;
  discountBadge: string;
  bannerType: 'flash_sale' | 'seasonal' | 'festival';
  bannerBg: string;
  endsAt: string;
  active: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'order' | 'marketing' | 'stock' | 'payment';
  linkTo?: string;
}
