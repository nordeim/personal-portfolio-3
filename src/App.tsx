import { useCallback, useEffect, useMemo, useState } from 'react';
import { LayoutShell } from '@/components/LayoutShell';
import { Navigation } from '@/components/Navigation';
import { MobileDrawer } from '@/components/MobileDrawer';
import { GrainOverlay } from '@/components/GrainOverlay';
import { HeroKinetic } from '@/components/HeroKinetic';
import { AboutFlow } from '@/components/AboutFlow';
import { BentoGrid } from '@/components/BentoGrid';
import { ArchiveSpread } from '@/components/ArchiveSpread';
import { ContactSection } from '@/components/ContactSection';
import { MachineOverlay } from '@/components/MachineOverlay';
import { useRouteHash, type ParsedRoute } from '@/hooks/useRouteHash';
import {
  getCollectionItems,
  getCollectionItem,
  getCollectionSlugs,
  getCollectionCounts,
  getPortfolioItems,
} from '@/lib/content';
import {
  heroSlides,
  aboutPillars,
  socialLinks,
  collectionDefinitions,
  buildMetadata,
} from '@/lib/data';
import type { Collection, ParsedCollectionItem } from '@/lib/types';
import type { MachineOverlayData } from '@/lib/types';

function App() {
  // ----- All state lifted here (Thin Orchestrator pattern) -----
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [isNightMode, setIsNightMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMachineOpen, setIsMachineOpen] = useState(false);
  const route = useRouteHash();

  // ----- Theme application -----
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (isNightMode) {
      root.classList.add('theme-night');
      root.classList.remove('theme-day');
    } else {
      root.classList.add('theme-day');
      root.classList.remove('theme-night');
    }
  }, [isNightMode]);

  // ----- Hash navigation handler -----
  const handleNavigate = useCallback((href: string): void => {
    if (typeof window === 'undefined') return;
    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.location.hash = '';
      return;
    }
    if (href.startsWith('#')) {
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Sync hash for deep linking, but only for in-page anchors
        if (href === '#work' || href === '#about' || href === '#archive' || href === '#contact') {
          // Don't override archive routes
          if (!window.location.hash.startsWith('#collection') && !window.location.hash.startsWith('#portfolio')) {
            history.replaceState(null, '', href);
          }
        }
      }
    }
  }, []);

  // ----- Active collection/item resolution from hash -----
  const { activeCollection, activeItem } = useMemo(() => resolveArchive(route), [route]);

  // ----- Hero rotation handlers -----
  const handlePrev = useCallback((): void => {
    setActiveHeroIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length);
  }, []);
  const handleNext = useCallback((): void => {
    setActiveHeroIndex((i) => (i + 1) % heroSlides.length);
  }, []);

  // ----- Portfolio/Bento handler -----
  const handleOpenPortfolioItem = useCallback((slug: string): void => {
    window.location.hash = `#portfolio/${slug}`;
  }, []);

  // ----- Archive item open/back -----
  const handleOpenArchiveItem = useCallback((slug: string): void => {
    if (activeCollection) {
      window.location.hash = `#collection/${activeCollection.slug}/${slug}`;
    }
  }, [activeCollection]);

  const handleBackToCollection = useCallback((): void => {
    if (activeCollection) {
      window.location.hash = `#collection/${activeCollection.slug}`;
    }
  }, [activeCollection]);

  const handleOpenCollection = useCallback((slug: string): void => {
    window.location.hash = `#collection/${slug}`;
  }, []);

  // ----- Portfolio data -----
  const portfolioItems = useMemo(() => getPortfolioItems(), []);

  // ----- Machine overlay data -----
  const machineData: MachineOverlayData = useMemo(() => {
    return {
      buildVersion: `${buildMetadata.name}@${buildMetadata.version}+${buildMetadata.hash}`,
      route: route.raw || '#top',
      collections: getCollectionCounts(),
      activeData: activeItem
        ? { slug: activeItem.slug, title: activeItem.title, category: activeItem.category }
        : activeCollection
          ? { slug: activeCollection.slug, title: activeCollection.title, items: getCollectionCounts()[activeCollection.slug] ?? 0 }
          : { hero: heroSlides[activeHeroIndex]?.label ?? '—' },
    };
  }, [route, activeItem, activeCollection, activeHeroIndex]);

  // ----- Render -----
  const currentSlide = heroSlides[activeHeroIndex] ?? heroSlides[0];
  if (!currentSlide) return null;

  return (
    <>
      {/* Skip to main content */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navigation
        isNight={isNightMode}
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen((v) => !v)}
        onThemeToggle={() => setIsNightMode((v) => !v)}
        onMXOpen={() => setIsMachineOpen(true)}
        onNavigate={handleNavigate}
      />

      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
        navLinks={[
          { label: 'Work', href: '#work' },
          { label: 'About', href: '#about' },
          { label: 'Archive', href: '#archive' },
          { label: 'Contact', href: '#contact' },
        ]}
        socialLinks={socialLinks}
        onMXOpen={() => setIsMachineOpen(true)}
      />

      <LayoutShell>
        {activeCollection ? (
          <ArchiveSpread
            collection={activeCollection}
            items={activeCollection ? getCollectionItems(activeCollection.slug) : []}
            activeItem={activeItem}
            onItemOpen={handleOpenArchiveItem}
            onBack={handleBackToCollection}
          />
        ) : (
          <>
            <HeroKinetic
              slide={currentSlide}
              onPrev={handlePrev}
              onNext={handleNext}
              onDotClick={setActiveHeroIndex}
              activeIndex={activeHeroIndex}
              totalSlides={heroSlides.length}
            />

            <section
              id="work"
              className="px-4 sm:px-7 py-12 sm:py-20 border-t border-[var(--border-color)]"
            >
              <div className="max-w-[1400px] mx-auto mb-10">
                <p className="font-utility text-[0.7rem] uppercase tracking-[0.22em] text-[var(--text-muted)] mb-3 flex items-center gap-3">
                  <span
                    className="inline-block w-3 h-px"
                    style={{ background: 'var(--color-accent-code)' }}
                    aria-hidden="true"
                  />
                  Work
                </p>
                <h2 className="font-editorial text-[clamp(2rem,5vw,4rem)] leading-[1.05]">
                  A living shelf.
                </h2>
              </div>
              <div className="max-w-[1400px] mx-auto">
                <BentoGrid projects={portfolioItems} onOpen={handleOpenPortfolioItem} />
              </div>
            </section>

            <AboutFlow pillars={aboutPillars} />

            <section
              id="archive"
              className="px-4 sm:px-7 py-12 sm:py-20 border-t border-[var(--border-color)]"
            >
              <div className="max-w-[1400px] mx-auto mb-10">
                <p className="font-utility text-[0.7rem] uppercase tracking-[0.22em] text-[var(--text-muted)] mb-3 flex items-center gap-3">
                  <span
                    className="inline-block w-3 h-px"
                    style={{ background: 'var(--color-accent-experiments)' }}
                    aria-hidden="true"
                  />
                  Archive
                </p>
                <h2 className="font-editorial text-[clamp(2rem,5vw,4rem)] leading-[1.05]">
                  Collections, indexed.
                </h2>
              </div>
              <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-[var(--border-color)]">
                {collectionDefinitions.map((c) => (
                  <button
                    key={`collection-${c.slug}`}
                    type="button"
                    onClick={() => handleOpenCollection(c.slug)}
                    className="group text-left p-6 sm:p-8 border-r border-b border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] transition-colors"
                    style={{ borderTopColor: c.accent, borderTopWidth: '4px' }}
                  >
                    <p
                      className="font-utility text-[0.65rem] uppercase tracking-[0.22em] mb-2"
                      style={{ color: c.accent }}
                    >
                      {c.category} · {c.status}
                    </p>
                    <h3 className="font-editorial text-3xl leading-[1.05] mb-3">
                      {c.title}
                    </h3>
                    <p className="font-body text-sm text-[var(--text-secondary)] mb-4">
                      {c.description}
                    </p>
                    <span className="font-utility text-[0.7rem] uppercase tracking-[0.18em] group-hover:gap-3 inline-flex items-center gap-2 transition-all" style={{ color: c.accent }}>
                      Open <span aria-hidden="true">→</span>
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <ContactSection socialLinks={socialLinks} />

            <footer className="px-4 sm:px-7 py-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-utility text-[0.65rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">
              <p>
                © {new Date().getFullYear()} {buildMetadata.author} — {buildMetadata.name} v{buildMetadata.version}
              </p>
              <p>Built with restraint. No frameworks beyond React.</p>
            </footer>
          </>
        )}
      </LayoutShell>

      <MachineOverlay
        isOpen={isMachineOpen}
        onClose={() => setIsMachineOpen(false)}
        data={machineData}
      />

      <GrainOverlay />
    </>
  );
}

// ----- Helpers -----

interface ResolvedArchive {
  activeCollection: Collection | null;
  activeItem: ParsedCollectionItem | null;
}

function resolveArchive(route: ParsedRoute): ResolvedArchive {
  if (!route.isArchive || !route.collection) {
    return { activeCollection: null, activeItem: null };
  }

  const collection = collectionDefinitions.find((c) => c.slug === route.collection);
  if (!collection) {
    return { activeCollection: null, activeItem: null };
  }

  // Validate that the collection directory exists in content
  const availableSlugs = getCollectionSlugs();
  if (!availableSlugs.includes(collection.slug)) {
    return { activeCollection: collection, activeItem: null };
  }

  if (route.item) {
    const item = getCollectionItem(collection.slug, route.item);
    return { activeCollection: collection, activeItem: item };
  }

  return { activeCollection: collection, activeItem: null };
}

export default App;
