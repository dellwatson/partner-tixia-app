import { ReactNode, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';

interface FilterAccordionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  isActive?: boolean;
  onReset?: () => void;
  defaultOpen?: boolean;
  variant?: 'card' | 'minimal' | 'bordered';
  showSubtitle?: boolean;
  showReset?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

export function FilterAccordion({
  title,
  subtitle,
  children,
  isActive = false,
  onReset,
  defaultOpen = true,
  variant = 'card',
  showSubtitle = false,
  showReset = true,
  isFirst = false,
  isLast = false
}: FilterAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const getBorderedClasses = () => {
    let classes = "border-l border-r border-gray-100";
    
    // Add top border and rounded corners for first item
    if (isFirst) {
      classes += " border-t rounded-t-lg";
    } else {
      // Use negative margin to overlap borders and prevent double borders
      classes += " border-t -mt-px";
    }
    
    // Add bottom border and rounded corners for last item
    if (isLast) {
      classes += " border-b rounded-b-lg";
    }
    
    return classes;
  };

  const containerClasses = 
    variant === 'card' ? "border border-gray-100 rounded-lg overflow-hidden mb-2" :
    variant === 'bordered' ? getBorderedClasses() :
    "mb-4";

  const headerClasses = 
    variant === 'card' ? "p-4 bg-white" :
    variant === 'bordered' ? "px-4 py-3 bg-white" :
    "py-3";

  const contentClasses = 
    variant === 'card' ? "border-t border-gray-50 p-4 pt-3 bg-gray-25" :
    variant === 'bordered' ? "px-4 py-3 bg-white" :
    "pt-3";

  return (
    <div className={containerClasses}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className={headerClasses}>
          {/* Title level with title, reset, and accordion icon */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 flex-1">{title}</h3>
            
            <div className="flex items-center gap-3">
              {/* Reset button - show by default when showReset is true, active only when isActive */}
              {showReset && onReset && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onReset}
                  className={`px-2 py-1 h-auto text-sm transition-colors font-light ${
                    isActive 
                      ? "text-blue-600 hover:text-blue-700 hover:bg-blue-50" 
                      : "hidden"
                  }`}
                >
                  Reset
                </Button>
              )}

              {/* Accordion trigger */}
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto hover:bg-gray-100"
                >
                  <ChevronDown 
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>

          {/* Subtitle - only show when showSubtitle is true */}
          {showSubtitle && subtitle && (
            <p className="text-sm text-gray-600 mt-2">{subtitle}</p>
          )}
        </div>

        {/* Accordion content */}
        <CollapsibleContent className={variant === 'card' ? "border-t border-gray-50" : ""}>
          <div className={contentClasses}>
            {children}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
