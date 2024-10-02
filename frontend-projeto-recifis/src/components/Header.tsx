"use client"

import * as React from "react"
import { tv } from "tailwind-variants"

const headerStyles = tv({
  slots: {
    container: 'flex flex-col gap-4 justify-evenly items-center w-full p-4 bg-recifis-blue text-white tabl:flex-row tabl:h-16',
    imgRecifis: "w-12 h-12",
    span: "uppercase",
    firstDiv: "flex items-center gap-4 font-bold",  
    ul: "flex justify-between gap-16 font-bold",
  },
})

const { container, imgRecifis, span, firstDiv, ul } = headerStyles()

export function Header() {
  return (
    <section className={container()}>
      <div className={firstDiv()}>
        <img className={imgRecifis()} src='/img/image5.png'></img>
        <h1>Projeto <span className={span()}>recifis</span></h1>
      </div>
      <ul className={ul()}>
        <li>Quem somos</li>
        <li>Conteúdo</li>
        <li>Notícias</li>
      </ul>
    </section>
  )
}
