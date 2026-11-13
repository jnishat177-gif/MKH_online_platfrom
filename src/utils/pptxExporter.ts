import PptxGenJS from 'pptxgenjs';
import JSZip from 'jszip';
import { ThesisMetadata } from '../data/thesisContent';
import { rasterizeAllDiagrams, RasterizedDiagram } from './reportExporter';

import groceryImg from '../assets/images/grocery_pantry_bundle_1794543632319.jpg';
import cosmeticImg from '../assets/images/luxury_cosmetic_skincare_1794543633073.jpg';
import furnitureImg from '../assets/images/teak_wood_furniture_1794543633471.jpg';
import electronicsImg from '../assets/images/smart_kitchen_electronics_1794543633677.jpg';
import ladiesDressImg from '../assets/images/ladies_onepiece_dress_1794543634104.jpg';
import jamdaniImg from '../assets/images/handicraft_jamdani_collection_1794475842819.jpg';
import honeyImg from '../assets/images/organic_deshi_agro_honey_1794475843049.jpg';
import techGadgetsImg from '../assets/images/bangladesh_tech_gadgets_1794475843137.jpg';

export interface PresentationSlideSummary {
  slideNumber: number;
  title: string;
  subtitle: string;
  keyHighlight: string;
}

export const PRESENTATION_SLIDES: PresentationSlideSummary[] = [
  {
    slideNumber: 1,
    title: 'Title & Defense Overview',
    subtitle: 'MarketingHub Online Platform',
    keyHighlight: 'CSE Final Year Project · Student, Supervisor & Institution Details'
  },
  {
    slideNumber: 2,
    title: 'Problem Statement & Use Case',
    subtitle: 'Bangladeshi E-Commerce Gaps',
    keyHighlight: 'Multi-vendor isolation, mobile wallets & embedded UML Use Case Diagram'
  },
  {
    slideNumber: 3,
    title: 'Existing Systems vs. MarketingHub',
    subtitle: 'Comparative Benchmark Matrix',
    keyHighlight: 'Feature gap comparison against Daraz, Chaldal & Shajgoj'
  },
  {
    slideNumber: 4,
    title: '4-Role RBAC & Real Product Gallery',
    subtitle: '8 Categories with Live Photos',
    keyHighlight: 'Customer, Seller, Admin, Delivery + all 8 real product images'
  },
  {
    slideNumber: 5,
    title: 'Multi-Tier System Architecture',
    subtitle: 'Client, DRF, Redis & Gateways',
    keyHighlight: 'Includes high-resolution Digital System Architecture Diagram'
  },
  {
    slideNumber: 6,
    title: 'Tech Stack & Live Portal Previews',
    subtitle: 'Frontend, Backend & UI Screens',
    keyHighlight: 'React 19, Django/DRF, PostgreSQL + Storefront & Seller/Admin UI'
  },
  {
    slideNumber: 7,
    title: 'Database Design (22 Tables)',
    subtitle: 'Relational Schema & ER Model',
    keyHighlight: 'Multi-vendor Order_Items splitting & atomic stock locks + ER Diagram'
  },
  {
    slideNumber: 8,
    title: 'bKash/Nagad & Real-Time Engine',
    subtitle: 'Payment & WebSocket Workflows',
    keyHighlight: 'Includes Payment Sequence Diagram & Real-Time Marketing Architecture'
  },
  {
    slideNumber: 9,
    title: 'Live Checkout, Courier & QA Audits',
    subtitle: 'End-to-End Screens & Benchmarks',
    keyHighlight: 'QA suite results + live bKash Checkout, Tracking & Delivery Hub UI'
  },
  {
    slideNumber: 10,
    title: 'Conclusion, Future Scope & Q&A',
    subtitle: 'Defense Summary',
    keyHighlight: 'AI recommendations, mobile app roadmap & Viva Q&A closing slide'
  }
];

// Palette constants (hex without #)
const C_NAVY = '0F172A';
const C_SLATE_DARK = '1E293B';
const C_SLATE_MUTED = '475569';
const C_SLATE_LIGHT = 'F8FAFC';
const C_BORDER = 'CBD5E1';
const C_EMERALD = '065F46';
const C_EMERALD_BRIGHT = '10B981';
const C_EMERALD_SOFT = 'ECFDF5';
const C_INDIGO = '3730A3';
const C_INDIGO_SOFT = 'EEF2FF';
const C_AMBER = 'D97706';
const C_AMBER_BRIGHT = 'FCD34D';
const C_AMBER_SOFT = 'FFFBEB';
const C_ROSE = 'BE123C';
const C_ROSE_SOFT = 'FFF1F2';
const C_WHITE = 'FFFFFF';

/**
 * Loads a project product image (URL or Vite-inlined asset) onto a canvas and converts
 * it into a clean resized JPEG dataUrl with exact pixel dimensions for PptxGenJS embedding.
 */
async function loadProjectImage(src: string): Promise<RasterizedDiagram | undefined> {
  if (!src) return undefined;
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => resolve(image);
      image.onerror = err => reject(err);
      image.src = src;
    });

    const natW = img.naturalWidth || 600;
    const natH = img.naturalHeight || 600;
    const maxDim = 600;
    const scale = Math.min(1, maxDim / Math.max(natW, natH));
    const targetW = Math.max(1, Math.round(natW * scale));
    const targetH = Math.max(1, Math.round(natH * scale));

    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, targetW, targetH);
      ctx.drawImage(img, 0, 0, targetW, targetH);
    }

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    if (!dataUrl.startsWith('data:image/jpeg;base64,')) return undefined;

    return {
      dataUrl,
      bytes: new Uint8Array(0),
      width: targetW,
      height: targetH
    };
  } catch {
    return undefined;
  }
}

/**
 * Helper to fit a rasterized PNG/JPEG inside a bounded box preserving aspect ratio.
 */
function addFittedDiagram(
  slide: PptxGenJS.Slide,
  img: RasterizedDiagram | undefined,
  boxX: number,
  boxY: number,
  boxW: number,
  boxH: number
) {
  if (!img || !img.dataUrl || !img.width || !img.height) return;
  const imgRatio = img.width / img.height;
  const boxRatio = boxW / boxH;
  let drawW = boxW;
  let drawH = boxH;
  if (imgRatio > boxRatio) {
    drawW = boxW;
    drawH = boxW / imgRatio;
  } else {
    drawH = boxH;
    drawW = boxH * imgRatio;
  }
  const offsetX = boxX + (boxW - drawW) / 2;
  const offsetY = boxY + (boxH - drawH) / 2;

  slide.addImage({
    data: img.dataUrl,
    x: offsetX,
    y: offsetY,
    w: drawW,
    h: drawH
  });
}

