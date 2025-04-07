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

export default function NewsPage() {
  return (
      <main className="bg-recifis-salmonLight">
        <section className={sectionRecifisProject()}>
          <div className={divRecifisProject()}>
            <Heading className={h1()} variant="h1">★ Notícias ★</Heading>
          </div>
        </section>

        <section >
        <div className="flex justify-center w-full gap-14">
            <Carousel className="w-full pb-8 max-w-72 phonlg:max-w-xl tabl:max-w-2xl desk:max-w-2xl">
                <CarouselContent>
                    {Array.from({ length: 1 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                        <Card className="h-128 bg-transparent">
                            <CardContent className="bg-transparent flex aspect-square items-center justify-center w-full h-144">
                                <Image
                                    src="/img/conteudo/palestras/palestra_img.png"
                                    width={880}
                                    height={800}
                                    alt="Imagem de pessoas sorrindo"
                                    className="rounded-xl"
                                    // className={imgPeopleSmiling}
                                /> 
                            </CardContent> 
                        </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="flex flex-col justify-between max-w-128">
                <Card className="items-center justify-center bg-background">
                   <CardTitle className="text-recifis-blue text-center font-mono py-2 uppercase">Notícias em alta</CardTitle>
                   <Separator />
                   <CardContent className="p-0 ">
                        <div className="flex gap-4 items-center justify-center p-4 hover:">
                            <h1 className="text-recifis-blue font-bold text-md text-justify ">{text.substring(0,75) + "..."}</h1>
                            <Image 
                                src="/img/conteudo/palestras/palestra_img.png"
                                width={180}
                                height={100}
                                alt="Imagem de pessoas sorrindo"
                                className="rounded-xl"
                                // className={imgPeopleSmiling}
                            />
                        </div>
                        <Separator className="my-2" />
                        <div className="flex gap-4 items-center justify-center p-4">
                            <h1 className="text-recifis-blue font-bold text-md text-justify ">{text.substring(0,75) + "..."}</h1>
                            <Image 
                                src="/img/conteudo/palestras/palestra_img.png"
                                width={180}
                                height={100}
                                alt="Imagem de pessoas sorrindo"
                                className="rounded-xl"
                                // className={imgPeopleSmiling}
                            />
                        </div>
                        <div className="flex gap-4 items-center justify-center p-4">
                            <h1 className="text-recifis-blue font-bold text-md text-justify ">{text.substring(0,75) + "..."}</h1>
                            <Image 
                                src="/img/conteudo/palestras/palestra_img.png"
                                width={180}
                                height={100}
                                alt="Imagem de pessoas sorrindo"
                                className="rounded-xl"
                                // className={imgPeopleSmiling}
                            />
                        </div>
                   </CardContent>
                </Card>
                {/* <Card className="flex items-center justify-center">
                    <CardHeader>
                        <CardTitle className="text-md">'Mil vezes melhor que celular': por que as câmeras Cyber-shot estão saindo da gaveta direto para o rolê dos jovens</CardTitle>
                    </CardHeader>
                    <CardContent>Oi</CardContent>
                </Card>
                <Card className="flex items-center justify-center">
                    <CardHeader>
                        <CardTitle>Nome da noticia aqui</CardTitle>
                    </CardHeader>
                    <CardContent>Oi</CardContent>
                </Card>
                <Card className="flex items-center justify-center">
                    <CardHeader>
                        <CardTitle>Nome da noticia aqui</CardTitle>
                    </CardHeader>
                    <CardContent>Oi</CardContent>
                </Card> */}
            </div>
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
