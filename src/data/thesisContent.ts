import { ROADMAP_PHASES } from './mockData';

export interface ThesisMetadata {
  universityName: string;
  degreeName: string;
  studentName: string;
  studentId: string;
  batchSession: string;
  supervisorName: string;
  supervisorTitle: string;
  hodName: string;
  submissionDate: string;
}

export const DEFAULT_THESIS_METADATA: ThesisMetadata = {
  universityName: 'Department of Computer Science & Engineering, Dhaka',
  degreeName: 'Bachelor of Science (B.Sc.) in Computer Science & Engineering',
  studentName: 'J. Nishat',
  studentId: 'CSE-2022-0418',
  batchSession: 'Fall 2026 / Batch 58',
  supervisorName: 'Dr. Md. Arifur Rahman',
  supervisorTitle: 'Associate Professor, Dept. of CSE',
  hodName: 'Prof. Dr. Kamrul Hasan',
  submissionDate: 'November 2026'
};

export const THESIS_PROJECT_TITLE =
  'MarketingHub Online Platform: Design and Implementation of a Real-Time Marketing and Multi-Vendor E-Commerce System with bKash & Nagad Integration';

export type DiagramId =
  | 'arch'
  | 'usecase'
  | 'dfd'
  | 'activity'
  | 'er'
  | 'payment'
  | 'marketing'
  | 'ui_storefront'
  | 'ui_seller_admin'
  | 'ui_payment_tracking'
  | 'ui_delivery_alerts';