function addSlideChrome(
  slide: PptxGenJS.Slide,
  pptx: PptxGenJS,
  slideNum: number,
  totalSlides: number,
  sectionTag: string,
  title: string,
  meta: ThesisMetadata
) {
  slide.background = { color: C_WHITE };

  // Top accent bar
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10,
    h: 0.08,
    fill: { color: C_EMERALD }
  });

  // Left vertical badge indicator
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.45,
    y: 0.25,
    w: 0.08,
    h: 0.52,
    fill: { color: C_EMERALD_BRIGHT }
  });

  // Section tag
  slide.addText(sectionTag.toUpperCase(), {
    x: 0.62,
    y: 0.22,
    w: 7.5,
    h: 0.22,
    fontFace: 'Calibri',
    fontSize: 9.5,
    bold: true,
    color: C_EMERALD
  });

  // Slide Title
  slide.addText(title, {
    x: 0.62,
    y: 0.42,
    w: 8.8,
    h: 0.4,
    fontFace: 'Calibri',
    fontSize: 20,
    bold: true,
    color: C_NAVY
  });

  // Top thin rule (using rect instead of zero-height line for 100% Office/WPS compatibility)
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.45,
    y: 0.88,
    w: 9.1,
    h: 0.015,
    fill: { color: C_BORDER }
  });

  // Footer thin rule
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.45,
    y: 5.25,
    w: 9.1,
    h: 0.015,
    fill: { color: C_BORDER }
  });

  // Footer left text
  slide.addText(
    `MarketingHub Online Platform · CSE Defense Presentation | ${meta.studentName} (${meta.studentId})`,
    {
      x: 0.45,
      y: 5.3,
      w: 7.8,
      h: 0.24,
      fontFace: 'Calibri',
      fontSize: 8.5,
      color: C_SLATE_MUTED
    }
  );

  // Footer slide number
  slide.addText(`Slide ${slideNum} / ${totalSlides}`, {
    x: 8.3,
    y: 5.3,
    w: 1.25,
    h: 0.24,
    align: 'right',
    fontFace: 'Calibri',
    fontSize: 8.5,
    bold: true,
    color: C_NAVY
  });
}

/**
 * Generates and downloads a strict-OOXML-compliant 10-slide Microsoft PowerPoint (.pptx) file
 * embedding all 8 real project product images plus architectural, UML, and live UI snapshots.
 */
