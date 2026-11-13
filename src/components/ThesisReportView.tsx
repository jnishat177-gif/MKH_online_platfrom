import React, { useState } from 'react';
import {
  Printer,
  GraduationCap,
  Award,
  Edit3,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  FileDown,
  Presentation
} from 'lucide-react';
import {
  SystemArchitectureDiagram,
  UseCaseDiagram,
  DataFlowDiagram,
  ERDiagram,
  PaymentSequenceDiagram,
  ActivityDiagram,
  RealTimeMarketingDiagram,
  UIStorefrontSnapshot,
  UISellerAdminSnapshot,
  UIPaymentTrackingSnapshot,
  UIDeliveryAlertsSnapshot
} from './ReportDiagrams';
import {
  ABBREVIATIONS,
  DEFAULT_THESIS_METADATA,
  DiagramId,
  LIST_OF_FIGURES,
  LIST_OF_TABLES,
  THESIS_CHAPTERS,
  THESIS_PROJECT_TITLE,
  THESIS_REFERENCES,
  ThesisMetadata,
  TOC_ENTRIES
} from '../data/thesisContent';
import { downloadReportDocx, downloadReportPdf } from '../utils/reportExporter';
import { downloadPresentationPptx } from '../utils/pptxExporter';

const DIAGRAM_MAP: Record<DiagramId, React.ReactNode> = {
  arch: <SystemArchitectureDiagram />,
  usecase: <UseCaseDiagram />,
  dfd: <DataFlowDiagram />,
  activity: <ActivityDiagram />,
  er: <ERDiagram />,
  payment: <PaymentSequenceDiagram />,
  marketing: <RealTimeMarketingDiagram />,
  ui_storefront: <UIStorefrontSnapshot />,
  ui_seller_admin: <UISellerAdminSnapshot />,
  ui_payment_tracking: <UIPaymentTrackingSnapshot />,
  ui_delivery_alerts: <UIDeliveryAlertsSnapshot />
};

