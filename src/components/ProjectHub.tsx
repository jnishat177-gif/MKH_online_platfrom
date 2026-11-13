import React, { useState } from 'react';
import { 
  DATABASE_TABLES_SCHEMA, 
  ROADMAP_PHASES, 
  VIVA_QUESTIONS 
} from '../data/mockData';
import { 
  BookMarked, 
  Database, 
  GitBranch, 
  Server, 
  FileText, 
  HelpCircle, 
  CheckCircle2, 
  Code, 
  Play, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Globe, 
  Workflow,
  Download 
} from 'lucide-react';

export const ProjectHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'database' | 'roadmap' | 'api' | 'report_viva'>('architecture');
  const [selectedTable, setSelectedTable] = useState(DATABASE_TABLES_SCHEMA[0].tableName);
  const [searchTable, setSearchTable] = useState('');

  // API testing simulator state
  const [apiEndpoint, setApiEndpoint] = useState('/api/v1/products/');
  const [apiMethod, setApiMethod] = useState<'GET' | 'POST'>('GET');
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  const handleSimulateApi = () => {
    setIsLoadingApi(true);
    setTimeout(() => {
      if (apiEndpoint === '/api/v1/products/') {
        setApiResponse(JSON.stringify({
          count: 6,
          next: null,
          previous: null,
          results: [
            { id: 'prod-1', title: 'Royal Crimson Dhakai Jamdani Saree', price_bdt: 8490, stock: 4, seller: 'Dhakaiya Weavers' },
            { id: 'prod-2', title: 'Pure Wild Sundarbans Mangrove Honey', price_bdt: 780, stock: 19, seller: 'Sundarbans Agro' },
            { id: 'prod-3', title: 'Aura Pro ANC Wireless Earbuds', price_bdt: 2450, stock: 3, seller: 'Bengal Tech Hub' }
          ]
        }, null, 2));
      } else if (apiEndpoint === '/api/v1/payments/bkash/create/') {
        setApiResponse(JSON.stringify({
          statusCode: '0000',
          statusMessage: 'Successful',
          paymentID: 'BKSH_TRX_9281741',
          bkashURL: 'https://sandbox.payment.bkash.com/redirect/tokenized',
          amount: '1464.00',
          currency: 'BDT',
          merchantInvoiceNumber: 'ORD-BD-8901'
        }, null, 2));
      } else if (apiEndpoint === '/api/v1/orders/') {
        setApiResponse(JSON.stringify({
          message: 'Order created with multi-vendor item segregation',
          order_id: 'ORD-BD-9021',
          total_bdt: 9954,
          payment_status: 'PAID',
          seller_dispatches: [
            { seller_id: 'seller-1', item_count: 1, status: 'NOTIFIED' },
            { seller_id: 'seller-2', item_count: 2, status: 'NOTIFIED' }
          ]
        }, null, 2));
      } else {
        setApiResponse(JSON.stringify({ status: 200, message: 'Django REST Framework response OK' }, null, 2));
      }
      setIsLoadingApi(false);
    }, 600);
  };

  const filteredTables = DATABASE_TABLES_SCHEMA.filter(t =>
    t.tableName.toLowerCase().includes(searchTable.toLowerCase()) ||
    t.purpose.toLowerCase().includes(searchTable.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20">
      {/* CSE Academic Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-indigo-900/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider">
              <BookMarked className="w-4 h-4" />
              <span>CSE Final Year Project Blueprint & Academic Defense Portal</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Real-Time Marketing & Multi-Vendor E-Commerce Platform
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Complete engineering roadmap, 20-table relational database architecture, Django Channels real-time WebSockets, bKash & Nagad payment verification, and defense viva questions.
            </p>

            {/* Quick ZIP Download Button */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = './marketinghub-project.zip';
                  link.download = 'marketinghub-project.zip';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download Full Project ZIP (VS Code & GitHub Ready)</span>
              </button>
              <span className="text-[11px] text-slate-400">
                Includes GitHub Pages Workflow, README & Run Guide
              </span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 space-y-2 shrink-0">
            <span className="text-[11px] text-slate-300 font-semibold block uppercase">Tech Stack Overview</span>
            <div className="flex flex-wrap gap-1.5 max-w-xs text-[11px]">
              <span className="px-2 py-0.5 bg-emerald-500/30 text-emerald-300 font-bold rounded">Python + Django</span>
              <span className="px-2 py-0.5 bg-blue-500/30 text-blue-300 font-bold rounded">PostgreSQL DB</span>
              <span className="px-2 py-0.5 bg-rose-500/30 text-rose-300 font-bold rounded">bKash & Nagad API</span>
              <span className="px-2 py-0.5 bg-purple-500/30 text-purple-300 font-bold rounded">Redis Channels</span>
              <span className="px-2 py-0.5 bg-cyan-500/30 text-cyan-300 font-bold rounded">React 19 + Tailwind</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 text-xs font-semibold scrollbar-none">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`pb-3 px-3.5 transition-colors cursor-pointer border-b-2 flex items-center gap-2 shrink-0 ${
            activeTab === 'architecture'
              ? 'border-indigo-700 text-indigo-950 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>System Architecture & Data Flow</span>
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`pb-3 px-3.5 transition-colors cursor-pointer border-b-2 flex items-center gap-2 shrink-0 ${
            activeTab === 'database'
              ? 'border-indigo-700 text-indigo-950 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Database Design (20 Tables ER)</span>
        </button>

        <button
          onClick={() => setActiveTab('roadmap')}
          className={`pb-3 px-3.5 transition-colors cursor-pointer border-b-2 flex items-center gap-2 shrink-0 ${
            activeTab === 'roadmap'
              ? 'border-indigo-700 text-indigo-950 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>11-Phase Development Roadmap</span>
        </button>

        <button
          onClick={() => setActiveTab('api')}
          className={`pb-3 px-3.5 transition-colors cursor-pointer border-b-2 flex items-center gap-2 shrink-0 ${
            activeTab === 'api'
              ? 'border-indigo-700 text-indigo-950 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>Django REST API Testing Explorer</span>
        </button>

        <button
          onClick={() => setActiveTab('report_viva')}
          className={`pb-3 px-3.5 transition-colors cursor-pointer border-b-2 flex items-center gap-2 shrink-0 ${
            activeTab === 'report_viva'
              ? 'border-indigo-700 text-indigo-950 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Report Chapters & Viva Defense Q&A</span>
        </button>
      </div>

      {/* SUB-TAB 1: System Architecture & Data Flow */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6 text-xs">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
                Multi-Tier Distributed System Architecture
              </h3>
              <p className="text-slate-500">
                Detailed architecture showing interaction between Client Tier, API Gateway, Real-Time WebSocket Layer, Relational Persistence Tier, and Bangladeshi Payment Gateways.
              </p>
            </div>

            {/* Architecture Visual Diagram Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Layer 1: Client Layer */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-indigo-800 font-bold text-xs uppercase">
                  <Globe className="w-4 h-4" />
                  <span>1. Presentation Layer</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
                    <p className="font-bold text-slate-800">Customer Web & Mobile</p>
                    <span className="text-[10px] text-slate-500">Catalog, Cart, bKash & Nagad Checkout</span>
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
                    <p className="font-bold text-slate-800">Seller Dashboard</p>
                    <span className="text-[10px] text-slate-500">Product CRUD, Inventory & Returns</span>
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
                    <p className="font-bold text-slate-800">Admin & Delivery Hub</p>
                    <span className="text-[10px] text-slate-500">Approvals, GMV, Pathao/Paperfly Dispatch</span>
                  </div>
                </div>
              </div>

              {/* Layer 2: Django Backend & WebSockets */}
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase">
                  <Server className="w-4 h-4" />
                  <span>2. Business Logic & API</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 bg-white border border-emerald-200 rounded-lg shadow-2xs">
                    <p className="font-bold text-slate-800">Django REST Framework</p>
                    <span className="text-[10px] text-slate-500">JWT Auth, Multi-Vendor Order Splitting</span>
                  </div>
                  <div className="p-2.5 bg-white border border-emerald-200 rounded-lg shadow-2xs">
                    <p className="font-bold text-slate-800">Redis + Channels (ASGI)</p>
                    <span className="text-[10px] text-slate-500">Live Flash Deals, Stock Drops & Order Alerts</span>
                  </div>
                  <div className="p-2.5 bg-white border border-emerald-200 rounded-lg shadow-2xs">
                    <p className="font-bold text-slate-800">Celery Task Queue</p>
                    <span className="text-[10px] text-slate-500">Asynchronous SMS & Email notifications</span>
                  </div>
                </div>
              </div>

              {/* Layer 3: Database Layer */}
              <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-blue-800 font-bold text-xs uppercase">
                  <Database className="w-4 h-4" />
                  <span>3. Relational Persistence</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 bg-white border border-blue-200 rounded-lg shadow-2xs">
                    <p className="font-bold text-slate-800">PostgreSQL (20 Tables)</p>
                    <span className="text-[10px] text-slate-500">ACID Transactions, Foreign Keys, Row-Level Locks</span>
                  </div>
                  <div className="p-2.5 bg-white border border-blue-200 rounded-lg shadow-2xs">
                    <p className="font-bold text-slate-800">Inventory Concurrency</p>
                    <span className="text-[10px] text-slate-500">select_for_update() prevents overselling</span>
                  </div>
                  <div className="p-2.5 bg-white border border-blue-200 rounded-lg shadow-2xs">
                    <p className="font-bold text-slate-800">Audit & Payment Logs</p>
                    <span className="text-[10px] text-slate-500">Immutable transaction ledgers</span>
                  </div>
                </div>
              </div>

              {/* Layer 4: Payment & Logistics Integrations */}
              <div className="bg-rose-50/50 border border-rose-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>4. Gateways & Couriers</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 bg-white border border-rose-200 rounded-lg shadow-2xs">
                    <p className="font-bold text-slate-800">bKash Merchant API</p>
                    <span className="text-[10px] text-slate-500">Create, Execute, Status & Refund API</span>
                  </div>
                  <div className="p-2.5 bg-white border border-rose-200 rounded-lg shadow-2xs">
                    <p className="font-bold text-slate-800">Nagad Merchant Gateway</p>
                    <span className="text-[10px] text-slate-500">RSA-SHA256 signature verification</span>
                  </div>
                  <div className="p-2.5 bg-white border border-rose-200 rounded-lg shadow-2xs">
                    <p className="font-bold text-slate-800">Courier Webhooks</p>
                    <span className="text-[10px] text-slate-500">Pathao / Paperfly dispatch webhooks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step-by-Step Flow Description */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider">
                10-Step Transaction & Order Processing Flow:
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-slate-700 leading-relaxed">
                <li><strong>Browse:</strong> Customer accesses marketplace catalog; products queried from PostgreSQL via DRF ViewSets with caching.</li>
                <li><strong>Cart & Validation:</strong> Items added to session cart; stock availability verified against <code>Product_Inventory</code>.</li>
                <li><strong>Checkout:</strong> Customer inputs shipping details and selects bKash / Nagad / COD.</li>
                <li><strong>Gateway Request:</strong> Django backend calls bKash <code>/create</code> API with order total and unique payment ID.</li>
                <li><strong>OTP & PIN Authorization:</strong> Customer completes authentication on the secure bKash hosted sandbox page.</li>
                <li><strong>Server-to-Server Verification:</strong> Backend calls bKash <code>/execute</code> API; verifies amount and transaction status directly.</li>
                <li><strong>Multi-Vendor Splitting:</strong> Master Order created; <code>Order_Items</code> partitioned by <code>seller_id</code>.</li>
                <li><strong>Inventory Atomic Lock:</strong> Inventory decremented atomically using row-level locks (<code>select_for_update</code>).</li>
                <li><strong>Real-Time Broadcast:</strong> Django Channels pushes live notification to Seller and Admin dashboards.</li>
                <li><strong>Logistics Dispatch:</strong> Delivery Manager assigns courier route; customer tracks shipment progress in real time.</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Database Design (20 Tables ER) */}
      {activeTab === 'database' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs">
          {/* Tables List Sidebar */}
          <div className="md:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider">
                Relational Tables ({DATABASE_TABLES_SCHEMA.length})
              </h3>
              <p className="text-[11px] text-slate-500">Select any table to view schema & columns</p>
            </div>

            <input
              type="text"
              placeholder="Search table name..."
              value={searchTable}
              onChange={e => setSearchTable(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-indigo-600"
            />

            <div className="max-h-96 overflow-y-auto space-y-1 pr-1">
              {filteredTables.map(tab => (
                <button
                  key={tab.tableName}
                  onClick={() => setSelectedTable(tab.tableName)}
                  className={`w-full text-left px-3 py-2 rounded-lg font-mono font-semibold transition-colors cursor-pointer flex items-center justify-between ${
                    selectedTable === tab.tableName
                      ? 'bg-indigo-50 text-indigo-900 border border-indigo-200'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{tab.tableName}</span>
                  <span className="text-[10px] text-slate-400 font-sans">{tab.columns.length} cols</span>
                </button>
              ))}
            </div>
          </div>

          {/* Table Details */}
          <div className="md:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            {(() => {
              const current = DATABASE_TABLES_SCHEMA.find(t => t.tableName === selectedTable) || DATABASE_TABLES_SCHEMA[0];
              return (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-indigo-700" />
                      <h3 className="text-base font-bold font-mono text-slate-900">{current.tableName} Table</h3>
                    </div>
                    <p className="text-slate-500 mt-1">{current.purpose}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-2">Column Specifications</h4>
                    <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-slate-100 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                          <tr>
                            <th className="py-2.5 px-3">Column Name & Type</th>
                            <th className="py-2.5 px-3">Constraint</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {current.columns.map((col, idx) => (
                            <tr key={idx} className="hover:bg-white">
                              <td className="py-2 px-3 font-mono font-semibold text-slate-900">{col}</td>
                              <td className="py-2 px-3 text-slate-500 font-sans">
                                {col.includes('PK') && <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-[10px] font-bold">Primary Key</span>}
                                {col.includes('FK') && <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-[10px] font-bold">Foreign Key</span>}
                                {col.includes('Unique') && <span className="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded text-[10px] font-bold">Unique</span>}
                                {!col.includes('PK') && !col.includes('FK') && !col.includes('Unique') && 'Standard Column'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-[11px] text-indigo-900 space-y-1">
                    <span className="font-bold block">Relational Cardinality Note:</span>
                    <p>
                      Each order item in <code>Order_Items</code> preserves <code>seller_id</code> as a Foreign Key. This enables multi-seller checkout wherein customer pays once, while each vendor receives independent dispatch notifications and payment credit minus platform commission.
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: 11-Phase Development Roadmap */}
      {activeTab === 'roadmap' && (
        <div className="space-y-4 text-xs">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-1">
              Complete 20-Week CSE Project Development Roadmap
            </h3>
            <p className="text-slate-500 mb-6">
              Step-by-step progress checklist from Requirement Specification (Phase 1) to Final Report & Viva Preparation (Phase 11).
            </p>

            <div className="space-y-4">
              {ROADMAP_PHASES.map(ph => (
                <div key={ph.phase} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-xs">
                        {ph.phase}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">
                        Phase {ph.phase}: {ph.title}
                      </h4>
                      <span className="text-slate-400 font-mono text-[11px]">({ph.duration})</span>
                    </div>

                    <span className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-100/70 px-2.5 py-0.5 rounded-full text-[10px] uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Defense
                    </span>
                  </div>

                  <p className="text-slate-600 leading-relaxed pl-8">
                    {ph.description}
                  </p>

                  <div className="pl-8 pt-1 flex flex-wrap gap-2">
                    {ph.items.map((it, i) => (
                      <span key={i} className="bg-white border border-slate-200 text-slate-700 px-2 py-1 rounded text-[11px] font-medium shadow-2xs">
                        ✓ {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: Django REST API Testing Explorer */}
      {activeTab === 'api' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
          <div>
            <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-1">
              Django REST Framework (DRF) Interactive Console
            </h3>
            <p className="text-slate-500">
              Test core backend API endpoints for Products, Multi-Vendor Order Splitting, and bKash Payment Gateway.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={apiMethod}
              onChange={e => setApiMethod(e.target.value as any)}
              className="px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg font-bold text-slate-800 font-mono"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>

            <select
              value={apiEndpoint}
              onChange={e => setApiEndpoint(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900 font-bold focus:outline-none"
            >
              <option value="/api/v1/products/">/api/v1/products/ (Catalog with Filters)</option>
              <option value="/api/v1/orders/">/api/v1/orders/ (Multi-Vendor Order Placement)</option>
              <option value="/api/v1/payments/bkash/create/">/api/v1/payments/bkash/create/ (bKash Payment Init)</option>
            </select>

            <button
              onClick={handleSimulateApi}
              disabled={isLoadingApi}
              className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{isLoadingApi ? 'Calling...' : 'Send Request'}</span>
            </button>
          </div>

          {/* API Response Display */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-slate-500">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Response Payload (HTTP 200 OK)</span>
              <span className="font-mono text-[10px]">application/json</span>
            </div>
            <pre className="p-4 bg-slate-900 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
              {apiResponse || '// Click "Send Request" to simulate Django backend endpoint execution'}
            </pre>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: Report Chapters & Viva Defense Q&A */}
      {activeTab === 'report_viva' && (
        <div className="space-y-6 text-xs">
          {/* Report Structure */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-700" />
              <h3 className="font-bold text-slate-900 uppercase tracking-wider">
                CSE Final Year Project Report (50–60 Pages Outline)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { ch: 1, title: 'Introduction & Background', p: 4 },
                { ch: 2, title: 'Literature Review & Existing Systems', p: 4 },
                { ch: 3, title: 'Requirement Analysis & SRS', p: 5 },
                { ch: 4, title: 'Feasibility Study & System Architecture', p: 5 },
                { ch: 5, title: 'Technology Stack Justification', p: 5 },
                { ch: 6, title: 'Database Design & Relational ER Model', p: 5 },
                { ch: 7, title: 'Frontend UI/UX & Responsive Engineering', p: 5 },
                { ch: 8, title: 'Backend Development with Django & DRF', p: 6 },
                { ch: 9, title: 'bKash & Nagad Payment Gateway Integration', p: 4 },
                { ch: 10, title: 'Real-Time Marketing & WebSocket Engine', p: 4 },
                { ch: 11, title: 'Testing, Security & Idempotency Audits', p: 4 },
                { ch: 12, title: 'Conclusion, Limitations & Future Scope', p: 3 }
              ].map(item => (
                <div key={item.ch} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-indigo-900">Chapter {item.ch}</span>
                    <span className="text-[10px] text-slate-500 font-mono">~{item.p} pages</span>
                  </div>
                  <p className="text-slate-700 font-medium">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Viva Defense Q&A Bank */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-800" />
              <h3 className="font-bold text-slate-900 uppercase tracking-wider">
                CSE Board Examination & Viva Voce Q&A Bank
              </h3>
            </div>
            <p className="text-slate-500">
              Standard defense questions frequently asked by external evaluators during university CSE thesis defenses:
            </p>

            <div className="space-y-3">
              {VIVA_QUESTIONS.map((qa, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <p className="font-bold text-slate-900 text-sm">
                    Q{index + 1}: {qa.q}
                  </p>
                  <p className="text-slate-600 leading-relaxed pl-2 border-l-2 border-emerald-600">
                    <strong>Model Answer:</strong> {qa.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
