import { ReactNode } from 'react';

interface LoadingWrapperProps {
  isLoading: boolean;
  children: ReactNode;
  className?: string;
  loadingClassName?: string;
}

export function LoadingWrapper({ 
  isLoading, 
  children, 
  className = "py-8",
  loadingClassName = "flex items-center justify-center"
}: LoadingWrapperProps) {
  if (isLoading) {
    return (
      <div className={`${loadingClassName} ${className}`}>
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
