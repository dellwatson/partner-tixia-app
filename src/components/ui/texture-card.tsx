import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const TextureCardStyled = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[24px] border border-white/60",
      "bg-gradient-to-b from-neutral-100 to-white/70",
      className
    )}
    {...props}
  >
    {/* Nested structure for aesthetic borders */}
    <div className="rounded-[23px] border border-black/10">
      <div className="rounded-[22px] border border-white/50">
        <div className="rounded-[21px] border border-neutral-950/20">
          {/* Inner content wrapper */}
          <div className="w-full border border-white/50 rounded-[20px] text-neutral-900">
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
))

const textureCardVariants = cva(
  "w-full border border-white/50 text-neutral-500 rounded-[calc(var(--radius)-4px)]",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-b from-card/70 to-secondary/50",
        subtle: "bg-gradient-to-b from-neutral-50/80 to-white/90",
        clean: "bg-white/95",
        warm: "bg-gradient-to-b from-stone-50/80 to-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Allows for global css overrides and theme support - similar to shad cn
const TextureCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & 
    VariantProps<typeof textureCardVariants> & 
    { children?: React.ReactNode }
>(({ className, children, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-white/60",
        "rounded-[calc(var(--radius))]", // Base radius with fallback
        className
      )}
      {...props}
    >
      <div className="border border-black/10 rounded-[calc(var(--radius)-1px)]">
        <div className="border border-white/50 rounded-[calc(var(--radius)-2px)]">
          <div className="border border-neutral-950/20 rounded-[calc(var(--radius)-3px)]">
            <div className={textureCardVariants({ variant })}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

TextureCard.displayName = "TextureCard"

const TextureCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "first:pt-6 last:pb-6 ", // Adjust padding for first and last child
      className
    )}
    {...props}
  />
))
TextureCardHeader.displayName = "TextureCardHeader"

const TextureCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-tight text-neutral-900 pl-2",
      className
    )}
    {...props}
  />
))
TextureCardTitle.displayName = "TextureCardTitle"

const TextureCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-neutral-600 pl-2",
      className
    )}
    {...props}
  />
))
TextureCardDescription.displayName = "TextureCardDescription"

const TextureCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-6 py-4", className)} {...props} />
))
TextureCardContent.displayName = "TextureCardContent"

const TextureCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between px-6 py-4  gap-2",

      className
    )}
    {...props}
  />
))
TextureCardFooter.displayName = "TextureCardFooter"

const TextureSeparator = () => {
  return (
    <div className="border border-t-neutral-50 border-b-neutral-300/50 border-l-transparent border-r-transparent" />
  )
}

export {
  TextureCard,
  TextureCardHeader,
  TextureCardStyled,
  TextureCardFooter,
  TextureCardTitle,
  TextureSeparator,
  TextureCardDescription,
  TextureCardContent,
  textureCardVariants,
}

// export TextureCard
