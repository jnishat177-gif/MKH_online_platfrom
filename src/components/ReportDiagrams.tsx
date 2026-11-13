import React from 'react';

export const SystemArchitectureDiagram: React.FC = () => (
  <figure className="avoid-break my-6 bg-white border border-slate-300 rounded-xl p-4">
    <svg data-diagram-id="arch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 450" fontFamily="Arial, Helvetica, sans-serif" className="w-full h-auto" role="img" aria-label="Multi-Tier System Architecture Diagram">
      <defs>
        <marker id="arrowDark" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#334155" />
        </marker>
      </defs>

      {/* Background Header */}
      <rect x="10" y="10" width="800" height="430" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="34" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">
        MARKETINGHUB ONLINE PLATFORM — 4-TIER DIGITAL SYSTEM ARCHITECTURE
      </text>

      {/* Tier 1: Presentation Layer */}
      <rect x="30" y="50" width="760" height="90" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
      <text x="45" y="68" fontSize="11" fontWeight="700" fill="#065f46">TIER 1: CLIENT PRESENTATION LAYER (React 19 + TypeScript + Tailwind CSS v4 + Vite 8)</text>
      <rect x="45" y="78" width="165" height="48" rx="6" fill="#ffffff" stroke="#10b981" />
      <text x="127" y="99" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">Customer Storefront</text>
      <text x="127" y="115" textAnchor="middle" fontSize="9.5" fill="#475569">Catalog · Cart · Track · Bag</text>

      <rect x="230" y="78" width="165" height="48" rx="6" fill="#ffffff" stroke="#10b981" />
      <text x="312" y="99" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">Seller Merchant Portal</text>
      <text x="312" y="115" textAnchor="middle" fontSize="9.5" fill="#475569">Product CRUD · Stock · Returns</text>

      <rect x="415" y="78" width="165" height="48" rx="6" fill="#ffffff" stroke="#10b981" />
      <text x="497" y="99" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">Super Admin Console</text>
      <text x="497" y="115" textAnchor="middle" fontSize="9.5" fill="#475569">GMV · Approvals · Coupons</text>

      <rect x="600" y="78" width="170" height="48" rx="6" fill="#ffffff" stroke="#10b981" />
      <text x="685" y="99" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">Delivery Logistics Hub</text>
      <text x="685" y="115" textAnchor="middle" fontSize="9.5" fill="#475569">Courier Routing · COD · POD</text>

      {/* Arrows Tier 1 -> Tier 2 */}
      <line x1="205" y1="140" x2="205" y2="170" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowDark)" />
      <line x1="410" y1="140" x2="410" y2="170" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowDark)" />
      <line x1="615" y1="140" x2="615" y2="170" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowDark)" />
      <text x="418" y="160" fontSize="9" fontWeight="600" fill="#475569">HTTPS REST JSON / WebSocket (WSS)</text>

      {/* Tier 2: Application & Real-Time Layer */}
      <rect x="30" y="172" width="760" height="100" rx="8" fill="#eef2ff" stroke="#4f46e5" strokeWidth="1.2" />
      <text x="45" y="190" fontSize="11" fontWeight="700" fill="#312e81">TIER 2: APPLICATION, BUSINESS LOGIC &amp; REAL-TIME MARKETING LAYER</text>

      <rect x="45" y="200" width="225" height="58" rx="6" fill="#ffffff" stroke="#6366f1" />
      <text x="157" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">Django REST API &amp; RBAC</text>
      <text x="157" y="235" textAnchor="middle" fontSize="9.5" fill="#475569">JWT Auth · Multi-Vendor Splitting</text>
      <text x="157" y="248" textAnchor="middle" fontSize="9.5" fill="#475569">Coupon &amp; Pricing Calculation Engine</text>

      <rect x="295" y="200" width="225" height="58" rx="6" fill="#ffffff" stroke="#6366f1" />
      <text x="407" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">Real-Time Marketing Engine</text>
      <text x="407" y="235" textAnchor="middle" fontSize="9.5" fill="#475569">Django Channels (ASGI) + Redis Pub/Sub</text>
      <text x="407" y="248" textAnchor="middle" fontSize="9.5" fill="#475569">Flash Deals · Low Stock · Live Alerts</text>

      <rect x="545" y="200" width="225" height="58" rx="6" fill="#ffffff" stroke="#6366f1" />
      <text x="657" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">Client Context &amp; Build Pipeline</text>
      <text x="657" y="235" textAnchor="middle" fontSize="9.5" fill="#475569">React AppContext · JSZip Packager</text>
      <text x="657" y="248" textAnchor="middle" fontSize="9.5" fill="#475569">GitHub Actions CI/CD Auto-Deploy</text>

      {/* Arrows Tier 2 -> Tier 3 */}
      <line x1="205" y1="272" x2="205" y2="306" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowDark)" />
      <line x1="410" y1="272" x2="410" y2="306" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowDark)" />
      <line x1="615" y1="272" x2="615" y2="306" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowDark)" />

      {/* Tier 3: Data Persistence & External Gateways */}
      <rect x="30" y="308" width="370" height="114" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2" />
      <text x="45" y="328" fontSize="11" fontWeight="700" fill="#1e3a8a">TIER 3A: RELATIONAL DATA PERSISTENCE</text>
      <rect x="45" y="338" width="160" height="70" rx="6" fill="#ffffff" stroke="#3b82f6" />
      <text x="125" y="360" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">PostgreSQL (20 Tables)</text>
      <text x="125" y="376" textAnchor="middle" fontSize="9.5" fill="#475569">ACID Transactions</text>
      <text x="125" y="391" textAnchor="middle" fontSize="9.5" fill="#475569">select_for_update() Lock</text>

      <rect x="220" y="338" width="165" height="70" rx="6" fill="#ffffff" stroke="#3b82f6" />
      <text x="302" y="360" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">Redis Cache &amp; Broker</text>
      <text x="302" y="376" textAnchor="middle" fontSize="9.5" fill="#475569">Session &amp; Cart Cache</text>
      <text x="302" y="391" textAnchor="middle" fontSize="9.5" fill="#475569">WebSocket Channel Layer</text>

      <rect x="420" y="308" width="370" height="114" rx="8" fill="#fff1f2" stroke="#e11d48" strokeWidth="1.2" />
      <text x="435" y="328" fontSize="11" fontWeight="700" fill="#881337">TIER 3B: EXTERNAL PAYMENT &amp; LOGISTICS APIS</text>
      <rect x="435" y="338" width="110" height="70" rx="6" fill="#ffffff" stroke="#f43f5e" />
      <text x="490" y="362" textAnchor="middle" fontSize="11" fontWeight="700" fill="#be123c">bKash API</text>
      <text x="490" y="378" textAnchor="middle" fontSize="9" fill="#475569">Tokenized Checkout</text>
      <text x="490" y="392" textAnchor="middle" fontSize="9" fill="#475569">Server Verification</text>

      <rect x="555" y="338" width="105" height="70" rx="6" fill="#ffffff" stroke="#f97316" />
      <text x="607" y="362" textAnchor="middle" fontSize="11" fontWeight="700" fill="#c2410c">Nagad API</text>
      <text x="607" y="378" textAnchor="middle" fontSize="9" fill="#475569">RSA-SHA256</text>
      <text x="607" y="392" textAnchor="middle" fontSize="9" fill="#475569">OTP/PIN Auth</text>

      <rect x="670" y="338" width="105" height="70" rx="6" fill="#ffffff" stroke="#d97706" />
      <text x="722" y="362" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">Courier Hub</text>
      <text x="722" y="378" textAnchor="middle" fontSize="9" fill="#475569">Pathao / Paperfly</text>
      <text x="722" y="392" textAnchor="middle" fontSize="9" fill="#475569">64-District COD</text>
    </svg>
    <figcaption className="text-center text-xs font-semibold text-slate-600 mt-2">
      Figure 4.1: Multi-Tier Digital System Architecture of MarketingHub Online Platform
    </figcaption>
  </figure>
);

