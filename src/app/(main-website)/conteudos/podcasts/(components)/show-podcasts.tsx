"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Play, CirclePlay, Mic, Podcast } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { ChangeTheme } from "@/components/created/ChangeTheme";



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
        <section className="m-auto  flex flex-col justify-center items-center rounded-lg tabl:flex-row tabl:max-h-dvh desk:w-456 desk:gap-16">
            <div className="tabl:px-4 desk:px-0">
                {currentImage && (
                    <Image 
                        src={currentImage}
                        alt=""
                        width={480}
                        height={480}
                        className="rounded-lg"
                    />
                )}
                {!currentImage && (
                    <Card className="w-80 h-80 bg-slate-300 dark:bg-slate-600 dark:border-none">
                        <CardContent className="flex items-center justify-center">
                            <Mic className="text-center mt-24 text-slate-800" size={120} />
                        </CardContent>
                    </Card>
                )}
                 <div className="flex items-center justify-center gap-2 py-4">
                    <p>Tente trocar o tema:</p>
                    <ChangeTheme />
                </div>
            </div>

           <div className="w-full rounded-lg scroll-smoothpb-8 dark:bg-gray-900 ">
            
                <div className="flex items-center justify-center py-4 text-center text-sm tabl:text-basic tabl:gap-2 dark:bg-slate-900">
                    <Podcast className="mx-4 tabl:mx-0" />
                    <h1>Veja a lista de podcasts que preparamos especialmente para você:</h1>
                </div>
                <ScrollArea className="rounded-md tabl:h-screen">
                    <Accordion type="single" collapsible className="w-full border-2 rounded-lg dark:text-slate-300 dark:border-none max-h-112  ">
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
                                    <h1 className="font-bold text-md tabl:text-xl dark:text-slate-300">{podcast?.title}</h1>
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

