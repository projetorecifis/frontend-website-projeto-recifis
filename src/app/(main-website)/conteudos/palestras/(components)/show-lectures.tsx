"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ILecturesDataResponse, ILecturesMetaDataResponse } from "@/services/interfaces/lectures.interface";
import { PaginationWithLinks } from "@/components/created/PaginationWithLinks";
import LecturesServices from "@/services/lectures.services";

export default function ShowLectures() {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || "1";
    const limit = 10;
    
    const [lectures, setLectures] = useState<ILecturesDataResponse[] | undefined>([]);
    const [metaData, setMetaData] = useState<ILecturesMetaDataResponse | undefined>(undefined);
    

    const getLecturesByPage = async () => {
        const response = await LecturesServices.getAllLectures(page, limit);
        const lecturesResponse = response?.data?.lectures;
        const metaDataResponse = response?.data?.metaData;
        
        setLectures(lecturesResponse);

        if(metaDataResponse !== undefined){
          setMetaData(metaDataResponse[0]);
        }
    
        if(response?.message === "No news were found"){
            setLectures([]);
        }
    
        console.log(response);
    }

    useEffect(() => {

    }, [])
    return (
        <section >
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
            <section className="py-4">
                {metaData !== undefined && (
                    <PaginationWithLinks 
                        page={metaData.page}
                        pageSize={limit}
                        totalCount={metaData.totalDocuments}
                    />
                )}
            </section>
    </section>
  );
}
