import { Product, ProductCategory, SellerProfile, Order, Coupon, MarketingCampaign, NotificationItem } from '../types';

import jamdaniImg from '../assets/images/handicraft_jamdani_collection_1794475842819.jpg';
import honeyImg from '../assets/images/organic_deshi_agro_honey_1794475843049.jpg';
import techGadgetsImg from '../assets/images/bangladesh_tech_gadgets_1794475843137.jpg';
import groceryImg from '../assets/images/grocery_pantry_bundle_1794543632319.jpg';
import cosmeticImg from '../assets/images/luxury_cosmetic_skincare_1794543633073.jpg';
import furnitureImg from '../assets/images/teak_wood_furniture_1794543633471.jpg';
import electronicsImg from '../assets/images/smart_kitchen_electronics_1794543633677.jpg';
import ladiesDressImg from '../assets/images/ladies_onepiece_dress_1794543634104.jpg';

export const INITIAL_CATEGORIES: ProductCategory[] = [
  { id: 'cat-grocery', name: 'Grocery & Essentials', banglaName: 'মুদি ও নিত্যপ্রয়োজনীয় পণ্য', slug: 'grocery-essentials', iconName: 'ShoppingBasket', productCount: 64 },
  { id: 'cat-cosmetics', name: 'Cosmetics & Skincare', banglaName: 'কসমেটিক্স ও রূপচর্চা', slug: 'cosmetics-skincare', iconName: 'Sparkles', productCount: 48 },
  { id: 'cat-furniture', name: 'Furniture & Living', banglaName: 'আসবাবপত্র ও হোম ডেকোর', slug: 'furniture-living', iconName: 'Armchair', productCount: 27 },
  { id: 'cat-electronics', name: 'Electronics & Appliances', banglaName: 'ইলেকট্রনিক্স ও গ্যাজেট', slug: 'electronics-appliances', iconName: 'Smartphone', productCount: 56 },
  { id: 'cat-ladies-dress', name: 'Ladies Dress & One-Piece', banglaName: 'লেডিস ড্রেস ও ওয়ান-পিস', slug: 'ladies-dress-one-piece', iconName: 'Shirt', productCount: 52 },
  { id: 'cat-fashion', name: 'Fashion & Handlooms', banglaName: 'তাঁত ও ঐতিহ্যবাহী পোশাক', slug: 'fashion-handlooms', iconName: 'Shirt', productCount: 42 },
  { id: 'cat-organic', name: 'Organic Agro & Food', banglaName: 'খাঁটি দেশীয় খাদ্যপণ্য', slug: 'organic-agro', iconName: 'Apple', productCount: 38 },
  { id: 'cat-handicrafts', name: 'Artisanal Handicrafts', banglaName: 'নকশিকাঁথা ও মৃৎশিল্প', slug: 'artisanal-handicrafts', iconName: 'Palette', productCount: 29 }
];

