import { Heading } from "@/components/created/Heading";
import { Button } from "@/components/ui/button";
import { tv } from "tailwind-variants";
import Image from "next/image";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { INewsDataResponse } from "@/services/interfaces/news.interface";
import { Skeleton } from "@/components/ui/skeleton";

const homePageStyles = tv({
  slots: {
    sectionRecifisProject: "flex flex-col justify-center items-center w-full p-4 tabl:flex-row",
    imgRecifis: " duration-300 hover:scale-110",
    imgHug: "duration-300 hover:scale-110 p-4 desk:ml-4 ",
    imgTreeWords: "h-text-center duration-300 hover:scale-110",
    imgPeopleSmiling: "w-full opacity-55 h-auto",
    h1KnowMoreAboutOurProject: "text-recifis-blue text-4xl",
    divRecifisProject: "flex flex-col items-center gap-4 p-4",
    h1: "uppercase text-recifis-blue font-bold text-center text-2xl drop-shadow-lg shadow-black tabl:text-4xl",
    sectionKnowMoreAboutOurProject: "flex flex-col justify-center items-center w-full pt-10 tabl:flex-row",
    h1Recifis: "uppercase text-slate-950",
    divKnowMoreAboutOurProject: " flex flex-col items-start gap-6 p-6 desk:p-0 desk:w-1/3",

  },
})

const text = "'Mil vezes melhor que celular': por que as câmeras Cyber-shot estão saindo da gaveta direto para o rolê dos jovens"
type NewsType = "carousel" | "top" | "default";
const allNews = [
    {
        title: text,
        description: "Oi",
        image: "/img/conteudo/palestras/palestra_img.png",
        href: "/quem-somos",
        date: "2023-10-01",
        type: "carousel" as NewsType,
    },
    {
        title: text,
        description: "Oi",
        image: "/img/conteudo/palestras/palestra_img.png",
        href: "/quem-somos",
        date: "2023-10-01",
        type: "top" as NewsType,
    },

]


const {
  sectionRecifisProject, h1, divRecifisProject
} = homePageStyles()


export default function TopNews({ news } :{ news: INewsDataResponse[] | undefined }) {

    return (
        <div className="flex gap-16 justify-center w-full">
                <Carousel className="w-full pb-8 max-w-72 phonlg:max-w-xl tabl:max-w-2xl desk:max-w-2xl">
                    {news === undefined || news.length === 0 && (
                        <div className="flex flex-col items-center justify-between gap-2  mt-0 m-auto">
                            <Skeleton className="text-center w-192 h-12" />
                            <Separator className="my-4" />
                            <Skeleton className="text-center w-192 h-12" />
                            <Skeleton className="py-12 my-10 text-center w-192 h-112" />
                        </div>
                    )}
                    <CarouselContent>
                        {news?.map((item, index) => (
                            <CarouselItem key={index}>
                                    <Card className="bg-transparent border-none">
                                        <CardHeader className="bg-transparent flex flex-col items-center justify-center p-0">
                                            <CardTitle className="text-recifis-blue text-center font-mono py-2 uppercase">{item?.title}</CardTitle>
                                            <Separator className="w-full" />
                                        </CardHeader>
                                        <CardDescription className="text-recifis-blue text-sm text-center pt-2">{item?.subtitle}</CardDescription>
                                        <CardContent className="bg-transparent flex aspect-square items-center justify-center w-full h-144">
                                            <Image
                                                src={item?.image?.path}
                                                width={880}
                                                height={800}
                                                alt="Imagem de pessoas sorrindo"
                                                className="rounded-xl"
                                            /> 
                                        </CardContent> 
                                    </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {news !== undefined && news?.length > 0 && (
                        <div>
                            <CarouselPrevious />
                            <CarouselNext />
                        </div>
                    )}
                    
                </Carousel>
            <div className="flex flex-col justify-between max-w-128">
                <Card className="items-center justify-center bg-orange-50">
                    <CardTitle className="text-recifis-blue text-center font-mono py-2 uppercase w-128">Notícias em alta</CardTitle>
                    <Separator />
                    <CardContent className="p-0 ">
                        {news !== undefined && news?.length > 0 && news?.map((item, index) => (
                            <a 
                                href={item?.link} 
                                className="flex gap-4 items-center justify-center p-5 transition-all hover:bg-orange-100 hover:cursor-pointer"
                                key={index}
                            >
                                <h1 className="text-recifis-blue font-bold text-md text-justify ">{item?.title?.substring(0,75) + "..."}</h1>
                                <Image 
                                    src={item?.image?.path}
                                    width={180}
                                    height={100}
                                    alt="Imagem de pessoas sorrindo"
                                    className="rounded-xl"
                                    // className={imgPeopleSmiling}
                                />
                            </a>
                        ))}
                        <Separator className="" />
                    </CardContent>
                    {news === undefined || news?.length === 0 && (
                        <CardContent>
                            <Skeleton className="mt-8 h-112" />
                        </CardContent>
                    )}
                </Card>
            </div>
        </div>
  );
}
