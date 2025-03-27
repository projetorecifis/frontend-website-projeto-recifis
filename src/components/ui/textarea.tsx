import * as React from "react"

import { cn } from "@/lib/utils"
import { useFormField } from "./form"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  const { error } = useFormField()
  
  return (
    <textarea
      className={cn(
        `${!!error ? " border-red-600 focus-visible:ring-red-600" : "border-zinc-200 focus-visible:ring-sky-600"} flex min-h-[80px] w-full rounded-md border bg-white px-3 py-2 text-base ring-offset-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300`,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