export const INITIAL_SELLERS: SellerProfile[] = [
  {
    id: 'seller-1',
    userId: 'user-seller-1',
    storeName: 'Dhakaiya Weavers & Nari Boutique',
    storeSlug: 'dhakaiya-weavers',
    rating: 4.9,
    totalSalesCount: 495,
    totalRevenueBDT: 894000,
    balanceBDT: 112450,
    verified: true,
    contactNumber: '+880 1712-345678',
    district: 'Narayanganj & Dhaka',
    logo: '🧶',
    description: 'Heritage handloom weavers & ladies fashion boutique specializing in Authentic Dhakai Jamdani, Embroidered One-Piece Kurtis, and Nakshi Kantha.'
  },
  {
    id: 'seller-2',
    userId: 'user-seller-2',
    storeName: 'Dhaka Daily Mart & Sundarbans Agro',
    storeSlug: 'dhaka-daily-mart',
    rating: 4.8,
    totalSalesCount: 920,
    totalRevenueBDT: 785000,
    balanceBDT: 94200,
    verified: true,
    contactNumber: '+880 1819-876543',
    district: 'Khulna & Dhaka',
    logo: '🌿',
    description: 'Daily Bangladeshi grocery essentials, premium Miniket & Basmati rice, lentils, spices, cold-pressed mustard oil, and Sundarbans wild raw honey.'
  },
  {
    id: 'seller-3',
    userId: 'user-seller-3',
    storeName: 'Bengal Smart Electronics & Living',
    storeSlug: 'bengal-smart-tech',
    rating: 4.8,
    totalSalesCount: 1140,
    totalRevenueBDT: 2150000,
    balanceBDT: 234000,
    verified: true,
    contactNumber: '+880 1911-223344',
    district: 'Motijheel & Uttara, Dhaka',
    logo: '⚡',
    description: 'Authorized distributor of smart kitchen electronics, ANC earbuds, smartwatches, plus handcrafted Chittagong Segun wood furniture.'
  },
  {
    id: 'seller-4',
    userId: 'user-seller-4',
    storeName: 'Aurora Cosmetics & Beauty Studio',
    storeSlug: 'aurora-cosmetics',
    rating: 4.9,
    totalSalesCount: 640,
    totalRevenueBDT: 540000,
    balanceBDT: 78500,
    verified: true,
    contactNumber: '+880 1614-556677',
    district: 'Banani, Dhaka',
    logo: '✨',
    description: 'Dermatologist-tested skincare serums, rosewater facial mists, hydrating moisturizers, and authentic halal cosmetics.'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-grocery-1',
    sellerId: 'seller-2',
    sellerName: 'Dhaka Daily Mart & Sundarbans Agro',
    title: 'Monthly Family Grocery Pantry Bundle (Basmati Rice, Moshur Dal, Mustard Oil & Spices)',
    category: 'Grocery & Essentials',
    description: 'Complete monthly kitchen grocery pack including 5kg fragrant aged Basmati rice, 2kg premium Deshi Moshur Dal, 1L pure mustard oil, cumin, cardamom, cinnamon, and dried red chilies.',
    priceBDT: 1850,
    originalPriceBDT: 2200,
    discountPercentage: 16,
    stock: 34,
    lowStockThreshold: 8,
    rating: 4.9,
    reviewCount: 145,
    imageUrl: groceryImg,
    tags: ['Grocery', 'Rice & Dal', 'Spices', 'Daily Needs'],
    isApproved: true,
    isFlashDeal: true,
    flashDiscountPercent: 16,
    origin: 'Bogura & Dhaka Hub',
    viewsCount: 4120,
    createdAt: '2026-11-09'
  },
  {
    id: 'prod-cosmetic-1',
    sellerId: 'seller-4',
    sellerName: 'Aurora Cosmetics & Beauty Studio',
    title: 'Aurora 15% Vitamin C Glow Serum, Daily Moisturizer & Damask Rosewater Mist Kit',
    category: 'Cosmetics & Skincare',
    description: '3-step daily brightening cosmetic skincare set formulated with stabilized 15% Vitamin C, Hyaluronic hydration cream, and pure Damask Rosewater & Aloe facial mist for radiant skin.',
    priceBDT: 2190,
    originalPriceBDT: 2750,
    discountPercentage: 20,
    stock: 16,
    lowStockThreshold: 5,
    rating: 4.9,
    reviewCount: 98,
    imageUrl: cosmeticImg,
    tags: ['Cosmetics', 'Vitamin C Serum', 'Skincare', 'Moisturizer'],
    isApproved: true,
    isFlashDeal: true,
    flashDiscountPercent: 20,
    origin: 'Banani, Dhaka',
    viewsCount: 3560,
    createdAt: '2026-11-09'
  },
  {
    id: 'prod-furniture-1',
    sellerId: 'seller-3',
    sellerName: 'Bengal Smart Electronics & Living',
    title: 'Handcrafted Chittagong Segun Teak Wood & Woven Cane Lounge Chair',
    category: 'Furniture & Living',
    description: 'Solid seasoned Chittagong Segun (Teak) wood frame finished in natural matte oil, paired with breathable hand-woven cane backrest and thick organic linen seat cushion.',
    priceBDT: 14500,
    originalPriceBDT: 17500,
    discountPercentage: 17,
    stock: 5,
    lowStockThreshold: 3,
    rating: 4.9,
    reviewCount: 41,
    imageUrl: furnitureImg,
    tags: ['Furniture', 'Teak Wood', 'Lounge Chair', 'Living Room'],
    isApproved: true,
    isFlashDeal: false,
    origin: 'Chattogram Timber Workshop',
    viewsCount: 2190,
    createdAt: '2026-11-10'
  },
  {
    id: 'prod-electronics-1',
    sellerId: 'seller-3',
    sellerName: 'Bengal Smart Electronics & Living',
    title: 'Aura Digital Touch Air Fryer (5.5L) & Precision Stainless Electric Kettle Combo',
    category: 'Electronics & Appliances',
    description: 'Oil-free 1700W digital LED touchscreen air fryer with 8 preset cooking modes paired with a 1500W temperature-controlled stainless steel gooseneck kettle. 2-year official warranty.',
    priceBDT: 8950,
    originalPriceBDT: 11200,
    discountPercentage: 20,
    stock: 9,
    lowStockThreshold: 4,
    rating: 4.8,
    reviewCount: 73,
    imageUrl: electronicsImg,
    tags: ['Electronics', 'Air Fryer', 'Kitchen Appliance', 'Kettle'],
    isApproved: true,
    isFlashDeal: true,
    flashDiscountPercent: 20,
    origin: 'Motijheel, Dhaka',
    viewsCount: 3180,
    createdAt: '2026-11-10'
  },
  {
    id: 'prod-dress-1',
    sellerId: 'seller-1',
    sellerName: 'Dhakaiya Weavers & Nari Boutique',
    title: 'Sage Green Floral Thread-Embroidered Pure Cotton Ladies One-Piece Kurti Dress',
    category: 'Ladies Dress & One-Piece',
    description: 'Breathable 100% soft slub cotton ladies one-piece kurti featuring intricate white Chikankari-inspired neckline and sleeve embroidery with pearl button placket. Sizes S to XXL.',
    priceBDT: 1690,
    originalPriceBDT: 2100,
    discountPercentage: 19,
    stock: 22,
    lowStockThreshold: 6,
    rating: 4.9,
    reviewCount: 132,
    imageUrl: ladiesDressImg,
    tags: ['Ladies Dress', 'One Piece', 'Kurti', 'Cotton Embroidery'],
    isApproved: true,
    isFlashDeal: true,
    flashDiscountPercent: 19,
    origin: 'Dhanmondi Studio, Dhaka',
    viewsCount: 4890,
    createdAt: '2026-11-11'
  },
  {
    id: 'prod-1',
    sellerId: 'seller-1',
    sellerName: 'Dhakaiya Weavers & Nari Boutique',
    title: 'Authentic 84-Count Royal Crimson Dhakai Jamdani Saree',
    category: 'Fashion & Handlooms',
    description: 'Exquisitely handcrafted traditional Dhakai Jamdani woven with pure cotton warp and glistening gold zari floral kalgi motifs. Takes 28 days for artisan weavers to complete.',
    priceBDT: 8490,
    originalPriceBDT: 9990,
    discountPercentage: 15,
    stock: 4,
    lowStockThreshold: 5,
    rating: 4.9,
    reviewCount: 48,
    imageUrl: jamdaniImg,
    tags: ['Jamdani', 'Wedding', 'Heritage', 'Handloom'],
    isApproved: true,
    isFlashDeal: true,
    flashDiscountPercent: 20,
    origin: 'Rupganj, Narayanganj',
    viewsCount: 1420,
    createdAt: '2026-11-01'
  },
  {
    id: 'prod-2',
    sellerId: 'seller-2',
    sellerName: 'Dhaka Daily Mart & Sundarbans Agro',
    title: 'Pure Wild Sundarbans Mangrove Honey (450g Premium Jar)',
    category: 'Organic Agro & Food',
    description: 'Raw, unheated, and unfiltered pure Khalisha flower honey sustainably harvested by traditional Mouwals of the Sundarbans mangrove forest. Natural amber color and rich floral aroma.',
    priceBDT: 780,
    originalPriceBDT: 950,
    discountPercentage: 18,
    stock: 19,
    lowStockThreshold: 10,
    rating: 4.9,
    reviewCount: 112,
    imageUrl: honeyImg,
    tags: ['Sundarbans', 'Raw Honey', 'Organic', 'Immunity'],
    isApproved: true,
    isFlashDeal: true,
    flashDiscountPercent: 18,
    origin: 'Sundarbans, Khulna',
    viewsCount: 2310,
    createdAt: '2026-11-03'
  },
  {
    id: 'prod-3',
    sellerId: 'seller-3',
    sellerName: 'Bengal Smart Electronics & Living',
    title: 'Aura Pro ANC Wireless Earbuds with Low-Latency Gaming Mode',
    category: 'Electronics & Appliances',
    description: 'Active Noise Cancellation up to 35dB, quad-mic ENC for crystal-clear phone calls in noisy Dhaka traffic, 38-hour battery with quick Type-C fast charging.',
    priceBDT: 2450,
    originalPriceBDT: 3200,
    discountPercentage: 23,
    stock: 3, // LOW STOCK ALERT
    lowStockThreshold: 6,
    rating: 4.7,
    reviewCount: 86,
    imageUrl: techGadgetsImg,
    tags: ['ANC', 'Earbuds', 'Gaming', 'Wireless'],
    isApproved: true,
    isFlashDeal: true,
    flashDiscountPercent: 25,
    origin: 'Dhaka Warehouse',
    viewsCount: 3840,
    createdAt: '2026-11-05'
  },
  {
    id: 'prod-4',
    sellerId: 'seller-1',
    sellerName: 'Dhakaiya Weavers & Nari Boutique',
    title: 'Hand-Embroidered Nakshi Kantha Double Bedspread (Traditional Motif)',
    category: 'Artisanal Handicrafts',
    description: 'Handcrafted by rural women artisans of Jessore using pure layered cotton and organic thread, displaying folklore village scenes and lotus patterns.',
    priceBDT: 3850,
    originalPriceBDT: 4500,
    discountPercentage: 14,
    stock: 8,
    lowStockThreshold: 4,
    rating: 4.8,
    reviewCount: 34,
    imageUrl: jamdaniImg,
    tags: ['Nakshi Kantha', 'Handmade', 'Jessore', 'Home Decor'],
    isApproved: true,
    isFlashDeal: false,
    origin: 'Jessore',
    viewsCount: 890,
    createdAt: '2026-11-06'
  },
  {
    id: 'prod-5',
    sellerId: 'seller-2',
    sellerName: 'Dhaka Daily Mart & Sundarbans Agro',
    title: 'Cold-Pressed Raw Yellow Mustard Oil (Ghani Vanga 1 Liter)',
    category: 'Grocery & Essentials',
    description: 'Extracted using traditional wooden Ghani at low temperatures to preserve natural pungent aroma, omega-3 fatty acids, and authentic deshi flavor.',
    priceBDT: 460,
    originalPriceBDT: 520,
    discountPercentage: 11,
    stock: 45,
    lowStockThreshold: 15,
    rating: 4.8,
    reviewCount: 77,
    imageUrl: groceryImg,
    tags: ['Mustard Oil', 'Ghani', 'Grocery', 'Cooking'],
    isApproved: true,
    isFlashDeal: false,
    origin: 'Sirajganj',
    viewsCount: 1650,
    createdAt: '2026-11-07'
  },
  {
    id: 'prod-6',
    sellerId: 'seller-3',
    sellerName: 'Bengal Smart Electronics & Living',
    title: 'Titanium Smart Watch Series 9 with Bangla Font & AMOLED Display',
    category: 'Electronics & Appliances',
    description: '1.96-inch high-brightness AMOLED display with native Bangla notification rendering, 24/7 SpO2 and Heart Rate monitoring, Bluetooth calling, and IP68 waterproof rating.',
    priceBDT: 3890,
    originalPriceBDT: 4800,
    discountPercentage: 19,
    stock: 12,
    lowStockThreshold: 5,
    rating: 4.6,
    reviewCount: 64,
    imageUrl: techGadgetsImg,
    tags: ['Smartwatch', 'Bangla Font', 'AMOLED', 'Electronics'],
    isApproved: true,
    isFlashDeal: true,
    flashDiscountPercent: 20,
    origin: 'Dhaka Warehouse',
    viewsCount: 2950,
    createdAt: '2026-11-08'
  },
  {
    id: 'prod-cosmetic-2',
    sellerId: 'seller-4',
    sellerName: 'Aurora Cosmetics & Beauty Studio',
    title: 'Damask Rose & Hyaluronic Hydrating Facial Mist + Lip Tint Duo',
    category: 'Cosmetics & Skincare',
    description: 'Alcohol-free botanical rosewater mist paired with a sheer moisturizing rose-berry lip tint for all-day hydration in humid weather.',
    priceBDT: 1150,
    originalPriceBDT: 1400,
    discountPercentage: 18,
    stock: 28,
    lowStockThreshold: 7,
    rating: 4.8,
    reviewCount: 54,
    imageUrl: cosmeticImg,
    tags: ['Rosewater', 'Cosmetics', 'Hydration', 'Lip Care'],
    isApproved: true,
    isFlashDeal: false,
    origin: 'Banani, Dhaka',
    viewsCount: 1740,
    createdAt: '2026-11-11'
  },
  {
    id: 'prod-furniture-2',
    sellerId: 'seller-3',
    sellerName: 'Bengal Smart Electronics & Living',
    title: 'Minimalist Solid Teak Wood Side & Coffee Table with Matte Finish',
    category: 'Furniture & Living',
    description: 'Hand-joined solid teak wood living room side table with smooth beveled edges and water-resistant natural lacquer coat.',
    priceBDT: 6800,
    originalPriceBDT: 8200,
    discountPercentage: 17,
    stock: 7,
    lowStockThreshold: 3,
    rating: 4.7,
    reviewCount: 29,
    imageUrl: furnitureImg,
    tags: ['Coffee Table', 'Furniture', 'Solid Wood', 'Home'],
    isApproved: true,
    isFlashDeal: false,
    origin: 'Chattogram Workshop',
    viewsCount: 1290,
    createdAt: '2026-11-11'
  },
  {
    id: 'prod-dress-2',
    sellerId: 'seller-1',
    sellerName: 'Dhakaiya Weavers & Nari Boutique',
    title: 'Pastel Olive Linen A-Line Casual Ladies One-Piece Tunic',
    category: 'Ladies Dress & One-Piece',
    description: 'Lightweight breathable linen-cotton blend ladies one-piece tunic with delicate lace trim, pockets, and tailored three-quarter sleeves.',
    priceBDT: 1450,
    originalPriceBDT: 1800,
    discountPercentage: 19,
    stock: 14,
    lowStockThreshold: 5,
    rating: 4.8,
    reviewCount: 61,
    imageUrl: ladiesDressImg,
    tags: ['Ladies Dress', 'One Piece', 'Linen Tunic', 'Womenswear'],
    isApproved: true,
    isFlashDeal: false,
    origin: 'Uttara, Dhaka',
    viewsCount: 2150,
    createdAt: '2026-11-12'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'DESHI20',
    discountPercent: 20,
    maxDiscountBDT: 500,
    minPurchaseBDT: 1500,
    expiresAt: '2026-12-31',
    description: 'Flat 20% off on all authentic MarketingHub Online Platform products.',
    usageCount: 142
  },
  {
    code: 'BKASH10',
    discountPercent: 10,
    maxDiscountBDT: 300,
    minPurchaseBDT: 1000,
    expiresAt: '2026-12-15',
    description: 'Special 10% instant rebate on bKash merchant checkout.',
    usageCount: 310
  },
  {
    code: 'FREESHIP',
    discountPercent: 100, // Covers shipping
    maxDiscountBDT: 120,
    minPurchaseBDT: 2500,
    expiresAt: '2026-11-30',
    description: 'Free home delivery all across Bangladesh on orders above ৳2,500.',
    usageCount: 89
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-BD-8901',
    customerId: 'cust-1',
    customerName: 'Tanvir Hossain',
    customerPhone: '01711-987654',
    shippingAddress: 'House 42, Road 11, Banani Block D',
    district: 'Dhaka',
    items: [
      {
        productId: 'prod-2',
        productTitle: 'Pure Wild Sundarbans Mangrove Honey (450g Premium Jar)',
        sellerId: 'seller-2',
        sellerName: 'Dhaka Daily Mart & Sundarbans Agro',
        priceBDT: 780,
        quantity: 2,
        totalBDT: 1560,
        imageUrl: honeyImg
      }
    ],
    subtotalBDT: 1560,
    discountBDT: 156,
    couponCode: 'BKASH10',
    shippingFeeBDT: 60,
    totalBDT: 1464,
    paymentMethod: 'bkash',
    paymentStatus: 'paid',
    transactionId: 'BKSH9A7B3X91',
    orderStatus: 'out_for_delivery',
    deliveryManagerId: 'dm-1',
    courierNotes: 'Assigned to Pathao Courier partner. Delivery in progress.',
    createdAt: '2026-11-11 14:20',
    estimatedDelivery: '2026-11-12'
  },
  {
    id: 'ORD-BD-8902',
    customerId: 'cust-2',
    customerName: 'Nusrat Jahan',
    customerPhone: '01822-456789',
    shippingAddress: 'Nasirabad Housing Society, Lane 3',
    district: 'Chattogram',
    items: [
      {
        productId: 'prod-1',
        productTitle: 'Authentic 84-Count Royal Crimson Dhakai Jamdani Saree',
        sellerId: 'seller-1',
        sellerName: 'Dhakaiya Weavers & Nari Boutique',
        priceBDT: 8490,
        quantity: 1,
        totalBDT: 8490,
        imageUrl: jamdaniImg
      }
    ],
    subtotalBDT: 8490,
    discountBDT: 500,
    couponCode: 'DESHI20',
    shippingFeeBDT: 120,
    totalBDT: 8110,
    paymentMethod: 'nagad',
    paymentStatus: 'paid',
    transactionId: 'NGD88F231K0',
    orderStatus: 'processing',
    deliveryManagerId: 'dm-1',
    courierNotes: 'Seller packaging in progress. Fragile textile seal applied.',
    createdAt: '2026-11-11 18:45',
    estimatedDelivery: '2026-11-14'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Flash Sale Live Now!',
    message: 'Exclusive 20% discount on Jamdani sarees & Sundarbans organic honey. Limited time!',
    timestamp: '5m ago',
    read: false,
    type: 'marketing'
  },
  {
    id: 'notif-2',
    title: 'Low Stock Alert',
    message: 'Aura Pro ANC Earbuds have only 3 items left in inventory. Order soon!',
    timestamp: '18m ago',
    read: false,
    type: 'stock'
  },
  {
    id: 'notif-3',
    title: 'bKash Merchant Verified',
    message: 'Order #ORD-BD-8901 payment of ৳1,464 verified via bKash sandbox API.',
    timestamp: '1h ago',
    read: true,
    type: 'payment'
  }
];