export async function downloadPresentationPptx(meta: ThesisMetadata): Promise<void> {
  const productCatalogSources = [
    { label: 'Grocery Bundle', price: 'BDT 1,850', src: groceryImg },
    { label: 'Cosmetics Kit', price: 'BDT 2,190', src: cosmeticImg },
    { label: 'Teak Furniture', price: 'BDT 14,500', src: furnitureImg },
    { label: 'Smart Kitchen', price: 'BDT 8,950', src: electronicsImg },
    { label: 'Ladies Kurti', price: 'BDT 1,690', src: ladiesDressImg },
    { label: 'Dhakai Jamdani', price: 'BDT 8,490', src: jamdaniImg },
    { label: 'Wild Honey', price: 'BDT 780', src: honeyImg },
    { label: 'ANC Tech', price: 'BDT 2,450', src: techGadgetsImg }
  ];

  const [diagrams, loadedPhotos] = await Promise.all([
    rasterizeAllDiagrams(),
    Promise.all(productCatalogSources.map(item => loadProjectImage(item.src)))
  ]);

  const pptx = new PptxGenJS();

  pptx.layout = 'LAYOUT_16x9'; // 10" x 5.625"
  pptx.author = meta.studentName || 'CSE Student';
  pptx.company = meta.universityName || 'Department of CSE';
  pptx.subject = 'CSE Final Year Project Defense Presentation';
  pptx.title = 'MarketingHub Online Platform - Real-Time Marketing & Multi-Vendor E-Commerce';

  const TOTAL_SLIDES = 10;

  // ============================================================================
  // SLIDE 1: TITLE SLIDE (Dark Executive Academic Navy)
  // ============================================================================
  const s1 = pptx.addSlide();
  s1.background = { color: C_NAVY };

  s1.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.12, fill: { color: C_EMERALD_BRIGHT } });
  s1.addShape(pptx.ShapeType.rect, { x: 0, y: 5.5, w: 10, h: 0.125, fill: { color: C_AMBER_BRIGHT } });

  s1.addShape(pptx.ShapeType.roundRect, {
    x: 0.65,
    y: 0.5,
    w: 3.85,
    h: 0.34,
    rectRadius: 0.08,
    fill: { color: C_SLATE_DARK },
    line: { color: C_EMERALD_BRIGHT, width: 1 }
  });
  s1.addText('CSE FINAL YEAR PROJECT DEFENSE', {
    x: 0.65,
    y: 0.5,
    w: 3.85,
    h: 0.34,
    align: 'center',
    valign: 'middle',
    fontFace: 'Calibri',
    fontSize: 10,
    bold: true,
    color: C_AMBER_BRIGHT
  });

  s1.addText('MarketingHub Online Platform', {
    x: 0.65,
    y: 1.05,
    w: 8.7,
    h: 0.65,
    fontFace: 'Calibri',
    fontSize: 32,
    bold: true,
    color: C_WHITE
  });

  s1.addText(
    'Design and Implementation of a Real-Time Marketing & Multi-Vendor E-Commerce System with bKash & Nagad Integration',
    {
      x: 0.65,
      y: 1.72,
      w: 8.7,
      h: 0.65,
      fontFace: 'Calibri',
      fontSize: 14.5,
      color: 'CBD5E1'
    }
  );

  // Presenter Info Card
  s1.addShape(pptx.ShapeType.roundRect, {
    x: 0.65,
    y: 2.65,
    w: 4.25,
    h: 2.05,
    rectRadius: 0.1,
    fill: { color: C_SLATE_DARK },
    line: { color: '334155', width: 1 }
  });
  s1.addText('PRESENTED BY', {
    x: 0.85,
    y: 2.8,
    w: 3.85,
    h: 0.25,
    fontFace: 'Calibri',
    fontSize: 9.5,
    bold: true,
    color: C_EMERALD_BRIGHT
  });
  s1.addText(meta.studentName, {
    x: 0.85,
    y: 3.06,
    w: 3.85,
    h: 0.38,
    fontFace: 'Calibri',
    fontSize: 17,
    bold: true,
    color: C_WHITE
  });
  s1.addText(
    `Student ID: ${meta.studentId}\nBatch / Session: ${meta.batchSession}\n${meta.degreeName}`,
    {
      x: 0.85,
      y: 3.48,
      w: 3.85,
      h: 1.08,
      valign: 'top',
      fontFace: 'Calibri',
      fontSize: 10.5,
      color: 'CBD5E1'
    }
  );

  // Supervisor Card
  s1.addShape(pptx.ShapeType.roundRect, {
    x: 5.1,
    y: 2.65,
    w: 4.25,
    h: 2.05,
    rectRadius: 0.1,
    fill: { color: C_SLATE_DARK },
    line: { color: '334155', width: 1 }
  });
  s1.addText('SUPERVISION & INSTITUTION', {
    x: 5.3,
    y: 2.8,
    w: 3.85,
    h: 0.25,
    fontFace: 'Calibri',
    fontSize: 9.5,
    bold: true,
    color: C_AMBER_BRIGHT
  });
  s1.addText(meta.supervisorName, {
    x: 5.3,
    y: 3.06,
    w: 3.85,
    h: 0.35,
    fontFace: 'Calibri',
    fontSize: 15,
    bold: true,
    color: C_WHITE
  });
  s1.addText(
    `${meta.supervisorTitle}\n\n${meta.universityName}\nDefense Date: ${meta.submissionDate}`,
    {
      x: 5.3,
      y: 3.44,
      w: 3.85,
      h: 1.15,
      valign: 'top',
      fontFace: 'Calibri',
      fontSize: 10.2,
      color: 'CBD5E1'
    }
  );

  s1.addText('10-Slide Technical Presentation · Real Product Catalog · Architecture · UI Screens · Live Demo', {
    x: 0.65,
    y: 4.95,
    w: 8.7,
    h: 0.3,
    fontFace: 'Calibri',
    fontSize: 10,
    color: '94A3B8'
  });
  s1.addNotes(
    `Greeting & Introduction: Good morning Honorable Chairman and Board Examiners. I am ${meta.studentName} (ID: ${meta.studentId}). Today I am presenting our Final Year CSE Project: MarketingHub Online Platform.`
  );

  // ============================================================================
  // SLIDE 2: PROBLEM STATEMENT, OBJECTIVES & UML USE CASE DIAGRAM
  // ============================================================================
  const s2 = pptx.addSlide();
  addSlideChrome(s2, pptx, 2, TOTAL_SLIDES, 'Chapter 1 · Motivation & Scope', 'Problem Statement, Objectives & Use Case Model', meta);

  // Left Top Card: Pain Points
  s2.addShape(pptx.ShapeType.roundRect, {
    x: 0.45,
    y: 1.02,
    w: 4.35,
    h: 1.98,
    rectRadius: 0.08,
    fill: { color: C_ROSE_SOFT },
    line: { color: 'FECDD3', width: 1 }
  });
  s2.addText('Industry Pain Points (Bangladesh)', {
    x: 0.62,
    y: 1.09,
    w: 4.0,
    h: 0.26,
    fontFace: 'Calibri',
    fontSize: 11.5,
    bold: true,
    color: C_ROSE
  });
  const painPoints = [
    '1. Single-Vendor Rigidity: SMEs lack unified multi-vendor order splitting.',
    '2. Manual Payment Fraud: Manual TrxID checks delay reconciliation.',
    '3. Flash-Sale Overselling: Concurrent checkouts cause negative stock.',
    '4. Static Non-Realtime UX: Delayed seller alerts & no live scarcity notices.'
  ];
  painPoints.forEach((pt, idx) => {
    s2.addText(pt, {
      x: 0.62,
      y: 1.38 + idx * 0.38,
      w: 4.02,
      h: 0.34,
      fontFace: 'Calibri',
      fontSize: 9.2,
      color: C_SLATE_DARK,
      valign: 'top'
    });
  });

  // Left Bottom Card: Project Objectives
  s2.addShape(pptx.ShapeType.roundRect, {
    x: 0.45,
    y: 3.1,
    w: 4.35,
    h: 1.98,
    rectRadius: 0.08,
    fill: { color: C_EMERALD_SOFT },
    line: { color: 'A7F3D0', width: 1 }
  });
  s2.addText('Core Project Objectives (MarketingHub)', {
    x: 0.62,
    y: 3.17,
    w: 4.0,
    h: 0.26,
    fontFace: 'Calibri',
    fontSize: 11.5,
    bold: true,
    color: C_EMERALD
  });
  const objectives = [
    '1. 4-Role RBAC Portal: Customer, Seller, Admin & Delivery Manager.',
    '2. Multi-Vendor Order Splitting: Single cart partitions by seller_id.',
    '3. bKash, Nagad & COD Flow: OTP/PIN checkout + server verification.',
    '4. Real-Time Marketing: Flash sales, coupons & WebSocket push alerts.'
  ];
  objectives.forEach((ob, idx) => {
    s2.addText(ob, {
      x: 0.62,
      y: 3.46 + idx * 0.38,
      w: 4.02,
      h: 0.34,
      fontFace: 'Calibri',
      fontSize: 9.2,
      color: C_SLATE_DARK,
      valign: 'top'
    });
  });

  // Right Card: Embedded UML Use Case Diagram
  s2.addShape(pptx.ShapeType.roundRect, {
    x: 4.95,
    y: 1.02,
    w: 4.6,
    h: 4.06,
    rectRadius: 0.08,
    fill: { color: C_WHITE },
    line: { color: C_BORDER, width: 1 }
  });
  s2.addText('System Boundary & UML Use Case Diagram (4 Actors)', {
    x: 5.05,
    y: 1.09,
    w: 4.4,
    h: 0.26,
    align: 'center',
    fontFace: 'Calibri',
    fontSize: 10.5,
    bold: true,
    color: C_NAVY
  });
  addFittedDiagram(s2, diagrams.usecase, 5.02, 1.38, 4.46, 3.62);
  s2.addNotes('Explain why local Bangladeshi SMEs need multi-vendor splitting, verified bKash/Nagad workflows, and walk through the 4 actors in the UML Use Case diagram.');

  // ============================================================================
  // SLIDE 3: EXISTING SYSTEMS VS MARKETINGHUB (COMPARATIVE MATRIX)
  // ============================================================================
  const s3 = pptx.addSlide();
  addSlideChrome(s3, pptx, 3, TOTAL_SLIDES, 'Chapter 2 · Literature Review', 'Comparative Benchmark vs. Existing Platforms', meta);

  s3.addText(
    'Comparison across key architectural, payment, concurrency, and multi-vendor dimensions in the Bangladeshi market:',
    {
      x: 0.45,
      y: 1.0,
      w: 9.1,
      h: 0.3,
      fontFace: 'Calibri',
      fontSize: 11,
      color: C_SLATE_MUTED
    }
  );

  const compRows: PptxGenJS.TableRow[] = [
    [
      { text: 'Evaluation Criteria', options: { bold: true, color: C_WHITE, fill: { color: C_NAVY } } },
      { text: 'Daraz BD', options: { bold: true, color: C_WHITE, fill: { color: C_NAVY }, align: 'center' } },
      { text: 'Chaldal', options: { bold: true, color: C_WHITE, fill: { color: C_NAVY }, align: 'center' } },
      { text: 'Shajgoj', options: { bold: true, color: C_WHITE, fill: { color: C_NAVY }, align: 'center' } },
      { text: 'MarketingHub (Ours)', options: { bold: true, color: C_AMBER_BRIGHT, fill: { color: C_EMERALD }, align: 'center' } }
    ],
    [
      { text: 'Multi-Vendor Order Splitting' },
      { text: 'Yes', options: { align: 'center' } },
      { text: 'No (1P Warehouse)', options: { align: 'center' } },
      { text: 'Limited', options: { align: 'center' } },
      { text: 'Yes (Seller-ID Level)', options: { bold: true, color: C_EMERALD, align: 'center', fill: { color: C_EMERALD_SOFT } } }
    ],
    [
      { text: 'Real-Time Flash Sales & Alerts' },
      { text: 'Scheduled Batch', options: { align: 'center' } },
      { text: 'Polling Based', options: { align: 'center' } },
      { text: 'Static Banners', options: { align: 'center' } },
      { text: 'Redis + Channels WS', options: { bold: true, color: C_EMERALD, align: 'center', fill: { color: C_EMERALD_SOFT } } }
    ],
    [
      { text: 'bKash + Nagad + COD Native' },
      { text: 'Yes', options: { align: 'center' } },
      { text: 'Yes', options: { align: 'center' } },
      { text: 'Yes', options: { align: 'center' } },
      { text: 'Server-Verified + Logs', options: { bold: true, color: C_EMERALD, align: 'center', fill: { color: C_EMERALD_SOFT } } }
    ],
    [
      { text: 'Atomic Stock Concurrency Lock' },
      { text: 'Proprietary', options: { align: 'center' } },
      { text: 'Warehouse Sync', options: { align: 'center' } },
      { text: 'Basic', options: { align: 'center' } },
      { text: 'select_for_update()', options: { bold: true, color: C_EMERALD, align: 'center', fill: { color: C_EMERALD_SOFT } } }
    ],
    [
      { text: 'Dedicated Delivery Manager Hub' },
      { text: 'Internal Logistics', options: { align: 'center' } },
      { text: 'Own Fleet', options: { align: 'center' } },
      { text: '3P Courier Only', options: { align: 'center' } },
      { text: 'Full 4-Role Lifecycle', options: { bold: true, color: C_EMERALD, align: 'center', fill: { color: C_EMERALD_SOFT } } }
    ],
    [
      { text: 'Cross-Category Product Coverage' },
      { text: 'Broad Marketplace', options: { align: 'center' } },
      { text: 'Grocery Focus', options: { align: 'center' } },
      { text: 'Beauty Focus', options: { align: 'center' } },
      { text: '8 Unified Categories', options: { bold: true, color: C_EMERALD, align: 'center', fill: { color: C_EMERALD_SOFT } } }
    ]
  ];

  s3.addTable(compRows, {
    x: 0.45,
    y: 1.4,
    w: 9.1,
    rowH: 0.48,
    fontFace: 'Calibri',
    fontSize: 10.5,
    border: { type: 'solid', pt: 0.75, color: C_BORDER },
    fill: { color: C_WHITE },
    color: C_SLATE_DARK,
    valign: 'middle'
  });
  s3.addNotes('Highlight how MarketingHub combines multi-vendor marketplace capability with real-time marketing and strict transactional concurrency.');

  // ============================================================================
  // SLIDE 4: 4-ROLE RBAC ECOSYSTEM & ALL 8 REAL PRODUCT PHOTOS
  // ============================================================================
  const s4 = pptx.addSlide();
  addSlideChrome(s4, pptx, 4, TOTAL_SLIDES, 'Chapter 3 · Functional Design', '4-Role Ecosystem & Real 8-Category Product Catalog', meta);

  const roles = [
    {
      title: '1. Customer Portal',
      color: C_EMERALD,
      bg: C_EMERALD_SOFT,
      points:
        '• Search & browse 8 categories\n• Cart, Bag & Live Coupons\n• bKash, Nagad & COD Checkout\n• Live order tracking & refunds'
    },
    {
      title: '2. Seller Dashboard',
      color: C_INDIGO,
      bg: C_INDIGO_SOFT,
      points:
        '• Storefront profile & sales KPIs\n• Product CRUD & stock sync\n• Isolated order fulfillment\n• Return approve / decline'
    },
    {
      title: '3. Admin Console',
      color: C_AMBER,
      bg: C_AMBER_SOFT,
      points:
        '• Seller KYB & SKU approval\n• Commission & GMV analytics\n• Coupon & flash deal rules\n• Payment audit & moderation'
    },
    {
      title: '4. Delivery Manager',
      color: C_ROSE,
      bg: C_ROSE_SOFT,
      points:
        '• Shipment dispatch queue\n• Pathao / Steadfast routing\n• Out for Delivery updates\n• Real-time customer ETA push'
    }
  ];

  roles.forEach((r, idx) => {
    const xPos = 0.45 + idx * 2.32;
    s4.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 1.0,
      w: 2.18,
      h: 1.98,
      rectRadius: 0.08,
      fill: { color: r.bg },
      line: { color: C_BORDER, width: 1 }
    });
    s4.addShape(pptx.ShapeType.rect, {
      x: xPos,
      y: 1.0,
      w: 2.18,
      h: 0.34,
      fill: { color: r.color }
    });
    s4.addText(r.title, {
      x: xPos + 0.06,
      y: 1.0,
      w: 2.06,
      h: 0.34,
      valign: 'middle',
      fontFace: 'Calibri',
      fontSize: 10.5,
      bold: true,
      color: C_WHITE
    });
    s4.addText(r.points, {
      x: xPos + 0.08,
      y: 1.4,
      w: 2.02,
      h: 1.52,
      valign: 'top',
      fontFace: 'Calibri',
      fontSize: 9.2,
      color: C_SLATE_DARK
    });
  });

  // Real Project Product Images Showcase Strip (all 8 real .jpg files in src/assets/images/)
  s4.addText('Live Marketplace Catalog — Real Project Product Photography Across 8 Bangladeshi Categories:', {
    x: 0.45,
    y: 3.08,
    w: 9.1,
    h: 0.25,
    fontFace: 'Calibri',
    fontSize: 10.5,
    bold: true,
    color: C_NAVY
  });

  productCatalogSources.forEach((prod, idx) => {
    const xCard = 0.45 + idx * 1.15;
    s4.addShape(pptx.ShapeType.roundRect, {
      x: xCard,
      y: 3.36,
      w: 1.05,
      h: 1.78,
      rectRadius: 0.06,
      fill: { color: C_WHITE },
      line: { color: C_BORDER, width: 0.75 }
    });

    // Real product photo embedded cleanly
    addFittedDiagram(s4, loadedPhotos[idx], xCard + 0.05, 3.41, 0.95, 0.95);

    s4.addText(prod.label, {
      x: xCard + 0.03,
      y: 4.41,
      w: 0.99,
      h: 0.38,
      align: 'center',
      valign: 'top',
      fontFace: 'Calibri',
      fontSize: 7.8,
      bold: true,
      color: C_NAVY
    });

    s4.addText(prod.price, {
      x: xCard + 0.03,
      y: 4.82,
      w: 0.99,
      h: 0.25,
      align: 'center',
      valign: 'middle',
      fontFace: 'Calibri',
      fontSize: 8.5,
      bold: true,
      color: C_EMERALD
    });
  });
  s4.addNotes('Walk through the 4 user roles and point out the 8 real product photos currently active in the MarketingHub storefront.');

  // ============================================================================
  // SLIDE 5: SYSTEM ARCHITECTURE (EMBEDDED DIAGRAM)
  // ============================================================================
  const s5 = pptx.addSlide();
  addSlideChrome(s5, pptx, 5, TOTAL_SLIDES, 'Chapter 4 · System Architecture', 'Multi-Tier Distributed System Architecture', meta);

  s5.addShape(pptx.ShapeType.roundRect, {
    x: 0.45,
    y: 1.05,
    w: 3.05,
    h: 4.0,
    rectRadius: 0.08,
    fill: { color: C_SLATE_LIGHT },
    line: { color: C_BORDER, width: 1 }
  });
  s5.addText('Architectural Tiers', {
    x: 0.62,
    y: 1.16,
    w: 2.7,
    h: 0.28,
    fontFace: 'Calibri',
    fontSize: 12.5,
    bold: true,
    color: C_NAVY
  });

  const tiers = [
    { t: '1. Presentation Layer:', b: 'React 19 SPA, Tailwind CSS, Role Dashboards & Checkout.', c: C_EMERALD },
    { t: '2. Application & API Tier:', b: 'Django REST Framework, JWT Auth, Order Splitting Logic.', c: C_INDIGO },
    { t: '3. Real-Time & Async Tier:', b: 'Redis + Django Channels (ASGI WebSockets) & Celery.', c: C_AMBER },
    { t: '4. Data & Gateways:', b: 'PostgreSQL (22 Tables), bKash/Nagad & Courier Webhooks.', c: C_ROSE }
  ];
  tiers.forEach((tier, idx) => {
    const yPos = 1.54 + idx * 0.85;
    s5.addText(tier.t, {
      x: 0.62,
      y: yPos,
      w: 2.72,
      h: 0.22,
      fontFace: 'Calibri',
      fontSize: 10.2,
      bold: true,
      color: tier.c
    });
    s5.addText(tier.b, {
      x: 0.62,
      y: yPos + 0.22,
      w: 2.72,
      h: 0.54,
      fontFace: 'Calibri',
      fontSize: 9.8,
      color: C_SLATE_DARK,
      valign: 'top'
    });
  });

  s5.addShape(pptx.ShapeType.roundRect, {
    x: 3.65,
    y: 1.05,
    w: 5.9,
    h: 4.0,
    rectRadius: 0.08,
    fill: { color: C_WHITE },
    line: { color: C_BORDER, width: 1 }
  });
  addFittedDiagram(s5, diagrams.arch, 3.72, 1.12, 5.76, 3.86);
  s5.addNotes('Explain how requests flow from React frontend through DRF and ASGI Channels down to PostgreSQL and bKash/Nagad servers.');

  // ============================================================================
  // SLIDE 6: TECHNOLOGY STACK & LIVE PORTAL SCREEN PREVIEWS
  // ============================================================================
  const s6 = pptx.addSlide();
  addSlideChrome(s6, pptx, 6, TOTAL_SLIDES, 'Chapter 5 · Technology Stack & UI', 'Tech Stack & Live Application Portal Interfaces', meta);

  const stackRows: PptxGenJS.TableRow[] = [
    [
      { text: 'Layer', options: { bold: true, color: C_WHITE, fill: { color: C_NAVY } } },
      { text: 'Tools / Libraries', options: { bold: true, color: C_WHITE, fill: { color: C_NAVY } } },
      { text: 'Key Responsibility', options: { bold: true, color: C_WHITE, fill: { color: C_NAVY } } }
    ],
    [
      { text: 'Frontend UI', options: { bold: true } },
      { text: 'React 19, TypeScript' },
      { text: 'Type-safe multi-role SPA & Context state' }
    ],
    [
      { text: 'Build & Style', options: { bold: true } },
      { text: 'Vite 8, Tailwind v4' },
      { text: 'Fast bundling & responsive grid UI' }
    ],
    [
      { text: 'Backend API', options: { bold: true } },
      { text: 'Django, DRF, JWT' },
      { text: 'RBAC security & order splitting API' }
    ],
    [
      { text: 'Real-Time', options: { bold: true } },
      { text: 'Channels + Redis' },
      { text: 'WebSocket flash deals & stock alerts' }
    ],
    [
      { text: 'Database', options: { bold: true } },
      { text: 'PostgreSQL 16 (3NF)' },
      { text: '22 tables + atomic row locking' }
    ],
    [
      { text: 'Gateways', options: { bold: true } },
      { text: 'bKash, Nagad, COD' },
      { text: 'Server-verified TrxID ledger & logs' }
    ],
    [
      { text: 'Exporters', options: { bold: true } },
      { text: 'docx, jsPDF, PptxGenJS' },
      { text: 'Word, PDF, PPTX & ZIP packager' }
    ]
  ];

  s6.addTable(stackRows, {
    x: 0.45,
    y: 1.04,
    w: 5.05,
    rowH: 0.49,
    colW: [1.15, 1.65, 2.25],
    fontFace: 'Calibri',
    fontSize: 8.8,
    border: { type: 'solid', pt: 0.75, color: C_BORDER },
    fill: { color: C_WHITE },
    color: C_SLATE_DARK,
    valign: 'middle'
  });

  // Right Top: Live Storefront UI Snapshot
  s6.addShape(pptx.ShapeType.roundRect, {
    x: 5.65,
    y: 1.04,
    w: 3.9,
    h: 1.97,
    rectRadius: 0.08,
    fill: { color: C_WHITE },
    line: { color: C_BORDER, width: 1 }
  });
  s6.addText('Live Customer Storefront & Role Switcher UI', {
    x: 5.73,
    y: 1.09,
    w: 3.74,
    h: 0.22,
    align: 'center',
    fontFace: 'Calibri',
    fontSize: 9,
    bold: true,
    color: C_EMERALD
  });
  addFittedDiagram(s6, diagrams.ui_storefront, 5.71, 1.32, 3.78, 1.64);

  // Right Bottom: Seller Portal & Admin Console UI Snapshot
  s6.addShape(pptx.ShapeType.roundRect, {
    x: 5.65,
    y: 3.1,
    w: 3.9,
    h: 1.98,
    rectRadius: 0.08,
    fill: { color: C_WHITE },
    line: { color: C_BORDER, width: 1 }
  });
  s6.addText('Seller Merchant & Super Admin Dashboard UI', {
    x: 5.73,
    y: 3.15,
    w: 3.74,
    h: 0.22,
    align: 'center',
    fontFace: 'Calibri',
    fontSize: 9,
    bold: true,
    color: C_INDIGO
  });
  addFittedDiagram(s6, diagrams.ui_seller_admin, 5.71, 3.38, 3.78, 1.64);
  s6.addNotes('Explain the tech stack on the left while pointing to the live Customer Storefront and Seller/Admin Portal interfaces on the right.');

  // ============================================================================
  // SLIDE 7: DATABASE DESIGN & RELATIONAL ER MODEL (22 TABLES)
  // ============================================================================
  const s7 = pptx.addSlide();
  addSlideChrome(s7, pptx, 7, TOTAL_SLIDES, 'Chapter 6 · Data Engineering', '22-Table Relational Schema & ER Diagram', meta);

  s7.addShape(pptx.ShapeType.roundRect, {
    x: 0.45,
    y: 1.05,
    w: 3.15,
    h: 4.0,
    rectRadius: 0.08,
    fill: { color: C_INDIGO_SOFT },
    line: { color: 'C7D2FE', width: 1 }
  });
  s7.addText('Key Schema Highlights (3NF)', {
    x: 0.62,
    y: 1.16,
    w: 2.8,
    h: 0.28,
    fontFace: 'Calibri',
    fontSize: 12.5,
    bold: true,
    color: C_INDIGO
  });

  const dbNotes = [
    {
      t: '22 Normalized Tables:',
      b: 'Users, Seller_Profile, Categories, Products, Product_Inventory, Orders, Order_Items, Payments, Payment_Logs, Shipments, Coupons, Notifications.',
      c: C_NAVY,
      y: 1.52,
      h: 1.1
    },
    {
      t: 'Multi-Vendor Isolation:',
      b: 'Order_Items preserves seller_id FK so each vendor dispatches only their items.',
      c: C_EMERALD,
      y: 2.84,
      h: 0.72
    },
    {
      t: 'Immutable Audit Trail:',
      b: 'Payment_Logs records every server-side TrxID verification & refund status.',
      c: C_ROSE,
      y: 3.82,
      h: 0.72
    }
  ];
  dbNotes.forEach(item => {
    s7.addText(item.t, {
      x: 0.62,
      y: item.y,
      w: 2.82,
      h: 0.22,
      fontFace: 'Calibri',
      fontSize: 10.2,
      bold: true,
      color: item.c
    });
    s7.addText(item.b, {
      x: 0.62,
      y: item.y + 0.22,
      w: 2.82,
      h: item.h,
      fontFace: 'Calibri',
      fontSize: 9.6,
      color: C_SLATE_DARK,
      valign: 'top'
    });
  });

  s7.addShape(pptx.ShapeType.roundRect, {
    x: 3.75,
    y: 1.05,
    w: 5.8,
    h: 4.0,
    rectRadius: 0.08,
    fill: { color: C_WHITE },
    line: { color: C_BORDER, width: 1 }
  });
  addFittedDiagram(s7, diagrams.er, 3.82, 1.12, 5.66, 3.86);
  s7.addNotes('Viva tip: Mention why seller_id is placed inside Order_Items instead of only inside Orders—this enables multi-vendor checkout in one cart.');

  // ============================================================================
  // SLIDE 8: PAYMENT GATEWAY & REAL-TIME MARKETING DIAGRAMS
  // ============================================================================
  const s8 = pptx.addSlide();
  addSlideChrome(s8, pptx, 8, TOTAL_SLIDES, 'Chapters 9 & 10 · Core Engines', 'bKash/Nagad Payment Security & Real-Time Marketing', meta);

  s8.addShape(pptx.ShapeType.roundRect, {
    x: 0.45,
    y: 1.05,
    w: 4.42,
    h: 4.0,
    rectRadius: 0.08,
    fill: { color: C_WHITE },
    line: { color: C_BORDER, width: 1 }
  });
  s8.addText('bKash & Nagad Server-to-Server Verification', {
    x: 0.58,
    y: 1.12,
    w: 4.16,
    h: 0.28,
    fontFace: 'Calibri',
    fontSize: 10.5,
    bold: true,
    color: C_ROSE,
    align: 'center'
  });
  addFittedDiagram(s8, diagrams.payment, 0.53, 1.42, 4.26, 3.05);
  s8.addText(
    'Backend executes /payment/execute directly with gateway API before confirming order (prevents browser tampering).',
    {
      x: 0.58,
      y: 4.52,
      w: 4.16,
      h: 0.46,
      fontFace: 'Calibri',
      fontSize: 9,
      color: C_SLATE_MUTED,
      align: 'center'
    }
  );

  s8.addShape(pptx.ShapeType.roundRect, {
    x: 5.13,
    y: 1.05,
    w: 4.42,
    h: 4.0,
    rectRadius: 0.08,
    fill: { color: C_WHITE },
    line: { color: C_BORDER, width: 1 }
  });
  s8.addText('Real-Time Marketing & WebSocket Broadcasts', {
    x: 5.26,
    y: 1.12,
    w: 4.16,
    h: 0.28,
    fontFace: 'Calibri',
    fontSize: 10.5,
    bold: true,
    color: C_EMERALD,
    align: 'center'
  });
  addFittedDiagram(s8, diagrams.marketing, 5.21, 1.42, 4.26, 3.05);
  s8.addText(
    'Flash deal timers, dynamic promo coupons (DESHI20, BKASH10), trending tags & instant low-stock warnings.',
    {
      x: 5.26,
      y: 4.52,
      w: 4.16,
      h: 0.46,
      fontFace: 'Calibri',
      fontSize: 9,
      color: C_SLATE_MUTED,
      align: 'center'
    }
  );
  s8.addNotes('Explain how server-to-server payment execution stops client-side success URL spoofing, and how WebSockets broadcast real-time flash drops.');

  // ============================================================================
  // SLIDE 9: LIVE CHECKOUT / DELIVERY UI WORKFLOWS & QA AUDITS
  // ============================================================================
  const s9 = pptx.addSlide();
  addSlideChrome(s9, pptx, 9, TOTAL_SLIDES, 'Chapter 11 · Live Workflow & QA', 'Live Transaction UI, Logistics & QA Audits', meta);

  const kpis = [
    { val: '100%', label: 'Server TrxID Audit', color: C_EMERALD },
    { val: '0 Units', label: 'Flash-Sale Oversell', color: C_INDIGO },
    { val: '< 120ms', label: 'Median API Latency', color: C_AMBER },
    { val: '22 Tables', label: '3NF Schema Verified', color: C_ROSE }
  ];

  kpis.forEach((k, idx) => {
    const xPos = 0.45 + idx * 2.32;
    s9.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 1.0,
      w: 2.18,
      h: 0.74,
      rectRadius: 0.08,
      fill: { color: C_SLATE_LIGHT },
      line: { color: C_BORDER, width: 1 }
    });
    s9.addText(k.val, {
      x: xPos,
      y: 1.04,
      w: 2.18,
      h: 0.36,
      align: 'center',
      fontFace: 'Calibri',
      fontSize: 16,
      bold: true,
      color: k.color
    });
    s9.addText(k.label, {
      x: xPos,
      y: 1.42,
      w: 2.18,
      h: 0.26,
      align: 'center',
      fontFace: 'Calibri',
      fontSize: 9,
      bold: true,
      color: C_SLATE_MUTED
    });
  });

  const qaRows: PptxGenJS.TableRow[] = [
    [
      { text: 'Suite', options: { bold: true, color: C_WHITE, fill: { color: C_NAVY } } },
      { text: 'Focus Area', options: { bold: true, color: C_WHITE, fill: { color: C_NAVY } } },
      { text: 'Verified Result', options: { bold: true, color: C_WHITE, fill: { color: C_NAVY } } },
      { text: 'Status', options: { bold: true, color: C_WHITE, fill: { color: C_NAVY }, align: 'center' } }
    ],
    [
      { text: 'TC-01' },
      { text: '4-Role RBAC' },
      { text: 'Admin/Seller routes isolated cleanly' },
      { text: 'PASS', options: { bold: true, color: C_EMERALD, align: 'center', fill: { color: C_EMERALD_SOFT } } }
    ],
    [
      { text: 'TC-02' },
      { text: 'Concurrency' },
      { text: '100 threads lock stock atomically' },
      { text: 'PASS', options: { bold: true, color: C_EMERALD, align: 'center', fill: { color: C_EMERALD_SOFT } } }
    ],
    [
      { text: 'TC-03' },
      { text: 'bKash/Nagad' },
      { text: 'Duplicate webhooks rejected safely' },
      { text: 'PASS', options: { bold: true, color: C_EMERALD, align: 'center', fill: { color: C_EMERALD_SOFT } } }
    ],
    [
      { text: 'TC-04' },
      { text: 'Order Split' },
      { text: '1 cart routes separate seller orders' },
      { text: 'PASS', options: { bold: true, color: C_EMERALD, align: 'center', fill: { color: C_EMERALD_SOFT } } }
    ],
    [
      { text: 'TC-05' },
      { text: 'TS & Build' },
      { text: 'Zero strict tsc/Vite bundle errors' },
      { text: 'PASS', options: { bold: true, color: C_EMERALD, align: 'center', fill: { color: C_EMERALD_SOFT } } }
    ]
  ];

  s9.addTable(qaRows, {
    x: 0.45,
    y: 1.86,
    w: 4.85,
    rowH: 0.52,
    colW: [0.65, 1.05, 2.45, 0.7],
    fontFace: 'Calibri',
    fontSize: 8.6,
    border: { type: 'solid', pt: 0.75, color: C_BORDER },
    fill: { color: C_WHITE },
    color: C_SLATE_DARK,
    valign: 'middle'
  });

  // Right Top: Live Cart -> bKash/Nagad -> Order Tracking UI Snapshot
  s9.addShape(pptx.ShapeType.roundRect, {
    x: 5.45,
    y: 1.86,
    w: 4.1,
    h: 1.58,
    rectRadius: 0.08,
    fill: { color: C_WHITE },
    line: { color: C_BORDER, width: 1 }
  });
  s9.addText('Live Checkout UI: Cart ➔ bKash/Nagad ➔ Order Tracking', {
    x: 5.52,
    y: 1.9,
    w: 3.96,
    h: 0.2,
    align: 'center',
    fontFace: 'Calibri',
    fontSize: 8.5,
    bold: true,
    color: C_ROSE
  });
  addFittedDiagram(s9, diagrams.ui_payment_tracking, 5.51, 2.12, 3.98, 1.28);

  // Right Bottom: Delivery Hub & Notifications UI Snapshot
  s9.addShape(pptx.ShapeType.roundRect, {
    x: 5.45,
    y: 3.52,
    w: 4.1,
    h: 1.58,
    rectRadius: 0.08,
    fill: { color: C_WHITE },
    line: { color: C_BORDER, width: 1 }
  });
  s9.addText('Delivery Logistics Console & Real-Time Alerts Feed', {
    x: 5.52,
    y: 3.56,
    w: 3.96,
    h: 0.2,
    align: 'center',
    fontFace: 'Calibri',
    fontSize: 8.5,
    bold: true,
    color: C_EMERALD
  });
  addFittedDiagram(s9, diagrams.ui_delivery_alerts, 5.51, 3.78, 3.98, 1.28);
  s9.addNotes('Present our test suite results alongside live interactive snapshots of the bKash/Nagad checkout modal, 5-stage tracking, Delivery Hub, and real-time notifications.');

  // ============================================================================
  // SLIDE 10: CONCLUSION, FUTURE SCOPE & Q&A
  // ============================================================================
  const s10 = pptx.addSlide();
  addSlideChrome(s10, pptx, 10, TOTAL_SLIDES, 'Chapter 12 · Conclusion & Defense', 'Achievements, Future Scope & Viva Q&A', meta);

  s10.addShape(pptx.ShapeType.roundRect, {
    x: 0.45,
    y: 1.05,
    w: 4.4,
    h: 2.65,
    rectRadius: 0.08,
    fill: { color: C_EMERALD_SOFT },
    line: { color: 'A7F3D0', width: 1 }
  });
  s10.addText('Key Engineering Achievements', {
    x: 0.65,
    y: 1.18,
    w: 4.0,
    h: 0.3,
    fontFace: 'Calibri',
    fontSize: 12.5,
    bold: true,
    color: C_EMERALD
  });
  s10.addText(
    '• Delivered full multi-vendor marketplace across 8 categories\n' +
      '• Implemented Customer, Seller, Admin & Delivery Manager views\n' +
      '• Engineered bKash, Nagad & COD flows with TrxID auditing\n' +
      '• Designed 22-table 3NF schema & real-time alert architecture',
    {
      x: 0.65,
      y: 1.55,
      w: 4.0,
      h: 2.0,
      fontFace: 'Calibri',
      fontSize: 10.5,
      color: C_SLATE_DARK
    }
  );

  s10.addShape(pptx.ShapeType.roundRect, {
    x: 5.15,
    y: 1.05,
    w: 4.4,
    h: 2.65,
    rectRadius: 0.08,
    fill: { color: C_INDIGO_SOFT },
    line: { color: 'C7D2FE', width: 1 }
  });
  s10.addText('Future Enhancement Roadmap', {
    x: 5.35,
    y: 1.18,
    w: 4.0,
    h: 0.3,
    fontFace: 'Calibri',
    fontSize: 12.5,
    bold: true,
    color: C_INDIGO
  });
  s10.addText(
    '• Personalized AI Collaborative Filtering Recommendations\n' +
      '• Native Android & iOS Apps (Flutter / React Native)\n' +
      '• Live Pathao, Steadfast & RedX Courier API Webhooks\n' +
      '• Voice-Assisted Bengali Product Search & SSLCommerz Payouts',
    {
      x: 5.35,
      y: 1.55,
      w: 4.0,
      h: 2.0,
      fontFace: 'Calibri',
      fontSize: 10.5,
      color: C_SLATE_DARK
    }
  );

  s10.addShape(pptx.ShapeType.roundRect, {
    x: 0.45,
    y: 3.9,
    w: 9.1,
    h: 1.15,
    rectRadius: 0.1,
    fill: { color: C_NAVY }
  });
  s10.addText('Thank You! — Open for Questions & Live Demonstration', {
    x: 0.65,
    y: 4.02,
    w: 8.7,
    h: 0.45,
    align: 'center',
    fontFace: 'Calibri',
    fontSize: 19,
    bold: true,
    color: C_AMBER_BRIGHT
  });
  s10.addText(
    `${meta.studentName} (${meta.studentId})  |  Supervised by ${meta.supervisorName}  |  ${meta.universityName}`,
    {
      x: 0.65,
      y: 4.52,
      w: 8.7,
      h: 0.35,
      align: 'center',
      fontFace: 'Calibri',
      fontSize: 10.5,
      color: 'E2E8F0'
    }
  );
  s10.addNotes('Thank the examination committee and invite questions or request to proceed with the live browser demonstration.');

  // Generate PPTX ArrayBuffer, then sanitize OPC Content_Types & unique slide element IDs
  const rawBuffer = (await pptx.write({ outputType: 'arraybuffer', compression: false })) as ArrayBuffer;
  const sanitizedBytes = await sanitizePptxPackage(rawBuffer);

  const pptxBlob = new Blob([sanitizedBytes], {
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  });

  const url = URL.createObjectURL(pptxBlob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'MarketingHub_CSE_Defense_Presentation.pptx';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    if (a.parentNode) a.parentNode.removeChild(a);
  }, 10000);
}