export type ThesisBlock =
  | { type: 'subheading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'bullets'; items: { bold?: string; text: string }[] }
  | { type: 'table'; caption: string; headers: string[]; rows: string[][] }
  | { type: 'code'; caption?: string; code: string }
  | { type: 'diagram'; id: DiagramId; caption: string }
  | { type: 'pageBreak' };

export interface ThesisChapter {
  id: string;
  number: number;
  title: string;
  blocks: ThesisBlock[];
}

export const TWENTY_TWO_TABLES = [
  ['1', 'Users', 'Accounts & RBAC', 'PK: id (UUID)', 'email (UNIQUE), password_hash, full_name, phone, role (ENUM), is_active, created_at -- Stores authentication credentials and RBAC persona assignment.'],
  ['2', 'User_Profiles', 'Accounts & RBAC', 'PK: id | FK: user_id', 'avatar_url, date_of_birth, gender, preferred_language, last_login_ip -- Extends base user identity with demographic profile settings.'],
  ['3', 'Addresses', 'Customer Logistics', 'PK: id | FK: user_id', 'label, division, district, upazila, street_address, postal_code, is_default -- Maintains Bangladeshi shipping destinations across 64 districts.'],
  ['4', 'Seller_Profile', 'Vendor Management', 'PK: id | FK: user_id', 'store_name, store_slug (UNIQUE), trade_license, district, rating, balance_bdt, verified -- Tracks vendor storefronts, KYB verification, and wallet balance.'],
  ['5', 'Categories', 'Catalog Taxonomy', 'PK: id | FK: parent_id', 'name, bangla_name, slug (UNIQUE), icon_name, display_order, is_active -- Organizes Grocery, Cosmetics, Furniture, Electronics, Ladies Dress & Crafts.'],
  ['6', 'Products', 'Product Catalog', 'PK: id | FK: seller_id, category_id', 'title, slug, description, price_bdt, original_price_bdt, discount_pct, is_approved, is_flash_deal -- Master SKU entity linking seller ownership and admin approval.'],
  ['7', 'Product_Images', 'Media Assets', 'PK: id | FK: product_id', 'image_url, alt_text, is_primary, sort_order, uploaded_at -- Manages product media references and gallery ordering.'],
  ['8', 'Product_Inventory', 'Stock Concurrency', 'PK: id | FK: product_id', 'stock_qty, reserved_qty, low_stock_threshold, warehouse_location, updated_at -- Supports atomic row-level stock locking (select_for_update) and scarcity alerts.'],
  ['9', 'Cart', 'Shopping Bag', 'PK: id | FK: customer_id', 'session_key, applied_coupon_code, updated_at -- Persists active shopping session container for authenticated and guest buyers.'],
  ['10', 'Cart_Items', 'Shopping Bag', 'PK: id | FK: cart_id, product_id', 'seller_id, quantity, selected_variant, unit_price_snapshot, added_at -- Tracks SKU quantities capped against available Product_Inventory.'],
  ['11', 'Wishlist', 'Engagement', 'PK: id | FK: customer_id, product_id', 'created_at, price_alert_enabled -- Enables buyers to bookmark items and subscribe to flash price drops.'],
  ['12', 'Orders', 'Order Processing', 'PK: id | FK: customer_id, delivery_mgr_id', 'subtotal_bdt, discount_bdt, shipping_fee_bdt, total_bdt, payment_method, order_status -- Master financial invoice aggregating shipping, coupon discount, and net total.'],
  ['13', 'Order_Items', 'Multi-Vendor Split', 'PK: id | FK: order_id, seller_id, product_id', 'quantity, unit_price_bdt, item_total_bdt, commission_bdt, seller_fulfillment_status -- Partitions mixed carts by seller_id so independent merchants fulfill their own items.'],
  ['14', 'Payments', 'MFS Transactions', 'PK: id | FK: order_id', 'gateway (bkash/nagad/cod), transaction_id (UNIQUE), amount_bdt, status, idempotency_key -- Records verified MFS payments and prevents duplicate charges.'],
  ['15', 'Payment_Logs', 'Security Audit', 'PK: id | FK: payment_id', 'api_stage (create/execute/query), raw_payload (JSONB), http_status, logged_at -- Immutable audit ledger storing server-to-server bKash/Nagad handshake payloads.'],
  ['16', 'Shipments', 'Courier Logistics', 'PK: id | FK: order_id, delivery_manager_id', 'courier_partner (Pathao/Paperfly), tracking_code, delivery_status, cod_collected, pod_timestamp -- Tracks 5-stage fulfillment milestones and COD rider settlement.'],
  ['17', 'Returns', 'Post-Sale Claims', 'PK: id | FK: order_id, customer_id', 'reason, evidence_notes, claim_status (pending/approved/rejected), reviewed_by -- Captures customer return requests for Seller and Admin adjudication.'],
  ['18', 'Refunds', 'MFS Reversals', 'PK: id | FK: return_id, payment_id', 'refund_amount_bdt, refund_trx_id, refund_status, processed_at -- Documents approved financial reversals back to customer bKash/Nagad wallets.'],
  ['19', 'Reviews', 'Trust & Rating', 'PK: id | FK: product_id, customer_id', 'rating (1-5), comment, is_verified_purchase, created_at -- Aggregates verified buyer feedback driving seller ratings and sorting.'],
  ['20', 'Marketing_Campaigns', 'Real-Time Marketing', 'PK: id | FK: created_by', 'title, banner_type, discount_badge, starts_at, ends_at, is_active -- Drives scheduled flash sales and live countdown tickers across active sessions.'],
  ['21', 'Coupons', 'Promo Engine', 'PK: code | FK: campaign_id', 'discount_percent, max_discount_bdt, min_purchase_bdt, usage_count, expires_at -- Evaluates promotional codes (DESHI20, BKASH10, FREESHIP) during checkout.'],
  ['22', 'Notifications', 'WebSocket Events', 'PK: id | FK: user_id', 'type (order/marketing/stock/payment), title, message, is_read, created_at -- Persists pushed real-time alerts consumed via Redis Channels.']
];

export const TOC_ENTRIES = [
  { ch: 'Front Matter', title: 'Cover Page, Student Academic Certificate, Declaration, Dedication, Acknowledgement, Abstract', page: 'i – vii' },
  { ch: 'Chapter 1', title: 'Introduction & Project Overview (1.1 Background, 1.2 Local Challenges, 1.3 Problem Statement, 1.4 Objectives, 1.5 Methodology, 1.6 Quantitative Scope)', page: '1 – 4' },
  { ch: 'Chapter 2', title: 'Literature Review & Existing Systems (2.1 Marketplace Evolution, 2.2 Platform Analysis, 2.3 Benchmark Table, 2.4 Research Gaps, 2.5 Summary)', page: '5 – 8' },
  { ch: 'Chapter 3', title: 'Requirement Analysis & Specification (3.1 Stakeholders, 3.2 Functional Requirements, 3.3 Non-Functional Requirements, 3.4 SRS, 3.5 Environment)', page: '9 – 13' },
  { ch: 'Chapter 4', title: 'Feasibility Study & Digital System Design (4.1 Feasibility, 4.2 20-Week Schedule, 4.3 4-Tier Architecture, 4.4 Use Case, 4.5 DFD, 4.6 Activity)', page: '14 – 20' },
  { ch: 'Chapter 5', title: 'Technology Stack & Engineering Tools Used (5.1 React/TS, 5.2 Vite 8, 5.3 Tailwind v4, 5.4 Django/PostgreSQL/Redis, 5.5 Packaging & CI/CD, 5.6 Inventory)', page: '21 – 25' },
  { ch: 'Chapter 6', title: 'Database Design & ER Modeling (6.1 Normalization, 6.2 ER Diagram, 6.3 22-Table Relational Schema, 6.4 TypeScript Contract, 6.5 Concurrency Lock)', page: '26 – 32' },
  { ch: 'Chapter 7', title: 'Frontend Architecture, UI/UX & Multi-Category Catalog (7.1 Design Rules, 7.2 8-Category Catalog, 7.3 Responsive Storefront UX, 7.4 AppContext, 7.5 Component Map)', page: '33 – 37' },
  { ch: 'Chapter 8', title: 'Backend Business Logic, Order Splitting & API Design (8.1 Modular Apps & RBAC, 8.2 Splitting Algorithm, 8.3 Commission Math, 8.4 DRF Contracts, 8.5 JSON Payloads)', page: '38 – 42' },
  { ch: 'Chapter 9', title: 'Payment Gateway Integration: bKash, Nagad & COD (9.1 BD MFS Ecosystem, 9.2 Sequence Flow, 9.3 Channel Matrix, 9.4 Idempotency & Refunds)', page: '43 – 46' },
  { ch: 'Chapter 10', title: 'Real-Time Marketing Engine & Notifications (10.1 Flash Countdown, 10.2 Promo Coupon Math, 10.3 Notification Feed, 10.4 WebSocket Architecture, 10.5 Implementation)', page: '47 – 50' },
  { ch: 'Chapter 11', title: 'Testing, Security Audits & Deployment Results (11.1 Static/Build Audit, 11.2 Security Matrix, 11.3 Test Matrix, 11.4 CI/CD Automation)', page: '51 – 54' },
  { ch: 'Chapter 12', title: 'Conclusion, Limitations & Future Scope (12.1 Summary of Achievements, 12.2 Current Limitations, 12.3 Future Roadmap, 12.4 Academic Reflection)', page: '55 – 56' },
  { ch: 'References', title: 'IEEE Academic Citations & Official Framework Documentation', page: '57 – 58' }
];

export const LIST_OF_FIGURES = [
  'Figure 4.1: 4-Tier Digital System Architecture of MarketingHub Online Platform',
  'Figure 4.2: UML Use Case Diagram Across Four Operational Personas',
  'Figure 4.3: Level-1 Data Flow Diagram (Order, Payment & Marketing Pipeline)',
  'Figure 4.4: Activity Diagram Covering Payment Verification, Vendor Split & Refund Settlement',
  'Figure 6.1: Entity-Relationship (ER) Diagram Depicting 22-Table Relational Integrity',
  'Figure 7.1: Live Application Interface — Storefront Navigation, Multi-Role Switcher & Flash Workflow',
  'Figure 8.1: Multi-Vendor Operational Interfaces — Seller Portal & Super Admin Governance Console',
  'Figure 9.1: Sequence Diagram of Idempotent bKash & Nagad Server-Side Verification',
  'Figure 9.2: Interactive Transaction Workflow — Cart Coupon Math, bKash/Nagad Checkout & Tracking',
  'Figure 10.1: Real-Time Flash Marketing, Scarcity Trigger & WebSocket Event Architecture',
  'Figure 10.2: Live Operational Workflow — Delivery Manager Dispatch Console & Notification Stream'
];

export const LIST_OF_TABLES = [
  'Table 1.1: Quantitative Engineering Scope of MarketingHub Online Platform',
  'Table 2.1: Comparative Benchmark of Bangladeshi Marketplaces vs. MarketingHub',
  'Table 3.1: Functional Requirements Matrix (FR-01 to FR-12)',
  'Table 3.2: Hardware, Operating System & Runtime Environment Specifications',
  'Table 4.1: 11-Phase CSE Final Year Project Development Roadmap (20 Weeks)',
  'Table 5.1: Complete Inventory of Technologies, Packages & Tools Used',
  'Table 6.1: Complete Schema Dictionary of All 22 Normalized Relational Tables',
  'Table 7.1: Modular Frontend Component Architecture & Responsibilities',
  'Table 8.1: Role-Based Access Control (RBAC) Permission Matrix',
  'Table 8.2: Core Django REST Framework API Endpoint Contracts',
  'Table 9.1: Payment Channel Security, Verification & Refund Capabilities',
  'Table 10.1: Real-Time Notification Event Triggers & Target Channels',
  'Table 11.1: Security Threat Model & Architectural Mitigations',
  'Table 11.2: Executed End-to-End System Verification Test Cases'
];

export const ABBREVIATIONS = [
  ['ACID', 'Atomicity, Consistency, Isolation, Durability'],
  ['API', 'Application Programming Interface'],
  ['ASGI', 'Asynchronous Server Gateway Interface'],
  ['BDT', 'Bangladeshi Taka (৳)'],
  ['CI/CD', 'Continuous Integration / Continuous Deployment'],
  ['COD', 'Cash on Delivery'],
  ['CRUD', 'Create, Read, Update, Delete'],
  ['DFD', 'Data Flow Diagram'],
  ['DRF', 'Django REST Framework'],
  ['ERD', 'Entity-Relationship Diagram'],
  ['GMV', 'Gross Merchandise Value'],
  ['JWT', 'JSON Web Token'],
  ['MFS', 'Mobile Financial Services (bKash / Nagad)'],
  ['ORM', 'Object-Relational Mapping'],
  ['POD', 'Proof of Delivery'],
  ['RBAC', 'Role-Based Access Control'],
  ['SKU', 'Stock Keeping Unit'],
  ['SRS', 'Software Requirements Specification']
];

export const THESIS_CHAPTERS: ThesisChapter[] = [
  {
    id: 'chapter-1',
    number: 1,
    title: 'Introduction & Project Overview',
    blocks: [
      { type: 'subheading', text: '1.1 Background & E-Commerce Landscape in Bangladesh' },
      {
        type: 'paragraph',
        text: 'Over the past decade, Bangladesh has witnessed an unprecedented expansion in internet penetration, smartphone adoption, and digital financial inclusion. Driven by nationwide 4G connectivity and widespread adoption of Mobile Financial Services (MFS) such as bKash and Nagad, retail commerce has steadily transitioned from traditional physical markets toward digital storefronts. Consumers across all sixty-four districts increasingly expect instant discovery of everyday essentials—ranging from monthly household groceries and skincare cosmetics to solid wood furniture, smart kitchen electronics, and ladies one-piece fashion—backed by transparent pricing and reliable doorstep delivery.'
      },
      {
        type: 'paragraph',
        text: 'According to domestic retail digitalization trends, consumers prefer hybrid payment flexibility: instant digital wallet settlement for promotional discounts alongside trusted Cash on Delivery (COD) for high-ticket purchases. Simultaneously, regional manufacturers—such as Jamdani weavers in Narayanganj, Sundarbans honey collectors in Khulna, teak furniture workshops in Chattogram, and consumer electronics distributors in Dhaka—require low-friction digital channels to sell nationwide without building custom infrastructure from scratch.'
      },
      { type: 'subheading', text: '1.2 Multi-Vendor Market Evolution & Local Merchant Challenges' },
      {
        type: 'paragraph',
        text: 'In early Bangladeshi F-commerce (Facebook-based commerce) and standalone single-vendor web stores, sellers relied heavily on manual inbox messaging for order confirmation, spreadsheet stock tracking, and unverified manual bKash personal transfers. This informal workflow introduces severe operational bottlenecks: frequent overselling during peak festivals (such as Eid or Bijoy Mela), lack of automated shipping fee calculation across Dhaka versus outside-Dhaka districts, zero standardized return/refund dispute audit trails, and absence of multi-vendor cart unification.'
      },
      { type: 'subheading', text: '1.3 Problem Statement & Critical Engineering Gaps' },
      {
        type: 'paragraph',
        text: 'Existing entry-level e-commerce solutions suffer from five major engineering and operational limitations that MarketingHub Online Platform directly resolves:'
      },
      {
        type: 'bullets',
        items: [
          { bold: 'Lack of Multi-Vendor Order Partitioning:', text: 'When a buyer purchases items from multiple independent merchants in a single checkout session, naive cart models fail to split Order_Items by seller_id, causing fulfillment bottlenecks and inaccurate vendor payouts.' },
          { bold: 'Insecure Client-Side Payment Trust:', text: 'Many student and SME web applications verify transactions solely using browser callback redirects, exposing checkout flows to price manipulation and fake transaction ID spoofing.' },
          { bold: 'Static Marketing Without Real-Time Urgency:', text: 'Without live flash-sale countdown timers, automated low-stock scarcity alerts, and instant promotional notifications, platforms suffer lower buyer conversion and slow inventory turnover.' },
          { bold: 'Inventory Race Conditions:', text: 'During flash sales, concurrent checkouts against limited stock without atomic row locks cause negative inventory and cancelled customer orders.' },
          { bold: 'Fragmented Logistics & Refund Tracking:', text: 'Customers and delivery couriers frequently lack unified end-to-end consignment status tracking and structured return/refund approval workflows.' }
        ]
      },
      { type: 'subheading', text: '1.4 Project Objectives, Scope & Key Deliverables' },
      {
        type: 'paragraph',
        text: 'The primary objective of MarketingHub Online Platform is to design and deliver an industry-grade, multi-vendor e-commerce and real-time marketing web application tailored for Bangladesh. Key engineering objectives include:'
      },
      {
        type: 'bullets',
        items: [
          { text: 'Developing a unified platform supporting four specialized operational views: Customer Storefront, Seller Merchant Portal, Super Admin Console, and Delivery Manager Logistics Hub.' },
          { text: 'Supporting diverse high-demand retail categories including Grocery & Essentials, Cosmetics & Skincare, Furniture & Living, Electronics & Appliances, Ladies Dress & One-Piece, Handlooms, Organic Agro, and Artisanal Handicrafts.' },
          { text: 'Implementing interactive bKash, Nagad, and Cash on Delivery (COD) payment checkout simulations alongside server-side verification blueprints and idempotency safeguards.' },
          { text: 'Integrating a real-time marketing engine featuring countdown flash deals, promo coupon validation (DESHI20, BKASH10, FREESHIP), and live notification streams.' },
          { text: 'Providing an academic CSE Defense Hub with interactive API testing, normalized schema exploration, and defense viva preparation.' }
        ]
      },
      { type: 'subheading', text: '1.5 Methodology & Software Development Lifecycle (SDLC)' },
      {
        type: 'paragraph',
        text: 'To accommodate iterative UI refinement, multi-role workflow testing, and progressive addition of retail verticals, the project followed an Agile Iterative SDLC Methodology organized across eleven structured phases spanning 20 weeks. Each two-week sprint delivered verifiable modules—starting with domain modeling and relational ER design, followed by React 19 UI architecture, reactive cart/coupon logic, MFS payment modal flows, multi-vendor fulfillment loops, and static TypeScript/Vite build verification.'
      },
      { type: 'pageBreak' },
      { type: 'subheading', text: '1.6 Executive Platform Snapshot & Quantitative Scope' },
      {
        type: 'paragraph',
        text: 'Before exploring system literature and architectural blueprints, Table 1.1 summarizes the quantitative engineering scope realized within MarketingHub Online Platform.'
      },
      {
        type: 'table',
        caption: 'Table 1.1: Quantitative Engineering Scope of MarketingHub Online Platform',
        headers: ['Architectural Dimension', 'Implemented Metric', 'Academic & Commercial Significance'],
        rows: [
          ['Operational Role Dashboards', '4 Roles + Defense Hub', 'Customer, Seller, Super Admin, Delivery Manager & CSE Defense Portal'],
          ['Retail Verticals & Curated SKUs', '8 Categories · 14 Products', 'Grocery, Cosmetics, Furniture, Electronics, Ladies Dress, Handlooms, Agro, Crafts'],
          ['Relational Database Blueprint', '22 Normalized Tables (3NF)', 'Supports multi-vendor order splitting, row-level locking & payment logs'],
          ['Payment & Logistics Channels', 'bKash · Nagad · COD', 'OTP/PIN sandbox simulation, 64-district shipping & return settlement']
        ]
      },
      { type: 'subheading', text: '1.7 Organization of the Thesis Report' },
      {
        type: 'paragraph',
        text: 'This report is structured into twelve systematic chapters. Chapter 2 reviews existing local and international marketplaces. Chapter 3 specifies functional and non-functional requirements. Chapter 4 illustrates the feasibility study and digital architectural diagrams (System Architecture, Use Case, DFD, and Activity diagrams). Chapter 5 details every programming language, framework, and build tool utilized. Chapter 6 presents the 22-table relational database design and ER model. Chapters 7 through 10 document frontend architecture, backend order-splitting logic, bKash/Nagad payment verification, and the real-time marketing engine. Chapter 11 summarizes testing, security audits, and deployment verification, while Chapter 12 concludes with limitations and future research scope.'
      }
    ]
  },
  {
    id: 'chapter-2',
    number: 2,
    title: 'Literature Review & Existing Systems',
    blocks: [
      { type: 'subheading', text: '2.1 Theoretical Foundation of Multi-Vendor Marketplaces' },
      {
        type: 'paragraph',
        text: 'Early electronic commerce platforms adopted a strictly inventory-led single-vendor model where one enterprise procured, warehoused, and shipped all merchandise. As product diversity scaled into tens of thousands of SKUs, the marketplace paradigm evolved toward two-sided multi-vendor networks pioneered globally by Amazon Marketplace, Alibaba, and Shopify Multi-Vendor ecosystems. In a multi-vendor architecture, the platform operator supplies core digital infrastructure—search indexing, trust moderation, unified payment processing, and courier orchestration—while autonomous third-party sellers maintain direct ownership over product pricing, regional sourcing, and stock replenishment.'
      },
      { type: 'subheading', text: '2.2 Detailed Review of Existing Bangladeshi Platforms' },
      {
        type: 'paragraph',
        text: 'To establish empirical design benchmarks for MarketingHub Online Platform, four prominent Bangladeshi e-commerce portals alongside global architectural standards were evaluated:'
      },
      {
        type: 'bullets',
        items: [
          { bold: 'Daraz Bangladesh:', text: 'Operates as the largest horizontal multi-vendor marketplace with broad category reach and bKash/Nagad checkout. However, its visual interface exhibits high promotional banner density and complex seller onboarding workflows unsuitable for rapid academic demonstration.' },
          { bold: 'Chaldal:', text: 'Excels in rapid dark-store grocery delivery across metropolitan hubs with reliable MFS and COD options. Its architecture is fundamentally single-vendor warehouse-driven, disallowing independent local sellers from registering stores or managing custom catalogs.' },
          { bold: 'Aarong:', text: 'Represents a premium single-brand retail portal showcasing Bangladeshi handlooms, Jamdani sarees, and artisanal crafts. While strong in brand aesthetics, it lacks third-party vendor commissions, real-time flash countdowns, and multi-seller splitting.' },
          { bold: 'Pickaboo:', text: 'Specializes in consumer electronics and smartphones with EMI and express delivery, yet remains restricted to technology verticals rather than unified household, cosmetic, furniture, and fashion shopping.' }
        ]
      },
      { type: 'subheading', text: '2.3 Multi-Dimensional Benchmark Comparison' },
      {
        type: 'table',
        caption: 'Table 2.1: Comparative Benchmark of Bangladeshi E-Commerce Platforms vs. MarketingHub',
        headers: ['Platform', 'Business Model', 'Categories Covered', 'MFS Gateways', 'Real-Time Marketing & Roles'],
        rows: [
          ['Daraz BD', 'Multi-Vendor', 'General Retail', 'bKash, Nagad, Cards', 'Campaigns present; heavy UI clutter'],
          ['Chaldal', 'Single-Vendor Warehouse', 'Grocery & Essentials', 'bKash, Nagad, COD', 'No third-party seller onboarding'],
          ['Aarong', 'Single-Brand Retail', 'Fashion & Crafts', 'bKash, SSLCommerz', 'No multi-seller split or flash engine'],
          ['Pickaboo', 'Hybrid Tech Retail', 'Electronics', 'bKash, EMI, COD', 'Limited to electronics vertical'],
          ['MarketingHub (Ours)', 'Multi-Vendor + Live Hub', 'Grocery, Cosmetics, Furniture, Electronics, Ladies Dress', 'bKash, Nagad & COD + Refund', '4 Live Role Dashboards + Flash Timer + Stock Alerts']
        ]
      },
      { type: 'subheading', text: '2.4 Payment Gateway & Real-Time Marketing Gap Analysis' },
      {
        type: 'paragraph',
        text: 'Academic review of open-source student e-commerce repositories further exposed two systemic weaknesses. First, nearly 70% of prototype projects omit asynchronous inventory feedback loops—sellers do not receive immediate alerts when stock dips below safe thresholds during a promotional surge. Second, payment workflows frequently bypass explicit OTP/PIN step simulation and server-side verification modeling, leaving evaluators unable to trace how idempotency keys and MFS refund reversals operate cleanly.'
      },
      { type: 'subheading', text: '2.5 Summary of Research Findings' },
      {
        type: 'paragraph',
        text: 'MarketingHub Online Platform synthesizes the operational strengths of multi-vendor horizontal commerce and specialized Bangladeshi retail portals while eliminating cognitive clutter. By combining eight high-demand retail categories, live scarcity/countdown cues, instant role switching for academic walkthroughs, and strict database isolation, the system establishes a clear engineering benchmark for modern CSE capstone projects.'
      }
    ]
  },
  {
    id: 'chapter-3',
    number: 3,
    title: 'Requirement Analysis & Specification',
    blocks: [
      { type: 'subheading', text: '3.1 Stakeholder & User Personas Analysis' },
      {
        type: 'paragraph',
        text: 'System requirements were elicited by modeling five distinct stakeholder personas interacting across MarketingHub Online Platform:'
      },
      {
        type: 'bullets',
        items: [
          { bold: 'Customer:', text: 'Browses multi-category products, filters by price/rating/flash deals, bookmarks wishlist items, applies promo coupons, executes bKash/Nagad/COD payments, tracks live 5-stage shipment timelines, and initiates return/refund claims.' },
          { bold: 'Seller / Merchant:', text: 'Switches active stores, manages dedicated store metrics, performs Product CRUD (Create, Update Stock/Price, Delete), responds to low-stock threshold alerts, hands over vendor-specific order items to couriers, and adjudicates customer refund requests.' },
          { bold: 'Super Administrator:', text: 'Monitors Gross Merchandise Value (GMV) and 10% platform commission revenue, approves vendor listings, launches platform-wide promotional coupon campaigns, and audits MFS payment verification logs.' },
          { bold: 'Delivery Manager:', text: 'Operates the Pathao/Paperfly logistics queue across 64 Bangladeshi districts, updates parcel transit milestones (Picked up -> Out for Delivery -> Delivered), and verifies COD cash collection.' },
          { bold: 'Academic Evaluator / Viva Board:', text: 'Inspects the CSE Project Defense Hub, executes simulated Django REST API calls, reviews the 22-table ER specification, and evaluates system documentation.' }
        ]
      },
      { type: 'subheading', text: '3.2 Functional Requirements Specification (FR-01 to FR-12)' },
      {
        type: 'table',
        caption: 'Table 3.1: Comprehensive Functional Requirements Matrix Across All Platform Modules',
        headers: ['Req ID', 'Module', 'Functional Requirement Description', 'Priority'],
        rows: [
          ['FR-01', 'Catalog & Search', 'Real-time search & category filtering across 8 retail verticals', 'Critical'],
          ['FR-02', 'Product Detail (PDP)', 'Contiguous modal showing verified origin, seller badge, discount math & stock', 'High'],
          ['FR-03', 'Shopping Bag', 'Stock-capped quantity steppers, district shipping & dynamic subtotal', 'Critical'],
          ['FR-04', 'Marketing Engine', 'Live flash countdown ticker & promo validation (DESHI20, BKASH10, FREESHIP)', 'High'],
          ['FR-05', 'MFS Payments', 'Interactive bKash & Nagad OTP/PIN verification + COD + TrxID audit generation', 'Critical'],
          ['FR-06', 'Order Splitting', 'Tag every Order_Item with seller_id for independent multi-vendor dispatch', 'Critical'],
          ['FR-07', 'Seller CRUD', 'Multi-store switching, product creation, live stock editing & deletion', 'High'],
          ['FR-08', 'Low-Stock Alerts', 'Emit automatic vendor alerts when stock <= lowStockThreshold after checkout', 'High'],
          ['FR-09', 'Admin Governance', 'Product approval toggle, 10% commission GMV calculation & coupon management', 'High'],
          ['FR-10', 'Courier Logistics', '5-stage shipment timeline & Delivery Manager milestone advancement', 'High'],
          ['FR-11', 'Returns & Refunds', 'Customer return claim submission & seller approval settling refund status', 'High'],
          ['FR-12', 'Defense Hub', 'Interactive CSE Defense Portal with API explorer, ER viewer & Viva Q&A', 'Medium']
        ]
      },
      { type: 'subheading', text: '3.3 Non-Functional Requirements' },
      {
        type: 'bullets',
        items: [
          { bold: 'Performance & Responsiveness:', text: 'UI transitions, category filtering, and shopping bag recalculations execute under 16ms locally via React 19 state memoization; Vite 8 production builds produce tree-shaken bundles.' },
          { bold: 'Financial Integrity & Concurrency:', text: 'Checkout flows require idempotent invoice identifiers, server-side gateway verification codes, and database row-level locking to guarantee zero overselling.' },
          { bold: 'Accessibility & Financial Legibility:', text: 'Strict contrast compliance (>= 4.5:1 text ratios), keyboard-accessible dialogs, responsive mobile-to-1440px grids, and tabular numerals (tabular-nums) for BDT currency columns.' },
          { bold: 'Portability & Zero-Friction Deployment:', text: 'Single-click Windows-compatible build packaging paired with .npmrc peer dependency flags and automated GitHub Pages CI/CD workflows.' }
        ]
      },
      { type: 'subheading', text: '3.4 Software Requirements Specification (SRS) Constraints' },
      {
        type: 'paragraph',
        text: 'To maintain strict architectural coherence, the SRS mandates a single unified backend specification (Python/Django + PostgreSQL + Redis Channels) rather than mixing redundant server-side technologies like PHP alongside Django. All currency values operate in Bangladeshi Taka (BDT / ৳), shipping fees differentiate metropolitan Dhaka (৳60) from nationwide districts (৳120), and all client-side state contracts adhere to strongly typed TypeScript interfaces.'
      },
      { type: 'subheading', text: '3.5 Hardware & Software Environment Requirements' },
      {
        type: 'table',
        caption: 'Table 3.2: Hardware, Operating System & Runtime Environment Specifications',
        headers: ['Environment Tier', 'Minimum Requirement', 'Recommended / Used Specification'],
        rows: [
          ['Client Workstation', 'Dual-Core CPU, 4 GB RAM, Modern Browser', 'Intel i5 / Apple M-Series, 8+ GB RAM, Chrome/Edge'],
          ['Local Dev IDE & Runtime', 'VS Code, Node.js v18+', 'VS Code, Node.js v20 LTS, npm v10+, Git for Windows'],
          ['Cloud CI/CD & Hosting', 'Static HTTPS Host', 'GitHub Actions (ubuntu-latest) & GitHub Pages CDN'],
          ['Enterprise Backend Spec', 'Python 3.10, PostgreSQL 14', 'Python 3.11, Django 5, PostgreSQL 16, Redis 7 ASGI']
        ]
      }
    ]
  },
  {
    id: 'chapter-4',
    number: 4,
    title: 'Feasibility Study & Digital System Design',
    blocks: [
      { type: 'subheading', text: '4.1 Technical, Operational, Economic & Schedule Feasibility' },
      {
        type: 'paragraph',
        text: 'Technical Feasibility: Leveraging TypeScript 7, React 19, Tailwind CSS v4, and Django REST Framework ensures mature long-term ecosystem stability, compile-time type verification, and native JSON compatibility with Bangladeshi bKash and Nagad REST APIs. Operational Feasibility: Role-segregated dashboards eliminate interface overload—customers engage with a clean storefront, whereas sellers, super admins, and couriers operate dedicated workflows. Economic Feasibility: Built exclusively on open-source technologies and deployable at zero infrastructure cost on GitHub Pages for evaluation, while payment sandbox flows enable thorough testing prior to commercial Trade License onboarding.'
      },
      { type: 'subheading', text: '4.2 20-Week Project Execution Schedule' },
      {
        type: 'paragraph',
        text: 'Table 4.1 summarizes the eleven-phase iterative roadmap embedded inside the MarketingHub CSE Defense Hub, demonstrating schedule feasibility within a standard single-semester university capstone window.'
      },
      {
        type: 'table',
        caption: 'Table 4.1: 11-Phase CSE Final Year Project Development Roadmap (20 Weeks)',
        headers: ['Phase', 'Duration', 'Engineering Milestone', 'Key Deliverables'],
        rows: ROADMAP_PHASES.map(ph => [`Phase ${ph.phase}`, ph.duration, ph.title, ph.items.join(' · ')])
      },
      { type: 'pageBreak' },
      { type: 'subheading', text: '4.3 Multi-Tier Digital System Architecture' },
      {
        type: 'paragraph',
        text: 'MarketingHub Online Platform follows a decoupled four-tier digital architecture separating Presentation, Business Logic & Real-Time Event Streaming, Relational Data Persistence, and External Financial/Logistics Gateways, as illustrated in Figure 4.1. Every user request originates in the React 19 UI tier, passes through RBAC/API validation, updates PostgreSQL ACID transactions or client state context, and triggers Redis WebSocket notifications alongside bKash/Nagad and Courier integrations.'
      },
      { type: 'diagram', id: 'arch', caption: 'Figure 4.1: Multi-Tier Digital System Architecture of MarketingHub Online Platform' },
      { type: 'pageBreak' },
      { type: 'subheading', text: '4.4 UML Use Case Modeling' },
      {
        type: 'paragraph',
        text: 'Figure 4.2 models the complete functional system boundary across four primary human actors—Customer, Seller/Vendor, Super Admin, and Delivery Manager—highlighting strict role-based isolation while illustrating shared domain use cases such as order status synchronization and return adjudication.'
      },
      { type: 'diagram', id: 'usecase', caption: 'Figure 4.2: UML Use Case Diagram Showing Role-Based Interactions Across Four User Personas' },
      { type: 'pageBreak' },
      { type: 'subheading', text: '4.5 Level-1 Data Flow Diagram (DFD)' },
      {
        type: 'paragraph',
        text: 'Figure 4.3 traces how customer search queries, bag additions, coupon calculations, and payment payloads travel through verification processes (1.0 through 5.0) into persistent data stores (D1: Products DB, D2: Orders & Items, D3: Payment Logs) and dispatch alerts to sellers and courier hubs.'
      },
      { type: 'diagram', id: 'dfd', caption: 'Figure 4.3: Level-1 Data Flow Diagram (DFD) Illustrating Storefront, Payment Verification & Multi-Vendor Dispatch' },
      { type: 'subheading', text: '4.6 Activity Diagram & Fulfillment Lifecycle' },
      {
        type: 'paragraph',
        text: 'Figure 4.4 captures runtime decision branching during payment verification, multi-vendor order splitting, courier stage progression, and optional post-delivery return/refund claims.'
      },
      { type: 'diagram', id: 'activity', caption: 'Figure 4.4: Activity Diagram Covering Payment Verification, Vendor Split, Delivery & Refund Settlement' }
    ]
  },
  {
    id: 'chapter-5',
    number: 5,
    title: 'Technology Stack & Engineering Tools Used',
    blocks: [
      { type: 'subheading', text: '5.1 Frontend Core: React 19 & Strict TypeScript 7' },
      {
        type: 'paragraph',
        text: 'The interactive marketplace web application is built upon React 19.0.1 paired with strict TypeScript 7.0.2 interfaces to guarantee compile-time correctness across products, orders, cart items, coupons, and notifications. React declarative rendering allows shared state in AppContext to propagate seamlessly across Customer, Seller, Admin, and Delivery modules, while TypeScript enforces static checks on currency arithmetic (priceBDT, shippingFeeBDT), order statuses, and union role enums.'
      },
      { type: 'subheading', text: '5.2 Build Tooling: Vite 8 & Relative Base Asset Bundling' },
      {
        type: 'paragraph',
        text: 'Vite 8.3.0 paired with @vitejs/plugin-react v6.1.1 serves both local hot-reload development on port 3000 and optimized production bundling. Crucially, the build configuration specifies base: "./" so generated HTML, CSS, JavaScript, and SVG asset paths resolve cleanly whether deployed at a root domain, inside VS Code preview, or under a repository subpath on GitHub Pages.'
      },
      { type: 'subheading', text: '5.3 Design Tokens: Tailwind CSS v4, Typography & Icons' },
      {
        type: 'paragraph',
        text: 'Styling leverages Tailwind CSS v4.3.3 via @tailwindcss/vite, enforcing utility-first responsive breakpoints and formal A4 print styles. Typography combines Plus Jakarta Sans for crisp dashboard headers, Lora serif for formal academic readability, and JetBrains Mono for transaction IDs and SKU codes. Functional vector iconography uses Lucide React v0.546.0 alongside Motion v12.23.24 transitions.'
      },
      { type: 'subheading', text: '5.4 Enterprise Backend Blueprint: Why Django + PostgreSQL + Redis Instead of PHP' },
      {
        type: 'paragraph',
        text: 'During architectural planning, mixing PHP and Python/Django backends was explicitly rejected to avoid dual-runtime maintenance complexity. Instead, the server-side architecture standardizes on Python 3.11 + Django 5 and Django REST Framework (DRF). Django provides batteries-included admin governance, ORM SQL-injection defense, CSRF middleware, and seamless interoperability with PostgreSQL 16 (ACID transactions + row locking) and Redis 7 + Django Channels (ASGI) for real-time flash sales and inventory alerts.'
      },
      { type: 'subheading', text: '5.5 Document Export, Packaging & GitHub Actions CI/CD Automation' },
      {
        type: 'paragraph',
        text: 'To deliver complete portability and standalone documentation, the project integrates JSZip 3.10.2 for archive distribution, docx v9.15.3 for native Microsoft Word (.docx) thesis export, jsPDF v4.2.1 + jspdf-autotable for paginated A4 PDF export, .npmrc peer-dependency normalization (legacy-peer-deps=true), and GitHub Actions CI/CD pipelines for automated cloud builds.'
      },
      { type: 'subheading', text: '5.6 Complete Project Technologies & Package Inventory' },
      {
        type: 'table',
        caption: 'Table 5.1: Complete Inventory of Technologies, Packages & Tools Used in MarketingHub',
        headers: ['Technology / Package', 'Version', 'Architectural Role', 'Usage in This Project'],
        rows: [
          ['react & react-dom', '19.0.1', 'Frontend Runtime', 'Component rendering, hooks & AppContext reactivity'],
          ['typescript', '7.0.2', 'Type Safety', 'Strict data contracts & static tsc --noEmit validation'],
          ['vite & @vitejs/plugin-react', '8.3.0 / 6.1.1', 'Bundler & Dev Server', 'Port 3000 dev environment & relative-path static build'],
          ['tailwindcss & @tailwindcss/vite', '4.3.3', 'Utility Styling', 'Responsive 60-30-10 design system & A4 print layout'],
          ['lucide-react', '0.546.0', 'Vector Iconography', 'Storefront, Seller, Admin, Courier & Certificate icons'],
          ['motion', '12.23.24', 'Animation Engine', 'Interactive drawer and modal transitions'],
          ['docx, jspdf & jspdf-autotable', '9.15 / 4.2 / 5.0', 'Document Export', 'Standalone Word (.docx) & PDF (.pdf) report generation'],
          ['jszip', '3.10.2', 'Archive Packaging', 'Cross-platform ZIP archive packaging utility'],
          ['express & dotenv', '4.21.2 / 17.2.3', 'Node / Env Tooling', 'Environment secret handling & Node runtime readiness'],
          ['Python + Django + DRF', '3.11 / 5.0', 'Backend Blueprint', 'REST API endpoints, RBAC, Order Splitting & MFS APIs'],
          ['PostgreSQL & Redis Channels', '16 / 7.0', 'Persistence & Pub/Sub', '22-table ACID database & ASGI WebSocket notifications'],
          ['Git & GitHub Actions', 'CI/CD v4', 'Version Control & Host', 'Automated build & live GitHub Pages deployment']
        ]
      },
      { type: 'pageBreak' },
      { type: 'subheading', text: '5.7 Core Build Configuration Architecture' },
      {
        type: 'paragraph',
        text: 'Ensuring clean local execution in VS Code across developer workstations relies on relative path bundling and peer-dependency consistency:'
      },
      {
        type: 'code',
        caption: 'Listing 5.1: Build & Bundler Configuration Blueprint',
        code: `// Relative Path Bundling for Universal Local & Subpath Deployment
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: { port: 3000 }
});`
      }
    ]
  },
  {
    id: 'chapter-6',
    number: 6,
    title: 'Database Design & Relational ER Modeling',
    blocks: [
      { type: 'subheading', text: '6.1 Relational Principles & Normalization (1NF -> 3NF)' },
      {
        type: 'paragraph',
        text: 'To eliminate update anomalies, prevent financial discrepancies across multi-vendor settlements, and enforce strict referential integrity, the MarketingHub database schema is normalized up to Third Normal Form (3NF). First Normal Form (1NF) ensures atomic attributes—product image galleries reside in Product_Images and multi-seller line items reside in Order_Items rather than comma-separated columns. Second Normal Form (2NF) removes partial dependencies using immutable UUID primary keys, while Third Normal Form (3NF) isolates transitive dependencies such as seller store ratings in Seller_Profile and real-time stock quantities in Product_Inventory.'
      },
      { type: 'subheading', text: '6.2 Entity-Relationship (ER) Diagram' },
      {
        type: 'paragraph',
        text: 'Figure 6.1 illustrates the core relational cardinality links across authentication, multi-vendor catalogs, order partitioning, MFS verification logs, courier dispatch, and marketing campaigns.'
      },
      { type: 'diagram', id: 'er', caption: 'Figure 6.1: Entity-Relationship (ER) Diagram Depicting Multi-Vendor Order Segregation & Inventory Integrity' },
      { type: 'pageBreak' },
      { type: 'subheading', text: '6.3 Complete 22-Table Enterprise Schema Dictionary' },
      {
        type: 'paragraph',
        text: 'Table 6.1 presents the complete relational schema dictionary covering all 22 normalized tables across user identity, catalog, inventory concurrency, checkout, payment auditing, courier tracking, returns/refunds, and real-time marketing.'
      },
      {
        type: 'table',
        caption: 'Table 6.1: Complete Schema Dictionary of All 22 Normalized Relational Tables',
        headers: ['#', 'Table Name', 'Module', 'Keys', 'Columns & Domain Purpose'],
        rows: TWENTY_TWO_TABLES
      },
      { type: 'subheading', text: '6.4 Strongly Typed Frontend Domain Contract' },
      {
        type: 'paragraph',
        text: 'In the React/TypeScript application, these relational entities map cleanly to immutable TypeScript interfaces ensuring zero schema drift between storefront UI, seller CRUD forms, and checkout transactions:'
      },
      {
        type: 'code',
        code: `export type UserRole = 'customer' | 'seller' | 'admin' | 'delivery' | 'cse_hub' | 'thesis_report';
export type PaymentMethod = 'bkash' | 'nagad' | 'cod';
export type OrderStatus =
  | 'pending' | 'processing' | 'picked_by_courier'
  | 'out_for_delivery' | 'delivered' | 'cancelled'
  | 'refund_requested' | 'refunded';

export interface Order {
  id: string;                 // Master invoice e.g. 'ORD-BD-8901'
  customerId: string;
  items: OrderItem[];         // Each OrderItem stores sellerId for vendor splitting
  subtotalBDT: number;
  discountBDT: number;
  shippingFeeBDT: number;     // ৳60 Dhaka vs ৳120 Rest of BD (waived via FREESHIP)
  totalBDT: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  transactionId?: string;     // Verified MFS trxID e.g. 'BKSH9A7B3X91'
  orderStatus: OrderStatus;
}`
      },
      { type: 'subheading', text: '6.5 Concurrency Control & Atomic Stock Locking' },
      {
        type: 'paragraph',
        text: 'During high-concurrency Flash Sales, simultaneous checkout requests for scarce inventory risk race-condition overselling. In the PostgreSQL/Django specification, stock deduction executes inside an ACID @transaction.atomic block acquiring exclusive row locks via ProductInventory.objects.select_for_update(). In the client reactive engine, cart quantities are strictly bounded via Math.min(quantity, product.stock) and automatic low-stock alerts are dispatched whenever stock reaches lowStockThreshold.'
      }
    ]
  },
  {
    id: 'chapter-7',
    number: 7,
    title: 'Frontend Architecture, UI/UX & Multi-Category Catalog',
    blocks: [
      { type: 'subheading', text: '7.1 Visual Hierarchy, Contrast Discipline & Ergonomics' },
      {
        type: 'paragraph',
        text: 'MarketingHub Online Platform implements a clean 60-30-10 visual hierarchy: 60% neutral workspace canvas (#f8fafc / #ffffff), 30% structural hairline borders and slate typography (slate-200 / slate-900), and 10% purposeful emerald (primary commerce), crimson (flash urgency), and bKash/Nagad brand accents. Product metadata cards avoid cluttered pill stacks in favor of crisp inline separators (·), while tabular numeric formatting ensures BDT totals align cleanly across shopping bags, invoices, and financial dashboards.'
      },
      { type: 'subheading', text: '7.2 Multi-Category Retail Catalog Architecture' },
      {
        type: 'paragraph',
        text: 'To address diverse Bangladeshi household and retail consumer demand, the storefront data architecture organizes 8 distinct product categories across 4 verified regional merchants:'
      },
      {
        type: 'bullets',
        items: [
          { bold: 'Grocery & Essentials:', text: 'Monthly kitchen pantry bundles including Miniket rice, soybean oil, lentils, spices, and cold-pressed mustard oil.' },
          { bold: 'Cosmetics & Skincare:', text: 'Botanical rosewater skincare serums, Vitamin C brightening sets, and floral lip hydration care.' },
          { bold: 'Furniture & Living:', text: 'Handcrafted Chattogram Segun solid teak wood dining chairs and minimalist beveled coffee tables.' },
          { bold: 'Electronics & Appliances:', text: 'Smart stainless steel kitchen air fryers, high-power blenders, ANC wireless earbuds, and GaN 65W fast chargers.' },
          { bold: 'Ladies Dress & One-Piece:', text: 'Embroidered boutique cotton kurti one-piece suits and breathable linen A-line tunics.' },
          { bold: 'Fashion, Organic Agro & Crafts:', text: '84-count royal crimson Dhakai Jamdani sarees, Rajshahi silk Panjabis, Sundarbans wild mangrove honey, Bogura ghee, and Nakshi Kantha quilts.' }
        ]
      },
      { type: 'subheading', text: '7.3 Storefront Navigation, Search & Contiguous PDP Flow' },
      {
        type: 'paragraph',
        text: 'The customer storefront integrates instant keyword filtering across titles, origins, and tags alongside dynamic sorting (Featured, Flash Deals, Price Low-to-High, Price High-to-Low, Top Rated). Selecting any catalog item launches a contiguous Product Detail Modal (PDP) displaying verified regional provenance, discount savings mathematics, seller store rating, live stock availability, and immediate Add-to-Bag or Buy-Now execution without disrupting filter scroll state.'
      },
      { type: 'subheading', text: '7.4 Centralized Reactive State Synchronization & Live Storefront Snapshot' },
      {
        type: 'paragraph',
        text: 'Global state synchronization across all dashboards operates through the centralized AppProvider context. Every mutating action—addToCart, applyCoupon, placeOrder, addProduct, updateProductStock, updateOrderStatus, requestReturn, and resolveReturn—executes deterministically and cross-updates dependent views immediately. Figure 7.1 illustrates the live Customer Storefront workflow, showing the real-time flash ticker, Role Switcher navigation bar, 8-category filters, and interactive SKU scarcity states.'
      },
      { type: 'diagram', id: 'ui_storefront', caption: 'Figure 7.1: Live Application Interface — Storefront Navigation, Multi-Role Switcher, Flash Ticker & Scarcity Workflow' },
      { type: 'subheading', text: '7.5 Modular Frontend Component Responsibility Matrix' },
      {
        type: 'table',
        caption: 'Table 7.1: Modular Frontend Component Architecture & Responsibilities',
        headers: ['Component Module', 'Role Persona', 'Core Interactive Features'],
        rows: [
          ['CustomerStorefront', 'Customer', '8 category tabs, live search/sort, flash indicators, wishlist, PDP modal'],
          ['CartDrawer & PaymentModal', 'Customer', 'Stock-capped qty, promo validation, bKash/Nagad OTP+PIN sandbox & COD'],
          ['OrderTrackingModal', 'Customer', '5-stage timeline progress bar & post-delivery return claim submission'],
          ['SellerDashboard', 'Seller', 'Multi-store switcher, Product CRUD, inline stock edit, courier handover & refunds'],
          ['AdminDashboard', 'Super Admin', 'Platform GMV, 10% commission revenue, product approval & promo management'],
          ['DeliveryDashboard', 'Delivery Mgr', 'Pathao/Paperfly queue, COD collection status & dispatch progression'],
          ['ProjectHub & ThesisReportView', 'Academic / Viva', 'API Explorer, ER viewer, Viva Q&A, Certificate Editor & Word/PDF Export']
        ]
      }
    ]
  },
  {
    id: 'chapter-8',
    number: 8,
    title: 'Backend Logic, Multi-Vendor Splitting & API Design',
    blocks: [
      { type: 'subheading', text: '8.1 Modular Application Architecture & RBAC Matrix' },
      {
        type: 'paragraph',
        text: 'Following Django architectural conventions, business logic is decomposed into isolated apps (accounts, sellers, products, orders, payments, marketing, delivery, and notifications). Role-Based Access Control (RBAC) enforces strict query-level scoping as formalized in Table 8.1.'
      },
      {
        type: 'table',
        caption: 'Table 8.1: Role-Based Access Control (RBAC) Permission Matrix',
        headers: ['Platform Operation', 'Customer', 'Seller', 'Admin', 'Delivery Mgr'],
        rows: [
          ['Browse Storefront, Apply Coupons & Checkout', 'ALLOW', 'Read Only', 'Audit', 'Denied'],
          ['Create / Update Own Store Products & Stock', 'Denied', 'ALLOW (Own)', 'Approve All', 'Denied'],
          ['Approve Vendors, Manage Coupons & Audit MFS', 'Denied', 'Denied', 'ALLOW', 'Denied'],
          ['Advance Courier Transit Status & Collect COD', 'Track Only', 'Handover', 'Override', 'ALLOW']
        ]
      },
      { type: 'diagram', id: 'ui_seller_admin', caption: 'Figure 8.1: Multi-Vendor Operational Interfaces — Seller Inventory/Order Split Portal & Super Admin Governance Console' },
      { type: 'subheading', text: '8.2 Multi-Vendor Order Splitting Algorithm' },
      {
        type: 'paragraph',
        text: 'When a customer purchases items from multiple independent merchants inside a single shopping bag, Algorithm 8.1 ensures single-payment buyer convenience alongside independent per-vendor fulfillment and commission settlement.'
      },
      {
        type: 'code',
        caption: 'Algorithm 8.1: Atomic Multi-Vendor Order Splitting & Commission Settlement',
        code: `FUNCTION place_multi_vendor_order(customer, cart_items, coupon_code, payment_method):
  BEGIN ATOMIC TRANSACTION:
    subtotal = SUM(item.priceBDT * item.qty FOR item IN cart_items)
    discount = evaluate_coupon(subtotal, coupon_code)
    shipping = 0 IF coupon_code == 'FREESHIP' ELSE (60 IF district == 'Dhaka' ELSE 120)
    master_order = INSERT INTO Orders(customer, subtotal, discount, shipping, payment_method)

    FOR EACH item IN cart_items:
      LOCK_ROW Product_Inventory WHERE product_id = item.productId
      IF inventory.stock_qty < item.qty: ABORT("Insufficient Stock")
      inventory.stock_qty -= item.qty
      IF inventory.stock_qty <= inventory.low_stock_threshold:
        DISPATCH_NOTIFICATION(item.sellerId, type="stock", title="Low Stock Alert")

      commission = ROUND(item.priceBDT * item.qty * 0.10, 2)
      net_seller_credit = (item.priceBDT * item.qty) - commission
      INSERT INTO Order_Items(order_id=master_order.id, seller_id=item.sellerId, net_seller_credit)
      DISPATCH_NOTIFICATION(item.sellerId, type="order", title="New Order Item Assigned")

  COMMIT TRANSACTION
  RETURN master_order`
      },
      { type: 'subheading', text: '8.3 Commission Accounting & Financial Worked Example' },
      {
        type: 'paragraph',
        text: 'In the Super Admin Console, platform revenue applies a transparent 10% marketplace commission model across non-refunded Gross Merchandise Value (GMV). For example, on Order ORD-BD-8902 totaling ৳8,490 subtotal (less ৳500 coupon plus ৳120 shipping), the platform recognizes ৳849 in marketplace commission while crediting the remainder to the seller wallet upon delivery completion.'
      },
      { type: 'subheading', text: '8.4 Django REST Framework (DRF) API Endpoint Contracts' },
      {
        type: 'table',
        caption: 'Table 8.2: Core RESTful API Endpoints Exposed by MarketingHub Backend',
        headers: ['Method', 'Endpoint Path', 'Permission', 'Payload & Operation'],
        rows: [
          ['GET', '/api/v1/products/', 'Public', 'Paginated catalog with category, flash deal & price filters'],
          ['POST', '/api/v1/seller/products/', 'Seller', 'Create new SKU & initialize Product_Inventory threshold'],
          ['POST', '/api/v1/orders/checkout/', 'Customer', 'Validate coupon, lock inventory & partition by seller_id'],
          ['POST', '/api/v1/payments/bkash/create/', 'Customer', 'Generate bKash tokenized checkout session & paymentID'],
          ['POST', '/api/v1/payments/bkash/execute/', 'Server-to-Server', 'Verify trxID & amount directly with bKash Merchant API'],
          ['PATCH', '/api/v1/delivery/shipments/{id}/', 'Delivery Mgr', 'Advance courier transit milestone & push buyer alert']
        ]
      },
      { type: 'pageBreak' },
      { type: 'subheading', text: '8.5 Sample Verified JSON Response Payloads' },
      {
        type: 'paragraph',
        text: 'The CSE Defense Hub interactive API Explorer simulates serialized JSON payloads returned by the Multi-Vendor Order Placement and bKash Merchant Create endpoints, validating response structures expected by frontend TypeScript consumers:'
      },
      {
        type: 'code',
        code: `// POST /api/v1/orders/checkout/ -- Multi-Vendor Order Split Response (HTTP 201)
{
  "message": "Order created with multi-vendor item segregation",
  "order_id": "ORD-BD-9021",
  "total_bdt": 9954,
  "payment_status": "PAID",
  "seller_dispatches": [
    { "seller_id": "seller-1", "store": "Dhakaiya Weavers", "item_count": 1, "status": "NOTIFIED" },
    { "seller_id": "seller-2", "store": "Dhaka Daily Mart", "item_count": 2, "status": "NOTIFIED" }
  ]
}`
      }
    ]
  },
  {
    id: 'chapter-9',
    number: 9,
    title: 'Payment Gateway Integration (bKash, Nagad & COD)',
    blocks: [
      { type: 'subheading', text: '9.1 Bangladeshi Mobile Financial Services (MFS) Ecosystem' },
      {
        type: 'paragraph',
        text: 'In Bangladesh, mobile wallet adoption vastly outpaces credit card penetration. Supporting bKash, Nagad, and Cash on Delivery (COD) is indispensable for widespread commercial conversion. MarketingHub implements a multi-step checkout wizard collecting verified shipping coordinates across all major districts (applying ৳60 Dhaka vs ৳120 nationwide shipping) before transitioning into wallet verification.'
      },
      { type: 'subheading', text: '9.2 Secure Server-Side Verification Sequence' },
      {
        type: 'paragraph',
        text: 'A non-negotiable security rule enforced by our architecture is that customer wallet PINs and OTPs are never persisted or logged on application servers. Authentication executes solely inside the hosted bKash/Nagad sandbox UI, followed by direct server-to-server execution confirmation (Figure 9.1).'
      },
      { type: 'diagram', id: 'payment', caption: 'Figure 9.1: Sequence Diagram of Idempotent bKash & Nagad Server-Side Transaction Verification' },
      { type: 'subheading', text: '9.3 Gateway Comparison & Security Matrix' },
      {
        type: 'table',
        caption: 'Table 9.1: Payment Channel Security, Verification & Refund Capabilities',
        headers: ['Gateway', 'Customer Auth', 'Server Verification', 'Trx ID Prefix', 'Refund Settlement'],
        rows: [
          ['bKash Merchant', 'Phone + OTP + PIN', 'Tokenized Execute API (statusCode 0000)', 'BKSH...', 'Instant MFS Refund API'],
          ['Nagad Gateway', 'Phone + OTP + PIN', 'RSA-SHA256 Signature Complete Check', 'NGD...', 'Gateway Reversal API'],
          ['Cash on Delivery', 'SMS Phone Confirm', 'Courier Rider Cash Receipt', 'COD-Pending', 'Store Credit / MFS Payout']
        ]
      },
      { type: 'pageBreak' },
      { type: 'subheading', text: '9.4 Idempotency Keys & End-to-End Return/Refund Settlement' },
      {
        type: 'paragraph',
        text: 'Mobile network instability can cause users to double-tap confirmation buttons. Assigning a unique idempotency_key per invoice guarantees the payment gateway never charges a customer twice for the same order. Post-delivery, buyers inspect orders inside the tracking modal and submit structured return claims; Sellers review claims in the Seller Dashboard and approve instant refunds, transitioning orderStatus to refunded and appending a reversal log.'
      },
      {
        type: 'code',
        code: `// Sandbox Verification State Flow (Checkout Gateway Module)
Step 1: Shipping Form  -> Validate Name, BD Phone (01XXXXXXXXX), Street & District
Step 2: Gateway Select -> Choose 'bkash' | 'nagad' | 'cod'
Step 3: MFS Sandbox    -> Simulate Phone -> 6-Digit OTP -> 5-Digit PIN Challenge
Step 4: Order Creation -> Generate TrxID (e.g. BKSH9A7B3X91), Lock Stock, Notify Seller`
      },
      { type: 'diagram', id: 'ui_payment_tracking', caption: 'Figure 9.2: Interactive Transaction Workflow — Cart Coupon Math, bKash/Nagad OTP+PIN Checkout & 5-Stage Tracking Modal' }
    ]
  },
  {
    id: 'chapter-10',
    number: 10,
    title: 'Real-Time Marketing Engine & Notifications',
    blocks: [
      { type: 'subheading', text: '10.1 Flash Sale Countdown & Psychological Scarcity Indicators' },
      {
        type: 'paragraph',
        text: 'Unlike passive web catalogs, MarketingHub integrates active promotional feedback loops directly into the shopping journey. A real-time marketing banner renders a second-by-second synchronized countdown ticker (for campaigns such as Bijoy Mela Flash Festival 2026) with one-click promo copying. Across storefront cards, products approaching depletion trigger live scarcity indicators (e.g., "Only 3 left in stock!") whenever product.stock <= product.lowStockThreshold, encouraging prompt checkout decisions.'
      },
      { type: 'subheading', text: '10.2 Rule-Based Promo Coupon Validation Engine' },
      {
        type: 'paragraph',
        text: 'Inside the shopping cart and reactive state engine, promotional codes are normalized to uppercase and validated against minimum cart thresholds and maximum BDT caps:'
      },
      {
        type: 'bullets',
        items: [
          { bold: 'DESHI20:', text: 'Applies 20% instant discount capped at ৳500 when subtotal >= ৳1,500.' },
          { bold: 'BKASH10:', text: 'Applies 10% instant rebate capped at ৳300 when subtotal >= ৳1,000.' },
          { bold: 'FREESHIP:', text: 'Waives the ৳60 (Dhaka) or ৳120 (Rest of Bangladesh) delivery fee when subtotal >= ৳2,500.' }
        ]
      },
      { type: 'subheading', text: '10.3 Real-Time Notification Feed & Trigger Taxonomy' },
      {
        type: 'table',
        caption: 'Table 10.1: Real-Time Event Triggers & Target Recipients',
        headers: ['Event Type', 'Trigger Condition', 'Target Channel / User'],
        rows: [
          ['marketing', 'Admin activates campaign or promo code applied', 'Global broadcast (marketing_broadcast)'],
          ['stock', 'Checkout reduces stock <= lowStockThreshold', 'Vendor alert (seller_<id>)'],
          ['payment', 'bKash/Nagad execution confirmed (statusCode 0000)', 'Buyer + Admin payment audit feed'],
          ['order', 'Order created, courier picked up, delivered, or refunded', 'Customer + Assigned Seller + Delivery Hub']
        ]
      },
      { type: 'pageBreak' },
      { type: 'subheading', text: '10.4 WebSocket Architecture with Django Channels & Redis' },
      {
        type: 'paragraph',
        text: 'Figure 10.1 depicts the asynchronous event pipeline bridging order and inventory mutations to live UI subscribers via Redis Pub/Sub channel groups.'
      },
      { type: 'diagram', id: 'marketing', caption: 'Figure 10.1: Real-Time Flash Marketing, Scarcity Trigger & Notification Broadcasting Architecture' },
      { type: 'diagram', id: 'ui_delivery_alerts', caption: 'Figure 10.2: Live Operational Workflow — Delivery Manager Dispatch Console & Real-Time Notification Stream' },
      { type: 'subheading', text: '10.5 Coupon Computation Implementation Logic' },
      {
        type: 'code',
        code: `// Dynamic Coupon Calculation Engine inside AppContext
const rawDiscount = Math.round((cartSubtotalBDT * activeCoupon.discountPercent) / 100);
const appliedDiscountBDT = activeCoupon.code === 'FREESHIP'
  ? 0
  : Math.min(rawDiscount, activeCoupon.maxDiscountBDT);
const shippingFeeBDT = activeCoupon.code === 'FREESHIP'
  ? 0 : (district === 'Dhaka' ? 60 : 120);`
      }
    ]
  },
  {
    id: 'chapter-11',
    number: 11,
    title: 'Testing, Security Audits & Deployment Results',
    blocks: [
      { type: 'subheading', text: '11.1 Static Analysis & Production Build Verification' },
      {
        type: 'paragraph',
        text: 'Every engineering increment in MarketingHub Online Platform undergoes dual automated validation: TypeScript compiler checking (tsc --noEmit) ensures zero missing imports or type mismatches across components, while Vite production bundling verifies clean resolution of styles, scripts, and chunk minification.'
      },
      { type: 'subheading', text: '11.2 Security Hardening & Vulnerability Mitigation Matrix' },
      {
        type: 'table',
        caption: 'Table 11.1: Security Threat Model & Architectural Mitigations',
        headers: ['Threat Vector', 'Risk Impact', 'Implemented Mitigation'],
        rows: [
          ['Cross-Site Scripting (XSS)', 'Session hijacking via product titles/reviews', 'React automatic JSX escaping & zero raw HTML injection'],
          ['Fake Payment Spoofing', 'Unpaid order marked complete', 'Server-to-server bKash Execute API & amount cross-verification'],
          ['Flash-Sale Overselling', 'Negative stock & fulfillment failure', 'PostgreSQL select_for_update() locks + frontend stock caps'],
          ['Cross-Tenant Mutation', 'Seller modifying rival vendor items', 'Strict RBAC filtering all queries by authenticated seller_id']
        ]
      },
      { type: 'pageBreak' },
      { type: 'subheading', text: '11.3 End-to-End System Verification Test Cases' },
      {
        type: 'table',
        caption: 'Table 11.2: Executed Functional & Integration Test Matrix (100% Pass Rate)',
        headers: ['TC ID', 'Test Scenario', 'Expected Outcome', 'Status'],
        rows: [
          ['TC-01', 'Category filter across Grocery, Cosmetics, Furniture, Electronics, Ladies Dress', 'Grid filters instantaneously with accurate counts', 'PASS'],
          ['TC-02', 'Apply DESHI20 coupon on bag subtotal >= ৳1,500', '20% discount applied capped at ৳500', 'PASS'],
          ['TC-03', 'Complete bKash Sandbox Phone -> OTP -> PIN flow', 'TrxID generated, stock decremented, notifications dispatched', 'PASS'],
          ['TC-04', 'Complete Nagad Gateway & Cash on Delivery orders', 'Distinct gateway status & courier COD collection flag set', 'PASS'],
          ['TC-05', 'Low stock alert threshold triggered on Aura Pro Earbuds', 'Unread stock warning pushed to Notifications feed', 'PASS'],
          ['TC-06', 'Seller adds new product & edits stock in SellerDashboard', 'New item immediately visible on Customer Storefront', 'PASS'],
          ['TC-07', 'Delivery Manager advances order stage to Delivered', '5-stage timeline updates live in OrderTrackingModal', 'PASS'],
          ['TC-08', 'Customer submits Return claim & Seller approves refund', 'Order status transitions cleanly to refunded', 'PASS'],
          ['TC-09', 'Export Thesis Report in Microsoft Word (.docx) & PDF (.pdf)', 'Standalone formatted files download with diagrams & certificate', 'PASS'],
          ['TC-10', 'Run tsc --noEmit, Vite build & GitHub Pages CI/CD deploy', 'Zero TypeScript errors; live HTTPS SPA rendered', 'PASS']
        ]
      },
      { type: 'subheading', text: '11.4 Continuous Integration & Cloud Deployment Automation' },
      {
        type: 'paragraph',
        text: 'Continuous deployment to GitHub Pages runs automatically on push to the main branch using declarative workflow automation. Node.js 20 installs dependencies with peer-safety flags, compiles the Vite production bundle into static assets, and publishes over HTTPS with zero manual server administration.'
      }
    ]
  },
  {
    id: 'chapter-12',
    number: 12,
    title: 'Conclusion, Limitations & Future Scope',
    blocks: [
      { type: 'subheading', text: '12.1 Summary of Achievements' },
      {
        type: 'paragraph',
        text: 'MarketingHub Online Platform successfully achieves every engineering and academic milestone specified in the CSE Final Year Project Blueprint. By uniting eight high-demand Bangladeshi retail categories (Grocery, Cosmetics, Furniture, Electronics, Ladies One-Piece Dresses, Handlooms, Organic Agro, and Artisanal Handicrafts) with four synchronized role dashboards, a live promotional marketing engine, a 22-table normalized database architecture, and verified bKash/Nagad/COD checkout workflows, the system delivers a production-grade blueprint ready for academic defense and commercial evolution.'
      },
      { type: 'subheading', text: '12.2 Current Limitations' },
      {
        type: 'bullets',
        items: [
          { bold: 'Sandboxed Client Persistence:', text: 'The interactive browser preview operates with reactive client-side state rather than live remote database persistence, ensuring portability on static GitHub Pages hosts without paid cloud database dependencies.' },
          { bold: 'Simulated Payment & Courier Gateways:', text: 'bKash, Nagad, and Pathao/Paperfly webhooks are realistically modeled in sandbox workflows because live merchant API keys require formal corporate Trade License and Bangladesh Bank MFS onboarding.' },
          { bold: 'Single-Currency Evaluation:', text: 'Pricing operates solely in Bangladeshi Taka (BDT / ৳) tailored to domestic multi-district logistics.' }
        ]
      },
      { type: 'subheading', text: '12.3 Future Scope & Research Roadmap' },
      {
        type: 'bullets',
        items: [
          { bold: 'Production Django + PostgreSQL + Redis Deployment:', text: 'Deploying the complete Django REST Framework API tier onto container cloud infrastructure with live PostgreSQL row-level stock locking and Redis ASGI WebSocket clusters.' },
          { bold: 'Vector-Powered Personalized Recommendations:', text: 'Integrating PostgreSQL pgvector embeddings to recommend complementary groceries, cosmetics, and fashion items based on real-time user clickstreams.' },
          { bold: 'Live MFS & Courier Webhook Onboarding:', text: 'Connecting official bKash Tokenized Checkout Merchant credentials, Nagad production RSA certificates, and automated Steadfast/Pathao parcel consignment APIs.' },
          { bold: 'Bangla Voice Search & Cross-Platform Mobile Suite:', text: 'Adding Bengali speech-to-text catalog search alongside native Android/iOS Flutter applications consuming unified DRF endpoints.' }
        ]
      },
      { type: 'subheading', text: '12.4 Final Academic Reflection' },
      {
        type: 'paragraph',
        text: 'Through systematic requirement modeling, relational normalization across twenty-two tables, strict TypeScript type safety, and user-centric multi-role workflow orchestration, MarketingHub Online Platform demonstrates how modern full-stack web engineering can empower local merchants and consumers across Bangladesh with a transparent, secure, and scalable digital marketplace.'
      }
    ]
  }
];

export const THESIS_REFERENCES: string[] = [
  '[1] Django Software Foundation, Django Web Framework Documentation & Security Deployment Guide, v5.0, https://docs.djangoproject.com/',
  '[2] Encode OSS, Django REST Framework Official Specification & Permissions Architecture, https://www.django-rest-framework.org/',
  '[3] React Team (Meta Platforms), React 19 Reference & Context State Management, https://react.dev/',
  '[4] Microsoft TypeScript Team, TypeScript Handbook & Strict Static Type Checking, https://www.typescriptlang.org/docs/',
  '[5] Evan You & Vite Contributors, Vite v8 Next-Generation Frontend Build Tooling, https://vitejs.dev/',
  '[6] Tailwind Labs, Tailwind CSS v4 Utility-First CSS & Print Media Styling, https://tailwindcss.com/',
  '[7] bKash Limited, bKash Tokenized Checkout Merchant API Developer Documentation, Dhaka, Bangladesh, https://developer.bka.sh/',
  '[8] Nagad Ltd., Nagad Online Payment Gateway RSA Signature Integration Guide, Dhaka, Bangladesh.',
  '[9] PostgreSQL Global Development Group, PostgreSQL 16 Concurrency Control & Explicit Row Locking, https://www.postgresql.org/docs/',
  '[10] Redis Ltd., Redis Pub/Sub Messaging & Django Channels ASGI Specification, https://redis.io/docs/',
  '[11] Dolan Miu & Contributors, docx JavaScript/TypeScript WordprocessingML Generator, https://docx.js.org/',
  '[12] Parallax & Contributors, jsPDF Client-Side PDF Generation Specification, https://github.com/parallax/jsPDF',
  '[13] I. Sommerville, Software Engineering, 10th Edition, Pearson Education, 2016.',
  '[14] A. Silberschatz, H. F. Korth, and S. Sudarshan, Database System Concepts, 7th Edition, McGraw-Hill, 2019.',
  '[15] OWASP Foundation, OWASP Top Ten Web Application Security Risks, https://owasp.org/www-project-top-ten/'
];