export const ACTIVE_CAMPAIGN: MarketingCampaign = {
  id: 'camp-bijoy',
  title: 'Bijoy Mela Flash Festival 2026',
  subtitle: 'Up to 25% Instant Discount with bKash & Nagad Online Checkout',
  discountBadge: 'FLASH DEAL',
  bannerType: 'flash_sale',
  bannerBg: 'from-emerald-950 via-slate-900 to-rose-950',
  endsAt: '2026-11-15 23:59:59',
  active: true
};

// Database Schema Tables defined in the roadmap
export const DATABASE_TABLES_SCHEMA = [
  {
    tableName: 'Users',
    purpose: 'Stores authentication credentials, contact, and system role (Customer, Seller, Admin, Delivery)',
    columns: ['id (UUID, PK)', 'email (VARCHAR, Unique)', 'password_hash (VARCHAR)', 'name (VARCHAR)', 'phone (VARCHAR)', 'role (ENUM)', 'is_active (BOOLEAN)', 'created_at (TIMESTAMP)']
  },
  {
    tableName: 'Seller_Profile',
    purpose: 'Stores multi-vendor store credentials, business documents, ratings, and balance',
    columns: ['id (UUID, PK)', 'user_id (UUID, FK -> Users.id)', 'store_name (VARCHAR)', 'trade_license (VARCHAR)', 'district (VARCHAR)', 'rating (DECIMAL)', 'balance_bdt (DECIMAL)', 'verified (BOOLEAN)']
  },
  {
    tableName: 'Categories',
    purpose: 'Product taxonomies, nested subcategories, and search slugs',
    columns: ['id (UUID, PK)', 'name (VARCHAR)', 'bangla_name (VARCHAR)', 'slug (VARCHAR, Unique)', 'icon (VARCHAR)', 'parent_id (UUID, Nullable FK)']
  },
  {
    tableName: 'Products',
    purpose: 'Product catalog records with vendor association and pricing',
    columns: ['id (UUID, PK)', 'seller_id (UUID, FK -> Seller_Profile.id)', 'category_id (UUID, FK)', 'title (VARCHAR)', 'description (TEXT)', 'price_bdt (DECIMAL)', 'discount_percent (INTEGER)', 'is_approved (BOOLEAN)']
  },
  {
    tableName: 'Product_Inventory',
    purpose: 'Real-time stock ledger, reservations during checkout, and low stock alert thresholds',
    columns: ['id (UUID, PK)', 'product_id (UUID, FK -> Products.id)', 'stock_qty (INTEGER)', 'reserved_qty (INTEGER)', 'low_stock_threshold (INTEGER)', 'last_restocked (TIMESTAMP)']
  },
  {
    tableName: 'Cart & Cart_Items',
    purpose: 'Customer active shopping session, item quantities, and selected variants',
    columns: ['id (UUID, PK)', 'cart_id (UUID, FK)', 'product_id (UUID, FK)', 'seller_id (UUID, FK)', 'quantity (INTEGER)', 'unit_price_bdt (DECIMAL)']
  },
  {
    tableName: 'Orders & Order_Items',
    purpose: 'Customer orders with vendor-item segregation for multi-seller fulfillment',
    columns: ['id (UUID, PK)', 'order_id (UUID, FK)', 'seller_id (UUID, FK)', 'product_id (UUID, FK)', 'quantity (INTEGER)', 'item_status (ENUM: pending/processing/dispatched)', 'total_bdt (DECIMAL)']
  },
  {
    tableName: 'Payments & Payment_Logs',
    purpose: 'bKash/Nagad gateway transaction verification, idempotency key, and audit trail',
    columns: ['id (UUID, PK)', 'order_id (UUID, FK)', 'gateway (ENUM: bkash/nagad/cod)', 'transaction_id (VARCHAR)', 'amount_bdt (DECIMAL)', 'status (ENUM: success/failed/refunded)', 'server_verified (BOOLEAN)']
  },
  {
    tableName: 'Shipments',
    purpose: 'Courier tracking, delivery manager assignment, dispatch logs, and proof of delivery',
    columns: ['id (UUID, PK)', 'order_id (UUID, FK)', 'courier_partner (VARCHAR)', 'tracking_code (VARCHAR)', 'delivery_status (ENUM)', 'delivery_manager_id (UUID, FK)', 'updated_at (TIMESTAMP)']
  },
  {
    tableName: 'Returns & Refunds',
    purpose: 'Customer return claims, evidence upload, seller review, and payment refund processing',
    columns: ['id (UUID, PK)', 'order_id (UUID, FK)', 'customer_id (UUID, FK)', 'reason (TEXT)', 'status (ENUM: pending/approved/rejected)', 'refund_transaction_id (VARCHAR)', 'processed_at (TIMESTAMP)']
  },
  {
    tableName: 'Campaigns & Coupons',
    purpose: 'Real-time marketing engine, flash sales, promo codes, and discount thresholds',
    columns: ['code (VARCHAR, PK)', 'discount_percent (INTEGER)', 'max_discount_bdt (DECIMAL)', 'min_order_bdt (DECIMAL)', 'expires_at (TIMESTAMP)', 'usage_limit (INTEGER)']
  },
  {
    tableName: 'Notifications',
    purpose: 'Real-time socket events for stock drops, order confirmation, and payment receipts',
    columns: ['id (UUID, PK)', 'user_id (UUID, FK)', 'type (VARCHAR)', 'title (VARCHAR)', 'payload (JSONB)', 'is_read (BOOLEAN)', 'created_at (TIMESTAMP)']
  }
];

