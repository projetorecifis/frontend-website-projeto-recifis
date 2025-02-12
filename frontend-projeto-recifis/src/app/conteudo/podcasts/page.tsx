"use client"

// import Image from "next/image";
// import { tv } from "tailwind-variants";
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
//   } from "@/components/ui/accordion"
// import { Button } from "@/components/ui/button";
  

// const homePageStyles = tv({
//     slots: {
//         mainSection: "bg-recifis-light-blue w-full flex flex-col desk:flex-row max:h-full",
//     },
   
// })

// const { mainSection } = homePageStyles()



 
// import * as React from "react"

export default function Content() {
    return (
        <main className="max:h-full bg-recifis-salmonLight">
            <div className="bg-recifis-orange shadow-sm">
                <h1 className="uppercase text-center text-4xl font-bold py-12 text-white shadow-md">Podcasts</h1>
            </div>
            {/* <section className="py-4 flex justify-center w-full">
                <div className="flex flex-col items-center justify-between w-full">
                    <h1 className="py-4 uppercase text-3xl text-recifis-blue font-bold">Podcasts</h1>
                    <Image
                        src="/img/conteudo/icon-podcast.png"
                        width={175}
                        height={175}
                        alt=""
                    />
                    <Button className=" bg-recifis-blue hover:bg-recifis-orange font-bold uppercase">
                        <a href="/quem-somos">Saiba mais</a>
                    </Button>
                </div>
                <div className="flex flex-col items-center justify-between w-full">
                    <h1 className="py-4 uppercase text-3xl text-recifis-orange font-bold">Palestras</h1>
                    <Image
                        src="/img/conteudo/icon-palestrante.png"
                        width={175}
                        height={175}
                        alt=""
                    />
                    <Button className=" bg-recifis-orange hover:bg-recifis-blue font-bold uppercase">
                        <a href="/quem-somos">Saiba mais</a>
                    </Button>
                </div>
            </section> */}
        </main>
    );
}