export const UseCaseDiagram: React.FC = () => (
  <figure className="avoid-break my-6 bg-white border border-slate-300 rounded-xl p-4">
    <svg data-diagram-id="usecase" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 460" fontFamily="Arial, Helvetica, sans-serif" className="w-full h-auto" role="img" aria-label="UML Use Case Diagram">
      <rect x="10" y="10" width="800" height="440" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      {/* System Boundary */}
      <rect x="180" y="30" width="460" height="400" rx="12" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="6 4" />
      <text x="410" y="52" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">
        MARKETINGHUB ONLINE PLATFORM (SYSTEM BOUNDARY)
      </text>

      {/* Left Actors: Customer & Seller */}
      {/* Customer Actor */}
      <circle cx="80" cy="110" r="14" fill="#ecfdf5" stroke="#047857" strokeWidth="2" />
      <line x1="80" y1="124" x2="80" y2="162" stroke="#047857" strokeWidth="2" />
      <line x1="58" y1="140" x2="102" y2="140" stroke="#047857" strokeWidth="2" />
      <line x1="80" y1="162" x2="62" y2="185" stroke="#047857" strokeWidth="2" />
      <line x1="80" y1="162" x2="98" y2="185" stroke="#047857" strokeWidth="2" />
      <text x="80" y="203" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">Customer</text>

      {/* Seller Actor */}
      <circle cx="80" cy="295" r="14" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="2" />
      <line x1="80" y1="309" x2="80" y2="347" stroke="#1d4ed8" strokeWidth="2" />
      <line x1="58" y1="325" x2="102" y2="325" stroke="#1d4ed8" strokeWidth="2" />
      <line x1="80" y1="347" x2="62" y2="370" stroke="#1d4ed8" strokeWidth="2" />
      <line x1="80" y1="347" x2="98" y2="370" stroke="#1d4ed8" strokeWidth="2" />
      <text x="80" y="388" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e3a8a">Seller / Vendor</text>

      {/* Right Actors: Admin & Delivery Manager */}
      {/* Admin Actor */}
      <circle cx="740" cy="110" r="14" fill="#eef2ff" stroke="#4338ca" strokeWidth="2" />
      <line x1="740" y1="124" x2="740" y2="162" stroke="#4338ca" strokeWidth="2" />
      <line x1="718" y1="140" x2="762" y2="140" stroke="#4338ca" strokeWidth="2" />
      <line x1="740" y1="162" x2="722" y2="185" stroke="#4338ca" strokeWidth="2" />
      <line x1="740" y1="162" x2="758" y2="185" stroke="#4338ca" strokeWidth="2" />
      <text x="740" y="203" textAnchor="middle" fontSize="11" fontWeight="700" fill="#312e81">Super Admin</text>

      {/* Delivery Manager Actor */}
      <circle cx="740" cy="295" r="14" fill="#fffbeb" stroke="#b45309" strokeWidth="2" />
      <line x1="740" y1="309" x2="740" y2="347" stroke="#b45309" strokeWidth="2" />
      <line x1="718" y1="325" x2="762" y2="325" stroke="#b45309" strokeWidth="2" />
      <line x1="740" y1="347" x2="722" y2="370" stroke="#b45309" strokeWidth="2" />
      <line x1="740" y1="347" x2="758" y2="370" stroke="#b45309" strokeWidth="2" />
      <text x="740" y="388" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">Delivery Manager</text>

      {/* Use Case Ovals */}
      {[
        { cx: 315, cy: 90, label: 'Browse, Filter & Search' },
        { cx: 315, cy: 145, label: 'Manage Cart & Coupons' },
        { cx: 315, cy: 200, label: 'bKash / Nagad / COD Checkout' },
        { cx: 315, cy: 255, label: 'Track Order & Claim Refund' },
        { cx: 315, cy: 320, label: 'Product CRUD & Stock Alert' },
        { cx: 315, cy: 380, label: 'Handover Order & Process Return' },
        { cx: 515, cy: 105, label: 'Approve Vendors & Products' },
        { cx: 515, cy: 170, label: 'Manage Campaigns & GMV' },
        { cx: 515, cy: 245, label: 'Verify Payment Audit Logs' },
        { cx: 515, cy: 335, label: 'Dispatch & Confirm Delivery' },
      ].map((uc, i) => (
        <g key={i}>
          <ellipse cx={uc.cx} cy={uc.cy} rx="102" ry="20" fill="#f1f5f9" stroke="#475569" strokeWidth="1.2" />
          <text x={uc.cx} y={uc.cy + 4} textAnchor="middle" fontSize="10" fontWeight="600" fill="#0f172a">
            {uc.label}
          </text>
        </g>
      ))}

      {/* Connections */}
      <line x1="102" y1="125" x2="213" y2="90" stroke="#047857" strokeWidth="1.2" />
      <line x1="102" y1="135" x2="213" y2="145" stroke="#047857" strokeWidth="1.2" />
      <line x1="102" y1="145" x2="213" y2="200" stroke="#047857" strokeWidth="1.2" />
      <line x1="102" y1="155" x2="213" y2="255" stroke="#047857" strokeWidth="1.2" />

      <line x1="102" y1="320" x2="213" y2="320" stroke="#1d4ed8" strokeWidth="1.2" />
      <line x1="102" y1="335" x2="213" y2="380" stroke="#1d4ed8" strokeWidth="1.2" />

      <line x1="718" y1="125" x2="617" y2="105" stroke="#4338ca" strokeWidth="1.2" />
      <line x1="718" y1="140" x2="617" y2="170" stroke="#4338ca" strokeWidth="1.2" />
      <line x1="718" y1="155" x2="617" y2="245" stroke="#4338ca" strokeWidth="1.2" />

      <line x1="718" y1="330" x2="617" y2="335" stroke="#b45309" strokeWidth="1.2" />
      <line x1="718" y1="315" x2="417" y2="255" stroke="#b45309" strokeWidth="1" strokeDasharray="3 3" />
    </svg>
    <figcaption className="text-center text-xs font-semibold text-slate-600 mt-2">
      Figure 4.2: UML Use Case Diagram Showing Role-Based Interactions Across Four User Personas
    </figcaption>
  </figure>
);

export const DataFlowDiagram: React.FC = () => (
  <figure className="avoid-break my-6 bg-white border border-slate-300 rounded-xl p-4">
    <svg data-diagram-id="dfd" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 400" fontFamily="Arial, Helvetica, sans-serif" className="w-full h-auto" role="img" aria-label="Level 1 Data Flow Diagram">
      <defs>
        <marker id="dfdArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b" />
        </marker>
      </defs>
      <rect x="10" y="10" width="800" height="380" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="410" y="34" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">
        DATA FLOW DIAGRAM (DFD LEVEL 1) — ORDER, PAYMENT &amp; MARKETING PIPELINE
      </text>

      {/* External Entities */}
      <rect x="30" y="80" width="110" height="44" fill="#ecfdf5" stroke="#047857" strokeWidth="1.5" />
      <text x="85" y="106" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">Customer</text>

      <rect x="30" y="275" width="110" height="44" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="1.5" />
      <text x="85" y="301" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e3a8a">Seller</text>

      <rect x="680" y="80" width="110" height="44" fill="#fff1f2" stroke="#be123c" strokeWidth="1.5" />
      <text x="735" y="106" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9f1239">bKash / Nagad</text>

      <rect x="680" y="275" width="110" height="44" fill="#fffbeb" stroke="#b45309" strokeWidth="1.5" />
      <text x="735" y="301" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">Courier Hub</text>

      {/* Processes (Circles) */}
      <circle cx="250" cy="102" r="42" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
      <text x="250" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">1.0 Catalog</text>
      <text x="250" y="110" textAnchor="middle" fontSize="9.5" fill="#475569">&amp; Flash Deals</text>

      <circle cx="420" cy="102" r="42" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
      <text x="420" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">2.0 Cart &amp;</text>
      <text x="420" y="110" textAnchor="middle" fontSize="9.5" fill="#475569">Coupon Engine</text>

      <circle cx="575" cy="102" r="42" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
      <text x="575" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">3.0 Payment</text>
      <text x="575" y="110" textAnchor="middle" fontSize="9.5" fill="#475569">Verification</text>

      <circle cx="420" cy="297" r="42" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
      <text x="420" y="291" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">4.0 Vendor</text>
      <text x="420" y="305" textAnchor="middle" fontSize="9.5" fill="#475569">Order Split</text>

      <circle cx="575" cy="297" r="42" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
      <text x="575" y="291" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">5.0 Delivery</text>
      <text x="575" y="305" textAnchor="middle" fontSize="9.5" fill="#475569">&amp; Refund Flow</text>

      {/* Data Stores (Parallel open bars) */}
      <g transform="translate(185, 190)">
        <line x1="0" y1="0" x2="120" y2="0" stroke="#334155" strokeWidth="1.5" />
        <line x1="0" y1="28" x2="120" y2="28" stroke="#334155" strokeWidth="1.5" />
        <text x="60" y="18" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">D1: Products DB</text>
      </g>

      <g transform="translate(360, 190)">
        <line x1="0" y1="0" x2="120" y2="0" stroke="#334155" strokeWidth="1.5" />
        <line x1="0" y1="28" x2="120" y2="28" stroke="#334155" strokeWidth="1.5" />
        <text x="60" y="18" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">D2: Orders &amp; Items</text>
      </g>

      <g transform="translate(525, 190)">
        <line x1="0" y1="0" x2="135" y2="0" stroke="#334155" strokeWidth="1.5" />
        <line x1="0" y1="28" x2="135" y2="28" stroke="#334155" strokeWidth="1.5" />
        <text x="67" y="18" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">D3: Payment Logs</text>
      </g>

      {/* Flow Arrows */}
      <line x1="140" y1="102" x2="206" y2="102" stroke="#1e293b" strokeWidth="1.3" markerEnd="url(#dfdArrow)" />
      <text x="173" y="95" textAnchor="middle" fontSize="8.5" fill="#475569">Search</text>

      <line x1="292" y1="102" x2="376" y2="102" stroke="#1e293b" strokeWidth="1.3" markerEnd="url(#dfdArrow)" />
      <text x="334" y="95" textAnchor="middle" fontSize="8.5" fill="#475569">Add Bag</text>

      <line x1="462" y1="102" x2="531" y2="102" stroke="#1e293b" strokeWidth="1.3" markerEnd="url(#dfdArrow)" />
      <text x="496" y="95" textAnchor="middle" fontSize="8.5" fill="#475569">Pay Req</text>

      <line x1="617" y1="102" x2="678" y2="102" stroke="#1e293b" strokeWidth="1.3" markerEnd="url(#dfdArrow)" />
      <text x="647" y="95" textAnchor="middle" fontSize="8.5" fill="#475569">Verify Trx</text>

      <line x1="250" y1="144" x2="250" y2="188" stroke="#1e293b" strokeWidth="1.2" markerEnd="url(#dfdArrow)" />
      <line x1="250" y1="218" x2="250" y2="297" stroke="#1e293b" strokeWidth="1.2" />
      <line x1="250" y1="297" x2="142" y2="297" stroke="#1e293b" strokeWidth="1.2" markerEnd="url(#dfdArrow)" />

      <line x1="575" y1="144" x2="575" y2="188" stroke="#1e293b" strokeWidth="1.2" markerEnd="url(#dfdArrow)" />
      <line x1="420" y1="220" x2="420" y2="253" stroke="#1e293b" strokeWidth="1.2" markerEnd="url(#dfdArrow)" />
      <line x1="378" y1="297" x2="142" y2="297" stroke="#1e293b" strokeWidth="1.2" markerEnd="url(#dfdArrow)" />
      <text x="275" y="290" textAnchor="middle" fontSize="8.5" fill="#475569">Seller Split Notice</text>

      <line x1="462" y1="297" x2="531" y2="297" stroke="#1e293b" strokeWidth="1.2" markerEnd="url(#dfdArrow)" />
      <line x1="617" y1="297" x2="678" y2="297" stroke="#1e293b" strokeWidth="1.2" markerEnd="url(#dfdArrow)" />
      <text x="647" y="290" textAnchor="middle" fontSize="8.5" fill="#475569">Dispatch</text>
    </svg>
    <figcaption className="text-center text-xs font-semibold text-slate-600 mt-2">
      Figure 4.3: Level-1 Data Flow Diagram (DFD) Illustrating Storefront, Payment Verification &amp; Multi-Vendor Dispatch
    </figcaption>
  </figure>
);

