/* ============================================================
   The Engineered Soul — Content Ingestion
   import.meta.glob paths are RELATIVE TO THIS FILE.
   This file lives in src/lib/, so paths MUST start with ../content/
   pointing to src/content/.
   ============================================================ */

import type {
  ContentGlobMap,
  FrontmatterResult,
  ParsedCollectionItem,
  Collection,
} from './types';

export type { Collection, ParsedCollectionItem, ContentGlobMap };

// ----- Image globs -----
const portraitImages = import.meta.glob(
  [
    '../content/portrait/*.{jpg,jpeg,png,webp,avif}',
    '../content/portrait/**/*.{jpg,jpeg,png,webp,avif}',
  ],
  { eager: true, import: 'default', query: '?url' }
) as ContentGlobMap;

const portfolioImages = import.meta.glob(
  '../content/portfolio/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, import: 'default', query: '?url' }
) as ContentGlobMap;

const collectionImages = import.meta.glob(
  '../content/collections/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, import: 'default', query: '?url' }
) as ContentGlobMap;

// ----- Text globs -----
const portfolioTextFiles = import.meta.glob(
  '../content/portfolio/**/*.{md,txt}',
  { eager: true, import: 'default', query: '?raw' }
) as ContentGlobMap;

const collectionTextFiles = import.meta.glob(
  '../content/collections/**/*.{md,txt}',
  { eager: true, import: 'default', query: '?raw' }
) as ContentGlobMap;

// ----- Documents (PDFs, DOCX) -----
const collectionDocuments = import.meta.glob(
  '../content/collections/**/*.{pdf,docx}',
  { eager: true, import: 'default', query: '?url' }
) as ContentGlobMap;

// ============================================================
// Frontmatter Parser
// ============================================================

/**
 * Parse a lightweight YAML-like frontmatter block.
 * Returns `{ data, body }` where `data` is a flat string map.
 * Only supports `key: value` pairs, no nested structures.
 */
