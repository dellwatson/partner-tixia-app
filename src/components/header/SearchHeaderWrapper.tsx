import { ReactNode, Children, isValidElement, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from '@tanstack/react-router';
import { Container } from '~/components/ui/container';
import { MobileCompactHeader } from './search-header/MobileCompactHeader';
import { DesktopFullHeader } from './search-header/DesktopFullHeader';

interface SearchHeaderWrapperProps {
  children: ReactNode;
  onSearch: () => void;
  isSearchDisabled?: boolean;
  additionalContent?: ReactNode;
  /** Content shown inside the mobile compact info header (when on search page). */
  mobileCompactInfo?: ReactNode;
}

// todo: stick on scroll animation
// on search page this will be sticky as well (perhaps on scroll remove main-header?)
export const SearchHeaderWrapper = ({
  children,
  onSearch,
  isSearchDisabled = false,
  additionalContent,
  mobileCompactInfo,
}: SearchHeaderWrapperProps) => {
  const location = useLocation();

  // Check if we're on a search page (hotels/search or flights/search)
  const isSearchPage = location.pathname.includes('/search');

  // Treat flights/hotels landing pages as non-compact pages on mobile
  const isHomeLanding = /^\/[^/]+\/(flights|hotels)\/?$/.test(location.pathname);
  const initialIsHomeLanding = typeof window !== 'undefined'
    ? /^\/[^/]+\/(flights|hotels)\/?$/.test(window.location.pathname)
    : isHomeLanding;

  // Detect mobile (initialize before first paint to avoid flash)
  const initialIsMobile = typeof window !== 'undefined'
    ? window.matchMedia('(max-width: 767px)').matches
    : false;
  const [isMobile, setIsMobile] = useState(initialIsMobile);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Mobile active/inactive state
  // Default: compact (inactive) on all non-home pages when on mobile
  const [mobileActive, setMobileActive] = useState<boolean>(() =>
    initialIsMobile && !initialIsHomeLanding ? false : true
  );
  useEffect(() => {
    // Always default to inactive (compact) on mobile for non-home pages.
    // Home landing pages (flights/hotels) never show compact.
    if (isMobile && !isHomeLanding) {
      setMobileActive(false);
    } else {
      setMobileActive(true);
    }
  }, [isHomeLanding, isMobile]);

  // Apply sticky positioning only on search pages
  const wrapperClasses = isSearchPage
    ? 'sticky top-16 z-30 border-0 bg-white/95 backdrop-blur-sm '
    : 'relative z-30 border-0 bg-transparent';

  // Convert children to array and filter out dividers for mobile
  const childrenArray = Children.toArray(children).filter((child) => {
    if (!isValidElement(child)) return false;
    // Filter out divider elements (they have w-px class or are just dividers)
    if (child.type === 'div' && child.props.className?.includes('w-px')) return false;
    if (child.type === 'div' && child.props.className?.includes('bg-gray-300')) return false;
    return true;
  });

  // Pre-paint guard to avoid any initial active flash on mobile search pages
  const [mounted, setMounted] = useState(false);
  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  const initialShowCompact = initialIsMobile && !initialIsHomeLanding; // before paint
  const liveShowCompact = isMobile && !isHomeLanding && !mobileActive; // after mount
  const showCompact = mounted ? liveShowCompact : initialShowCompact;

  const mobileRows = (
    <>
      {childrenArray.map((child, index) => (
        <div key={index} className="w-full border-b border-gray-200 last:border-b-0">
          {child}
        </div>
      ))}
    </>
  );

  // Force remount when transitioning between home and search pages or when device breakpoint flips
  const viewKey = `${isHomeLanding ? 'landing' : 'inner'}-${isMobile ? 'mobile' : 'desktop'}`;

  return (
    <div className={wrapperClasses} key={viewKey}>
      <Container>
        {/* Additional Content (like trip type selector) */}
        <div className="mb-4 md:mb-4">
          {/* Hide additional content on mobile when compact */}
          {!showCompact && additionalContent}
        </div>

        {/* Compact/Full switch */}
        {showCompact ? (
          <MobileCompactHeader info={mobileCompactInfo} onExpand={() => setMobileActive(true)} />
        ) : (
          <DesktopFullHeader
            isMobile={isMobile}
            isSearchPage={isSearchPage}
            onCloseMobile={() => setMobileActive(false)}
            onSearch={onSearch}
            isSearchDisabled={isSearchDisabled}
            mobileChildren={mobileRows}
          >
            {children}
          </DesktopFullHeader>
        )}
      </Container>
    </div>
  );
};