export const ERDiagram: React.FC = () => (
  <figure className="avoid-break my-6 bg-white border border-slate-300 rounded-xl p-4">
    <svg data-diagram-id="er" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 490" fontFamily="Arial, Helvetica, sans-serif" className="w-full h-auto" role="img" aria-label="Relational Entity Relationship Diagram">
      <rect x="10" y="10" width="820" height="470" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="420" y="34" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">
        ENTITY-RELATIONSHIP (ER) DIAGRAM — CORE RELATIONAL SCHEMA (20-TABLE BLUEPRINT)
      </text>

      {/* Helper Entity Cards */}
      {[
        { x: 30, y: 55, w: 170, h: 105, title: 'Users', cols: ['PK id (UUID)', 'email (UNIQUE)', 'role (ENUM)', 'phone, password_hash'], color: '#0f172a' },
        { x: 245, y: 55, w: 175, h: 105, title: 'Seller_Profile', cols: ['PK id (UUID)', 'FK user_id -> Users', 'store_name, district', 'balance_bdt, verified'], color: '#1d4ed8' },
        { x: 465, y: 55, w: 175, h: 105, title: 'Products', cols: ['PK id (UUID)', 'FK seller_id, category_id', 'title, price_bdt', 'is_approved, is_flash'], color: '#047857' },
        { x: 675, y: 55, w: 135, h: 105, title: 'Product_Inventory', cols: ['PK id (UUID)', 'FK product_id', 'stock_qty', 'low_stock_threshold'], color: '#b45309' },

        { x: 30, y: 210, w: 170, h: 105, title: 'Orders', cols: ['PK id (UUID)', 'FK customer_id', 'total_bdt, coupon_code', 'order_status (ENUM)'], color: '#0f172a' },
        { x: 245, y: 210, w: 175, h: 105, title: 'Order_Items', cols: ['PK id (UUID)', 'FK order_id -> Orders', 'FK seller_id, product_id', 'qty, item_total_bdt'], color: '#7c3aed' },
        { x: 465, y: 210, w: 175, h: 105, title: 'Payments & Logs', cols: ['PK id (UUID)', 'FK order_id -> Orders', 'gateway (bKash/Nagad)', 'trx_id, server_verified'], color: '#be123c' },
        { x: 675, y: 210, w: 135, h: 105, title: 'Shipments', cols: ['PK id (UUID)', 'FK order_id', 'courier_partner', 'delivery_status'], color: '#0369a1' },

        { x: 30, y: 360, w: 170, h: 100, title: 'Coupons & Campaigns', cols: ['PK code (VARCHAR)', 'discount_percent', 'min_purchase_bdt', 'expires_at, active'], color: '#047857' },
        { x: 245, y: 360, w: 175, h: 100, title: 'Returns & Refunds', cols: ['PK id (UUID)', 'FK order_id -> Orders', 'reason, status', 'refund_trx_id'], color: '#be123c' },
        { x: 465, y: 360, w: 175, h: 100, title: 'Categories', cols: ['PK id (UUID)', 'name, bangla_name', 'slug (UNIQUE)', 'parent_id (FK)'], color: '#334155' },
        { x: 675, y: 360, w: 135, h: 100, title: 'Notifications', cols: ['PK id (UUID)', 'FK user_id', 'type, message', 'is_read, created_at'], color: '#4338ca' }
      ].map((ent, idx) => (
        <g key={idx}>
          <rect x={ent.x} y={ent.y} width={ent.w} height={ent.h} rx="6" fill="#ffffff" stroke={ent.color} strokeWidth="1.5" />
          <rect x={ent.x} y={ent.y} width={ent.w} height="24" rx="5" fill={ent.color} />
          <text x={ent.x + ent.w / 2} y={ent.y + 16} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#ffffff">
            {ent.title}
          </text>
          {ent.cols.map((c, ci) => (
            <text key={ci} x={ent.x + 8} y={ent.y + 42 + ci * 16} fontSize="9.2" fontFamily="monospace" fill="#334155">
              {c}
            </text>
          ))}
        </g>
      ))}

      {/* Cardinality Lines */}
      {/* Users 1 -> 1 Seller_Profile */}
      <line x1="200" y1="108" x2="245" y2="108" stroke="#475569" strokeWidth="1.5" />
      <text x="222" y="102" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a">1 : 1</text>

      {/* Seller_Profile 1 -> N Products */}
      <line x1="420" y1="108" x2="465" y2="108" stroke="#475569" strokeWidth="1.5" />
      <text x="442" y="102" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a">1 : N</text>

      {/* Products 1 -> 1 Product_Inventory */}
      <line x1="640" y1="108" x2="675" y2="108" stroke="#475569" strokeWidth="1.5" />
      <text x="657" y="102" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a">1 : 1</text>

      {/* Users 1 -> N Orders */}
      <line x1="115" y1="160" x2="115" y2="210" stroke="#475569" strokeWidth="1.5" />
      <text x="128" y="188" fontSize="9" fontWeight="700" fill="#0f172a">1:N</text>

      {/* Orders 1 -> N Order_Items */}
      <line x1="200" y1="262" x2="245" y2="262" stroke="#475569" strokeWidth="1.5" />
      <text x="222" y="256" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a">1 : N</text>

      {/* Orders/Order_Items -> Payments */}
      <line x1="420" y1="262" x2="465" y2="262" stroke="#475569" strokeWidth="1.5" />
      <text x="442" y="256" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a">1 : 1</text>

      {/* Payments -> Shipments */}
      <line x1="640" y1="262" x2="675" y2="262" stroke="#475569" strokeWidth="1.5" />
      <text x="657" y="256" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a">1 : 1</text>

      {/* Orders -> Returns */}
      <line x1="115" y1="315" x2="115" y2="338" stroke="#475569" strokeWidth="1.5" />
      <line x1="115" y1="338" x2="332" y2="338" stroke="#475569" strokeWidth="1.5" />
      <line x1="332" y1="338" x2="332" y2="360" stroke="#475569" strokeWidth="1.5" />

      {/* Categories -> Products */}
      <line x1="552" y1="360" x2="552" y2="335" stroke="#475569" strokeWidth="1.2" strokeDasharray="4 3" />
    </svg>
    <figcaption className="text-center text-xs font-semibold text-slate-600 mt-2">
      Figure 6.1: Entity-Relationship (ER) Diagram Depicting Multi-Vendor Order Segregation &amp; Inventory Integrity
    </figcaption>
  </figure>
);

