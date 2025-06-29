import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import { Separator } from "@/components/ui/separator"
  import {
    SidebarTrigger,
  } from "@/components/ui/sidebar"
import { ChangeTheme } from "./created/ChangeTheme";
  
  export default function DashboardHeader({ 
      breadcrumbLink, 
      breadcrumbNameLink, 
      breadcrumbPage 
  }: { breadcrumbLink?: string; breadcrumbNameLink?: string ; breadcrumbPage: string }) {
      return(
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
                <ChangeTheme />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                  <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href={breadcrumbLink}>
                          {breadcrumbNameLink}
                      </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                      <BreadcrumbPage>{breadcrumbPage}</BreadcrumbPage>
                  </BreadcrumbItem>
                  </BreadcrumbList>
              </Breadcrumb>
          </div>
        </header>
      )
  }