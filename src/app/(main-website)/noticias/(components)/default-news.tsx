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
import { useState } from "react";
import { INewsDataResponse } from "@/services/interfaces/news.interface";
import { Skeleton } from "@/components/ui/skeleton";
import { setCookies } from "@/utils/cookies";
import { useRouter, useSearchParams } from "next/navigation";
import { setNewsAtCookies } from "@/app/actions/news";


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


export default function DefaultContentNews({ defaultNews } :{ defaultNews: INewsDataResponse[] | undefined }) {
  const router = useRouter();

  const setNews = async (news :INewsDataResponse) => {
    localStorage.setItem("news", JSON.stringify(news));
    router.push(`/noticias/${news._id}`);
  }
  return (
        <div className="py-4">
          {defaultNews !== undefined && defaultNews?.length > 0 && defaultNews.map((news, index) => (
              <Card className="w-full bg-orange-50 flex flex-col justify-center pt-4 items-center tabl:items-start tabl:flex-row-reverse">
                  <CardHeader className="w-full flex flex-col gap-8 items-center justify-between tabl:items-start desk:w-1/2">
                      <div className="space-y-2">
                          <CardTitle>{news.title}</CardTitle>
                          {/* <p>Palestrantes: Nome dos palestrantes</p> */}
                          <CardDescription className="text-justify">
                            {news.subtitle.length > 120 ? news.subtitle.substring(0,120) + "..." : news.subtitle}
                          </CardDescription>
                      </div>
                      <div>
                      {news?.link === undefined && (
                        <Button 
                          onClick={() => setNews(news)} 
                          className="bg-recifis-blue hover:bg-recifis-orange font-bold uppercase"
                        >
                            Visualizar notícia
                        </Button>
                      )}
                      {news?.link !== undefined && (
                        <a href={news?.link} target="_blank" 
                          className="bg-recifis-blue text-white text-sm p-3 rounded-md hover:bg-recifis-orange font-bold uppercase">
                            Acessar notícia
                        </a>
                      )}
                      </div>
                  </CardHeader>
                  <CardContent>
                      <Image 
                          src={news.image.path}
                          width={320}
                          height={320}
                          alt="Imagem de pessoas sorrindo"
                          className={"rounded-lg"}
                      />
                  </CardContent>
              </Card>
          ))}
          {defaultNews === undefined || defaultNews?.length === 0 && (
              <Skeleton className="h-52 w-full" />
          )}
        </div>

  );
}
