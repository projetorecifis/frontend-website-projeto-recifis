import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps } from "tailwind-variants"
import { tv } from "tailwind-variants"
import { cn } from "@/lib/utils"

const headingVariants = tv({
  base: "text-neutral-900 font-sans antialiased",
  
    variants: {
      variant: {
        h1: 
          "text-3xl font-bold leading-sm",
        h2:
        "text-2xl font-bold leading-sm",
        h3:
        "text-1xl font-bold leading-sm",
        h4:
        "text-xl font-bold leading-sm",
        subtitle:
        "text-xl font-regular leading-md",
      },
    },
    defaultVariants: {
      variant: "h1",
    },
  
})

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
  VariantProps<typeof headingVariants> {
  asChild?: boolean
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "h1"
    return (
      <Comp
        className={cn(headingVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Heading.displayName = "Heading"

export { Heading, headingVariants }