export const PaymentSequenceDiagram: React.FC = () => (
  <figure className="avoid-break my-6 bg-white border border-slate-300 rounded-xl p-4">
    <svg data-diagram-id="payment" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 430" fontFamily="Arial, Helvetica, sans-serif" className="w-full h-auto" role="img" aria-label="Payment Verification Sequence Diagram">
      <defs>
        <marker id="seqArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" />
        </marker>
      </defs>
      <rect x="10" y="10" width="800" height="410" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="410" y="34" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">
        SEQUENCE DIAGRAM — bKash / Nagad SECURE CHECKOUT &amp; SERVER VERIFICATION
      </text>

      {/* Lifelines */}
      {[
        { x: 95, label: 'Customer', bg: '#ecfdf5', stroke: '#047857' },
        { x: 255, label: 'MarketingHub UI', bg: '#eff6ff', stroke: '#1d4ed8' },
        { x: 425, label: 'Backend API', bg: '#eef2ff', stroke: '#4338ca' },
        { x: 595, label: 'bKash/Nagad API', bg: '#fff1f2', stroke: '#be123c' },
        { x: 735, label: 'Database', bg: '#fffbeb', stroke: '#b45309' }
      ].map((ll, i) => (
        <g key={i}>
          <rect x={ll.x - 58} y="48" width="116" height="32" rx="6" fill={ll.bg} stroke={ll.stroke} strokeWidth="1.5" />
          <text x={ll.x} y="68" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0f172a">{ll.label}</text>
          <line x1={ll.x} y1="80" x2={ll.x} y2="395" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5 4" />
        </g>
      ))}

      {/* Messages */}
      {[
        { y: 112, x1: 95, x2: 255, text: '1. Submit Shipping & Select bKash/Nagad' },
        { y: 146, x1: 255, x2: 425, text: '2. POST /payments/create (cartTotal, key)' },
        { y: 180, x1: 425, x2: 595, text: '3. Create Payment (Merchant Secret)' },
        { y: 214, x1: 595, x2: 95, text: '4. Hosted Checkout: Enter Phone, OTP & PIN', dashed: true },
        { y: 248, x1: 95, x2: 425, text: '5. Authorize & Callback (paymentID)' },
        { y: 282, x1: 425, x2: 595, text: '6. Server Execute Payment & Verify trxID' },
        { y: 316, x1: 595, x2: 425, text: '7. statusCode: 0000 (Verified Paid)', dashed: true },
        { y: 350, x1: 425, x2: 735, text: '8. Atomic Stock Lock & Split Order_Items' },
        { y: 382, x1: 425, x2: 255, text: '9. Order #ORD-BD Confirmed + Notify Seller', dashed: true }
      ].map((msg, i) => (
        <g key={i}>
          <line
            x1={msg.x1}
            y1={msg.y}
            x2={msg.x2}
            y2={msg.y}
            stroke="#0f172a"
            strokeWidth="1.4"
            strokeDasharray={msg.dashed ? '4 3' : undefined}
            markerEnd="url(#seqArrow)"
          />
          <rect
            x={(msg.x1 + msg.x2) / 2 - 108}
            y={msg.y - 16}
            width="216"
            height="14"
            rx="3"
            fill="#f8fafc"
          />
          <text x={(msg.x1 + msg.x2) / 2} y={msg.y - 6} textAnchor="middle" fontSize="9.2" fontWeight="600" fill="#1e293b">
            {msg.text}
          </text>
        </g>
      ))}
    </svg>
    <figcaption className="text-center text-xs font-semibold text-slate-600 mt-2">
      Figure 9.1: Sequence Diagram of Idempotent bKash &amp; Nagad Server-Side Transaction Verification
    </figcaption>
  </figure>
);

export const ActivityDiagram: React.FC = () => (
  <figure className="avoid-break my-6 bg-white border border-slate-300 rounded-xl p-4">
    <svg data-diagram-id="activity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 350" fontFamily="Arial, Helvetica, sans-serif" className="w-full h-auto" role="img" aria-label="Order Lifecycle Activity Diagram">
      <defs>
        <marker id="actArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" />
        </marker>
      </defs>
      <rect x="10" y="10" width="800" height="330" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="410" y="34" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">
        ACTIVITY DIAGRAM — MULTI-VENDOR ORDER FULFILLMENT &amp; REFUND WORKFLOW
      </text>

      {/* Start Node */}
      <circle cx="55" cy="120" r="12" fill="#0f172a" />
      <line x1="67" y1="120" x2="105" y2="120" stroke="#0f172a" strokeWidth="1.5" markerEnd="url(#actArrow)" />

      {/* Activity 1 */}
      <rect x="108" y="96" width="120" height="48" rx="10" fill="#ecfdf5" stroke="#047857" strokeWidth="1.5" />
      <text x="168" y="117" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">Checkout &amp; Pay</text>
      <text x="168" y="132" textAnchor="middle" fontSize="9" fill="#475569">bKash / Nagad / COD</text>

      <line x1="228" y1="120" x2="265" y2="120" stroke="#0f172a" strokeWidth="1.5" markerEnd="url(#actArrow)" />

      {/* Decision Diamond */}
      <polygon points="305,88 345,120 305,152 265,120" fill="#fff1f2" stroke="#be123c" strokeWidth="1.5" />
      <text x="305" y="123" textAnchor="middle" fontSize="9" fontWeight="700" fill="#9f1239">Verified?</text>

      {/* Failed branch */}
      <line x1="305" y1="152" x2="305" y2="230" stroke="#be123c" strokeWidth="1.4" markerEnd="url(#actArrow)" />
      <text x="330" y="190" fontSize="9" fontWeight="700" fill="#be123c">No (Failed)</text>
      <rect x="240" y="232" width="130" height="44" rx="8" fill="#fef2f2" stroke="#dc2626" />
      <text x="305" y="252" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#991b1b">Keep Order Pending</text>
      <text x="305" y="266" textAnchor="middle" fontSize="8.5" fill="#7f1d1d">Release Stock Lock</text>

      {/* Success branch */}
      <line x1="345" y1="120" x2="395" y2="120" stroke="#047857" strokeWidth="1.5" markerEnd="url(#actArrow)" />
      <text x="370" y="112" textAnchor="middle" fontSize="9" fontWeight="700" fill="#047857">Yes</text>

      <rect x="398" y="96" width="130" height="48" rx="10" fill="#eef2ff" stroke="#4338ca" strokeWidth="1.5" />
      <text x="463" y="117" textAnchor="middle" fontSize="10" fontWeight="700" fill="#312e81">Split by Seller ID</text>
      <text x="463" y="132" textAnchor="middle" fontSize="9" fill="#475569">Notify Each Vendor</text>

      <line x1="528" y1="120" x2="565" y2="120" stroke="#0f172a" strokeWidth="1.5" markerEnd="url(#actArrow)" />

      <rect x="568" y="96" width="130" height="48" rx="10" fill="#fffbeb" stroke="#b45309" strokeWidth="1.5" />
      <text x="633" y="117" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">Courier Dispatch</text>
      <text x="633" y="132" textAnchor="middle" fontSize="9" fill="#475569">Picked ➔ Delivered</text>

      <line x1="633" y1="144" x2="633" y2="215" stroke="#0f172a" strokeWidth="1.5" markerEnd="url(#actArrow)" />

      {/* Return / Refund Check */}
      <polygon points="633,218 678,254 633,290 588,254" fill="#f1f5f9" stroke="#334155" strokeWidth="1.5" />
      <text x="633" y="257" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a">Return?</text>

      {/* Refund Path */}
      <line x1="588" y1="254" x2="520" y2="254" stroke="#be123c" strokeWidth="1.4" markerEnd="url(#actArrow)" />
      <text x="554" y="247" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#be123c">Claim</text>
      <rect x="398" y="232" width="120" height="44" rx="8" fill="#fff1f2" stroke="#be123c" />
      <text x="458" y="252" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#9f1239">Gateway Refund</text>
      <text x="458" y="266" textAnchor="middle" fontSize="8.5" fill="#881337">Log in Refunds Table</text>

      {/* Complete Path */}
      <line x1="678" y1="254" x2="745" y2="254" stroke="#047857" strokeWidth="1.5" markerEnd="url(#actArrow)" />
      <text x="712" y="247" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#047857">No</text>
      <circle cx="762" cy="254" r="14" fill="none" stroke="#0f172a" strokeWidth="2" />
      <circle cx="762" cy="254" r="9" fill="#0f172a" />
      <text x="762" y="284" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a">Completed</text>
    </svg>
    <figcaption className="text-center text-xs font-semibold text-slate-600 mt-2">
      Figure 4.4: Activity Diagram Covering Payment Verification, Vendor Split, Delivery &amp; Refund Settlement
    </figcaption>
  </figure>
);

