import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "~/lib/utils"

const buttonVariantsOuter = cva("cursor-pointer", {
  variants: {
    variant: {
      primary:
        "group w-full border border-[1px] border-primary/20 bg-gradient-to-b from-primary/70 to-primary p-[1px] transition-all duration-300 ease-in-out hover:from-primary/50 hover:to-primary/80",
      accent:
        "group w-full border border-[1px] border-cyan-400/20 bg-gradient-to-b from-cyan-300/30 to-cyan-500 p-[1px] transition-all duration-300 ease-in-out hover:from-cyan-200/40 hover:to-cyan-400",
      destructive:
        "group w-full border border-[1px] border-red-400/20 bg-gradient-to-b from-red-300/90 to-red-500 p-[1px] transition-all duration-300 ease-in-out hover:from-red-200/90 hover:to-red-400",
      secondary:
        "group w-full border border-[1px] border-neutral-200 bg-white/50 p-[1px] transition-all duration-300 ease-in-out hover:bg-neutral-50",
      minimal:
        "group w-full border border-[1px] border-gray-200 bg-white p-[1px] transition-all duration-300 ease-in-out",
      icon: "group rounded-full border border-[1px] border-neutral-200 bg-white/50 p-[1px] transition-all duration-300 ease-in-out",
    },
    size: {
      sm: "rounded-[6px]",
      default: "rounded-[12px]",
      lg: "rounded-[12px]",
      icon: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
})

const innerDivVariants = cva(
  "w-full h-full flex items-center justify-center text-muted-foreground",
  {
    variants: {
      variant: {
        primary:
          "gap-2 bg-gradient-to-b from-primary to-primary/90 text-sm text-primary-foreground transition-all duration-300 ease-in-out group-hover:brightness-125 group-active:from-primary/80 group-active:to-primary/70",
        accent:
          "gap-2 bg-gradient-to-b from-cyan-400 to-cyan-600 text-sm text-white/90 transition-all duration-300 ease-in-out group-hover:brightness-110 group-active:from-cyan-400/80 group-active:to-cyan-600/80",
        destructive:
          "gap-2 bg-gradient-to-b from-red-400/60 to-red-500/60 text-sm text-white/90 transition-all duration-300 ease-in-out group-hover:brightness-110 group-active:from-red-400/80 group-active:to-red-600/80",
        secondary:
          "bg-gradient-to-b from-neutral-100/80 to-neutral-200/50 text-sm transition-all duration-300 ease-in-out group-hover:brightness-110 group-active:from-neutral-200/60 group-active:to-neutral-300/70",
        minimal:
          "gap-2 bg-gradient-to-b from-white to-gray-50 text-gray-700 text-sm transition-all duration-300 ease-in-out group-hover:brightness-95 group-active:from-gray-100 group-active:to-gray-200",
        icon: "bg-gradient-to-b from-white to-neutral-50/50 rounded-full transition-all duration-300 ease-in-out group-hover:brightness-95 group-active:bg-neutral-200",
      },
      size: {
        sm: "text-xs rounded-[4px] px-4 py-1",
        default: "text-sm rounded-[10px] px-4 py-2",
        lg: "text-base rounded-[10px] px-4 py-2",
        icon: " rounded-full p-1",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface UnifiedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "destructive"
    | "minimal"
    | "icon"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const TextureButton = React.forwardRef<HTMLButtonElement, UnifiedButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "default",
      asChild = false,
      className ,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(buttonVariantsOuter({ variant, size,}), className)}
        ref={ref}
        {...props}
      >
        <div className={cn(innerDivVariants({ variant, size }))}>
          {children}
        </div>
      </Comp>
    )
  }
)

TextureButton.displayName = "TextureButton"

export { TextureButton }

// export default TextureButton
