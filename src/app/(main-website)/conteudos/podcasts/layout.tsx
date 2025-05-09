
import { ThemeProvider } from "@/components/created/ThemeProvider"


export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
            >
            <main className="w-full dark:bg-zinc-900">
                {children}
            </main>
        </ThemeProvider>
    )
}