"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
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
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMenu items={data.items} />
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}