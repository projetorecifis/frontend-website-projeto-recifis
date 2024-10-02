"use client"

import * as React from "react"
import { tv } from "tailwind-variants"

const footerStyles = tv({
  slots: {
    container: 'flex justify-center items-center w-full h-16 p-4 gap-16 bg-recifis-blue text-white',
    h1: "font-bold",
    imgRecifis: "w-12 h-12",
    firstDiv: "flex items-center gap-4",  
  },
})

const { container, h1, imgRecifis, firstDiv } = footerStyles()

export function Footer() {
  return (
    <section className={container()}>
      <div className={firstDiv()}>
        <img className={imgRecifis()} src='/img/ufvlogo.png'></img>
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