export function parseFrontmatter(raw: string): FrontmatterResult {
  const result: FrontmatterResult = { data: {}, body: raw };
  if (!raw.startsWith('---')) return result;

  const endIndex = raw.indexOf('\n---', 3);
  if (endIndex === -1) return result;

  const frontmatterBlock = raw.slice(3, endIndex).trim();
  const body = raw.slice(endIndex + 4).replace(/^\n+/, '');

  const data: Record<string, string> = {};
  for (const line of frontmatterBlock.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;
    const key = trimmed.slice(0, colonIndex).trim();
    const value = trimmed
      .slice(colonIndex + 1)
      .trim()
      .replace(/^["']|["']$/g, '');
    if (key) data[key] = value;
  }

  return { data, body };
}

// ============================================================
// Guide file filter — exclude PUT_*_HERE.md placeholders
// ============================================================

export function isCollectionGuideFile(path: string): boolean {
  const fileName = path.split('/').pop() ?? '';
  return (
    (fileName.startsWith('PUT_') && fileName.endsWith('_HERE.md')) ||
    fileName.toLowerCase() === 'readme.md'
  );
}

// ============================================================
// Path utilities
// ============================================================

/** Extract the file name without extension. */
function fileStem(path: string): string {
  const fileName = path.split('/').pop() ?? '';
  return fileName.replace(/\.[^.]+$/, '');
}

/** Extract the parent folder name (e.g., "code" from ".../code/foo.md"). */
export function extractFolderName(path: string): string {
  const segments = path.split('/');
  return segments[segments.length - 2] ?? '';
}

/** Find a sibling image (same folder, same base name) for a given text file. */
function findSiblingImage(
  textPath: string,
  imageMap: ContentGlobMap
): string | null {
  const folder = textPath.split('/').slice(0, -1).join('/');
  const stem = fileStem(textPath);
  for (const [imagePath, url] of Object.entries(imageMap)) {
    const imageFolder = imagePath.split('/').slice(0, -1).join('/');
    const imageStem = fileStem(imagePath);
    if (imageFolder === folder && imageStem === stem) {
      return url;
    }
  }
  return null;
}

/** Find a sibling document (PDF/DOCX) for a given text file. */
function findSiblingDocument(
  textPath: string,
  documentMap: ContentGlobMap
): string | null {
  const folder = textPath.split('/').slice(0, -1).join('/');
  const stem = fileStem(textPath);
  for (const [docPath, url] of Object.entries(documentMap)) {
    const docFolder = docPath.split('/').slice(0, -1).join('/');
    const docStem = fileStem(docPath);
    if (docFolder === folder && docStem === stem) {
      return url;
    }
  }
  return null;
}

// ============================================================
// Portrait resolution
// ============================================================

/**
 * Resolve a portrait image by key.
 * Strategy:
 *  1. Look in src/content/portrait/{key}/ for any image
 *  2. Look in src/content/portrait/ for files starting with the key
 *  3. Fall back to /nicholas-portrait.jpg (public/)
 */
export function getPortraitForKey(key: string): string {
  // 1. Folder match
  for (const [path, url] of Object.entries(portraitImages)) {
    const folder = extractFolderName(path);
    if (folder === key) return url;
  }
  // 2. File-name prefix match
  for (const [path, url] of Object.entries(portraitImages)) {
    const stem = fileStem(path);
    if (stem === key || stem.startsWith(`${key}-`)) return url;
  }
  // 3. Static fallback
  return '/nicholas-portrait.jpg';
}

// ============================================================
// Collection items resolution
// ============================================================

/**
 * Load all collection items for a given collection slug.
 * The slug MUST match the directory name in src/content/collections/.
 * Placeholder files (PUT_*_HERE.md) are excluded.
 */
export function getCollectionItems(
  collectionSlug: string
): ParsedCollectionItem[] {
  const items: ParsedCollectionItem[] = [];

  for (const [path, raw] of Object.entries(collectionTextFiles)) {
    if (isCollectionGuideFile(path)) continue;
    if (extractFolderName(path) !== collectionSlug) continue;

    const { data, body } = parseFrontmatter(raw);
    const siblingImage = findSiblingImage(path, collectionImages);
    const siblingDocument = findSiblingDocument(path, collectionDocuments);

    items.push({
      slug: data.slug ?? fileStem(path),
      collectionSlug,
      title: data.title ?? fileStem(path),
      category: data.category ?? '',
      accent: data.accent ?? '#888888',
      status: data.status ?? 'archive',
      description: data.description ?? '',
      link: data.link ?? null,
      linkLabel: data.linkLabel ?? 'View',
      body,
      image: siblingImage,
      document: siblingDocument,
      medium: data.medium ?? null,
    });
  }

  return items.sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Get all collection directories present in src/content/collections/.
 * Returns an array of folder slugs.
 */
export function getCollectionSlugs(): string[] {
  const slugs = new Set<string>();
  for (const path of Object.keys(collectionTextFiles)) {
    if (isCollectionGuideFile(path)) continue;
    slugs.add(extractFolderName(path));
  }
  return Array.from(slugs);
}

/**
 * Find a single collection item by collection slug + item slug.
 */
export function getCollectionItem(
  collectionSlug: string,
  itemSlug: string
): ParsedCollectionItem | null {
  const items = getCollectionItems(collectionSlug);
  return items.find((i) => i.slug === itemSlug) ?? null;
}

// ============================================================
// Portfolio (Bento grid) ingestion
// ============================================================

export interface ParsedPortfolioItem {
  slug: string;
  title: string;
  category: string;
  accent: string;
  status: string;
  description: string;
  medium: string | null;
  link: string | null;
  linkLabel: string;
  body: string;
  image: string | null;
  collectionSlug: string;
}

const PORTFOLIO_COLLECTION_SLUG = 'portfolio';

/**
 * Load all portfolio items for the Bento grid.
 * Sourced from src/content/portfolio/ — each .md / .txt file is a project.
 * Sibling images are auto-associated.
 */
export function getPortfolioItems(): ParsedPortfolioItem[] {
  const items: ParsedPortfolioItem[] = [];

  for (const [path, raw] of Object.entries(portfolioTextFiles)) {
    if (isCollectionGuideFile(path)) continue;

    const { data, body } = parseFrontmatter(raw);
    const siblingImage = findSiblingImage(path, portfolioImages);

    items.push({
      slug: data.slug ?? fileStem(path),
      title: data.title ?? fileStem(path),
      category: data.category ?? 'experiment',
      accent: data.accent ?? '#888888',
      status: data.status ?? 'archive',
      description: data.description ?? '',
      medium: data.medium ?? null,
      link: data.link ?? null,
      linkLabel: data.linkLabel ?? 'View',
      body,
      image: siblingImage,
      collectionSlug: PORTFOLIO_COLLECTION_SLUG,
    });
  }

  return items.sort((a, b) => a.title.localeCompare(b.title));
}

// ============================================================
// Counts (for Machine Mode)
// ============================================================

export function getCollectionCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const slug of getCollectionSlugs()) {
    counts[slug] = getCollectionItems(slug).length;
  }
  return counts;
}
