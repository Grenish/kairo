import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// Flat, square-cornered, one fill. Surfaces are told apart by tone, never by an outline.
const buttonVariants = cva(
  "press inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium tracking-[-0.01em] select-none outline-none disabled:pointer-events-none disabled:opacity-45 aria-invalid:outline-2 aria-invalid:outline-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 group/button",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/88",
        outline: "bg-surface text-foreground hover:bg-surface-2 aria-expanded:bg-surface-2",
        secondary: "bg-surface text-foreground hover:bg-surface-2 aria-expanded:bg-surface-2",
        ghost: "text-foreground hover:bg-surface aria-expanded:bg-surface",
        destructive: "bg-surface text-destructive hover:bg-surface-2",
        link: "text-foreground underline decoration-transparent decoration-[0.07em] underline-offset-[0.22em] hover:decoration-current",
      },
      size: {
        default: "h-12 px-6",
        xs: "h-8 px-3 text-[0.875rem]",
        sm: "h-10 px-4 text-[0.9375rem]",
        lg: "h-14 px-8",
        icon: "size-11",
        "icon-xs": "size-8",
        "icon-sm": "size-10",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
