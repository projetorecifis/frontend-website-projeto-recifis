import { AppSidebar } from "@/components/app-sidebar"
import { cookies } from "next/headers"
import { Toaster } from "@/components/ui/sonner"
import {
  SidebarProvider,
} from "@/components/ui/sidebar"

export default async function Layout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="w-full">
                {children}
            </main>
        </SidebarProvider>
    )
}