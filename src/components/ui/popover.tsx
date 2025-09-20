// Re-export the radix popover components for backward compatibility
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  type PopoverProps,
  type PopoverTriggerProps,
  type PopoverContentProps,
  type PopoverCloseProps,
} from '~/components/ui/animate-ui/components/radix/popover';

// Legacy exports for backward compatibility
export { Popover as PopoverRoot } from '~/components/ui/animate-ui/components/radix/popover';

// Additional utility components (keeping the useful ones from the old implementation)
import React from 'react';
import { cn } from '~/lib/utils';

export function PopoverHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "px-4 py-2 font-semibold text-zinc-900 dark:text-zinc-100",
        className
      )}
    >
      {children}
    </div>
  )
}

export function PopoverBody({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("p-4", className)}>{children}</div>
}

export function PopoverButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-4 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export function PopoverFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex justify-between border-t border-zinc-950/10 px-4 py-3 dark:border-zinc-50/10",
        className
      )}
    >
      {children}
    </div>
  )
}
