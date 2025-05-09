import { Heading } from "@/components/created/Heading";
import { tv } from "tailwind-variants";
import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

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

const imagesInCarousel = [
  "/img/conteudo/raca-e-tributacao/page1.png",
  "/img/conteudo/raca-e-tributacao/page2.png",
  "/img/conteudo/raca-e-tributacao/page3.png",
  "/img/conteudo/raca-e-tributacao/page4.png",
  "/img/conteudo/raca-e-tributacao/page5.png",
  "/img/conteudo/raca-e-tributacao/page6.png",
  "/img/conteudo/raca-e-tributacao/page7.png",
  "/img/conteudo/raca-e-tributacao/page8.png",
  "/img/conteudo/raca-e-tributacao/page9.png"
]

export default async function Speechs() {
  // const response = await speechServi
  return (
      <main className="bg-recifis-salmonLight">
        <section className={sectionRecifisProject()}>
          <div className={divRecifisProject()}>
            <Heading className={h1()} variant="h1">★ Raça e Tributação ★</Heading>
          </div>
        </section>
        <Suspense>
        <Carousel className="hidden w-full m-auto max-w-144 pb-14 py-14 border-none phonlg:max-w-xl phonlg:block tabl:max-w-2xl desk:max-w-4xl">
              <CarouselContent>
                  {imagesInCarousel.map((src, index) => (
                  <CarouselItem key={index}>
                      <div className="p-1">
                        <Card className="h-96 bg-transparent border-none phonlg:h-128">
                            <CardContent className="bg-transparent flex flex-col aspect-square items-center w-full p-0 phonlg:justify-center phonlg:h-128 desk:p-6">
                              <Image 
                                  width={820}
                                  height={820}
                                  src={src}   
                                  alt={""}
                              />  
                            </CardContent>
                            
                        </Card>
                      </div>
                  </CarouselItem>
                  ))}
              </CarouselContent>
              {/* <p className="text-xs opacity-50 p-2 text-center phonlg:hidden">Para ver mais informações, arraste para o lado</p> */}

              <CarouselPrevious className="hidden text-center phonlg:flex" />
              <CarouselNext className="hidden phonlg:flex"/>
          </Carousel>
          <div>
          {imagesInCarousel.map((src, index) => (
              <div key={index} className="p-1 phonlg:hidden">
                <Card className=" bg-transparent border-none">
                    <CardContent className="bg-transparent flex flex-col items-center w-full p-0 phonlg:justify-center desk:p-6">
                      <Image 
                          width={820}
                          height={820}
                          src={src}   
                          alt={""}
                      />  
                    </CardContent>
                    
                </Card>
              </div>
      
          ))}
          </div>
        </ Suspense>
      </main>

  );
}
