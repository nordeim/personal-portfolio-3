/**
 * TDD RED Test: Verify content ingestion coverage and portrait key mapping.
 * This script will FAIL if orphan content exists or portrait keys don't match.
 * Run with: node scripts/verify-content.test.js
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'src', 'content');

let failures = 0;
function fail(msg) { console.error(`  ❌ FAIL: ${msg}`); failures++; }
function pass(msg) { console.log(`  ✅ PASS: ${msg}`); }

console.log('========================================');
console.log('TDD RED Test: Content Ingestion Audit');
console.log('========================================\n');

// ---- Orphaned Content Check ----
// Top-level category directories outside collections/ and portfolio/
console.log('--- Orphaned Content Check ---');
const topLevelDirs = ['artworks', 'code', 'design', 'photography', 'poetry', 'stories', 'web-experiments'];
const orphanedFiles = [];

for (const dir of topLevelDirs) {
  const dirPath = path.join(CONTENT_DIR, dir);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md') || f.endsWith('.txt'));
    for (const f of files) {
      // Skip guide/placeholder files
      if (f.startsWith('PUT_') && f.endsWith('_HERE.md')) continue;
      if (f.startsWith('README.')) continue;
      orphanedFiles.push(path.join(dir, f));
    }
  }
}

if (orphanedFiles.length > 0) {
  fail(`${orphanedFiles.length} orphaned files found (will not be ingested):`);
  for (const f of orphanedFiles) console.error(`      - ${f}`);
} else {
  pass('No orphaned content files found.');
}

// ---- Portrait Key Match Check ----
console.log('\n--- Portrait Key Match Check ---');
// Read data.ts and extract portrait keys
const dataTs = fs.readFileSync(path.join(ROOT, 'src', 'lib', 'data.ts'), 'utf8');
const portraitKeys = [...dataTs.matchAll(/portraitKey:\s*'([^']+)'/g)].map(m => m[1]);

// Check which directories exist
const portraitDir = path.join(CONTENT_DIR, 'portrait');
let missingKeys = 0;
for (const key of portraitKeys) {
  const dirPath = path.join(portraitDir, key);
  if (!fs.existsSync(dirPath)) {
    fail(`Portrait key '${key}' has no directory at src/content/portrait/${key}/`);
    missingKeys++;
  } else {
    pass(`Portrait key '${key}' -> directory exists`);
  }
}

// Check for unused portrait directories (warning only)
if (fs.existsSync(portraitDir)) {
  const portraitDirs = fs.readdirSync(portraitDir)
    .filter(d => !d.startsWith('.') && !d.endsWith('.md'));
  for (const dir of portraitDirs) {
    if (!portraitKeys.includes(dir)) {
      // Not a failure — extra directories can be used for future content
      console.log(`  ⚠️  WARN: Extra portrait directory (no hero slide uses it): src/content/portrait/${dir}/`);
    } else {
      // Check if directory has images
      const fullDir = path.join(portraitDir, dir);
      if (!fs.statSync(fullDir).isDirectory()) continue;
      const images = fs.readdirSync(fullDir)
        .filter(f => /\.(jpg|jpeg|png|webp|avif)$/.test(f));
      if (images.length === 0) {
        fail(`Portrait directory '${dir}' has no images`);
      } else {
        pass(`Portrait directory '${dir}' has ${images.length} image(s)`);
      }
    }
  }
}

// ---- Collection Slug Match Check ----
console.log('\n--- Collection Slug Check ---');
const collectionsDir = path.join(CONTENT_DIR, 'collections');
const collectionSlugs = [...dataTs.matchAll(/slug:\s*'([^']+)'/g)]
  .map(m => m[1])
  // Filter to only collection definitions (not portfolio items)
  .filter(slug => ['code', 'design', 'photography', 'poetry', 'artworks', 'stories', 'web-experiments'].includes(slug));

if (fs.existsSync(collectionsDir)) {
  const existingDirs = fs.readdirSync(collectionsDir).filter(d => !d.startsWith('.') && d !== 'README.md');
  for (const slug of collectionSlugs) {
    if (!existingDirs.includes(slug)) {
      fail(`Collection slug '${slug}' has no directory at src/content/collections/${slug}/`);
    } else {
      pass(`Collection '${slug}' -> directory exists`);
    }
  }
  for (const dir of existingDirs) {
    if (!collectionSlugs.includes(dir)) {
      fail(`Orphaned collection directory (no definition in data.ts): src/content/collections/${dir}/`);
    }
  }
}

// ---- Summary ----
console.log('\n========================================');
if (failures > 0) {
  console.log(`RED TEST: ${failures} failure(s) found. Fix before proceeding.`);
  process.exit(1);
} else {
  console.log('GREEN TEST: All checks pass.');
  process.exit(0);
}
