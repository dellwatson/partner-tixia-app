import React, { ReactNode, useState } from 'react';
import { Container } from './container';
import { ScrollArea } from './scroll-area';
import { MobileBottomSheet } from './mobile-bottom-sheet';
import { Button } from './button';
import { Filter, SlidersHorizontal } from 'lucide-react';

interface SearchResultsWrapperProps {
  filtersComponent: ReactNode;
  /** Desktop-only header (e.g., content header with title, view toggle, sort) */
  desktopHeader?: ReactNode;
  /** Backward-compat: sort header content. Used on desktop if desktopHeader is not provided. */
  sortComponent?: ReactNode;
  /** Content to render INSIDE the Sort bottom sheet on mobile. Falls back to sortComponent. */
  sortContentMobile?: ReactNode;
  children: ReactNode;
}

export function SearchResultsWrapper({
  filtersComponent,
  desktopHeader,
  sortComponent,
  sortContentMobile,
  children,
}: SearchResultsWrapperProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <div className="min-h-screen pb-10">
      <Container className="pt-3">
        {/* Mobile: Top action bar with Filter/Sort buttons */}
        <div className="mb-4 md:hidden">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsSortOpen(true)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </div>
        </div>

        {/* Desktop: Sidebar + Content */}
        <div className="hidden gap-8 md:flex">
          {/* Left Sidebar - Filters */}
          <div className="w-80 flex-shrink-0">
            <ScrollArea className="sticky">{filtersComponent}</ScrollArea>
          </div>

          {/* Right Content - Results */}
          <div className="min-w-0 flex-1">
            {/* Desktop header */}
            {desktopHeader ? (
              <div className="mb-6">{desktopHeader}</div>
            ) : sortComponent ? (
              <div className="mb-6">{sortComponent}</div>
            ) : null}
            {children}
          </div>
        </div>

        {/* Mobile: Vertical content layout */}
        <div className="md:hidden">
          {/* Results list */}
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </Container>

      {/* Mobile Bottom Sheets */}
      <MobileBottomSheet
        isOpen={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        title="Filters"
      >
        <div className="flex h-full min-h-0 w-full flex-col">
          <ScrollArea className="-mx-4 flex-1 px-4">
            <div className="w-full max-w-full overflow-hidden pb-8">
              {filtersComponent}
            </div>
          </ScrollArea>
        </div>
      </MobileBottomSheet>

      <MobileBottomSheet
        isOpen={isSortOpen}
        onOpenChange={setIsSortOpen}
        title="Sort Options"
      >
        <div className="pb-8">{sortContentMobile ?? sortComponent}</div>
      </MobileBottomSheet>
    </div>
  );
}
