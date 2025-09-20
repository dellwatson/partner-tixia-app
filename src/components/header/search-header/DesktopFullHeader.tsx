import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, X } from 'lucide-react';
import { TextureCard } from '~/components/ui/texture-card';
import { TextureButton } from '~/components/ui/texture-button';

interface DesktopFullHeaderProps {
  children: ReactNode;
  isMobile: boolean;
  isSearchPage: boolean;
  onCloseMobile: () => void;
  onSearch: () => void;
  isSearchDisabled?: boolean;
  mobileChildren?: ReactNode; // optional pre-wrapped rows for mobile
}

export const DesktopFullHeader: React.FC<DesktopFullHeaderProps> = ({
  children,
  isMobile,
  isSearchPage,
  onCloseMobile,
  onSearch,
  isSearchDisabled = false,
  mobileChildren,
}) => {
  const { t } = useTranslation();

  return (
    <TextureCard
      variant="subtle"
      className="relative transition-all duration-300 hover:shadow-lg"
    >
      {/* Close button on mobile active mode */}
      {isMobile && isSearchPage && (
        <div className="absolute -top-3 -right-3 z-10">
          <TextureButton
            variant="destructive"
            type="button"
            aria-label="Close search editor"
            onClick={onCloseMobile}
            className="inline-flex items-center rounded-md text-sm text-gray-600 hover:bg-gray-100"
          >
            <X className="h-3 w-3" />
          </TextureButton>
        </div>
      )}

      {/* Desktop Layout: Row with dividers */}
      <div className="hidden items-stretch md:flex">
        <div className="flex flex-1 items-center">{children}</div>

        {/* Divider */}
        <div className="my-2 w-px bg-gradient-to-b from-white/50 via-neutral-300 to-white/50"></div>

        {/* Search Button */}
        <div className="relative rounded-sm border-0">
          {/* Button with TextureCard-style borders */}
          <div className="rounded-[calc(var(--radius))] border border-white/60 bg-gradient-to-b from-neutral-100 to-white/70">
            <div className="rounded-[calc(var(--radius)-1px)] border border-black/10">
              <div className="rounded-[calc(var(--radius)-2px)] border border-white/50">
                <div className="rounded-[calc(var(--radius)-3px)] border border-neutral-950/20">
                  <button
                    onClick={onSearch}
                    disabled={isSearchDisabled}
                    className="group from-primary to-accent hover:shadow-primary/25 relative inline-flex h-full w-full items-center justify-center rounded-[calc(var(--radius)-4px)] bg-gradient-to-r px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 xl:px-18"
                  >
                    <div className="from-primary/80 to-primary/90 absolute inset-0 rounded-[calc(var(--radius)-4px)] bg-gradient-to-r opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
                    <span className="relative flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      <span>{t('search', 'Search')}</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout: Column without dividers */}
      <div className="flex flex-col space-y-0 md:hidden">
        {mobileChildren ?? children}
        {/* Mobile Search Button */}
        <div className="w-full p-2">
          <button
            onClick={onSearch}
            disabled={isSearchDisabled}
            className="group from-primary to-accent hover:shadow-primary/25 relative inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r px-6 py-3 text-base font-semibold text-white transition-all duration-200 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="from-primary/80 to-primary/90 absolute inset-0 rounded-lg bg-gradient-to-r opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
            <span className="relative flex items-center gap-2">
              <Search className="h-5 w-5" />
              <span>{t('search', 'Search')}</span>
            </span>
          </button>
        </div>
      </div>
    </TextureCard>
  );
};