export const RealTimeMarketingDiagram: React.FC = () => (
  <figure className="avoid-break my-6 bg-white border border-slate-300 rounded-xl p-4">
    <svg data-diagram-id="marketing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 340" fontFamily="Arial, Helvetica, sans-serif" className="w-full h-auto" role="img" aria-label="Real-Time Marketing and WebSocket Architecture Diagram">
      <defs>
        <marker id="mktArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" />
        </marker>
      </defs>
      <rect x="10" y="10" width="800" height="320" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="410" y="34" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">
        REAL-TIME MARKETING ENGINE &amp; WEBSOCKET EVENT PROPAGATION (DJANGO CHANNELS + REDIS)
      </text>

      {/* Left: Event Producers */}
      <rect x="30" y="60" width="185" height="240" rx="8" fill="#ffffff" stroke="#94a3b8" />
      <text x="122" y="80" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0f172a">TRIGGER EVENTS</text>

      <rect x="44" y="95" width="157" height="44" rx="6" fill="#fff1f2" stroke="#be123c" />
      <text x="122" y="114" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#9f1239">Flash Campaign Start</text>
      <text x="122" y="129" textAnchor="middle" fontSize="8.5" fill="#475569">Admin Schedules Discount</text>

      <rect x="44" y="154" width="157" height="44" rx="6" fill="#fffbeb" stroke="#b45309" />
      <text x="122" y="173" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#92400e">Low Stock Breach</text>
      <text x="122" y="188" textAnchor="middle" fontSize="8.5" fill="#475569">qty &lt;= lowStockThreshold</text>

      <rect x="44" y="213" width="157" height="44" rx="6" fill="#ecfdf5" stroke="#047857" />
      <text x="122" y="232" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#065f46">Order &amp; Coupon Applied</text>
      <text x="122" y="247" textAnchor="middle" fontSize="8.5" fill="#475569">DESHI20 / BKASH10 / Payment</text>

      {/* Center: Redis Pub/Sub + Channels */}
      <rect x="290" y="85" width="230" height="180" rx="10" fill="#eef2ff" stroke="#4338ca" strokeWidth="1.5" />
      <text x="405" y="108" textAnchor="middle" fontSize="11" fontWeight="700" fill="#312e81">EVENT BROKER &amp; ENGINE</text>

      <rect x="310" y="122" width="190" height="48" rx="6" fill="#ffffff" stroke="#6366f1" />
      <text x="405" y="143" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">Redis Pub/Sub Channel Layer</text>
      <text x="405" y="158" textAnchor="middle" fontSize="8.5" fill="#475569">In-Memory Topic Routing (&lt;5ms)</text>

      <rect x="310" y="185" width="190" height="58" rx="6" fill="#ffffff" stroke="#6366f1" />
      <text x="405" y="206" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">Django Channels ASGI / AppContext</text>
      <text x="405" y="221" textAnchor="middle" fontSize="8.5" fill="#475569">Groups: marketing_broadcast,</text>
      <text x="405" y="233" textAnchor="middle" fontSize="8.5" fill="#475569">seller_&lt;id&gt;, customer_&lt;id&gt;</text>

      {/* Right: Subscribers */}
      <rect x="595" y="60" width="195" height="240" rx="8" fill="#ffffff" stroke="#94a3b8" />
      <text x="692" y="80" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0f172a">LIVE UI SUBSCRIBERS</text>

      <rect x="610" y="95" width="165" height="44" rx="6" fill="#ecfdf5" stroke="#059669" />
      <text x="692" y="114" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#065f46">MarketingBanner Ticker</text>
      <text x="692" y="129" textAnchor="middle" fontSize="8.5" fill="#475569">Live Countdown &amp; Promo Copy</text>

      <rect x="610" y="154" width="165" height="44" rx="6" fill="#eff6ff" stroke="#1d4ed8" />
      <text x="692" y="173" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1e3a8a">NotificationsPopover</text>
      <text x="692" y="188" textAnchor="middle" fontSize="8.5" fill="#475569">Unread Counter &amp; Stock Alerts</text>

      <rect x="610" y="213" width="165" height="44" rx="6" fill="#f1f5f9" stroke="#334155" />
      <text x="692" y="232" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0f172a">Seller &amp; Admin Feeds</text>
      <text x="692" y="247" textAnchor="middle" fontSize="8.5" fill="#475569">Instant Dispatch &amp; GMV Sync</text>

      {/* Arrows */}
      <line x1="201" y1="117" x2="288" y2="145" stroke="#0f172a" strokeWidth="1.3" markerEnd="url(#mktArrow)" />
      <line x1="201" y1="176" x2="288" y2="176" stroke="#0f172a" strokeWidth="1.3" markerEnd="url(#mktArrow)" />
      <line x1="201" y1="235" x2="288" y2="210" stroke="#0f172a" strokeWidth="1.3" markerEnd="url(#mktArrow)" />

      <line x1="520" y1="145" x2="608" y2="117" stroke="#0f172a" strokeWidth="1.3" markerEnd="url(#mktArrow)" />
      <line x1="520" y1="176" x2="608" y2="176" stroke="#0f172a" strokeWidth="1.3" markerEnd="url(#mktArrow)" />
      <line x1="520" y1="210" x2="608" y2="235" stroke="#0f172a" strokeWidth="1.3" markerEnd="url(#mktArrow)" />
    </svg>
    <figcaption className="text-center text-xs font-semibold text-slate-600 mt-2">
      Figure 10.1: Real-Time Flash Marketing, Scarcity Trigger &amp; Notification Broadcasting Architecture
    </figcaption>
  </figure>
);

