"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import * as React from "react"
import { tv } from "tailwind-variants"

const footerStyles = tv({
  slots: {
    container: 'flex justify-center items-center w-full h-16 p-4 gap-16 bg-recifis-blue text-white',
    h1: "font-bold",
    firstDiv: "flex items-center gap-4",  
  },
})

const { container, h1, firstDiv } = footerStyles()

export function Footer({ className }: { className?: string }) {
  return (
    <section className={cn(container(), className)}>
      <div className={firstDiv()}>
        <Image src='/img/ufvlogo.png' width={52} height={52} alt={"Imagem que representa a logo da UFV"} />
        <h1 className={h1()}>Universidade Federal de Viçosa</h1>
      </div>
      {/* <ul className={ul()}>
        <li>Quem somos</li>
        <li>Conteúdo</li>
        <li>Notícias</li>
      </ul> */}
    </section>
  )
}
