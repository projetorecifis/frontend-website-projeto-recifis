import { AppSidebar } from "@/components/app-sidebar"
import { cookies } from "next/headers"
import {
  SidebarProvider,
} from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/created/ThemeProvider"


export default async function Layout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <ThemeProvider
             attribute="class"
             defaultTheme="system"
             enableSystem
             disableTransitionOnChange
             >
                <main className="w-full">
                    {children}
                </main>
            </ThemeProvider>
        </SidebarProvider>
    )
}