import { useEffect, useState } from 'react';

export interface ParsedRoute {
  /** Raw hash, e.g., "#collection/code" or "#portfolio/slug" */
  raw: string;
  /** First segment, e.g., "collection" or "portfolio" */
  section: string | null;
  /** Second segment, e.g., collection slug */
  collection: string | null;
  /** Third segment, e.g., item slug inside a collection */
  item: string | null;
  /** True if a valid archive route was parsed. */
  isArchive: boolean;
}

const EMPTY: ParsedRoute = {
  raw: '',
  section: null,
  collection: null,
  item: null,
  isArchive: false,
};

function parseHash(hash: string): ParsedRoute {
  if (!hash || hash === '#' || hash === '#/') return EMPTY;

  // strip the leading "#"
  const cleaned = hash.startsWith('#') ? hash.slice(1) : hash;
  const segments = cleaned.split('/').filter(Boolean);

  if (segments.length === 0) return EMPTY;

  const section = segments[0] ?? null;
  const collection = segments[1] ?? null;
  const item = segments[2] ?? null;

  return {
    raw: hash,
    section,
    collection,
    item,
    isArchive: section === 'collection' && collection !== null,
  };
}

/**
 * Listens to `hashchange` and `load` events and returns a parsed route.
 * Routes supported:
 *   #collection/{slug}              → collection list
 *   #collection/{slug}/{itemSlug}   → collection item detail
 *   #portfolio/{slug}               → portfolio item detail
 */
export function useRouteHash(): ParsedRoute {
  const [route, setRoute] = useState<ParsedRoute>(EMPTY);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const update = (): void => {
      setRoute(parseHash(window.location.hash));
    };

    update();
    window.addEventListener('hashchange', update);
    window.addEventListener('load', update);

    return () => {
      window.removeEventListener('hashchange', update);
      window.removeEventListener('load', update);
    };
  }, []);

  return route;
}
