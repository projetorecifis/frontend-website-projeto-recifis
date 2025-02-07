"use client"

import Image from "next/image"
import * as React from "react"
import { tv } from "tailwind-variants"

const headerStyles = tv({
  slots: {
    container: 'flex flex-col gap-4 justify-evenly items-center w-full p-4 bg-recifis-blue text-white tabl:flex-row tabl:h-16',
    span: "uppercase",
    firstDiv: "flex items-center gap-4 font-bold",
    secondDiv: "flex justify-between gap-16 font-bold",
    link: "duration-150 hover:scale-110 hover:text-recifis-orange text-center",
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
        <a className={link()} href="/quem-somos">Quem somos</a>
        <a className={link()}>Conteúdo</a>
        <a className={link()}>Notícias</a>
      </div>
    </section>
  )
}
