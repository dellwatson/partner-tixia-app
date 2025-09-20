import { ReactNode } from 'react';
import { cn } from '~/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const containerVariants = cva(
  'mx-auto w-full',
  {
    variants: {
      size: {
        sm: 'max-w-2xl',      // ~672px
        md: 'max-w-4xl',      // ~896px  
        lg: 'max-w-6xl',      // ~1152px
        xl: 'max-w-7xl',      // ~1280px - matches booking.com style
        full: 'max-w-full'
      },
      padding: {
        true: 'px-4 sm:px-6 lg:px-8', // 16px mobile, 24px tablet, 32px desktop
        false: ''
      }
    },
    defaultVariants: {
      size: 'xl',
      padding: true
    }
  }
);

interface ContainerProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  children: ReactNode;
}

/**
 * Global theme container component with consistent responsive behavior
 * Used across the entire application for header, content, footer, and all sections
 * Breakpoints: mobile (<768px), tablet (768px-1080px), desktop (>1080px)
 */
export const Container = ({ 
  children, 
  className, 
  size,
  padding,
  ...props
}: ContainerProps) => {
  return (
    <div 
      className={cn(containerVariants({ size, padding }), className)}
      {...props}
    >
      {children}
    </div>
  );
};
