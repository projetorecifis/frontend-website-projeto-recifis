// sonner.tsx
"use client"
import { AlertTriangle, CheckCircle, Info, Loader, XCircle } from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-muted-foreground",
                    actionButton:
                        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton:
                        "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                    success:
                        'group-[.toaster]:bg-emerald-500 group-[.toaster]:text-pale-green-100 group-[.toaster]:border-emerald-500 group-[.toaster]:text-white dark:group-[.toaster]:bg-green-900 dark:group-[.toaster]:border-emerald-500',
                    error:
			            'group-[.toaster]:bg-red-950 group-[.toaster]:text-white',
                },
            }}
            icons={{
                success: <CheckCircle className="h-4 w-4 text-white" />,
                info: <Info className="h-4 w-4 text-blue-500" />,
                warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
                error: <XCircle className="h-4 w-4 text-red-500" />,
                loading: <Loader className="h-4 w-4 text-gray-500 animate-spin" />,
            }}
            {...props}
        />
    )
}

export { Toaster }