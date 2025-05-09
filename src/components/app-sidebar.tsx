"use client"

import * as React from "react"
import {
  Newspaper,
  Mic,
  NotebookPen
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMenu } from "./ui/nav-menu"
import { Home } from "lucide-react"
import { getCookies } from "@/utils/cookies"
import { useEffect, useState } from "react"
import { decrypt } from "@/app/actions/auth"
import { Skeleton } from "./ui/skeleton"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Noticias",
      url: "#",
      icon: Newspaper,
      isActive: false,
      items: [
        {
          title: "Adicionar notícia",
          url: "/dashboard/noticias/adicionar",
        },
        {
          title: "Gerenciar noticias",
          url: "/dashboard/noticias/gerenciar",
        },
      ],
    },
    {
      title: "Palestras",
      url: "#",
      icon: NotebookPen,
      items: [
        {
          title: "Adicionar palestra",
          url: "/dashboard/palestras/adicionar",
        },
        {
          title: "Gerenciar palestras",
          url: "/dashboard/palestras/gerenciar",
        },
      ],
    },
    {
      title: "Podcasts",
      url: "#",
      icon: Mic,
      items: [
        {
          title: "Adicionar podcast",
          url: "/dashboard/podcasts/adicionar",
        },
        {
          title: "Gerenciar podcasts",
          url: "/dashboard/podcasts/gerenciar",
        },
      ],
    },
  ],

  items: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
  ]
}
interface IUser{
  name: string;
  email: string;
  id: string;
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  const getUserInformation = async() => {
    const token = await getCookies("token");
    const payload = await decrypt(token);

    if(payload !== undefined){
      const bodyUser = {
        name: payload?.name as string,
        email: payload?.email as string,
        id: payload?.id as string,
      }
      setUser(bodyUser);
    }
  }
  useEffect(() => {
    getUserInformation();
  }, [])

  return (
    <Sidebar className="dark:bg-zinc-900" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMenu items={data.items} />
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {user !== undefined && <NavUser user={user} />}
        {user === undefined && (
          <div className="flex items-center justify-between space-x-4 ">
            <div className="flex items-center space-x-4 py-2">
                <Skeleton className="rounded-full h-10 w-10" />
                <div className="space-y-2">
                  <Skeleton className="w-36 h-4" />
                  <Skeleton className="w-36 h-4" />
                </div>
            </div>
            <Skeleton className="h-4 w-4 pr-4" />
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}