// 11-Phase Project Roadmap with detailed checklist
export const ROADMAP_PHASES = [
  {
    phase: 1,
    title: 'Project Planning & ER Modeling',
    duration: 'Week 1',
    description: 'System requirement analysis, UML Use Case Diagrams, 20-table Relational ER Model, and architectural specifications.',
    status: 'completed',
    items: ['Define Customer, Seller, Admin, Delivery roles', 'Design 20 relational database tables with foreign keys', 'Formulate bKash/Nagad payment flow chart']
  },
  {
    phase: 2,
    title: 'Environment & Core Architecture',
    duration: 'Week 2',
    description: 'Project setup, virtual environment, Git version control, and modular app hierarchy.',
    status: 'completed',
    items: ['Configure Django settings & modular apps', 'Database connection & migrations setup', 'Environment variables for bKash sandbox credentials']
  },
  {
    phase: 3,
    title: 'Storefront UI & Responsive Design',
    duration: 'Week 3–4',
    description: 'Crafting responsive mobile-first UI, product grids, search filters, and clean typography.',
    status: 'completed',
    items: ['Top navigation with search and category drawers', 'Hero promotional carousel and collection cards', 'Product details contiguous purchase module (PDP)']
  },
  {
    phase: 4,
    title: 'Backend API & Role-Based Auth',
    duration: 'Week 5–6',
    description: 'Authentication logic, JWT token handling, permissions for Customer, Seller, and Admin.',
    status: 'completed',
    items: ['Role-based access control (RBAC)', 'Product CRUD REST endpoints with pagination', 'Vendor approval lifecycle']
  },
  {
    phase: 5,
    title: 'Customer & Seller Dashboards',
    duration: 'Week 7–8',
    description: 'Interactive shopping cart, customer order history, seller product inventory management.',
    status: 'completed',
    items: ['Multi-item shopping cart with BDT calculation', 'Seller inventory tracking and low-stock indicators', 'Customer wishlist & reviews system']
  },
  {
    phase: 6,
    title: 'Order Management & Multi-Vendor Splitting',
    duration: 'Week 9–10',
    description: 'Split cart orders into vendor-specific line items for independent seller fulfillment.',
    status: 'completed',
    items: ['Order placement with shipping address & phone validation', 'Per-seller dispatch and order fulfillment', 'Live status updates: Pending -> Processing -> Delivered']
  },
  {
    phase: 7,
    title: 'bKash & Nagad Payment Integration',
    duration: 'Week 11–12',
    description: 'Integration of Bangladeshi MFS gateways (bKash Checkout API, Nagad Gateway, COD, and Refunds).',
    status: 'completed',
    items: ['bKash Sandbox API: Create Payment, Execute Payment, Verify Trx', 'Nagad Sandbox workflow with OTP/PIN simulation', 'Idempotency & transaction audit logging']
  },
  {
    phase: 8,
    title: 'Real-Time Marketing & Flash Sales',
    duration: 'Week 13–14',
    description: 'Dynamic discount engine, flash sale countdown timer, coupon redemption, and low stock triggers.',
    status: 'completed',
    items: ['Flash sale countdown ticker banner', 'Coupon engine with DESHI20 & BKASH10 discount computation', 'Low inventory urgency badges']
  },
  {
    phase: 9,
    title: 'Real-Time Socket Notifications',
    duration: 'Week 15',
    description: 'Instant event alerts via Django Channels & WebSockets for order updates and stock drops.',
    status: 'completed',
    items: ['Live notification tray with unread badge', 'Simulated real-time price & stock changes', 'Instant toast notifications for order progress']
  },
  {
    phase: 10,
    title: 'Testing, Security & Idempotency',
    duration: 'Week 16–17',
    description: 'Unit testing, payment failure recovery, SQL injection prevention, and CSRF protection.',
    status: 'completed',
    items: ['Double-spend prevention in checkout API', 'Input validation for phone numbers & amounts', 'Role permission gatekeeping for admin views']
  },
  {
    phase: 11,
    title: 'Report, Viva & Deployment',
    duration: 'Week 18–20',
    description: '50-60 page academic thesis report, architecture diagrams, viva questions preparation, and cloud deployment.',
    status: 'completed',
    items: ['Full 12-chapter CSE Final Year Project Report outline', 'Architecture, Sequence, and ER diagrams', 'Viva Defense Q&A bank with model answers']
  }
];