/**
 * Repairs two known pptxgenjs v4.0.1 OOXML packaging quirks that cause strict
 * Microsoft PowerPoint (Desktop / Mobile / Office 365) to refuse opening files:
 *  1. Removes phantom <Override PartName="/ppt/slideMasters/slideMaster2..N.xml"/> entries
 *     in [Content_Types].xml that do not correspond to files in the ZIP archive.
 *  2. Re-indexes duplicate <p:cNvPr id="..."> attributes on slides containing tables.
 *  3. Strips empty folder entries and writes a DOS/Windows-compatible DEFLATE archive.
 */
async function sanitizePptxPackage(rawBuffer: ArrayBuffer): Promise<Uint8Array<ArrayBuffer>> {
  const srcZip = await JSZip.loadAsync(rawBuffer);
  const cleanZip = new JSZip();

  const fileNames = new Set<string>();
  srcZip.forEach((relativePath, file) => {
    if (!file.dir && !relativePath.endsWith('/')) {
      fileNames.add(relativePath);
    }
  });

  for (const name of fileNames) {
    const file = srcZip.file(name);
    if (!file) continue;

    if (name === '[Content_Types].xml') {
      let xml = await file.async('string');
      xml = xml.replace(/<Override\b[^>]*PartName="([^"]+)"[^>]*\/?>/gi, (match, partName: string) => {
        const normalized = partName.replace(/^\/+/, '');
        return fileNames.has(normalized) ? match : '';
      });
      cleanZip.file(name, xml, { createFolders: false });
    } else if (
      (name.startsWith('ppt/slides/slide') || name.startsWith('ppt/notesSlides/notesSlide')) &&
      name.endsWith('.xml')
    ) {
      let xml = await file.async('string');
      let nextId = 1;
      xml = xml.replace(/<p:cNvPr\b([^>]*?)\bid="[^"]*"/g, (_match, attrsBeforeId: string) => {
        return `<p:cNvPr${attrsBeforeId}id="${nextId++}"`;
      });
      cleanZip.file(name, xml, { createFolders: false });
    } else {
      const bin = await file.async('uint8array');
      cleanZip.file(name, bin, { createFolders: false });
    }
  }

  const outBytes = await cleanZip.generateAsync({
    type: 'uint8array',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
    platform: 'DOS'
  });

  // Ensure backing ArrayBuffer is a standard ArrayBuffer for Blob constructor compatibility
  return new Uint8Array(outBytes);
}

