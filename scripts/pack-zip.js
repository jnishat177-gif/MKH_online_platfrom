import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Clean up any old archive files
const oldZip = path.join(publicDir, 'deshibazaar-project.zip');
if (fs.existsSync(oldZip)) {
  fs.unlinkSync(oldZip);
}

const zip = new JSZip();

// Ignore patterns
const IGNORE_PATTERNS = [
  'node_modules',
  '.git',
  'dist',
  'public',
  'scripts',
  'bun.lock',
  '.DS_Store'
];

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const relPath = path.relative(rootDir, fullPath);

    // Check if ignored
    const isIgnored = IGNORE_PATTERNS.some(pat => relPath === pat || relPath.startsWith(pat + path.sep));
    if (isIgnored) return;

    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

async function buildZip() {
  console.log('Packaging MarketingHub Online Platform into Windows/Mac/GitHub compatible zip...');
  const files = getAllFiles(rootDir);

  files.forEach(filePath => {
    const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
    const content = fs.readFileSync(filePath);
    zip.file(relPath, content, {
      date: new Date(),
      createFolders: true
    });
  });

  const outputPath = path.join(publicDir, 'marketinghub-project.zip');
  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
    platform: 'DOS'
  });

  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully generated: ${outputPath} (${(buffer.length / 1024 / 1024).toFixed(2)} MB, ${files.length} files)`);
}

buildZip().catch(err => {
  console.error('Error generating zip:', err);
  process.exit(1);
});
