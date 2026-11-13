import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  Header,
  HeadingLevel,
  ImageRun,
  Packer,
  PageBreak,
  PageNumber,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType
} from 'docx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  ABBREVIATIONS,
  DiagramId,
  LIST_OF_FIGURES,
  LIST_OF_TABLES,
  THESIS_CHAPTERS,
  THESIS_PROJECT_TITLE,
  THESIS_REFERENCES,
  ThesisMetadata,
  TOC_ENTRIES
} from '../data/thesisContent';
import {
  ActivityDiagram,
  DataFlowDiagram,
  ERDiagram,
  PaymentSequenceDiagram,
  RealTimeMarketingDiagram,
  SystemArchitectureDiagram,
  UIDeliveryAlertsSnapshot,
  UIPaymentTrackingSnapshot,
  UISellerAdminSnapshot,
  UIStorefrontSnapshot,
  UseCaseDiagram
} from '../components/ReportDiagrams';

export interface RasterizedDiagram {
  dataUrl: string;
  bytes: Uint8Array;
  width: number;
  height: number;
}

const DIAGRAM_IDS: DiagramId[] = [
  'arch',
  'usecase',
  'dfd',
  'activity',
  'er',
  'payment',
  'marketing',
  'ui_storefront',
  'ui_seller_admin',
  'ui_payment_tracking',
  'ui_delivery_alerts'
];

/**
 * Ensures all vector SVG diagrams & UI workflow snapshots are mounted (temporarily offscreen if needed),
 * then converts each SVG to a crisp 2x high-DPI PNG for Word (.docx), PDF (.pdf), & PowerPoint (.pptx) embedding.
 */
export async function rasterizeAllDiagrams(): Promise<Record<DiagramId, RasterizedDiagram>> {
  let tempContainer: HTMLDivElement | null = null;
  let root: ReturnType<typeof createRoot> | null = null;

  const missingAny = DIAGRAM_IDS.some(id => !document.querySelector(`svg[data-diagram-id="${id}"]`));

  if (missingAny) {
    tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.left = '-99999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '900px';
    tempContainer.style.opacity = '0';
    tempContainer.style.pointerEvents = 'none';
    document.body.appendChild(tempContainer);

    root = createRoot(tempContainer);
    root.render(
      <div>
        <SystemArchitectureDiagram />
        <UseCaseDiagram />
        <DataFlowDiagram />
        <ActivityDiagram />
        <ERDiagram />
        <PaymentSequenceDiagram />
        <RealTimeMarketingDiagram />
        <UIStorefrontSnapshot />
        <UISellerAdminSnapshot />
        <UIPaymentTrackingSnapshot />
        <UIDeliveryAlertsSnapshot />
      </div>
    );

    // Wait for React 19 mount to flush all SVG DOM nodes (up to 600ms)
    for (let attempt = 0; attempt < 20; attempt++) {
      const allMounted = DIAGRAM_IDS.every(id => document.querySelector(`svg[data-diagram-id="${id}"]`));
      if (allMounted) break;
      await new Promise(resolve => setTimeout(resolve, 30));
    }
  }

  const results = {} as Record<DiagramId, RasterizedDiagram>;

  try {
    for (const id of DIAGRAM_IDS) {
      const svgEl = document.querySelector(`svg[data-diagram-id="${id}"]`) as SVGSVGElement | null;
      if (!svgEl) continue;

      const viewBoxAttr = svgEl.getAttribute('viewBox') || '0 0 820 450';
      const parts = viewBoxAttr.split(/\s+/).map(Number);
      const vbWidth = parts[2] || 820;
      const vbHeight = parts[3] || 450;

      const cloned = svgEl.cloneNode(true) as SVGSVGElement;
      const targetW = vbWidth * 2;
      const targetH = vbHeight * 2;
      cloned.setAttribute('width', String(targetW));
      cloned.setAttribute('height', String(targetH));
      cloned.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

      const svgXml = new XMLSerializer().serializeToString(cloned);
      const svgBlob = new Blob([svgXml], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      try {
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.onerror = err => reject(err);
          image.src = url;
        });

        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, targetW, targetH);
          ctx.drawImage(img, 0, 0, targetW, targetH);
        }

        const dataUrl = canvas.toDataURL('image/png', 1.0);
        if (!dataUrl.startsWith('data:image/png;base64,')) continue;
        const base64 = dataUrl.split(',')[1] || '';
        if (!base64) continue;
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }

        if (bytes.length > 100) {
          results[id] = { dataUrl, bytes, width: vbWidth, height: vbHeight };
        }
      } catch {
        // Skip diagram if browser blocks image decoding rather than aborting document export
      } finally {
        URL.revokeObjectURL(url);
      }
    }
  } finally {
    if (root) root.unmount();
    if (tempContainer && tempContainer.parentNode) {
      tempContainer.parentNode.removeChild(tempContainer);
    }
  }

  return results;
}

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/**
 * Generates and downloads a formatted Microsoft Word (.docx) thesis report
 * containing the Cover Page, Student Academic Certificate, 12 Chapters,
 * 7 Digital Architecture/UML Diagrams, and References (no product photos, no source inventory page).
 */