export const VIVA_QUESTIONS = [
  {
    q: 'Why did you choose Django + Python over PHP for this multi-vendor platform?',
    a: 'Django provides built-in enterprise-grade security (automatic CSRF protection, SQL injection prevention via ORM, XSS mitigation), a robust native Admin interface, and Django Channels for WebSockets/real-time marketing events without requiring multiple third-party libraries.'
  },
  {
    q: 'How does your system handle multi-vendor order splitting?',
    a: 'When a customer checks out a cart with items from multiple sellers (e.g. Dhakaiya Weavers and Sundarbans Agro), the backend creates a master Order row in the Orders table, and breaks items into Order_Items rows, each tagged with seller_id. Each seller only sees and fulfills their respective items in their dashboard.'
  },
  {
    q: 'How do you secure bKash & Nagad payments against client-side tampering?',
    a: 'We never trust frontend client signals. When the customer completes OTP/PIN on the hosted bKash/Nagad portal, the backend sends a server-to-server POST request to the bKash Execute Payment API using our Merchant Secret & App Key. Only when the gateway returns statusCode 0000 and matches the expected amount is the order marked as "Paid".'
  },
  {
    q: 'How do you prevent race conditions during high-concurrency Flash Sales?',
    a: 'In Django ORM / PostgreSQL, we utilize select_for_update() database row-level locking or atomic F() expressions during checkout. When inventory reaches 0, further checkout attempts are atomically rejected, preventing overselling.'
  },
  {
    q: 'What is the refund workflow if a customer receives a damaged product?',
    a: 'The customer submits a Return/Refund Request with reason and optional photo. The order status shifts to "refund_requested". The seller or admin inspects the claim; once authorized, the backend invokes the bKash Refund API with the original paymentID and trxID, logging the transaction in the Refunds table.'
  }
];