export const UIStorefrontSnapshot: React.FC = () => (
  <figure className="avoid-break my-6 bg-white border border-slate-300 rounded-xl p-4">
    <svg data-diagram-id="ui_storefront" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 460" fontFamily="Arial, Helvetica, sans-serif" className="w-full h-auto" role="img" aria-label="MarketingHub Storefront and Role Switcher Workflow UI Snapshot">
      <rect x="10" y="10" width="800" height="440" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* Browser Chrome */}
      <rect x="10" y="10" width="800" height="30" rx="10" fill="#1e293b" />
      <circle cx="30" cy="25" r="5" fill="#ef4444" />
      <circle cx="46" cy="25" r="5" fill="#f59e0b" />
      <circle cx="62" cy="25" r="5" fill="#10b981" />
      <rect x="120" y="15" width="580" height="20" rx="5" fill="#0f172a" />
      <text x="410" y="29" textAnchor="middle" fontSize="9.5" fill="#94a3b8">http://localhost:3000 — MarketingHub Online Platform (Live Customer View)</text>

      {/* Flash Banner Ticker */}
      <rect x="20" y="45" width="780" height="26" rx="4" fill="#9f1239" />
      <text x="410" y="62" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">
        FLASH SALE LIVE: BIJOY MELA 2026 · ENDS IN 02:14:48 · USE CODE [DESHI20] FOR 20% OFF
      </text>

      {/* App Sticky Header */}
      <rect x="20" y="74" width="780" height="44" rx="4" fill="#ffffff" stroke="#e2e8f0" />
      <rect x="34" y="84" width="24" height="24" rx="5" fill="#065f46" />
      <text x="46" y="100" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fcd34d">M</text>
      <text x="66" y="100" fontSize="12" fontWeight="800" fill="#0f172a">MarketingHub</text>
      <rect x="175" y="83" width="310" height="26" rx="6" fill="#f1f5f9" stroke="#cbd5e1" />
      <text x="190" y="100" fontSize="9.5" fill="#64748b">Search Grocery, Cosmetics, Furniture, Electronics...</text>
      <rect x="505" y="83" width="110" height="26" rx="6" fill="#f1f5f9" stroke="#cbd5e1" />
      <text x="560" y="100" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0f172a">Download ZIP</text>
      <rect x="625" y="83" width="160" height="26" rx="6" fill="#065f46" />
      <text x="705" y="100" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#ffffff">Shopping Bag (3 Items)</text>

      {/* Multi-Role Switcher Bar */}
      <rect x="20" y="122" width="780" height="32" rx="4" fill="#ffffff" stroke="#e2e8f0" />
      <text x="34" y="142" fontSize="9" fontWeight="700" fill="#64748b">ROLE SWITCHER:</text>
      <rect x="115" y="127" width="105" height="22" rx="5" fill="#065f46" />
      <text x="167" y="141" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff">1. Customer (Active)</text>
      <rect x="228" y="127" width="85" height="22" rx="5" fill="#f1f5f9" stroke="#cbd5e1" />
      <text x="270" y="141" textAnchor="middle" fontSize="9" fontWeight="700" fill="#334155">2. Seller</text>
      <rect x="321" y="127" width="85" height="22" rx="5" fill="#f1f5f9" stroke="#cbd5e1" />
      <text x="363" y="141" textAnchor="middle" fontSize="9" fontWeight="700" fill="#334155">3. Admin</text>
      <rect x="414" y="127" width="115" height="22" rx="5" fill="#f1f5f9" stroke="#cbd5e1" />
      <text x="471" y="141" textAnchor="middle" fontSize="9" fontWeight="700" fill="#334155">4. Delivery Mgr</text>
      <rect x="537" y="127" width="115" height="22" rx="5" fill="#eef2ff" stroke="#818cf8" />
      <text x="594" y="141" textAnchor="middle" fontSize="9" fontWeight="700" fill="#3730a3">CSE Project Hub</text>
      <rect x="660" y="127" width="125" height="22" rx="5" fill="#fef3c7" stroke="#f59e0b" />
      <text x="722" y="141" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">Thesis Report</text>

      {/* Hero Storefront Banner */}
      <rect x="28" y="162" width="764" height="72" rx="8" fill="#064e3b" />
      <text x="48" y="186" fontSize="13" fontWeight="800" fill="#ffffff">Multi-Vendor Marketplace &amp; Real-Time Flash Deals</text>
      <text x="48" y="205" fontSize="9.5" fill="#a7f3d0">Shop across 8 categories · Multi-seller cart splitting · Instant bKash, Nagad &amp; COD verification</text>
      <rect x="48" y="213" width="85" height="14" rx="3" fill="#fbbf24" />
      <text x="90" y="223" textAnchor="middle" fontSize="8" fontWeight="800" fill="#0f172a">Step 1: Browse</text>
      <rect x="142" y="213" width="95" height="14" rx="3" fill="#10b981" />
      <text x="189" y="223" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">Step 2: Filter SKU</text>
      <rect x="246" y="213" width="105" height="14" rx="3" fill="#ffffff" />
      <text x="298" y="223" textAnchor="middle" fontSize="8" fontWeight="800" fill="#065f46">Step 3: Add to Bag</text>

      {/* Category Pills Row */}
      <rect x="28" y="242" width="60" height="20" rx="5" fill="#0f172a" />
      <text x="58" y="255" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#ffffff">All (14)</text>
      <rect x="96" y="242" width="95" height="20" rx="5" fill="#ffffff" stroke="#cbd5e1" />
      <text x="143" y="255" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#334155">Grocery &amp; Food</text>
      <rect x="199" y="242" width="105" height="20" rx="5" fill="#ffffff" stroke="#cbd5e1" />
      <text x="251" y="255" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#334155">Cosmetics Care</text>
      <rect x="312" y="242" width="105" height="20" rx="5" fill="#ffffff" stroke="#cbd5e1" />
      <text x="364" y="255" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#334155">Segun Furniture</text>
      <rect x="425" y="242" width="110" height="20" rx="5" fill="#ffffff" stroke="#cbd5e1" />
      <text x="480" y="255" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#334155">Smart Electronics</text>
      <rect x="543" y="242" width="125" height="20" rx="5" fill="#ffffff" stroke="#cbd5e1" />
      <text x="605" y="255" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#334155">Ladies One-Piece</text>
      <rect x="676" y="242" width="116" height="20" rx="5" fill="#ecfdf5" stroke="#059669" />
      <text x="734" y="255" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#065f46">Sort: Flash Deals</text>

      {/* 3 Wireframe Interactive SKU Workflow Cards */}
      <rect x="28" y="272" width="242" height="164" rx="8" fill="#ffffff" stroke="#cbd5e1" />
      <rect x="38" y="282" width="222" height="58" rx="5" fill="#ecfdf5" stroke="#a7f3d0" />
      <text x="149" y="307" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#065f46">SKU Module: Grocery Pantry Bundle</text>
      <text x="149" y="323" textAnchor="middle" fontSize="8.5" fill="#047857">Seller: Dhaka Daily Mart · Flash -16%</text>
      <text x="40" y="358" fontSize="10" fontWeight="700" fill="#0f172a">Monthly Pantry Bundle (5kg Rice + Dal)</text>
      <text x="40" y="375" fontSize="9" fill="#64748b">Stock: 34 units · Origin: Bogura &amp; Dhaka</text>
      <text x="40" y="396" fontSize="12" fontWeight="800" fill="#065f46">BDT 1,850</text>
      <rect x="40" y="406" width="218" height="22" rx="5" fill="#065f46" />
      <text x="149" y="421" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff">Add to Bag (Triggers Cart State)</text>

      <rect x="289" y="272" width="242" height="164" rx="8" fill="#ffffff" stroke="#cbd5e1" />
      <rect x="299" y="282" width="222" height="58" rx="5" fill="#eef2ff" stroke="#c7d2fe" />
      <text x="410" y="307" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#3730a3">SKU Module: Smart Kitchen &amp; ANC</text>
      <text x="410" y="323" textAnchor="middle" fontSize="8.5" fill="#4338ca">Seller: Bengal Smart Tech · Low Stock (3)</text>
      <text x="301" y="358" fontSize="10" fontWeight="700" fill="#0f172a">Aura Pro ANC Wireless Earbuds</text>
      <text x="301" y="375" fontSize="9" fontWeight="700" fill="#be123c">Scarcity Alert: Only 3 left in stock!</text>
      <text x="301" y="396" fontSize="12" fontWeight="800" fill="#065f46">BDT 2,450</text>
      <rect x="301" y="406" width="218" height="22" rx="5" fill="#0f172a" />
      <text x="410" y="421" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff">Buy Now (Opens Checkout Flow)</text>

      <rect x="550" y="272" width="242" height="164" rx="8" fill="#ffffff" stroke="#cbd5e1" />
      <rect x="560" y="282" width="222" height="58" rx="5" fill="#fffbeb" stroke="#fde68a" />
      <text x="671" y="307" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#92400e">SKU Module: Ladies Boutique Kurti</text>
      <text x="671" y="323" textAnchor="middle" fontSize="8.5" fill="#b45309">Seller: Nari Boutique · Approved SKU</text>
      <text x="562" y="358" fontSize="10" fontWeight="700" fill="#0f172a">Embroidered Cotton One-Piece Kurti</text>
      <text x="562" y="375" fontSize="9" fill="#64748b">Stock: 18 units · Origin: Dhaka Boutique</text>
      <text x="562" y="396" fontSize="12" fontWeight="800" fill="#065f46">BDT 1,450</text>
      <rect x="562" y="406" width="218" height="22" rx="5" fill="#065f46" />
      <text x="671" y="421" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff">Add to Bag (Multi-Seller Cart Split)</text>
    </svg>
    <figcaption className="text-center text-xs font-semibold text-slate-600 mt-2">
      Figure 7.1: Live Application Interface — Storefront Navigation, Multi-Role Switcher, Flash Ticker &amp; Scarcity Workflow
    </figcaption>
  </figure>
);