export async function downloadReportDocx(meta: ThesisMetadata): Promise<void> {
  const diagrams = await rasterizeAllDiagrams();
  const children: (Paragraph | Table)[] = [];

  const makeHeading = (text: string, level: (typeof HeadingLevel)[keyof typeof HeadingLevel], spacingBefore = 240) =>
    new Paragraph({
      text,
      heading: level,
      spacing: { before: spacingBefore, after: 120 }
    });

  const makePara = (text: string, align: (typeof AlignmentType)[keyof typeof AlignmentType] = AlignmentType.JUSTIFIED) =>
    new Paragraph({
      alignment: align,
      spacing: { after: 160, line: 340 },
      children: [new TextRun({ text, font: 'Georgia', size: 22, color: '1E293B' })]
    });

  const makeTable = (headers: string[], rows: string[][]): Table => {
    const borderSpec = { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' };
    const tableBorders = {
      top: borderSpec,
      bottom: borderSpec,
      left: borderSpec,
      right: borderSpec,
      insideHorizontal: borderSpec,
      insideVertical: borderSpec
    };

    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: tableBorders,
      rows: [
        new TableRow({
          tableHeader: true,
          children: headers.map(
            h =>
              new TableCell({
                shading: { type: ShadingType.CLEAR, fill: '0F172A' },
                margins: { top: 80, bottom: 80, left: 100, right: 100 },
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: h, bold: true, color: 'FFFFFF', font: 'Calibri', size: 19 })]
                  })
                ]
              })
          )
        }),
        ...rows.map(
          (row, rIdx) =>
            new TableRow({
              children: row.map(
                cell =>
                  new TableCell({
                    shading: rIdx % 2 === 1 ? { type: ShadingType.CLEAR, fill: 'F8FAFC' } : undefined,
                    margins: { top: 70, bottom: 70, left: 100, right: 100 },
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: cell, font: 'Calibri', size: 18, color: '0F172A' })]
                      })
                    ]
                  })
              )
            })
        )
      ]
    });
  };

  // ---------------- PAGE 1: COVER PAGE ----------------
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 120 },
      children: [new TextRun({ text: meta.universityName.toUpperCase(), bold: true, size: 26, color: '065F46', font: 'Calibri' })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
      children: [new TextRun({ text: 'FINAL YEAR B.SC. ENGINEERING THESIS & CAPSTONE PROJECT REPORT', bold: true, size: 20, color: '64748B', font: 'Calibri' })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 180 },
      children: [new TextRun({ text: 'PROJECT TITLE', bold: true, size: 20, color: '065F46', font: 'Calibri' })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 500 },
      border: {
        top: { style: BorderStyle.SINGLE, size: 12, color: '0F172A' },
        bottom: { style: BorderStyle.SINGLE, size: 12, color: '0F172A' }
      },
      children: [new TextRun({ text: THESIS_PROJECT_TITLE, bold: true, size: 32, color: '0F172A', font: 'Calibri' })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 700 },
      children: [
        new TextRun({ text: 'A formal project report submitted in partial fulfillment of the requirements for the degree of ', italics: true, size: 22, font: 'Georgia' }),
        new TextRun({ text: meta.degreeName, bold: true, size: 22, font: 'Georgia' })
      ]
    }),
    makeTable(
      ['Submitted By', 'Supervised By'],
      [
        [
          `${meta.studentName}\nStudent ID: ${meta.studentId}\nSession: ${meta.batchSession}\nDepartment of Computer Science & Engineering`,
          `${meta.supervisorName}\n${meta.supervisorTitle}\n${meta.universityName}`
        ]
      ]
    ),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 900, after: 80 },
      children: [new TextRun({ text: 'DHAKA, BANGLADESH', bold: true, size: 22, font: 'Calibri' })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: meta.submissionDate, size: 22, color: '475569', font: 'Calibri' })]
    }),
    new Paragraph({ children: [new PageBreak()] })
  );

  // ---------------- PAGE 2: STUDENT ACADEMIC CERTIFICATE ----------------
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 100 },
      children: [new TextRun({ text: meta.universityName.toUpperCase(), bold: true, size: 22, color: '065F46', font: 'Calibri' })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new TextRun({ text: 'STUDENT ACADEMIC CERTIFICATE', bold: true, size: 34, color: '0F172A', font: 'Calibri' })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 450 },
      border: { bottom: { style: BorderStyle.DOUBLE, size: 12, color: '065F46' } },
      children: [new TextRun({ text: 'CERTIFICATE OF ORIGINAL PROJECT COMPLETION & SUPERVISOR APPROVAL', bold: true, size: 18, color: '64748B', font: 'Calibri' })]
    }),
    makePara(
      `This is to certify that the final year capstone project and thesis report entitled "${THESIS_PROJECT_TITLE}" has been bonafide carried out and submitted by ${meta.studentName} (Student ID: ${meta.studentId}, Session: ${meta.batchSession}) in partial fulfillment of the requirements for the award of the degree of ${meta.degreeName}.`
    ),
    makePara(
      'The candidate has successfully designed, engineered, tested, and documented the complete multi-vendor e-commerce platform comprising Customer, Seller, Super Administrator, and Delivery Manager dashboards, twenty-two (22) normalized relational database tables, real-time flash marketing workflows, multi-category retail support, and sandboxed Bangladeshi Mobile Financial Services (bKash, Nagad, and Cash on Delivery) checkout verification.'
    ),
    makePara(
      'To the best of our knowledge, the software implementation, digital architectural diagrams, and technical documentation presented in this report represent original engineering work executed under academic supervision and have not been submitted previously for any other degree or diploma.'
    ),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 240, after: 700 },
      shading: { type: ShadingType.CLEAR, fill: 'ECFDF5' },
      children: [new TextRun({ text: `ACADEMIC VERIFICATION STATUS: APPROVED (${meta.submissionDate})`, bold: true, size: 20, color: '065F46', font: 'Calibri' })]
    }),
    makeTable(
      ['Project Supervisor', 'Head of Department', 'External Examiner'],
      [
        [
          `\n\n___________________________\n${meta.supervisorName}\n${meta.supervisorTitle}`,
          `\n\n___________________________\n${meta.hodName}\nChairman, Dept. of CSE`,
          '\n\n___________________________\nBoard of Examiners (CSE)\nViva Voce Evaluator'
        ]
      ]
    ),
    new Paragraph({ children: [new PageBreak()] })
  );

  // ---------------- PAGE 3: DECLARATION ----------------
  children.push(
    makeHeading('STUDENT DECLARATION', HeadingLevel.HEADING_1),
    makePara(
      `I, ${meta.studentName} (Student ID: ${meta.studentId}, Session: ${meta.batchSession}), hereby solemnly declare that the thesis report and software engineering artifact titled "${THESIS_PROJECT_TITLE}" submitted to ${meta.universityName} is the genuine outcome of my own independent research, system architecture modeling, and full-stack software development conducted under the guidance of ${meta.supervisorName}.`
    ),
    makePara(
      'I further affirm that no portion of this project report, architectural diagrams, or codebase has been plagiarized or copied without appropriate scholarly attribution, nor has it been submitted previously to any university or examining institution for the conferral of any degree, diploma, or certificate.'
    ),
    new Paragraph({
      spacing: { before: 900 },
      alignment: AlignmentType.RIGHT,
      children: [new TextRun({ text: `___________________________\n${meta.studentName}\nID: ${meta.studentId}\nDate: ${meta.submissionDate}`, bold: true, font: 'Calibri', size: 22 })]
    }),
    new Paragraph({ children: [new PageBreak()] })
  );

  // ---------------- PAGE 4: DEDICATION & ACKNOWLEDGEMENT ----------------
  children.push(
    makeHeading('DEDICATION', HeadingLevel.HEADING_1),
    makePara(
      '"Dedicated to my beloved parents, whose unwavering prayers, sacrifices, and encouragement gave me the strength to reach this academic milestone; to my respected teachers who ignited my passion for computer science; and to every small Bangladeshi artisan, grocer, weaver, and local entrepreneur striving to thrive in the digital economy."',
      AlignmentType.CENTER
    ),
    makeHeading('ACKNOWLEDGEMENT', HeadingLevel.HEADING_1, 360),
    makePara('First and foremost, I express my deepest gratitude to Almighty Allah for granting me the health, patience, intellect, and perseverance required to design, implement, and document this final year engineering project successfully.'),
    makePara(`I am profoundly grateful to my respected thesis supervisor, ${meta.supervisorName} (${meta.supervisorTitle}), for invaluable technical mentorship, rigorous architectural reviews, guidance on multi-vendor database normalization, and continuous encouragement throughout every milestone of this project.`),
    makePara(`My sincere appreciation extends to ${meta.hodName}, Head of the Department of Computer Science & Engineering, and all faculty members of ${meta.universityName} for cultivating a stimulating academic environment.`),
    new Paragraph({ children: [new PageBreak()] })
  );

  // ---------------- PAGE 5: ABSTRACT ----------------
  children.push(
    makeHeading('ABSTRACT', HeadingLevel.HEADING_1),
    makePara('Rapid smartphone penetration and nationwide 4G adoption in Bangladesh have accelerated consumer demand for unified multi-vendor e-commerce ecosystems capable of connecting rural artisans, urban wholesalers, and domestic shoppers on a single trustworthy platform. However, conventional single-vendor storefronts often lack real-time promotional urgency, multi-seller cart partitioning, atomic stock concurrency safeguards, transparent logistics handoffs, and localized Mobile Financial Services (MFS) verification.'),
    makePara('This thesis presents the complete system analysis, architectural design, and full-stack implementation of MarketingHub Online Platform, a multi-vendor e-commerce and real-time marketing web application engineered specifically for the Bangladeshi retail ecosystem. The system supports four specialized operational dashboards controlled via Role-Based Access Control (RBAC): Customer Storefront, Seller Merchant Portal, Super Administrator Console, and Delivery Manager Logistics Hub, supplemented by an interactive CSE Academic Defense Hub.'),
    makePara('Implemented with React 19, TypeScript 7, Vite 8, and Tailwind CSS v4 on the frontend—paired with a 22-table normalized relational database blueprint, Django 5 / Django REST Framework (DRF) backend contracts, and Redis + Django Channels real-time WebSocket broadcasting—the platform executes second-by-second flash sale countdowns, threshold-validated promo coupons (DESHI20, BKASH10, FREESHIP), low-stock threshold alerts, automatic multi-vendor order splitting by seller_id, and interactive bKash, Nagad, and Cash on Delivery (COD) verification alongside full return and refund settlement workflows.'),
    makePara('Keywords: Multi-Vendor E-Commerce, Real-Time Marketing Engine, bKash & Nagad MFS Integration, React 19, TypeScript, Django REST Framework, PostgreSQL Concurrency Locking, Redis WebSockets, Role-Based Access Control (RBAC).', AlignmentType.LEFT),
    new Paragraph({ children: [new PageBreak()] })
  );

  // ---------------- PAGE 6: TOC, LIST OF FIGURES, TABLES, ABBREVIATIONS ----------------
  children.push(
    makeHeading('TABLE OF CONTENTS', HeadingLevel.HEADING_1),
    makeTable(['Section', 'Chapter & Topics Covered', 'Page'], TOC_ENTRIES.map(t => [t.ch, t.title, t.page])),
    makeHeading('LIST OF FIGURES (DIGITAL ARCHITECTURE & UML DIAGRAMS)', HeadingLevel.HEADING_2, 280),
    ...LIST_OF_FIGURES.map(f => makePara(`• ${f}`, AlignmentType.LEFT)),
    makeHeading('LIST OF TABLES', HeadingLevel.HEADING_2, 240),
    ...LIST_OF_TABLES.map(t => makePara(`• ${t}`, AlignmentType.LEFT)),
    new Paragraph({ children: [new PageBreak()] }),
    makeHeading('LIST OF ABBREVIATIONS & TECHNICAL ACRONYMS', HeadingLevel.HEADING_1),
    makeTable(['Acronym', 'Full Technical Term'], ABBREVIATIONS),
    new Paragraph({ children: [new PageBreak()] })
  );

  // ---------------- CHAPTERS 1 TO 12 ----------------
  THESIS_CHAPTERS.forEach((chapter, chIdx) => {
    if (chIdx > 0) {
      children.push(new Paragraph({ children: [new PageBreak()] }));
    }
    children.push(
      new Paragraph({
        spacing: { before: 100, after: 40 },
        children: [new TextRun({ text: `CHAPTER ${chapter.number}`, bold: true, size: 22, color: '065F46', font: 'Calibri' })]
      }),
      makeHeading(chapter.title, HeadingLevel.HEADING_1, 0)
    );

    for (const block of chapter.blocks) {
      if (block.type === 'pageBreak') {
        children.push(new Paragraph({ children: [new PageBreak()] }));
      } else if (block.type === 'subheading') {
        children.push(makeHeading(block.text, HeadingLevel.HEADING_2, 200));
      } else if (block.type === 'paragraph') {
        children.push(makePara(block.text));
      } else if (block.type === 'bullets') {
        for (const item of block.items) {
          children.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { after: 100, line: 320 },
              children: [
                ...(item.bold ? [new TextRun({ text: `${item.bold} `, bold: true, font: 'Georgia', size: 21 })] : []),
                new TextRun({ text: item.text, font: 'Georgia', size: 21 })
              ]
            })
          );
        }
      } else if (block.type === 'table') {
        children.push(
          new Paragraph({
            spacing: { before: 160, after: 80 },
            children: [new TextRun({ text: block.caption, bold: true, size: 20, font: 'Calibri', color: '334155' })]
          }),
          makeTable(block.headers, block.rows),
          new Paragraph({ spacing: { after: 140 }, children: [] })
        );
      } else if (block.type === 'code') {
        if (block.caption) {
          children.push(
            new Paragraph({
              spacing: { before: 140, after: 60 },
              children: [new TextRun({ text: block.caption, bold: true, size: 19, font: 'Calibri', color: '334155' })]
            })
          );
        }
        children.push(
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: '0F172A' },
                    margins: { top: 120, bottom: 120, left: 160, right: 160 },
                    children: block.code.split('\n').map(
                      line =>
                        new Paragraph({
                          spacing: { after: 20 },
                          children: [new TextRun({ text: line || ' ', font: 'Consolas', size: 17, color: '6EE7B7' })]
                        })
                    )
                  })
                ]
              })
            ]
          }),
          new Paragraph({ spacing: { after: 140 }, children: [] })
        );
      } else if (block.type === 'diagram') {
        const img = diagrams[block.id];
        if (img) {
          const maxWidth = 590;
          const scaledHeight = Math.round((img.height / img.width) * maxWidth);
          children.push(
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 160, after: 80 },
              children: [
                new ImageRun({
                  type: 'png',
                  data: img.bytes,
                  transformation: { width: maxWidth, height: scaledHeight }
                })
              ]
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
              children: [new TextRun({ text: block.caption, bold: true, italics: true, size: 19, font: 'Calibri', color: '334155' })]
            })
          );
        }
      }
    }
  });

  // ---------------- FINAL SECTION: REFERENCES ----------------
  children.push(
    new Paragraph({ children: [new PageBreak()] }),
    makeHeading('REFERENCES', HeadingLevel.HEADING_1),
    ...THESIS_REFERENCES.map(ref => makePara(ref, AlignmentType.LEFT))
  );

  const doc = new Document({
    creator: meta.studentName,
    title: THESIS_PROJECT_TITLE,
    description: 'CSE Final Year Project Thesis Report - MarketingHub Online Platform',
    sections: [
      {
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [new TextRun({ text: 'MarketingHub Online Platform — CSE Final Year Thesis Report', size: 16, color: '64748B', font: 'Calibri' })]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: `${meta.studentName} (${meta.studentId})   |   Page `, size: 16, color: '64748B', font: 'Calibri' }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 16, color: '0F172A', font: 'Calibri', bold: true })
                ]
              })
            ]
          })
        },
        children
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  triggerBlobDownload(blob, 'MarketingHub_Final_Year_Thesis_Report.docx');
}

