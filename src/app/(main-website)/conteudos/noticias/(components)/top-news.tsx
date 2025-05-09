import Image from "next/image";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator";
import { INewsDataResponse } from "@/services/interfaces/news.interface";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function TopNews({ news } :{ news: INewsDataResponse[] | undefined }) {
     const router = useRouter();

    const setNews = async (news :INewsDataResponse) => {
        localStorage.setItem("news", JSON.stringify(news));
        router.push(`/conteudos//noticias/${news._id}`);
      }

    return (
        <div className="flex flex-col justify-center w-full items-center desk:items-start desk:flex-row desk:gap-16">
                <Carousel className="w-full max-w-72 phonlg:max-w-xl tabl:max-w-2xl tabl:pb-8 desk:max-w-2xl">
                    {news === undefined && (
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
                                    <Card className="bg-transparent border-none dark:bg-transparent">
                                        <CardHeader className="bg-transparent flex flex-col items-center justify-center p-0 dark:bg-transparent">
                                            <CardTitle className="text-recifis-blue text-2xl text-center font-mono py-2 uppercase">{item?.title}</CardTitle>
                                            <Separator className="w-full dark:bg-zinc-200" />
                                        </CardHeader>
                                        <CardDescription className="text-recifis-blue text-md text-center pt-2 dark:text-recifis-blue">{item?.subtitle}</CardDescription>
                                        <CardContent className="bg-transparent flex aspect-square items-center justify-center w-full p-0 tabl:h-144">
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
                        <div className="mt-16 tabl:mt-0">
                            <CarouselPrevious />
                            <CarouselNext />
                        </div>
                    )}
                    
                </Carousel>
            <div className="flex flex-col justify-between max-w-128">
                <Card className="items-center justify-center bg-orange-50 flex-col dark:bg-orange-50 dark:border-zinc-200">
                    <CardTitle className="text-recifis-blue text-center font-mono py-2 uppercase phonlg:w-128">Notícias em alta</CardTitle>
                    <Separator className="dark:bg-zinc-200" />
                    <CardContent className="p-2 ">
                        {news !== undefined && news?.length > 0 && news?.map((item, index) => (
                            <a 
                                href={item?.link !== undefined ? item?.link : "#"}
                                onClick={item?.link === undefined ? () => setNews(item) : undefined} 
                                className="flex items-center justify-center transition-all hover:bg-orange-100 gap-2 hover:cursor-pointer tabl:gap-4 desk:p-5"
                                key={index}
                            >
                                <h1 className="text-recifis-blue font-bold text-sm w-44 text-justify tabl:text-md tabl:w-full">{item?.title?.substring(0,75) + "..."}</h1>
                                <Image 
                                    src={item?.image?.path}
                                    width={150}
                                    height={100}
                                    alt="Imagem de pessoas sorrindo"
                                    className="rounded-xl"
                                    // className={imgPeopleSmiling}
                                />
                            </a>
                        ))}
                        <Separator className="dark:bg-zinc-200" />
                    </CardContent>
                    {news === undefined && (
                        <CardContent>
                            <Skeleton className="mt-8 h-112" />
                        </CardContent>
                    )}
                </Card>
            </div>
        </div>
  );
}
