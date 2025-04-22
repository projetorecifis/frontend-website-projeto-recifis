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
import { INewsDataResponse, INewsMetaDataResponse } from "@/services/interfaces/news.interface";
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
import { Link } from "lucide-react";

export default function ManagerNewsPage() {

  const searchParams = useSearchParams();
  const page = searchParams.get('page') || "1";
  const limit = 3;

  const [allNews, setAllNews] = useState<INewsDataResponse[] | undefined>();
  const [metaData, setMetaData] = useState<INewsMetaDataResponse | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const [newsToBeDeleted, setNewsToBeDeleted] = useState<{ id: string, imageId: string } | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllNews = async() => {
    const response = await NewsServices.getAllNews(page, limit);
    const newsResponse = response?.data?.news;
    const metaDataResponse = response?.data?.metaData;
    
    setAllNews(newsResponse);

    if(metaDataResponse !== undefined){
      setMetaData(metaDataResponse[0]);
    }

    if(response?.message === "No news were found"){
      setAllNews([]);
    }

    console.log(response);

    return response;
  }


  const triggerAlertDialog = (id: string, imageId: string) => {
    setOpen(true);
    setNewsToBeDeleted({ id, imageId });
  }

  const deleteNew = async () => {
    if(newsToBeDeleted !== undefined){
      setLoading(true);
      const response = await NewsServices.deleteNew(newsToBeDeleted.id, newsToBeDeleted.imageId);

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
  },[]);

  useEffect(() => {
    console.log(metaData);
  }, [metaData])

  return (
    <SidebarInset>
    <DashboardHeader breadcrumbNameLink="Notícias" breadcrumbLink="/dashboard/noticias/gerenciar" breadcrumbPage="Gerenciar notícias" />
    <div className="px-8">
      <h1 className="text-2xl font-bold">Gerenciar Notícias</h1>
      <p className="text-gray-400">Aqui você pode gerenciar as notícias do projeto recifis. Editar, remover e visualizá-las.</p>
      <a className="pt-4 flex gap-2 items-center hover:underline" href="/noticias">
        <Link size={12} /> 
        <p>Ir para a página de notícias</p>
      </a>
    </div>
    <div className="p-8">
    <Separator className="mb-8" />
    
        <Table>
          {(allNews?.length === 0 || allNews === undefined) && (
            <TableCaption className="py-12">Nenhuma notícia foi encontrada</TableCaption>
          )}
          <TableHeader>
            <TableRow>
              <TableHead className="w-20 text-center">Ordem</TableHead>
              <TableHead className="w-60">Título da notícia</TableHead>
              <TableHead className="w-60">Subtítulo da notícia</TableHead>
              <TableHead className="w-60">Texto da notícia</TableHead>
              <TableHead className="w-32">Link</TableHead>
              <TableHead className="w-40">Tipo da notícia</TableHead>
              <TableHead>Editar/Deletar</TableHead>
            </TableRow>
          </TableHeader>
          {allNews !== undefined  && !loading && (
            <TableBody>
                {allNews?.length >= 0 && allNews?.map((news: INewsDataResponse, index: number) => (
                  <TableRow className="text-justify" key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{news.title}</TableCell>
                    <TableCell>{news.subtitle.length > 120 ? news.subtitle.substring(0,120) + "..." : news.subtitle}</TableCell>
                    <TableCell>{news.text.length > 120 ? news.text.substring(0,190) + "..." : news.text}</TableCell>
                    <TableCell className="text-center">{news?.link === undefined ? "Não existe link para essa notícia" : news?.link.substring(0,25) + "..."}</TableCell>
                    <TableCell>{news.isInTop === "true" ? "Em alta" : "Padrão"}</TableCell>
                    <TableCell >
                      <div className="flex flex-row items-center">
                        <a 
                          href={"/dashboard/noticias/editar"
                            + "?id=" + news._id 
                            + "&title=" + news.title 
                            + "&subtitle=" + news.subtitle 
                            + "&text=" + news.text 
                            + "&image=" + news.image.path
                            + "&publicId=" + news.image.publicId
                            + "&isInTop=" + news.isInTop
                            + "&link=" + (news?.link === undefined ? "" : news?.link)
                              // news?.link === undefined ? "" : "&link=" + news?.link
                          }
                          className="text-blue-500">
                            Editar
                        </a>
                        <Button variant={"link"} onClick={() => triggerAlertDialog(news._id, news.image.publicId)} className="text-red-500">Deletar</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
      </Table>
  
      {!!allNews !== undefined && allNews?.length !== 0 && !!loading && (
        <div className="flex flex-col justify-center items-center space-y-4 py-2">
          <Skeleton className="h-96 w-full" />
          <Skeleton className="text-center h-8 w-112" />
        </div>
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