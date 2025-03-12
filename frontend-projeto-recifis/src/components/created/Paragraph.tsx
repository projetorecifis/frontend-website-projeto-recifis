import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps } from "class-variance-authority"
import { tv } from "tailwind-variants"
import { cn } from "@/lib/utils"

const paragraphVariants = tv({
  base: "text-neutral-900 font-sans antialiased leading-md",
  variants: {
    variant: {
      p1:
        "text-lg font-bold",
      p2:
        "text-lg font-regular",
      p3:
        "text-base font-bold",
      p4:
        "text-base font-regular",
      button: 
        "text-base font-medium",
      link:
        "text-base font-regular",
    },
  },
  defaultVariants: {
    variant: "p1",
  },

})

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof paragraphVariants> {
  asChild?: boolean
}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "p"
    return (
      <Comp
        className={cn(paragraphVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Paragraph.displayName = "Paragraph"

export { Paragraph, paragraphVariants }
