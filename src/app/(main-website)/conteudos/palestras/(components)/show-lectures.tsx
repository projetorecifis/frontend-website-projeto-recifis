"use client"
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
import { Skeleton } from "@/components/ui/skeleton";

export default function ShowLectures() {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || "1";
    const limit = 10;
    
    const [lectures, setLectures] = useState<ILecturesDataResponse[] | undefined>(undefined);
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
        getLecturesByPage();
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
    
           <section>
                 <div className="py-4">
                 {lectures !== undefined && lectures?.length > 0 && lectures.map((lecture, index) => (
                     <Card key={index} className="w-full bg-orange-50 flex flex-col justify-center pt-4 items-center tabl:items-start tabl:flex-row-reverse">
                         <CardHeader className="w-full flex flex-col gap-8 items-center justify-between tabl:items-start desk:w-1/2">
                             <div className="space-y-2">
                                <CardTitle>{lecture.title}</CardTitle>
                                
                                <ul className="" >
                                    <li>
                                        Palestrantes: {" "}
                                        {JSON.parse(lecture?.speakers).map((speaker: string, indexSpeaker: number) => (
                                            JSON.parse(lecture?.speakers).length === indexSpeaker + 1 ? `${speaker}` : `${speaker}, `
                                        ))}
                                    </li>
                                   
                                    {/* {JSON.parse(lecture?.speakers).map((speaker: string, indexSpeaker: number) => (
                                        <li key={indexSpeaker}>{speaker}{JSON.parse(lecture?.speakers).length === indexSpeaker + 1 ? "" : ", "} </li>
                                    ))} */}
                                 </ul>
                                <CardDescription className="text-justify">
                                   {lecture.description}
                                </CardDescription>
                             </div>
                             <div>
                                {lecture?.link !== undefined && (
                                <a href={lecture?.link} target="_blank" 
                                    className="bg-recifis-blue text-white text-sm p-3 rounded-md hover:bg-recifis-orange font-bold uppercase">
                                    Acessar notícia
                                </a>
                                )}
                             </div>
                         </CardHeader>
                         <CardContent>
                             <Image 
                                 src={lecture.image.path}
                                 width={500}
                                 height={500}
                                 alt="Imagem de pessoas sorrindo"
                                 className={"rounded-lg"}
                             />
                         </CardContent>
                     </Card>
                 ))}
                 {lectures === undefined && (
                     <Skeleton className="h-52 w-full" />
                 )}
                 {lectures !== undefined && lectures?.length === 0 && (
                   <p className="text-center">Não há palstras por enquanto</p>
                 )}
               </div>
           </section>
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
