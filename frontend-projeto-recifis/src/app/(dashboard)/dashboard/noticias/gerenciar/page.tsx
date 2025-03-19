"use client"
import DashboardHeader from "@/components/dashboard-header";
import { Separator } from "@/components/ui/separator";
import { SidebarInset } from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import NewsServices from "@/services/news.services";
import { useEffect, useState } from "react";
import { INewsDataResponse, INewsImage, INewsMetaDataResponse } from "@/services/interfaces/news.interface";
import { useSearchParams } from 'next/navigation'
import { PaginationWithLinks } from "@/components/created/PaginationWithLinks";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner";

export default function ManagerNewsPage() {

  const searchParams = useSearchParams();
  const page = searchParams.get('page') || "1";
  const limit = 3;

  const [allNewsResponse, setAllNewsResponse] = useState<INewsDataResponse[] | undefined>(undefined);
  const [metaData, setMetaData] = useState<INewsMetaDataResponse | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const [newsToBeDeleted, setNewsToBeDeleted] = useState<{ id: string, image: string } | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllNews = async() => {
    const response = await NewsServices.getAllNews(page, limit);
    const newsResponse = response?.data?.news;
    const metaDataResponse = response?.data?.metaData;
    
    setAllNewsResponse(newsResponse);

    if(metaDataResponse !== undefined){
      setMetaData(metaDataResponse[0]);
    }

    if(response?.message === "No news were found"){
      setAllNewsResponse([]);
    }

    console.log(response);

    return response;
  }


  const triggerAlertDialog = (id: string, image: string) => {
    setOpen(true);
    setNewsToBeDeleted({ id, image });
  }

  const deleteNew = async () => {
    if(newsToBeDeleted !== undefined){
      setLoading(true);
      const response = await NewsServices.deleteNew(newsToBeDeleted.id, newsToBeDeleted.image);

      if(response?.status !== 200){
        toast.error("Não foi possível deletar a notícia, por favor, tente novamente mais tarde.");
        return;
      }
      setTimeout(() => {
        setLoading(false);  
        toast.success("Notícia deletada com sucesso!");
        setNewsToBeDeleted(undefined);
        setOpen(false);
        getAllNews();
      }, 1000);
    }
  }

  useEffect(() => {
    getAllNews();
  }, [])

  useEffect(() => {
    console.log(metaData);
  }, [metaData])

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
    {allNewsResponse !== undefined && (
        <Table>
          {allNewsResponse?.length === 0 && (
            <TableCaption className="py-12">Nenhuma notícia foi encontrada</TableCaption>
          )}
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
            {allNewsResponse?.length >= 0 && allNewsResponse?.map((news: INewsDataResponse, index: number) => (
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
                  <div className="flex flex-row items-center">
                    <a 
                      href={"/dashboard/noticias/editar"+ "?id=" + news._id + "&title=" + news.title + "&description=" + news.description + "&speakers=" + news.speakers + "&image=" + news.image.path} 
                      className="text-blue-500">
                        Editar
                    </a>
                    <Button variant={"link"} onClick={() => triggerAlertDialog(news._id, news.image.path)} className="text-red-500">Deletar</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
    )}
      {metaData !== undefined && (
        <PaginationWithLinks 
          page={metaData.page}
          pageSize={limit}
          totalCount={metaData.totalDocuments}
        />
      )}
    </div>

    <AlertDialog open={open} onOpenChange={setOpen} >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja excluir esta notícia?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => {setNewsToBeDeleted(undefined)}}>Voltar</AlertDialogCancel>
          <AlertDialogAction onClick={deleteNew} className="bg-red-500">Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    
  </SidebarInset>
  );
}