export const UISellerAdminSnapshot: React.FC = () => (
  <figure className="avoid-break my-6 bg-white border border-slate-300 rounded-xl p-4">
    <svg data-diagram-id="ui_seller_admin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 420" fontFamily="Arial, Helvetica, sans-serif" className="w-full h-auto" role="img" aria-label="Seller Merchant Portal and Admin Governance Dashboard UI Snapshot">
      <rect x="10" y="10" width="800" height="400" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="34" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">
        OPERATIONAL DASHBOARD SNAPSHOT — SELLER PORTAL &amp; ADMIN GOVERNANCE WORKFLOW
      </text>

      {/* Left Window: Seller Portal */}
      <rect x="24" y="48" width="380" height="346" rx="8" fill="#ffffff" stroke="#059669" strokeWidth="1.4" />
      <rect x="24" y="48" width="380" height="32" rx="8" fill="#065f46" />
      <text x="38" y="68" fontSize="10.5" fontWeight="700" fill="#ffffff">SELLER PORTAL — Dhakaiya Weavers &amp; Boutique</text>
      <rect x="304" y="54" width="90" height="20" rx="4" fill="#fbbf24" />
      <text x="349" y="67" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#0f172a">+ Add Product</text>

      {/* Seller KPI Row */}
      <rect x="36" y="90" width="112" height="48" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="44" y="106" fontSize="8.5" fill="#64748b">Total Revenue</text>
      <text x="44" y="125" fontSize="11.5" fontWeight="800" fill="#0f172a">BDT 8,94,000</text>

      <rect x="158" y="90" width="112" height="48" rx="6" fill="#ecfdf5" stroke="#a7f3d0" />
      <text x="166" y="106" fontSize="8.5" fill="#065f46">Net Balance</text>
      <text x="166" y="125" fontSize="11.5" fontWeight="800" fill="#065f46">BDT 1,12,450</text>

      <rect x="280" y="90" width="112" height="48" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="288" y="106" fontSize="8.5" fill="#64748b">Store Rating</text>
      <text x="288" y="125" fontSize="11.5" fontWeight="800" fill="#d97706">4.9 / 5.0</text>

      {/* Seller Stock Table */}
      <text x="36" y="158" fontSize="9.5" fontWeight="700" fill="#0f172a">Catalog &amp; Real-Time Stock Ledger:</text>
      <rect x="36" y="166" width="356" height="22" rx="3" fill="#f1f5f9" />
      <text x="44" y="180" fontSize="8" fontWeight="700" fill="#475569">Product SKU</text>
      <text x="220" y="180" fontSize="8" fontWeight="700" fill="#475569">Price</text>
      <text x="285" y="180" fontSize="8" fontWeight="700" fill="#475569">Stock</text>
      <text x="342" y="180" fontSize="8" fontWeight="700" fill="#475569">Status</text>

      <line x1="36" y1="214" x2="392" y2="214" stroke="#e2e8f0" />
      <text x="44" y="205" fontSize="8.5" fontWeight="600" fill="#0f172a">Royal Dhakai Jamdani</text>
      <text x="220" y="205" fontSize="8.5" fontWeight="700" fill="#0f172a">8,490</text>
      <text x="290" y="205" fontSize="8.5" fontWeight="700" fill="#be123c">4 (Low)</text>
      <text x="342" y="205" fontSize="8.5" fontWeight="700" fill="#065f46">Live</text>

      <line x1="36" y1="242" x2="392" y2="242" stroke="#e2e8f0" />
      <text x="44" y="233" fontSize="8.5" fontWeight="600" fill="#0f172a">Cotton One-Piece Kurti</text>
      <text x="220" y="233" fontSize="8.5" fontWeight="700" fill="#0f172a">1,450</text>
      <text x="290" y="233" fontSize="8.5" fontWeight="700" fill="#0f172a">18</text>
      <text x="342" y="233" fontSize="8.5" fontWeight="700" fill="#065f46">Live</text>

      {/* Seller Fulfillment Queue Box */}
      <rect x="36" y="256" width="356" height="124" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="46" y="274" fontSize="9.5" fontWeight="700" fill="#0f172a">Multi-Vendor Order Splitting Queue:</text>
      <rect x="46" y="284" width="336" height="40" rx="5" fill="#ffffff" stroke="#e2e8f0" />
      <text x="54" y="300" fontSize="8.5" fontWeight="700" fill="#0f172a">Order #ORD-BD-9021 · Only Seller Items Shown</text>
      <text x="54" y="314" fontSize="8" fill="#475569">Paid via bKash · TrxID: BKSH9A7B3 · Ready for Courier</text>
      <rect x="292" y="293" width="82" height="22" rx="4" fill="#065f46" />
      <text x="333" y="307" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff">Handover</text>

      <rect x="46" y="332" width="336" height="38" rx="5" fill="#fff1f2" stroke="#fecdd3" />
      <text x="54" y="348" fontSize="8.5" fontWeight="700" fill="#9f1239">Return Claim #RET-104: Approve / Decline Refund</text>
      <text x="54" y="361" fontSize="8" fill="#475569">Triggers MFS Refund API reversal automatically on approval</text>

      {/* Right Window: Admin Console */}
      <rect x="416" y="48" width="380" height="346" rx="8" fill="#ffffff" stroke="#4f46e5" strokeWidth="1.4" />
      <rect x="416" y="48" width="380" height="32" rx="8" fill="#312e81" />
      <text x="430" y="68" fontSize="10.5" fontWeight="700" fill="#ffffff">SUPER ADMIN CONSOLE — Platform Governance</text>

      {/* Admin KPI Row */}
      <rect x="428" y="90" width="112" height="48" rx="6" fill="#eef2ff" stroke="#c7d2fe" />
      <text x="436" y="106" fontSize="8.5" fill="#3730a3">Platform GMV</text>
      <text x="436" y="125" fontSize="11.5" fontWeight="800" fill="#312e81">BDT 43,69,000</text>

      <rect x="550" y="90" width="112" height="48" rx="6" fill="#ecfdf5" stroke="#a7f3d0" />
      <text x="558" y="106" fontSize="8.5" fill="#065f46">10% Commission</text>
      <text x="558" y="125" fontSize="11.5" fontWeight="800" fill="#065f46">BDT 4,36,900</text>

      <rect x="672" y="90" width="112" height="48" rx="6" fill="#fffbeb" stroke="#fde68a" />
      <text x="680" y="106" fontSize="8.5" fill="#92400e">Verified Vendors</text>
      <text x="680" y="125" fontSize="11.5" fontWeight="800" fill="#92400e">4 Active</text>

      {/* Admin Product Moderation & Coupon Rules */}
      <text x="428" y="158" fontSize="9.5" fontWeight="700" fill="#0f172a">SKU Approval Moderation Queue:</text>
      <rect x="428" y="166" width="356" height="62" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="438" y="184" fontSize="8.5" fontWeight="700" fill="#0f172a">1. Chittagong Segun Wood Dining Chair (Seller-3)</text>
      <rect x="682" y="172" width="90" height="18" rx="4" fill="#059669" />
      <text x="727" y="184" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff">Approved Live</text>
      <text x="438" y="212" fontSize="8.5" fontWeight="700" fill="#0f172a">2. Aurora 15% Vitamin C Skincare Kit (Seller-4)</text>
      <rect x="682" y="200" width="90" height="18" rx="4" fill="#059669" />
      <text x="727" y="212" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff">Approved Live</text>

      {/* Promo Coupon Rules */}
      <text x="428" y="248" fontSize="9.5" fontWeight="700" fill="#0f172a">Active Real-Time Marketing Coupon Engine:</text>
      <rect x="428" y="256" width="356" height="124" rx="6" fill="#eef2ff" stroke="#c7d2fe" />
      <text x="440" y="278" fontSize="9" fontWeight="700" fill="#312e81">• DESHI20: 20% Off (Max BDT 500) · Min Order BDT 1,500</text>
      <text x="440" y="302" fontSize="9" fontWeight="700" fill="#312e81">• BKASH10: 10% Instant MFS Rebate · Min Order BDT 1,000</text>
      <text x="440" y="326" fontSize="9" fontWeight="700" fill="#312e81">• FREESHIP: 0 BDT Courier Fee · Min Order BDT 2,500</text>
      <text x="440" y="356" fontSize="8.5" fill="#475569">All Admin updates propagate to Storefront &amp; Cart immediately.</text>
    </svg>
    <figcaption className="text-center text-xs font-semibold text-slate-600 mt-2">
      Figure 8.1: Multi-Vendor Operational Interfaces — Seller Inventory/Order Split Portal &amp; Super Admin Governance Console
    </figcaption>
  </figure>
);

