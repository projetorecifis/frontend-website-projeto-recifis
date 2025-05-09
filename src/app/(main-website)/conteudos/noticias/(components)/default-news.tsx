import { Button } from "@/components/ui/button";
import Image from "next/image";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { INewsDataResponse } from "@/services/interfaces/news.interface";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";


// const allNews = [
//     {
//         title: text,
//         description: "Oi",
//         image: "/img/conteudo/palestras/palestra_img.png",
//         href: "/quem-somos",
//         date: "2023-10-01",
//         type: "carousel" as NewsType,
//     },
//     {
//         title: text,
//         description: "Oi",
//         image: "/img/conteudo/palestras/palestra_img.png",
//         href: "/quem-somos",
//         date: "2023-10-01",
//         type: "top" as NewsType,
//     },

// ]


export default function DefaultContentNews({ defaultNews } :{ defaultNews: INewsDataResponse[] | undefined }) {
  const router = useRouter();

  const setNews = async (news :INewsDataResponse) => {
    localStorage.setItem("news", JSON.stringify(news));
    router.push(`/noticias/${news._id}`);
  }
  return (
        <div className="py-4">
          {defaultNews !== undefined && defaultNews?.length > 0 && defaultNews.map((news, index) => (
              <Card key={index} className="w-full bg-orange-50 flex flex-col justify-center pt-4 items-center dark:border-zinc-200 dark:bg-orange-50 tabl:items-start tabl:flex-row-reverse">
                  <CardHeader className="w-full flex flex-col gap-8 items-center justify-between dark:text-black tabl:items-start desk:w-1/2">
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
          {defaultNews === undefined && (
              <Skeleton className="h-52 w-full" />
          )}
          {defaultNews !== undefined && defaultNews?.length === 0 && (
            <p className="text-center">Não há notícias por enquanto</p>
          )}
        </div>

  );
}
