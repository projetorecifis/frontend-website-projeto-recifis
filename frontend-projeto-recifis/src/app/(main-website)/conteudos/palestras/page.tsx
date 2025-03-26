import { Heading } from "@/components/created/Heading";
import { Button } from "@/components/ui/button";
import { tv } from "tailwind-variants";
import Image from "next/image";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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

const {
  sectionRecifisProject, h1, divRecifisProject
} = homePageStyles()

export default function Speechs() {
  return (
      <main className="bg-recifis-salmonLight">
        <section className={sectionRecifisProject()}>
          <div className={divRecifisProject()}>
            <Heading className={h1()} variant="h1">★ Palestras ★</Heading>
          </div>
        </section>

        <section >
        <div>
                <Carousel className="w-full m-auto pb-8 max-w-72 phonlg:max-w-xl tabl:max-w-2xl desk:max-w-4xl">
                    <CarouselContent>
                        {Array.from({ length: 1 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                            <Card className="h-128 bg-transparent">
                                <CardContent className="bg-transparent flex aspect-square items-center justify-center w-full h-144">
                                <iframe 
                                    width="880" 
                                    height="400" 
                                    src="https://www.youtube.com/embed/1_0y-_fS4pg?si=FPIZocFKDkvMw7g7" 
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; 
                                    clipboard-write; encrypted-media; 
                                    gyroscope; picture-in-picture; 
                                    web-share" 
                                    referrerPolicy="strict-origin-when-cross-origin" 
                                    allowFullScreen>
                                 </iframe>
                                    
                                {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                                </CardContent>
                            </Card>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
         
        </section>

        <section>
        <Card className="w-full flex flex-col justify-center pt-4 items-center tabl:items-start tabl:flex-row">
            <CardContent>
                <Image 
                    src="/img/conteudo/palestras/palestra_img.png"
                    width={500}
                    height={500}
                    alt="Imagem de pessoas sorrindo"
                    // className={imgPeopleSmiling}
                />
            </CardContent>
            <CardHeader className="w-full flex flex-col gap-8 items-center justify-between tabl:items-start desk:w-1/2">
                <div className="space-y-2">
                    <CardTitle>7° Congresso Luso-Brasileiro de Auditores Fiscais - Dia 2 </CardTitle>
                    <p>Palestrantes: Nome dos palestrantes</p>
                    <CardDescription className="text-justify">
                     Aqui você encontra palestras. Esse é um texto de teste, apenas para ver como vai ficar na página. É necessário trocar esse texto.
                    </CardDescription>
                </div>
                <div>
                    <Button className="bg-recifis-blue hover:bg-recifis-orange font-bold uppercase">
                        <a href="/quem-somos">Assistir palestra</a>
                    </Button>
                </div>
            </CardHeader>
        </Card>
        </section>
      </main>

  );
}
