"use client"
import DashboardHeader from "@/components/dashboard-header";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
} from "@/components/ui/sidebar"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import NewsServices from "@/services/news.services";
import { useEffect, useState } from "react";
import { INewsDataResponse, INewsMetaDataResponse } from "@/services/interfaces/news.interface";
import { useSearchParams } from 'next/navigation'
import { PaginationWithLinks } from "@/components/created/PaginationWithLinks";
import { Skeleton } from "@/components/ui/skeleton";

export default function ManagerNewsPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || "1";
  const limit = 3;

  const [allNewsResponse, setAllNewsResponse] = useState<INewsDataResponse[] | undefined>(undefined);
  const [metadata, setMetadata] = useState<INewsMetaDataResponse | undefined>(undefined);

    
  const getAllNews = async() => {
    const response = await NewsServices.getAllNews(page, limit);

    if(response?.data !== undefined && response?.metaData !== undefined){
      setAllNewsResponse(response?.data);
      setMetadata(response?.metaData[0]);
    }
    console.log(response);

    return response;
  }

  useEffect(() => {
    getAllNews();
  }, [])

  return (
    <SidebarInset>
    <DashboardHeader breadcrumbNameLink="Notícias" breadcrumbLink="/dashboard/noticias/gerenciar" breadcrumbPage="Gerenciar notícias" />
    <div className="px-8">
      <h1 className="text-2xl font-bold">Gerenciar notícias</h1>
      <p className="text-gray-400">Aqui você pode gerenciar as notícias do projeto recifis. Editar, remover e visualizá-las.</p>
    </div>
    <div className="p-8">
    <Separator className="mb-8" />
    {!!allNewsResponse === false && (
      <div className="flex flex-col justify-center items-center space-y-4">
        <Skeleton className="h-160 w-full" />
        <Skeleton className="text-center h-8 w-112" />
      </div>
    )}
    {!!allNewsResponse && (
        <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Ordem</TableHead>
            <TableHead className="w-80">Título da notícia</TableHead>
            <TableHead >Descrição da notícia</TableHead>
            <TableHead className="w-80">Palestrantes</TableHead>
            <TableHead>Editar/Deletar</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {allNewsResponse?.length > 1 && allNewsResponse?.map((news: INewsDataResponse, index: number) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{news.title}</TableCell>
              <TableCell>{news.description.length > 120 ? news.description.substring(0,120) + "..." : news.description}</TableCell>
              <TableCell>
                {JSON.parse(news.speakers).map((speaker: string, indexSpeaker: number) => (
                  <ul>
                    <li className="py-1" key={indexSpeaker}>{speaker}</li>
                  </ul>
                ))}
              </TableCell>
              <TableCell >
                <div className="flex flex-row gap-4">
                  <a 
                    href={"/dashboard/noticias/editar/" + news._id + "?title=" + news.title + "&description=" + news.description + "&speakers=" + news.speakers} 
                    className="text-blue-500">
                      Editar
                  </a>
                  <button className="text-red-500">Deletar</button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
      {metadata !== undefined && (
        <PaginationWithLinks 
          page={metadata.page}
          pageSize={limit}
          totalCount={metadata.totalDocuments}
        />
      )}
    </div>
    
  </SidebarInset>
  );
}