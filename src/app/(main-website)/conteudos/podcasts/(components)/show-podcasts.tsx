"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Play, CirclePlay, Mic } from "lucide-react";
import { BaselinePlayCircle, PlaySkipBackSharp, PlaySkipForwardSharp } from "./icon";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react";


const podcasts = [
    {
        title: "Título aqui",
        littleDescription: "Maria Angélica",
        littleText: "Conteúdo aqui",
        image: "/img/conteudo/podcasts/ep3.jpg",
        link: "",
    },
    {
        title: "Título aqui",
        littleDescription: "Maria Angélica",
        littleText: "Conteúdo aqui",
        image: "/img/conteudo/podcasts/impostor.jpg",
        link: "",
    },
    {
        title: "Título aqui",
        littleDescription: "Maria Angélica",
        littleText: "Conteúdo aqui",
        image: "/img/conteudo/podcasts/ep3.jpg",
        link: "",
    },
    {
        title: "Título aqui",
        littleDescription: "Maria Angélica",
        littleText: "Conteúdo aqui",
        image: "/img/conteudo/podcasts/ep3.jpg",
        link: "",
    },
    {
        title: "Título aqui",
        littleDescription: "Maria Angélica",
        littleText: "Conteúdo aqui",
        image: "/img/conteudo/podcasts/ep3.jpg",
        link: "",
    },
    {
        title: "Título aqui dasdada adajsdaskdj adkaksdj akdj dasdlasdklnsd kdskads asdoadoiajdosaidjsaoidj asjdajdoajds",
        littleDescription: "Maria Angélica",
        littleText: "Conteúdo aqui",
        image: "/img/conteudo/podcasts/ep3.jpg",
        link: "",
    },
    {
        title: "Título aqui",
        littleDescription: "Maria Angélica",
        littleText: "Conteúdo aqui",
        image: "/img/conteudo/podcasts/ep3.jpg",
        link: "",
    },
    {
        title: "Título aqui",
        littleDescription: "Maria Angélica",
        littleText: "Conteúdo aqui",
        image: "/img/conteudo/podcasts/ep3.jpg",
        link: "",
    },
]

export default function ShowPodcasts() {
    const [currentImage, setCurrentImage] = useState<string>();
    const changeImage = (image: string) => {
        setCurrentImage(image);
    }   
    return (
        <section className="m-auto w-456 flex flex-row-reverse justify-center max-h-dvh items-center rounded-lg pb-16 gap-16">
            <div className="w-1/2">
                {currentImage && (
                    <Image 
                        src={currentImage}
                        alt="Logo do Recifis"
                        width={380}
                        height={380}
                        className="rounded-lg"
                    />
                )}
                {!currentImage && (
                    <Card className="w-96 h-96 bg-slate-300 dark:bg-slate-600 dark:border-none">
                        <CardContent className="flex items-center justify-center">
                            <Mic className="text-center mt-32 text-slate-800" size={150} />
                        </CardContent>
                    </Card>
                )}
            </div>

           <div className="w-full rounded-lg scroll-smooth bg-slate-200 dark:bg-gray-900">
                <ScrollArea className="h-screen rounded-md">
                    <Accordion type="single" collapsible className="w-full border-2 border-gray-300 rounded-lg dark:text-slate-300 dark:border-none">
                    {podcasts?.map((podcast, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className=" rounded-md border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-slate-600">
                            <AccordionTrigger 
                                onClick={() => changeImage(podcast?.image)}
                                className="justify-start gap-4 no-underline px-4"
                                // chevronDownClassName="hidden"
                            >
                                <Image    
                                    src={podcast?.image}
                                    alt="Logo do Recifis"
                                    width={80}
                                    height={80}
                                    className="rounded-lg"
                                />
                                <div className="text-start">
                                    <h1 className="font-bold text-xl dark:text-slate-300">{podcast?.title}</h1>
                                    <p className="dark:text-gray-400">{podcast?.littleDescription}</p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 flex flex-col">
                                <p className="py-1 px-8">{podcast?.littleText}</p>
                                <a 
                                    href={podcast?.link}
                                    className="flex items-center justify-center gap-2 my-1 rounded-lg bg-slate-50  hover:cursor-pointer dark:hover:bg-slate-600 dark:bg-slate-700 ">
                                    <Play className="w-4 h-4" />
                                    {"Ouvir podcast"}
                                    <Image 
                                        src={"/img/spotify-button.png"}
                                        alt="Logo do Recifis"
                                        width={80}
                                        height={80}
                                        className="rounded-lg"
                                    />
                                </a>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                    </Accordion>
                </ScrollArea>

           </div>
        </section>
    );
}