export const UIPaymentTrackingSnapshot: React.FC = () => (
  <figure className="avoid-break my-6 bg-white border border-slate-300 rounded-xl p-4">
    <svg data-diagram-id="ui_payment_tracking" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 390" fontFamily="Arial, Helvetica, sans-serif" className="w-full h-auto" role="img" aria-label="Checkout Cart, bKash Nagad Gateway Modal, and Live Order Tracking UI Workflow">
      <defs>
        <marker id="uiFlowArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" />
        </marker>
      </defs>
      <rect x="10" y="10" width="800" height="370" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="34" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">
        END-TO-END TRANSACTION WORKFLOW — CART ➔ bKash / NAGAD CHECKOUT ➔ LIVE ORDER TRACKING
      </text>

      {/* Step 1: Cart Drawer */}
      <rect x="24" y="52" width="234" height="310" rx="8" fill="#ffffff" stroke="#059669" strokeWidth="1.4" />
      <rect x="24" y="52" width="234" height="30" rx="8" fill="#0f172a" />
      <text x="141" y="71" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#ffffff">STEP 1: SHOPPING BAG &amp; COUPON</text>

      <rect x="36" y="92" width="210" height="50" rx="5" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="44" y="110" fontSize="9" fontWeight="700" fill="#0f172a">1x Pantry Grocery Bundle</text>
      <text x="44" y="128" fontSize="8.5" fill="#065f46">Qty Capped &lt;= Stock (34) · BDT 1,850</text>

      <rect x="36" y="150" width="210" height="38" rx="5" fill="#ecfdf5" stroke="#a7f3d0" />
      <text x="44" y="167" fontSize="8.5" fontWeight="700" fill="#065f46">Promo Applied: [DESHI20]</text>
      <text x="44" y="180" fontSize="8" fill="#047857">20% Discount = -BDT 370 Saved</text>

      <text x="38" y="212" fontSize="9" fill="#475569">Subtotal: BDT 1,850</text>
      <text x="38" y="229" fontSize="9" fill="#059669">Discount: -BDT 370</text>
      <text x="38" y="246" fontSize="9" fill="#475569">Delivery (Dhaka): BDT 60</text>
      <line x1="36" y1="256" x2="246" y2="256" stroke="#cbd5e1" />
      <text x="38" y="274" fontSize="11" fontWeight="800" fill="#0f172a">Net Payable: BDT 1,540</text>

      <rect x="36" y="308" width="210" height="34" rx="6" fill="#065f46" />
      <text x="141" y="329" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#ffffff">Proceed to Checkout ➔</text>

      {/* Arrow 1 -> 2 */}
      <line x1="258" y1="205" x2="286" y2="205" stroke="#0f172a" strokeWidth="1.8" markerEnd="url(#uiFlowArrow)" />

      {/* Step 2: bKash / Nagad Modal */}
      <rect x="290" y="52" width="240" height="310" rx="8" fill="#ffffff" stroke="#d12053" strokeWidth="1.5" />
      <rect x="290" y="52" width="240" height="30" rx="8" fill="#d12053" />
      <text x="410" y="71" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#ffffff">STEP 2: bKash / NAGAD GATEWAY</text>

      <rect x="302" y="92" width="68" height="24" rx="4" fill="#fff1f2" stroke="#d12053" />
      <text x="336" y="107" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#d12053">bKash ✓</text>
      <rect x="376" y="92" width="68" height="24" rx="4" fill="#fff7ed" stroke="#f7941d" />
      <text x="410" y="107" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#c2410c">Nagad</text>
      <rect x="450" y="92" width="68" height="24" rx="4" fill="#f1f5f9" stroke="#cbd5e1" />
      <text x="484" y="107" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#334155">COD</text>

      <rect x="302" y="126" width="216" height="44" rx="5" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="312" y="142" fontSize="8.5" fontWeight="700" fill="#0f172a">Merchant: MarketingHub Online</text>
      <text x="312" y="158" fontSize="9" fontWeight="800" fill="#d12053">Charge Amount: BDT 1,540.00</text>

      <text x="302" y="188" fontSize="8.5" fontWeight="700" fill="#334155">Wallet Number: 017XXXXXXXX</text>
      <rect x="302" y="196" width="216" height="24" rx="4" fill="#ffffff" stroke="#94a3b8" />
      <text x="312" y="211" fontSize="8.5" fill="#0f172a">OTP: • • • • • •   |   PIN: • • • • •</text>

      <rect x="302" y="232" width="216" height="58" rx="5" fill="#ecfdf5" stroke="#059669" />
      <text x="410" y="250" textAnchor="middle" fontSize="9" fontWeight="800" fill="#065f46">Payment Executed &amp; Verified!</text>
      <text x="410" y="266" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0f172a">TrxID: BKSH92A8F9 · Status: PAID</text>
      <text x="410" y="280" textAnchor="middle" fontSize="7.8" fill="#047857">Stock Decremented + Seller Notified</text>

      <rect x="302" y="308" width="216" height="34" rx="6" fill="#d12053" />
      <text x="410" y="329" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#ffffff">Confirm &amp; Place Order ➔</text>

      {/* Arrow 2 -> 3 */}
      <line x1="530" y1="205" x2="558" y2="205" stroke="#0f172a" strokeWidth="1.8" markerEnd="url(#uiFlowArrow)" />

      {/* Step 3: Live Order Tracking */}
      <rect x="562" y="52" width="234" height="310" rx="8" fill="#ffffff" stroke="#4f46e5" strokeWidth="1.4" />
      <rect x="562" y="52" width="234" height="30" rx="8" fill="#312e81" />
      <text x="679" y="71" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#ffffff">STEP 3: LIVE ORDER TRACKING</text>

      <text x="576" y="102" fontSize="9.5" fontWeight="800" fill="#0f172a">Order ID: #ORD-BD-9021</text>
      <text x="576" y="117" fontSize="8" fill="#475569">ETA: 2–3 Business Days · Dhaka Hub</text>

      {/* 5 Step Timeline */}
      <circle cx="590" cy="144" r="6" fill="#059669" />
      <text x="606" y="147" fontSize="8.8" fontWeight="700" fill="#0f172a">1. Order Placed &amp; Verified ✓</text>
      <line x1="590" y1="150" x2="590" y2="172" stroke="#059669" strokeWidth="2" />

      <circle cx="590" cy="178" r="6" fill="#059669" />
      <text x="606" y="181" fontSize="8.8" fontWeight="700" fill="#0f172a">2. Seller Packing &amp; Split ✓</text>
      <line x1="590" y1="184" x2="590" y2="206" stroke="#059669" strokeWidth="2" />

      <circle cx="590" cy="212" r="6" fill="#059669" />
      <text x="606" y="215" fontSize="8.8" fontWeight="700" fill="#0f172a">3. Picked by Pathao Rider ✓</text>
      <line x1="590" y1="218" x2="590" y2="240" stroke="#4f46e5" strokeWidth="2" />

      <circle cx="590" cy="246" r="6" fill="#4f46e5" />
      <text x="606" y="249" fontSize="8.8" fontWeight="700" fill="#312e81">4. Out for Delivery (Active ●)</text>
      <line x1="590" y1="252" x2="590" y2="274" stroke="#cbd5e1" strokeWidth="2" />

      <circle cx="590" cy="280" r="6" fill="#cbd5e1" />
      <text x="606" y="283" fontSize="8.8" fill="#64748b">5. Delivered &amp; Review Eligible</text>

      <rect x="574" y="308" width="210" height="34" rx="6" fill="#eef2ff" stroke="#818cf8" />
      <text x="679" y="329" textAnchor="middle" fontSize="9" fontWeight="700" fill="#312e81">Return / Refund Request Available</text>
    </svg>
    <figcaption className="text-center text-xs font-semibold text-slate-600 mt-2">
      Figure 9.2: Interactive Transaction Workflow — Cart Coupon Math, bKash/Nagad OTP+PIN Checkout &amp; 5-Stage Tracking Modal
    </figcaption>
  </figure>
);

export const UIDeliveryAlertsSnapshot: React.FC = () => (
  <figure className="avoid-break my-6 bg-white border border-slate-300 rounded-xl p-4">
    <svg data-diagram-id="ui_delivery_alerts" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 350" fontFamily="Arial, Helvetica, sans-serif" className="w-full h-auto" role="img" aria-label="Delivery Logistics Hub and Real-Time WebSocket Notifications Popover UI Snapshot">
      <rect x="10" y="10" width="800" height="330" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="34" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">
        COURIER LOGISTICS &amp; REAL-TIME NOTIFICATION WORKFLOW SNAPSHOT
      </text>

      {/* Left: Delivery Manager Console */}
      <rect x="24" y="48" width="445" height="276" rx="8" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
      <rect x="24" y="48" width="445" height="30" rx="8" fill="#0f172a" />
      <text x="38" y="67" fontSize="10" fontWeight="700" fill="#ffffff">DELIVERY MANAGER HUB — Courier Dispatch &amp; COD Collection</text>

      <rect x="36" y="88" width="420" height="62" rx="6" fill="#f1f5f9" stroke="#cbd5e1" />
      <text x="46" y="106" fontSize="9.5" fontWeight="800" fill="#0f172a">Consignment #ORD-BD-9021 · Uttara, Dhaka</text>
      <text x="46" y="122" fontSize="8.5" fill="#475569">Courier: Pathao Express · Payment: PAID (bKash TrxID Verified)</text>
      <rect x="336" y="104" width="110" height="24" rx="5" fill="#4f46e5" />
      <text x="391" y="119" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff">Mark Delivered ✓</text>

      <rect x="36" y="160" width="420" height="62" rx="6" fill="#fffbeb" stroke="#fde68a" />
      <text x="46" y="178" fontSize="9.5" fontWeight="800" fill="#0f172a">Consignment #ORD-BD-8944 · Agrabad, Chattogram</text>
      <text x="46" y="194" fontSize="8.5" fill="#92400e">Courier: Steadfast · COD To Collect: BDT 3,450</text>
      <rect x="336" y="176" width="110" height="24" rx="5" fill="#065f46" />
      <text x="391" y="191" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff">Dispatch Rider ➔</text>

      <rect x="36" y="232" width="420" height="78" rx="6" fill="#ecfdf5" stroke="#a7f3d0" />
      <text x="46" y="252" fontSize="9.5" fontWeight="800" fill="#065f46">Live Courier State Synchronization:</text>
      <text x="46" y="270" fontSize="8.5" fill="#047857">• Updating any shipment status emits instant UI notifications to</text>
      <text x="46" y="286" fontSize="8.5" fill="#047857">  the Customer Tracking Modal, Seller Balance &amp; Admin Analytics.</text>

      {/* Right: Real-Time Notifications Popover */}
      <rect x="485" y="48" width="311" height="276" rx="8" fill="#ffffff" stroke="#059669" strokeWidth="1.4" />
      <rect x="485" y="48" width="311" height="30" rx="8" fill="#065f46" />
      <text x="500" y="67" fontSize="10" fontWeight="700" fill="#ffffff">LIVE NOTIFICATIONS FEED (3 Unread)</text>

      <rect x="497" y="88" width="287" height="54" rx="5" fill="#ecfdf5" stroke="#10b981" />
      <text x="507" y="105" fontSize="9" fontWeight="800" fill="#065f46">Order Confirmed! (#ORD-BD-9021)</text>
      <text x="507" y="121" fontSize="8" fill="#334155">bKash payment BDT 1,540 verified via Gateway.</text>
      <text x="507" y="134" fontSize="7.5" fill="#64748b">Channel: order · Just now</text>

      <rect x="497" y="150" width="287" height="54" rx="5" fill="#fffbeb" stroke="#f59e0b" />
      <text x="507" y="167" fontSize="9" fontWeight="800" fill="#92400e">Low Stock Warning (Seller Alert)</text>
      <text x="507" y="183" fontSize="8" fill="#334155">Aura Pro ANC Earbuds has only 3 units left!</text>
      <text x="507" y="196" fontSize="7.5" fill="#64748b">Channel: stock · 12s ago</text>

      <rect x="497" y="212" width="287" height="54" rx="5" fill="#eef2ff" stroke="#6366f1" />
      <text x="507" y="229" fontSize="9" fontWeight="800" fill="#312e81">Coupon Applied (Marketing Engine)</text>
      <text x="507" y="245" fontSize="8" fill="#334155">Code &quot;DESHI20&quot; active! Saved BDT 370 at checkout.</text>
      <text x="507" y="258" fontSize="7.5" fill="#64748b">Channel: marketing · 1m ago</text>

      <rect x="497" y="276" width="287" height="34" rx="5" fill="#f1f5f9" stroke="#cbd5e1" />
      <text x="640" y="297" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0f172a">Mark All Notifications as Read ✓</text>
    </svg>
    <figcaption className="text-center text-xs font-semibold text-slate-600 mt-2">
      Figure 10.2: Live Operational Workflow — Delivery Manager Dispatch Console &amp; Real-Time Notification Stream
    </figcaption>
  </figure>
);