/**
 * Normalizes Unicode glyphs unsupported by jsPDF's standard Helvetica/Times WinAnsi font encoding.
 */
function sanitizeForPdf(input: string): string {
  return input
    .replace(/৳/g, 'BDT ')
    .replace(/[➔→]/g, '->')
    .replace(/≥/g, '>=')
    .replace(/≤/g, '<=')
    .replace(/×/g, 'x')
    .replace(/·/g, '|')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[—–]/g, '--');
}

/**
 * Generates and downloads a standalone formatted A4 PDF (.pdf) directly,
 * complete with Cover Page, Student Academic Certificate, 12 Chapters,
 * all 7 crisp high-DPI Digital Architecture/UML diagrams, and References.
 */
export async function downloadReportPdf(meta: ThesisMetadata): Promise<void> {
  const diagrams = await rasterizeAllDiagrams();
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const pageW = doc.internal.pageSize.getWidth(); // 210mm
  const pageH = doc.internal.pageSize.getHeight(); // 297mm
  const marginX = 18;
  const maxW = pageW - marginX * 2;
  let cursorY = 22;

  const addNewPage = () => {
    doc.addPage();
    cursorY = 22;
  };

  const ensureSpace = (neededMm: number) => {
    if (cursorY + neededMm > pageH - 18) {
      addNewPage();
    }
  };

  const writeWrappedText = (text: string, fontSize: number, fontStyle: 'normal' | 'bold' | 'italic' = 'normal', fontFamily: 'times' | 'helvetica' | 'courier' = 'times', color: [number, number, number] = [30, 41, 59], lineH = 5.5, align: 'left' | 'center' | 'right' = 'left') => {
    doc.setFont(fontFamily, fontStyle);
    doc.setFontSize(fontSize);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(sanitizeForPdf(text), maxW) as string[];
    for (const line of lines) {
      ensureSpace(lineH + 2);
      const xPos = align === 'center' ? pageW / 2 : align === 'right' ? pageW - marginX : marginX;
      doc.text(line, xPos, cursorY, { align });
      cursorY += lineH;
    }
    cursorY += 2.5;
  };

  // ---------------- PAGE 1: COVER PAGE ----------------
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.8);
  doc.rect(12, 12, pageW - 24, pageH - 24);
  doc.setLineWidth(0.3);
  doc.rect(14, 14, pageW - 28, pageH - 28);

  cursorY = 36;
  writeWrappedText(meta.universityName.toUpperCase(), 13, 'bold', 'helvetica', [6, 95, 70], 6, 'center');
  writeWrappedText('FINAL YEAR B.SC. ENGINEERING THESIS & CAPSTONE PROJECT REPORT', 9.5, 'bold', 'helvetica', [100, 116, 139], 5, 'center');

  cursorY = 78;
  doc.setDrawColor(203, 213, 225);
  doc.line(marginX, cursorY - 6, pageW - marginX, cursorY - 6);
  writeWrappedText('PROJECT TITLE', 9, 'bold', 'helvetica', [6, 95, 70], 5, 'center');
  writeWrappedText(THESIS_PROJECT_TITLE, 16, 'bold', 'helvetica', [15, 23, 42], 7.5, 'center');
  doc.line(marginX, cursorY + 2, pageW - marginX, cursorY + 2);

  cursorY += 12;
  writeWrappedText(`A formal thesis report submitted in partial fulfillment of the requirements for the award of the degree of ${meta.degreeName}.`, 11, 'italic', 'times', [51, 65, 85], 5.5, 'center');

  cursorY = 170;
  autoTable(doc, {
    startY: cursorY,
    margin: { left: 22, right: 22 },
    head: [['Submitted By', 'Supervised By']],
    body: [[
      sanitizeForPdf(`${meta.studentName}\nStudent ID: ${meta.studentId}\nSession: ${meta.batchSession}\nDepartment of CSE`),
      sanitizeForPdf(`${meta.supervisorName}\n${meta.supervisorTitle}\n${meta.universityName}`)
    ]],
    theme: 'grid',
    headStyles: { fillColor: [6, 95, 70], textColor: 255, fontSize: 10 },
    bodyStyles: { fontSize: 10, cellPadding: 5 }
  });

  cursorY = 258;
  writeWrappedText('DHAKA, BANGLADESH', 11, 'bold', 'helvetica', [15, 23, 42], 5, 'center');
  writeWrappedText(meta.submissionDate, 10.5, 'normal', 'helvetica', [71, 85, 105], 5, 'center');

  // ---------------- PAGE 2: STUDENT ACADEMIC CERTIFICATE ----------------
  addNewPage();
  doc.setDrawColor(6, 95, 70);
  doc.setLineWidth(1.0);
  doc.rect(12, 12, pageW - 24, pageH - 24);
  doc.setLineWidth(0.35);
  doc.rect(14.5, 14.5, pageW - 29, pageH - 29);

  cursorY = 34;
  writeWrappedText(meta.universityName.toUpperCase(), 10.5, 'bold', 'helvetica', [6, 95, 70], 5, 'center');
  writeWrappedText('STUDENT ACADEMIC CERTIFICATE', 18, 'bold', 'helvetica', [15, 23, 42], 8, 'center');
  writeWrappedText('Certificate of Original Project Completion & Supervisor Approval', 10, 'bold', 'helvetica', [100, 116, 139], 5, 'center');
  doc.setDrawColor(6, 95, 70);
  doc.line(30, cursorY + 2, pageW - 30, cursorY + 2);
  cursorY += 16;

  writeWrappedText(
    `This is to certify that the final year capstone project and thesis report entitled "${THESIS_PROJECT_TITLE}" has been bonafide carried out and submitted by ${meta.studentName} (Student ID: ${meta.studentId}, Session: ${meta.batchSession}) in partial fulfillment of the requirements for the award of the degree of ${meta.degreeName}.`,
    11.5, 'normal', 'times', [30, 41, 59], 6.2
  );
  cursorY += 3;
  writeWrappedText(
    'The candidate has successfully designed, engineered, tested, and documented the complete multi-vendor e-commerce platform comprising Customer, Seller, Super Administrator, and Delivery Manager dashboards, twenty-two (22) normalized relational database tables, real-time flash marketing workflows, multi-category retail support, and sandboxed Bangladeshi Mobile Financial Services (bKash, Nagad, and Cash on Delivery) checkout verification.',
    11.5, 'normal', 'times', [30, 41, 59], 6.2
  );
  cursorY += 3;
  writeWrappedText(
    'To the best of our knowledge, the software implementation, architectural diagrams, and technical documentation presented in this report represent original engineering work executed under academic supervision and have not been submitted previously for any other degree or diploma.',
    11.5, 'normal', 'times', [30, 41, 59], 6.2
  );

  cursorY += 8;
  doc.setFillColor(236, 253, 245);
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(marginX, cursorY, maxW, 14, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(6, 95, 70);
  doc.text(sanitizeForPdf(`ACADEMIC VERIFICATION STATUS: APPROVED FOR DEFENSE (${meta.submissionDate})`), pageW / 2, cursorY + 8.5, { align: 'center' });

  cursorY = 232;
  const sigW = (maxW - 16) / 3;
  const sigLabels = [
    [meta.supervisorName, meta.supervisorTitle, 'PROJECT SUPERVISOR'],
    [meta.hodName, 'Chairman, Dept. of CSE', 'HEAD OF DEPARTMENT'],
    ['External Examiner', 'Board of Examiners (CSE)', 'VIVA VOCE EVALUATOR']
  ];
  sigLabels.forEach((sig, i) => {
    const sx = marginX + i * (sigW + 8);
    doc.setDrawColor(15, 23, 42);
    doc.line(sx, cursorY, sx + sigW, cursorY);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(sanitizeForPdf(sig[0]), sx + sigW / 2, cursorY + 5, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(sanitizeForPdf(sig[1]), sx + sigW / 2, cursorY + 10, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(6, 95, 70);
    doc.text(sig[2], sx + sigW / 2, cursorY + 15, { align: 'center' });
  });

  // ---------------- PAGE 3: DECLARATION ----------------
  addNewPage();
  writeWrappedText('STUDENT DECLARATION', 14, 'bold', 'helvetica', [15, 23, 42], 7);
  doc.line(marginX, cursorY - 2, pageW - marginX, cursorY - 2);
  cursorY += 6;
  writeWrappedText(
    `I, ${meta.studentName} (Student ID: ${meta.studentId}, Session: ${meta.batchSession}), hereby solemnly declare that the thesis report and software engineering artifact titled "${THESIS_PROJECT_TITLE}" submitted to ${meta.universityName} is the genuine outcome of my own independent research, system architecture modeling, and full-stack software development conducted under the guidance of ${meta.supervisorName}.`,
    11.5, 'normal', 'times', [30, 41, 59], 6.2
  );
  cursorY += 3;
  writeWrappedText(
    'I further affirm that no portion of this project report, architectural diagrams, or codebase has been plagiarized or copied without appropriate scholarly attribution, nor has it been submitted previously to any university or examining institution for the conferral of any degree, diploma, or certificate.',
    11.5, 'normal', 'times', [30, 41, 59], 6.2
  );
  cursorY = 230;
  doc.line(pageW - marginX - 55, cursorY, pageW - marginX, cursorY);
  writeWrappedText(`${meta.studentName} (ID: ${meta.studentId})`, 10, 'bold', 'helvetica', [15, 23, 42], 5, 'right');
  writeWrappedText(`Submission Date: ${meta.submissionDate}`, 9.5, 'normal', 'helvetica', [71, 85, 105], 5, 'right');

  // ---------------- PAGE 4: DEDICATION & ACKNOWLEDGEMENT ----------------
  addNewPage();
  writeWrappedText('DEDICATION', 14, 'bold', 'helvetica', [15, 23, 42], 7);
  doc.line(marginX, cursorY - 2, pageW - marginX, cursorY - 2);
  cursorY += 6;
  writeWrappedText(
    '"Dedicated to my beloved parents, whose unwavering prayers, sacrifices, and encouragement gave me the strength to reach this academic milestone; to my respected teachers who ignited my passion for computer science; and to every small Bangladeshi artisan, grocer, weaver, and local entrepreneur striving to thrive in the digital economy."',
    11.5, 'italic', 'times', [51, 65, 85], 6.2, 'center'
  );
  cursorY += 10;
  writeWrappedText('ACKNOWLEDGEMENT', 14, 'bold', 'helvetica', [15, 23, 42], 7);
  doc.line(marginX, cursorY - 2, pageW - marginX, cursorY - 2);
  cursorY += 6;
  writeWrappedText('First and foremost, I express my deepest gratitude to Almighty Allah for granting me the health, patience, intellect, and perseverance required to design, implement, and document this final year engineering project successfully.', 11.5, 'normal', 'times', [30, 41, 59], 6);
  writeWrappedText(`I am profoundly grateful to my respected thesis supervisor, ${meta.supervisorName} (${meta.supervisorTitle}), for invaluable technical mentorship, rigorous architectural reviews, guidance on multi-vendor database normalization, and continuous encouragement throughout every milestone of this project.`, 11.5, 'normal', 'times', [30, 41, 59], 6);
  writeWrappedText(`My sincere appreciation extends to ${meta.hodName}, Head of the Department of Computer Science & Engineering, and all faculty members of ${meta.universityName} for cultivating a stimulating academic environment.`, 11.5, 'normal', 'times', [30, 41, 59], 6);

  // ---------------- PAGE 5: ABSTRACT ----------------
  addNewPage();
  writeWrappedText('ABSTRACT', 14, 'bold', 'helvetica', [15, 23, 42], 7);
  doc.line(marginX, cursorY - 2, pageW - marginX, cursorY - 2);
  cursorY += 6;
  writeWrappedText('Rapid smartphone penetration and nationwide 4G adoption in Bangladesh have accelerated consumer demand for unified multi-vendor e-commerce ecosystems capable of connecting rural artisans, urban wholesalers, and domestic shoppers on a single trustworthy platform. However, conventional single-vendor storefronts often lack real-time promotional urgency, multi-seller cart partitioning, atomic stock concurrency safeguards, transparent logistics handoffs, and localized Mobile Financial Services (MFS) verification.', 11.5, 'normal', 'times', [30, 41, 59], 6);
  writeWrappedText('This thesis presents the complete system analysis, architectural design, and full-stack implementation of MarketingHub Online Platform, a multi-vendor e-commerce and real-time marketing web application engineered specifically for the Bangladeshi retail ecosystem. The system supports four specialized operational dashboards controlled via Role-Based Access Control (RBAC): Customer Storefront, Seller Merchant Portal, Super Administrator Console, and Delivery Manager Logistics Hub, supplemented by an interactive CSE Academic Defense Hub.', 11.5, 'normal', 'times', [30, 41, 59], 6);
  writeWrappedText('Implemented with React 19, TypeScript 7, Vite 8, and Tailwind CSS v4 on the frontend—paired with a 22-table normalized relational database blueprint, Django 5 / Django REST Framework (DRF) backend contracts, and Redis + Django Channels real-time WebSocket broadcasting—the platform executes second-by-second flash sale countdowns, threshold-validated promo coupons (DESHI20, BKASH10, FREESHIP), low-stock threshold alerts, automatic multi-vendor order splitting by seller_id, and interactive bKash, Nagad, and Cash on Delivery (COD) verification alongside full return and refund settlement workflows.', 11.5, 'normal', 'times', [30, 41, 59], 6);
  writeWrappedText('Keywords: Multi-Vendor E-Commerce, Real-Time Marketing Engine, bKash & Nagad MFS Integration, React 19, TypeScript, Django REST Framework, PostgreSQL Concurrency Locking, Redis WebSockets, Role-Based Access Control (RBAC).', 10.5, 'bold', 'helvetica', [51, 65, 85], 5.2);

  // ---------------- PAGE 6: TOC & LISTS ----------------
  addNewPage();
  writeWrappedText('TABLE OF CONTENTS', 14, 'bold', 'helvetica', [15, 23, 42], 7);
  autoTable(doc, {
    startY: cursorY,
    margin: { left: marginX, right: marginX },
    head: [['Section', 'Chapter & Subtopics', 'Pages']],
    body: TOC_ENTRIES.map(r => [sanitizeForPdf(r.ch), sanitizeForPdf(r.title), sanitizeForPdf(r.page)]),
    theme: 'grid',
    headStyles: { fillColor: [15, 23, 42], fontSize: 8.5 },
    bodyStyles: { fontSize: 8, cellPadding: 2.2 },
    columnStyles: { 0: { cellWidth: 24, fontStyle: 'bold' }, 2: { cellWidth: 16, halign: 'right' } }
  });
  cursorY = ((doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY || cursorY) + 8;

  ensureSpace(45);
  writeWrappedText('LIST OF FIGURES (DIGITAL ARCHITECTURE & UML DIAGRAMS)', 11, 'bold', 'helvetica', [15, 23, 42], 5.5);
  for (const fig of LIST_OF_FIGURES) {
    writeWrappedText(`- ${fig}`, 9.5, 'normal', 'helvetica', [51, 65, 85], 4.5);
  }

  cursorY += 3;
  ensureSpace(45);
  writeWrappedText('LIST OF TABLES', 11, 'bold', 'helvetica', [15, 23, 42], 5.5);
  for (const tbl of LIST_OF_TABLES) {
    writeWrappedText(`- ${tbl}`, 9.5, 'normal', 'helvetica', [51, 65, 85], 4.5);
  }

  addNewPage();
  writeWrappedText('LIST OF ABBREVIATIONS & TECHNICAL ACRONYMS', 14, 'bold', 'helvetica', [15, 23, 42], 7);
  autoTable(doc, {
    startY: cursorY,
    margin: { left: marginX, right: marginX },
    head: [['Acronym', 'Full Technical Meaning']],
    body: ABBREVIATIONS.map(row => [sanitizeForPdf(row[0]), sanitizeForPdf(row[1])]),
    theme: 'striped',
    headStyles: { fillColor: [15, 23, 42], fontSize: 9 },
    bodyStyles: { fontSize: 8.5, cellPadding: 2.2 },
    columnStyles: { 0: { cellWidth: 30, fontStyle: 'bold' } }
  });

  // ---------------- CHAPTERS 1 TO 12 ----------------
  for (const chapter of THESIS_CHAPTERS) {
    addNewPage();
    writeWrappedText(`CHAPTER ${chapter.number}`, 10, 'bold', 'helvetica', [6, 95, 70], 5);
    writeWrappedText(chapter.title.toUpperCase(), 15, 'bold', 'helvetica', [15, 23, 42], 7);
    doc.setDrawColor(6, 95, 70);
    doc.setLineWidth(0.6);
    doc.line(marginX, cursorY - 1, pageW - marginX, cursorY - 1);
    cursorY += 5;

    for (const block of chapter.blocks) {
      if (block.type === 'pageBreak') {
        addNewPage();
      } else if (block.type === 'subheading') {
        ensureSpace(14);
        cursorY += 2;
        writeWrappedText(block.text, 12, 'bold', 'helvetica', [15, 23, 42], 6);
      } else if (block.type === 'paragraph') {
        writeWrappedText(block.text, 10.8, 'normal', 'times', [30, 41, 59], 5.4);
      } else if (block.type === 'bullets') {
        for (const item of block.items) {
          const line = item.bold ? `* ${item.bold} ${item.text}` : `* ${item.text}`;
          writeWrappedText(line, 10.5, 'normal', 'times', [30, 41, 59], 5.2);
        }
      } else if (block.type === 'table') {
        ensureSpace(28);
        writeWrappedText(block.caption, 9.5, 'bold', 'helvetica', [51, 65, 85], 4.8);
        autoTable(doc, {
          startY: cursorY,
          margin: { left: marginX, right: marginX },
          head: [block.headers.map(sanitizeForPdf)],
          body: block.rows.map(r => r.map(sanitizeForPdf)),
          theme: 'grid',
          headStyles: { fillColor: [15, 23, 42], textColor: 255, fontSize: 8 },
          bodyStyles: { fontSize: 7.6, cellPadding: 2.2, textColor: [15, 23, 42] },
          alternateRowStyles: { fillColor: [248, 250, 252] }
        });
        cursorY = ((doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY || cursorY) + 6;
      } else if (block.type === 'code') {
        if (block.caption) {
          ensureSpace(12);
          writeWrappedText(block.caption, 9, 'bold', 'helvetica', [51, 65, 85], 4.5);
        }
        const codeLines = sanitizeForPdf(block.code).split('\n');
        const boxH = codeLines.length * 4.2 + 7;
        ensureSpace(boxH + 4);
        doc.setFillColor(15, 23, 42);
        doc.roundedRect(marginX, cursorY - 2, maxW, boxH, 2, 2, 'F');
        doc.setFont('courier', 'normal');
        doc.setFontSize(7.8);
        doc.setTextColor(110, 231, 183);
        let codeY = cursorY + 3;
        for (const cl of codeLines) {
          doc.text(cl, marginX + 3, codeY);
          codeY += 4.2;
        }
        cursorY += boxH + 4;
      } else if (block.type === 'diagram') {
        const img = diagrams[block.id];
        if (img) {
          const imgW = maxW;
          const imgH = (img.height / img.width) * imgW;
          ensureSpace(imgH + 16);
          doc.setDrawColor(203, 213, 225);
          doc.rect(marginX, cursorY, imgW, imgH);
          doc.addImage(img.dataUrl, 'PNG', marginX, cursorY, imgW, imgH);
          cursorY += imgH + 4;
          writeWrappedText(block.caption, 9, 'bold', 'helvetica', [51, 65, 85], 4.5, 'center');
        }
      }
    }
  }

  // ---------------- REFERENCES ----------------
  addNewPage();
  writeWrappedText('REFERENCES', 14, 'bold', 'helvetica', [15, 23, 42], 7);
  doc.setDrawColor(15, 23, 42);
  doc.line(marginX, cursorY - 2, pageW - marginX, cursorY - 2);
  cursorY += 5;
  for (const ref of THESIS_REFERENCES) {
    writeWrappedText(ref, 10, 'normal', 'helvetica', [51, 65, 85], 5);
  }

  // Add running footer page numbers on every page except cover
  const totalPages = doc.getNumberOfPages();
  for (let p = 2; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(sanitizeForPdf(`MarketingHub Online Platform - CSE Thesis Report | ${meta.studentName} (${meta.studentId})`), marginX, pageH - 10);
    doc.text(`Page ${p} of ${totalPages}`, pageW - marginX, pageH - 10, { align: 'right' });
  }

  doc.save('MarketingHub_Final_Year_Thesis_Report.pdf');
}
