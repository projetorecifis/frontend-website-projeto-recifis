import * as React from "react"

import { cn } from "@/lib/utils"
import { useFormField } from "./form"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
     const { error } = useFormField()

    return (
      <input
        type={type}
        className={cn(
          `${!!error ? " border-red-600 focus-visible:ring-red-600" : "border-zinc-200 focus-visible:ring-sky-600"} flex h-10 w-full rounded-md border  bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
