"use client"

import Image from "next/image"
import * as React from "react"
import { tv } from "tailwind-variants"
import Link from "next/link"
 
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { ArrowBigDownDash } from "lucide-react"
import { useState } from "react"
 
const components: { title: string; href: string; description?: string }[] = [
  {
    title: "Notícias",
    href: "/conteudos/noticias",
    description: "Veja nossas postagens"
  },
  {
    title: "Podcasts",
    href: "/conteudos/podcasts",
    description: "Escute os nossos podcasts",
  },
  {
    title: "Palestras",
    href: "/conteudos/palestras",
    description: "Conheça nossas palestras",
  },
  {
    title: "Raça e tributação",
    href: "/conteudos/raca-e-tributacao",
    description: "Saiba mais sobre raça e tributação"
  }
]
 
const aboutUsComponents: { title: string; href: string; description?: string }[] = [
  {
    title: "Projeto",
    href: "/quem-somos",
    description: "Saiba mais sobre o projeto RECIFIS"
  },
  {
    title: "Nossa Equipe",
    href: "/quem-somos/equipe",
    description: "Conheça nossa equipe",
  },
]
 

const headerStyles = tv({
  slots: {
    container: 'flex flex-col items-center w-full p-4 bg-recifis-blue text-white gap-2 tabl:justify-evenly tabl:gap-4 tabl:flex-row tabl:h-16',
    span: "uppercase",
    firstDiv: "flex items-center gap-4 font-bold",
    link: "duration-150 hover:scale-110 hover:text-recifis-orange text-center uppercase text-sm tabl:text-base",
  },
})

const { container, span, firstDiv, link } = headerStyles()

export function Header() {
  const [isOpened, setIsOpened] = useState(false);
  const openHeader = () => {
    setIsOpened(!isOpened)
  }
  return (
    <section className={container()}>
      <div className={cn(firstDiv(), "mb-2")}>
        <Image
          src='/img/handRecifis.png'
          width={48}
          height={48}
          alt={"Imagem que representa a logo do projeto RECIFIS"}
        />
        <a className={cn(link())} href="/">Projeto <span className={span()}>recifis</span></a>
      </div>
      <div className={`${isOpened === true ? "flex" : "hidden"} flex-col items-center gap-4 font-bold  tabl:flex tabl:flex-row tabl:items-center tabl:gap-8 `}>
        <div className="flex items-center gap-8">
          <Link className={link()} href="/nossa-jornada">História do projeto</Link>
        </div>
       <div className="flex items-center justify-center gap-8">
       <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(link(), "p-0")}>Sobre nós</NavigationMenuTrigger>
                <NavigationMenuContent className="w-full">
                  <ul className="w-full grid gap-3 tabl:grid-cols-2 tabl:w-96 bg-recifis-blue align-center justify-items-center p-0 tabl:p-4">
                    {aboutUsComponents.map((component, index) => (
                      <ListItem
                        key={index}
                        title={component.title}
                        href={component.href}
                        className="grid-rows-2"
                        // className={index === 0 ? "text-red-500" : "text-sm"}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(link(), "p-0")}>Conteúdos</NavigationMenuTrigger>
                <NavigationMenuContent className="w-full">
                  <ul className="w-full grid gap-3 desk:grid-cols-2 desk:w-96 bg-recifis-blue align-center justify-items-center p-0 desk:p-4">
                    {components.map((component, index) => (
                      <ListItem
                        key={index}
                        title={component.title}
                        href={component.href}
                        className="grid-rows-2"
                        // className={index === 0 ? "text-red-500" : "text-sm"}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
       </div>
       <div>
       {/* <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
        className="bg-recifis-blue border-none uppercase font-bold hover:bg-recifis-blue hover:text-recifis-orange"
        >
          Conteúdos
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-recifis-blue text-white border-none">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Palestras
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Notícias
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Raça e tributação
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Podcasts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu> */}
       </div>
      </div>
      <div onClick={() => openHeader()} className="block cursor-pointer tabl:hidden">
        <ArrowBigDownDash className={`${isOpened === true ? "rotate-180 duration-300" : "duration-300"} block tabl:hidden`}/>
      </div>
    </section>
  )
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children,  ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex flex-col w-full select-none space-y-4 p-3 leading-none no-underline outline-none transition-colors focus:text-accent-foreground rounded-md hover:text-recifis-orange hover:bg-blue-800 ",
            className
          )}
          {...props}
        >
          <h1 
            className={
              `text-md text-center leading-none font-bold text-white uppercase tabl:text-lg hover:text-recifis-orange tabl:text-start`
            }>
              {title}
          </h1>
          <p className="hidden line-clamp-2 text-sm leading-snug text-muted-foreground text-slate-300 tabl:block">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"