export const ThesisReportView: React.FC = () => {
  const [meta, setMeta] = useState<ThesisMetadata>(DEFAULT_THESIS_METADATA);
  const [showEditor, setShowEditor] = useState(false);
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingPptx, setIsExportingPptx] = useState(false);

  const updateMeta = (key: keyof ThesisMetadata, value: string) => {
    setMeta(prev => ({ ...prev, [key]: value }));
  };

  const handleDownloadDocx = async () => {
    setIsExportingDocx(true);
    try {
      await downloadReportDocx(meta);
    } finally {
      setIsExportingDocx(false);
    }
  };

  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    try {
      await downloadReportPdf(meta);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleDownloadPptx = async () => {
    setIsExportingPptx(true);
    try {
      await downloadPresentationPptx(meta);
    } finally {
      setIsExportingPptx(false);
    }
  };

  const scrollToChapter = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Screen-Only Report Controls & Standalone Word/PDF/PPTX Exporters */}
      <div className="no-print bg-slate-900 text-white rounded-2xl p-5 shadow-lg border border-slate-800 space-y-4">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Standalone CSE Thesis Report (Word/PDF) &amp; 10-Slide Presentation (.pptx)</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold">
              MarketingHub Online Platform — Academic Report &amp; Student Certificate
            </h2>
            <p className="text-xs text-slate-300">
              Separated from the project ZIP archive: download as Microsoft Word (.docx), PDF (.pdf), or 10-Slide PowerPoint (.pptx) with your custom Student Certificate info.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowEditor(!showEditor)}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Edit3 className="w-4 h-4 text-amber-300" />
              <span>{showEditor ? 'Hide Certificate Editor' : 'Edit Student Info'}</span>
              {showEditor ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleDownloadDocx}
              disabled={isExportingDocx}
              className="px-3.5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-md transition-all disabled:opacity-60"
            >
              <FileText className="w-4 h-4" />
              <span>{isExportingDocx ? 'Generating...' : 'Word (.docx)'}</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isExportingPdf}
              className="px-3.5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-md transition-all disabled:opacity-60"
            >
              <FileDown className="w-4 h-4" />
              <span>{isExportingPdf ? 'Generating...' : 'PDF (.pdf)'}</span>
            </button>

            <button
              onClick={handleDownloadPptx}
              disabled={isExportingPptx}
              className="px-3.5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-md transition-all disabled:opacity-60"
            >
              <Presentation className="w-4 h-4" />
              <span>{isExportingPptx ? 'Building Slides...' : 'PPT Slides (.pptx)'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-700/60 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Print or Save Native Vector A4 PDF via Browser Print Dialog"
            >
              <Printer className="w-4 h-4" />
              <span>Print A4</span>
            </button>
          </div>
        </div>

        {/* Status Note */}
        <div className="bg-emerald-950/60 border border-emerald-700/50 rounded-xl px-4 py-2.5 text-[11px] text-emerald-200 flex flex-wrap items-center justify-between gap-2">
          <span>
            <strong>Complete Academic Report:</strong> Includes formal thesis chapters, tables, 7 Digital Architecture/UML Diagrams, 4 Live UI &amp; Workflow Screen Snapshots showing how the system works, Student Certificate &amp; IEEE References (no product photography or trailing source code appendix).
          </span>
          <span className="font-mono text-emerald-300 font-bold">12 Chapters · 11 Figures · 22 Tables</span>
        </div>

        {/* Interactive Student & Supervisor Info Editor */}
        {showEditor && (
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="text-slate-400 font-semibold block mb-1">University / Institution</label>
              <input
                type="text"
                value={meta.universityName}
                onChange={e => updateMeta('universityName', e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Degree Program</label>
              <input
                type="text"
                value={meta.degreeName}
                onChange={e => updateMeta('degreeName', e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Student Full Name</label>
              <input
                type="text"
                value={meta.studentName}
                onChange={e => updateMeta('studentName', e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Student ID / Roll No.</label>
              <input
                type="text"
                value={meta.studentId}
                onChange={e => updateMeta('studentId', e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Batch / Academic Session</label>
              <input
                type="text"
                value={meta.batchSession}
                onChange={e => updateMeta('batchSession', e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Supervisor Name</label>
              <input
                type="text"
                value={meta.supervisorName}
                onChange={e => updateMeta('supervisorName', e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Supervisor Designation</label>
              <input
                type="text"
                value={meta.supervisorTitle}
                onChange={e => updateMeta('supervisorTitle', e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Head of Department &amp; Date</label>
              <div className="grid grid-cols-2 gap-1.5">
                <input
                  type="text"
                  value={meta.hodName}
                  onChange={e => updateMeta('hodName', e.target.value)}
                  placeholder="HOD Name"
                  className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  value={meta.submissionDate}
                  onChange={e => updateMeta('submissionDate', e.target.value)}
                  placeholder="Date"
                  className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Quick Chapter Navigator */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 text-[11px]">
          <span className="text-slate-400 font-semibold shrink-0 mr-1">Jump to:</span>
          {[
            { id: 'cover-page', label: 'Cover' },
            { id: 'academic-certificate', label: 'Certificate' },
            { id: 'toc-page', label: 'TOC' },
            ...THESIS_CHAPTERS.map(ch => ({ id: ch.id, label: `Ch ${ch.number}` })),
            { id: 'references-section', label: 'References' }
          ].map(ch => (
            <button
              key={ch.id}
              onClick={() => scrollToChapter(ch.id)}
              className="px-2.5 py-1 bg-slate-800 hover:bg-emerald-700 text-slate-200 rounded-md whitespace-nowrap cursor-pointer transition-colors"
            >
              {ch.label}
            </button>
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* FORMAL A4 THESIS PAPER CONTAINER                                      */}
      {/* ===================================================================== */}
      <article className="thesis-paper bg-white max-w-4xl mx-auto shadow-xl border border-slate-200 rounded-2xl p-8 sm:p-14 text-slate-900 font-thesis leading-relaxed">

        {/* ==================== PAGE i: UNIVERSITY COVER PAGE ==================== */}
        <section id="cover-page" className="min-h-[930px] flex flex-col justify-between text-center py-8 border-4 border-double border-slate-800 px-8 rounded-lg">
          <div className="space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-900 text-amber-300 flex items-center justify-center border-4 border-amber-400 shadow-sm">
              <GraduationCap className="w-10 h-10" />
            </div>
            <p className="text-sm font-sans font-extrabold uppercase tracking-[0.18em] text-emerald-900">
              {meta.universityName}
            </p>
            <p className="text-xs font-sans font-bold uppercase tracking-widest text-slate-500">
              Final Year B.Sc. Engineering Thesis &amp; Capstone Project Report
            </p>
          </div>

          <div className="space-y-6 my-8">
            <div className="border-y-2 border-slate-300 py-6 space-y-3">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-emerald-800 block">
                Project Title
              </span>
              <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-950 leading-snug">
                {THESIS_PROJECT_TITLE}
              </h1>
            </div>

            <p className="text-sm text-slate-700 max-w-xl mx-auto italic">
              A formal project report submitted in partial fulfillment of the requirements for the award of the degree of{' '}
              <strong className="not-italic text-slate-900">{meta.degreeName}</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left bg-slate-50 border border-slate-200 rounded-xl p-6 text-sm font-sans">
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">Submitted By</span>
              <p className="font-extrabold text-slate-900 text-base">{meta.studentName}</p>
              <p className="text-slate-700 text-xs">Student ID: <strong className="font-mono">{meta.studentId}</strong></p>
              <p className="text-slate-700 text-xs">Session: <strong>{meta.batchSession}</strong></p>
              <p className="text-slate-600 text-xs">Department of Computer Science &amp; Engineering</p>
            </div>

            <div className="space-y-1.5 sm:border-l sm:border-slate-200 sm:pl-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">Supervised By</span>
              <p className="font-extrabold text-slate-900 text-base">{meta.supervisorName}</p>
              <p className="text-slate-700 text-xs">{meta.supervisorTitle}</p>
              <p className="text-slate-600 text-xs">{meta.universityName}</p>
            </div>
          </div>

          <div className="pt-6 text-xs font-sans text-slate-600 space-y-1">
            <p className="font-bold text-slate-900 uppercase tracking-wider">Dhaka, Bangladesh</p>
            <p>{meta.submissionDate}</p>
          </div>
        </section>

        {/* ============ PAGE ii: STUDENT ACADEMIC CERTIFICATE & APPROVAL ============ */}
        <section id="academic-certificate" className="print-page-break min-h-[930px] flex flex-col justify-between py-8 border-4 border-double border-emerald-900 px-8 sm:px-10 rounded-lg bg-gradient-to-b from-white to-slate-50/40">
          <div className="text-center space-y-3 border-b-2 border-emerald-900/20 pb-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 border-2 border-amber-500 flex items-center justify-center text-emerald-900">
              <Award className="w-9 h-9" />
            </div>
            <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-emerald-800">
              {meta.universityName}
            </p>
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold uppercase tracking-wide text-slate-950">
              Student Academic Certificate
            </h2>
            <p className="text-xs font-sans font-semibold uppercase tracking-widest text-slate-500">
              Certificate of Original Project Completion &amp; Supervisor Approval
            </p>
          </div>

          <div className="space-y-5 text-[15px] leading-8 text-slate-800 text-justify my-6">
            <p>
              This is to certify that the final year capstone project and thesis report entitled{' '}
              <strong className="text-slate-950">&ldquo;{THESIS_PROJECT_TITLE}&rdquo;</strong>{' '}
              has been bonafide carried out and submitted by <strong className="text-emerald-950">{meta.studentName}</strong>{' '}
              (Student ID: <strong className="font-mono">{meta.studentId}</strong>, Session: <strong>{meta.batchSession}</strong>)
              in partial fulfillment of the requirements for the award of the degree of{' '}
              <strong>{meta.degreeName}</strong>.
            </p>

            <p>
              The candidate has successfully designed, engineered, tested, and documented the complete multi-vendor e-commerce platform comprising Customer, Seller, Super Administrator, and Delivery Manager dashboards, twenty-two (22) normalized relational database tables, real-time flash marketing workflows, multi-category retail support, and sandboxed Bangladeshi Mobile Financial Services (bKash, Nagad, and Cash on Delivery) checkout verification.
            </p>

            <p>
              To the best of our knowledge, the software implementation, architectural diagrams, and technical documentation presented in this report represent original engineering work executed under academic supervision and have not been submitted previously for any other degree or diploma.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 py-4 px-5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs font-sans">
            <div className="space-y-0.5">
              <span className="font-bold text-emerald-900 uppercase tracking-wider block">Academic Verification Status</span>
              <span className="text-slate-700">Approved &amp; Certified for Final Year CSE Defense &amp; Viva Voce Examination ({meta.submissionDate})</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-300 rounded-lg font-bold text-emerald-900 shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>APPROVED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 font-sans text-xs text-center">
            <div className="space-y-1">
              <div className="border-t-2 border-slate-800 pt-2 font-bold text-slate-900">{meta.supervisorName}</div>
              <p className="text-slate-600">{meta.supervisorTitle}</p>
              <p className="text-[11px] font-bold uppercase text-emerald-800">Project Supervisor</p>
            </div>
            <div className="space-y-1">
              <div className="border-t-2 border-slate-800 pt-2 font-bold text-slate-900">{meta.hodName}</div>
              <p className="text-slate-600">Chairman, Dept. of CSE</p>
              <p className="text-[11px] font-bold uppercase text-emerald-800">Head of Department</p>
            </div>
            <div className="space-y-1">
              <div className="border-t-2 border-slate-800 pt-2 font-bold text-slate-900">External Examiner</div>
              <p className="text-slate-600">Board of Examiners (CSE)</p>
              <p className="text-[11px] font-bold uppercase text-emerald-800">Viva Voce Evaluator</p>
            </div>
          </div>
        </section>

        {/* ================= PAGE iii: STUDENT DECLARATION ================= */}
        <section className="print-page-break min-h-[850px] flex flex-col justify-between py-8">
          <div className="space-y-6">
            <h2 className="text-xl font-sans font-extrabold uppercase tracking-wider text-slate-950 border-b-2 border-slate-900 pb-2">
              Student Declaration
            </h2>
            <p className="text-[15px] leading-8 text-justify">
              I, <strong>{meta.studentName}</strong> (Student ID: <strong className="font-mono">{meta.studentId}</strong>, Session: <strong>{meta.batchSession}</strong>), hereby solemnly declare that the thesis report and software engineering artifact titled{' '}
              <strong>&ldquo;{THESIS_PROJECT_TITLE}&rdquo;</strong> submitted to <strong>{meta.universityName}</strong> is the genuine outcome of my own independent research, system architecture modeling, and full-stack software development conducted under the guidance of <strong>{meta.supervisorName}</strong>.
            </p>
            <p className="text-[15px] leading-8 text-justify">
              I further affirm that no portion of this project report, architectural diagrams, or codebase has been plagiarized or copied without appropriate scholarly attribution, nor has it been submitted previously to any university or examining institution for the conferral of any degree, diploma, or certificate. All third-party open-source frameworks and payment API specifications referenced herein are duly cited in the References chapter.
            </p>
          </div>

          <div className="pt-12 flex justify-between items-end font-sans text-xs border-t border-slate-200">
            <div className="space-y-1">
              <p className="text-slate-600">Date of Submission: <strong>{meta.submissionDate}</strong></p>
              <p className="text-slate-600">Location: Dhaka, Bangladesh</p>
            </div>
            <div className="text-center">
              <div className="border-t-2 border-slate-900 w-52 pt-2 font-bold text-slate-900">{meta.studentName}</div>
              <span className="text-slate-600">Candidate ID: <strong className="font-mono">{meta.studentId}</strong></span>
            </div>
          </div>
        </section>

        {/* ================= PAGE iv: DEDICATION & ACKNOWLEDGEMENT ================= */}
        <section className="print-page-break py-8 space-y-10">
          <div className="space-y-4">
            <h2 className="text-xl font-sans font-extrabold uppercase tracking-wider text-slate-950 border-b-2 border-slate-900 pb-2">
              Dedication
            </h2>
            <p className="text-[15px] leading-8 italic text-slate-700 text-center py-8 bg-slate-50 rounded-xl px-8 border border-slate-200">
              &ldquo;Dedicated to my beloved parents, whose unwavering prayers, sacrifices, and encouragement gave me the strength to reach this academic milestone; to my respected teachers who ignited my passion for computer science; and to every small Bangladeshi artisan, grocer, weaver, and local entrepreneur striving to thrive in the digital economy.&rdquo;
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-sans font-extrabold uppercase tracking-wider text-slate-950 border-b-2 border-slate-900 pb-2">
              Acknowledgement
            </h2>
            <p className="text-[15px] leading-7 text-justify">
              First and foremost, I express my deepest gratitude to Almighty Allah for granting me the health, patience, intellect, and perseverance required to design, implement, and document this final year engineering project successfully.
            </p>
            <p className="text-[15px] leading-7 text-justify">
              I am profoundly grateful to my respected thesis supervisor, <strong>{meta.supervisorName}</strong> ({meta.supervisorTitle}), for invaluable technical mentorship, rigorous architectural reviews, guidance on multi-vendor database normalization, and continuous encouragement throughout every milestone of this project.
            </p>
            <p className="text-[15px] leading-7 text-justify">
              My sincere appreciation extends to <strong>{meta.hodName}</strong>, Head of the Department of Computer Science &amp; Engineering, and all faculty members of <strong>{meta.universityName}</strong> for cultivating a stimulating academic environment.
            </p>
          </div>
        </section>

        {/* ================= PAGE v: ABSTRACT ================= */}
        <section className="print-page-break py-8 space-y-6">
          <h2 className="text-xl font-sans font-extrabold uppercase tracking-wider text-slate-950 border-b-2 border-slate-900 pb-2">
            Abstract
          </h2>
          <p className="text-[15px] leading-8 text-justify">
            Rapid smartphone penetration and nationwide 4G adoption in Bangladesh have accelerated consumer demand for unified multi-vendor e-commerce ecosystems capable of connecting rural artisans, urban wholesalers, and domestic shoppers on a single trustworthy platform. However, conventional single-vendor storefronts often lack real-time promotional urgency, multi-seller cart partitioning, atomic stock concurrency safeguards, transparent logistics handoffs, and localized Mobile Financial Services (MFS) verification.
          </p>
          <p className="text-[15px] leading-8 text-justify">
            This thesis presents the complete system analysis, architectural design, and full-stack implementation of <strong>MarketingHub Online Platform</strong>, a multi-vendor e-commerce and real-time marketing web application engineered specifically for the Bangladeshi retail ecosystem. The system supports four specialized operational dashboards controlled via Role-Based Access Control (RBAC): <strong>Customer Storefront</strong>, <strong>Seller Merchant Portal</strong>, <strong>Super Administrator Console</strong>, and <strong>Delivery Manager Logistics Hub</strong>, supplemented by an interactive <strong>CSE Academic Defense Hub</strong>.
          </p>
          <p className="text-[15px] leading-8 text-justify">
            Implemented with <strong>React 19</strong>, <strong>TypeScript 7</strong>, <strong>Vite 8</strong>, and <strong>Tailwind CSS v4</strong> on the frontend—paired with a 22-table normalized relational database blueprint, <strong>Django 5 / Django REST Framework (DRF)</strong> backend contracts, and <strong>Redis + Django Channels</strong> real-time WebSocket broadcasting—the platform executes second-by-second flash sale countdowns, threshold-validated promo coupons (<code>DESHI20</code>, <code>BKASH10</code>, <code>FREESHIP</code>), low-stock threshold alerts, automatic multi-vendor order splitting by <code>seller_id</code>, and interactive <strong>bKash</strong>, <strong>Nagad</strong>, and <strong>Cash on Delivery (COD)</strong> verification alongside full return and refund settlement workflows.
          </p>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-sans text-xs text-slate-700 leading-relaxed">
            <strong>Keywords:</strong> Multi-Vendor E-Commerce, Real-Time Marketing Engine, bKash &amp; Nagad MFS Integration, React 19, TypeScript, Django REST Framework, PostgreSQL Concurrency Locking, Redis WebSockets, Role-Based Access Control (RBAC).
          </div>
        </section>

        {/* ============ PAGE vi–vii: TOC, FIGURES, TABLES, ABBREVIATIONS ============ */}
        <section id="toc-page" className="print-page-break py-6 space-y-8 font-sans">
          <div>
            <h2 className="text-xl font-extrabold uppercase tracking-wider text-slate-950 border-b-2 border-slate-900 pb-2 mb-4">
              Table of Contents
            </h2>
            <div className="space-y-1.5 text-xs">
              {TOC_ENTRIES.map((row, i) => (
                <div key={i} className="flex items-baseline justify-between border-b border-dotted border-slate-300 pb-1.5 gap-4">
                  <div>
                    <strong className="text-emerald-900 mr-2">{row.ch}:</strong>
                    <span className="text-slate-800">{row.title}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-600 shrink-0">{row.page}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2">
                List of Figures
              </h3>
              <ul className="space-y-1.5 text-[11px] text-slate-700">
                {LIST_OF_FIGURES.map((fig, idx) => (
                  <li key={idx}>{fig}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2">
                List of Tables
              </h3>
              <ul className="space-y-1.5 text-[11px] text-slate-700">
                {LIST_OF_TABLES.map((tbl, idx) => (
                  <li key={idx}>{tbl}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="print-page-break pt-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-3">
              List of Abbreviations &amp; Technical Acronyms
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 text-xs text-slate-700">
              {ABBREVIATIONS.map(([abbr, full], i) => (
                <p key={i}>
                  <strong>{abbr}:</strong> {full}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================== */}
        {/* CHAPTERS 1 TO 12 (UNIFIED ACADEMIC CONTENT, NO PRODUCT IMAGES)        */}
        {/* ===================================================================== */}
        {THESIS_CHAPTERS.map(chapter => (
          <section key={chapter.id} id={chapter.id} className="print-page-break py-6 space-y-5">
            <div className="border-b-2 border-emerald-800 pb-2">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-emerald-800">
                Chapter {chapter.number}
              </span>
              <h2 className="text-2xl font-sans font-extrabold text-slate-950">{chapter.title}</h2>
            </div>

            {chapter.blocks.map((block, bIdx) => {
              if (block.type === 'pageBreak') {
                return <div key={bIdx} className="print-page-break" />;
              }
              if (block.type === 'subheading') {
                return (
                  <h3 key={bIdx} className="text-lg font-sans font-bold text-slate-900 pt-2">
                    {block.text}
                  </h3>
                );
              }
              if (block.type === 'paragraph') {
                return (
                  <p key={bIdx} className="text-[15px] text-justify">
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'bullets') {
                return (
                  <ul key={bIdx} className="list-disc pl-6 space-y-1.5 text-[15px]">
                    {block.items.map((item, iIdx) => (
                      <li key={iIdx}>
                        {item.bold && <strong>{item.bold} </strong>}
                        {item.text}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === 'table') {
                return (
                  <div key={bIdx} className="avoid-break overflow-x-auto my-4 font-sans">
                    <table className="w-full text-left text-xs border border-slate-300">
                      <caption className="text-xs font-bold text-slate-700 mb-2 text-left">{block.caption}</caption>
                      <thead className="bg-slate-900 text-white">
                        <tr>
                          {block.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-2 border border-slate-700">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {block.rows.map((row, rIdx) => (
                          <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-slate-50' : ''}>
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`p-2 ${cIdx === 0 ? 'font-mono font-bold text-emerald-950' : 'text-slate-700'}`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
              if (block.type === 'code') {
                return (
                  <div key={bIdx} className="avoid-break bg-slate-900 text-emerald-300 rounded-xl p-4 font-mono text-[10.5px] leading-relaxed overflow-x-auto my-3">
                    {block.caption && (
                      <div className="text-slate-400 text-[10px] mb-1.5 font-sans font-bold uppercase">
                        {block.caption}
                      </div>
                    )}
                    <pre>{block.code}</pre>
                  </div>
                );
              }
              if (block.type === 'diagram') {
                return <div key={bIdx}>{DIAGRAM_MAP[block.id]}</div>;
              }
              return null;
            })}
          </section>
        ))}

        {/* ===================================================================== */}
        {/* REFERENCES ONLY (SOURCE PAGE REMOVED AS REQUESTED)                    */}
        {/* ===================================================================== */}
        <section id="references-section" className="print-page-break py-6 space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl font-sans font-extrabold uppercase tracking-wider text-slate-950 border-b-2 border-slate-900 pb-2">
              References
            </h2>
            <ol className="list-decimal pl-6 space-y-2.5 text-xs font-sans text-slate-700 leading-relaxed">
              {THESIS_REFERENCES.map((ref, idx) => (
                <li key={idx}>{ref}</li>
              ))}
            </ol>
          </div>
        </section>
      </article>
    </div>
  );
};
