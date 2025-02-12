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
  trigger,
} from "@/components/ui/navigation-menu"
 
const components: { title: string; href: string; description?: string, image: string }[] = [
  {
    title: "Podcasts",
    href: "/conteudos/podcasts",
    // description:
    //   "A modal dialog that interrupts the user with important content and expects a response.",
    image: "/img/conteudo/icon-podcast.png"
  },
  {
    title: "Palestras",
    href: "/conteudos/palestras",
    // description:
    //   "For sighted users to preview content available behind a link.",
    image: "/img/conteudo/icon-palestrante.png"
  },
]
 

const headerStyles = tv({
  slots: {
    container: 'flex flex-col gap-4 justify-evenly items-center w-full p-4 bg-recifis-blue text-white tabl:flex-row tabl:h-16',
    span: "uppercase",
    firstDiv: "flex items-center gap-4 font-bold",
    secondDiv: "flex justify-between gap-4 font-bold uppercase items-center desk:gap-16",
    link: "duration-150 hover:scale-110 hover:text-recifis-orange text-center uppercase",
  },
})

const { container, span, firstDiv, secondDiv, link } = headerStyles()

export function Header() {
  return (
    <section className={container()}>
      <div className={firstDiv()}>
        <Image
          src='/img/handRecifis.png'
          width={48}
          height={48}
          alt={"Imagem que representa a logo do projeto RECIFIS"}
        />
        <a className={link()} href="/">Projeto <span className={span()}>recifis</span></a>
      </div>
      <div className={secondDiv()}>
        <Link className={link()} href="/quem-somos">Quem somos</Link>
        <p className=" h-8 w-1 border-2 border-white opacity-10"></p>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={link()}>Conteúdos</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 tabl:grid-cols-2 tabl:w-112 align-center justify-items-center ">
                  {components.map((component, index) => (
                    <ListItem
                      index={index}
                      key={index}
                      title={component.title}
                      image={component.image}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <p className=" h-8 w-1 border-2 border-white opacity-10"></p>
        <Link className={link()} href="/noticias">Notícias</Link>
      </div>
    </section>
  )
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a">{
  index: number,
  image: string
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  ListItemProps
>(({ className, title, children, index, image,  ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex flex-col justify-center items-center select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <h1 className={`text-md leading-none font-bold text-recifis-blue`}>{title}</h1>
          <Image
            src={image}
            width={90}
            height={90}
            alt=""
          />
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"