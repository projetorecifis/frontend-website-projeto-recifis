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
import PodcastsServices from "@/services/podcasts.services";
import { useEffect, useState } from "react";
import { IPodcastsDataResponse, IPodcastsMetaDataResponse } from "@/services/interfaces/podcasts.interface";
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

export default function ManagerPodcastsPage() {

  const searchParams = useSearchParams();
  const page = searchParams.get('page') || "1";
  const limit = 10;

  const [allPodcasts, setAllPodcasts] = useState<IPodcastsDataResponse[] | undefined>();
  const [metaData, setMetaData] = useState<IPodcastsMetaDataResponse | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const [PodcastsToBeDeleted, setPodcastsToBeDeleted] = useState<{ id: string, imageId: string } | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllPodcasts = async() => {
    const response = await PodcastsServices.getAllPodcasts(page, limit);
    const podcastsResponse = response?.data?.podcasts;
    const metaDataResponse = response?.data?.metaData;
    
    setAllPodcasts(podcastsResponse);

    if(metaDataResponse !== undefined){
      setMetaData(metaDataResponse[0]);
    }

    if(response?.message === "No Podcasts were found"){
      setAllPodcasts([]);
    }

    return response;
  }


  const triggerAlertDialog = (id: string, imageId: string) => {
    setOpen(true);
    setPodcastsToBeDeleted({ id, imageId });
  }

  const deletePodcast = async () => {
    if(PodcastsToBeDeleted !== undefined){
      setLoading(true);
      const response = await PodcastsServices.deletePodcast(PodcastsToBeDeleted.id, PodcastsToBeDeleted.imageId);

      if(response?.status !== 200){
        toast.error("Não foi possível deletar o podcast, por favor, tente novamente mais tarde.");
        return;
      }
      setTimeout(() => {
        setLoading(false);  
        toast.success(response?.message);
        setPodcastsToBeDeleted(undefined);
        setOpen(false);
        getAllPodcasts();
      }, 1000);
    }
  }

  useEffect(() => {
    getAllPodcasts();
  })


  return (
    <SidebarInset>
    <DashboardHeader breadcrumbNameLink="Podcasts" breadcrumbLink="/dashboard/podcast/gerenciar" breadcrumbPage="Gerenciar Podcasts" />
    <div className="px-8">
      <h1 className="text-2xl font-bold">Gerenciar Podcasts</h1>
      <p className="text-gray-400">Aqui você pode gerenciar os podcasts do projeto recifis. Editar, remover e visualizá-las.</p>
      <a className="pt-4 flex gap-2 items-center hover:underline" href="/conteudos/podcasts">
        <Link size={12} /> 
        <p>Ir para a página de podcasts</p>
      </a>
    </div>
    <div className="p-8">
    <Separator className="mb-8" />
    
        <Table>
          {(allPodcasts?.length === 0 || allPodcasts == undefined) && (
            <TableCaption className="py-12">Nenhum podcast foi encontrada</TableCaption>
          )}
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Ordem</TableHead>
              <TableHead >Título do Podcast</TableHead>
              <TableHead >Descrição do Podcast</TableHead>
              <TableHead className="w-72">Participantes</TableHead>
              <TableHead>Link do Podcast</TableHead>
              <TableHead>Editar/Deletar</TableHead>
            </TableRow>
          </TableHeader>
          {allPodcasts !== undefined  && !loading && (
            <TableBody>
                {allPodcasts?.length > 0 && allPodcasts?.map((podcasts: IPodcastsDataResponse, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{podcasts.title}</TableCell>
                    <TableCell>{podcasts.description.length > 150 ? podcasts.description.substring(0,150) + "..." : podcasts.description}</TableCell>
                    <TableCell>
                      {JSON.parse(podcasts?.speakers).map((speaker: string, indexSpeaker: number) => (
                        <ul key={indexSpeaker}>
                          <li className="py-1" key={indexSpeaker}>{speaker}</li>
                        </ul>
                      ))}
                    </TableCell>
                    <TableCell>{podcasts?.link?.length > 30 ? podcasts.link.substring(0,30) + "..." : podcasts.link}</TableCell>
                    <TableCell >
                      <div className="flex flex-row items-center">
                        <a 
                          href={
                            "/dashboard/podcasts/editar"+ 
                            "?id=" + podcasts._id 
                            + "&title=" + podcasts.title 
                            + "&description=" + podcasts.description
                            + "&link="+ podcasts.link
                            + "&image=" + podcasts.image.path
                            + "&publicId=" + podcasts.image.publicId
                            + "&speakers=" + podcasts.speakers
                          } 
                          className="text-blue-500 dark:text-blue-400 hover:underline hover:underline-offset-4">
                            Editar
                        </a>
                        <Button 
                          variant={"link"} 
                          onClick={() => triggerAlertDialog(podcasts._id, podcasts.image.publicId)} 
                          className="text-red-500 dark:text-red-500">
                            Deletar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
      </Table>
  
      {!!allPodcasts !== undefined && allPodcasts?.length !== 0 && !!loading && (
        <div className="flex flex-col justify-center items-center space-y-4 py-2">
          <Skeleton className="h-144 w-full" />
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
      <AlertDialogContent className="dark:bg-zinc-800">
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja excluir este Podcast?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => {setPodcastsToBeDeleted(undefined)}}>Voltar</AlertDialogCancel>
          <AlertDialogAction onClick={deletePodcast} className="bg-red-500 dark:bg-red-800 dark:text-white dark:hover:bg-red-700">Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    
  </SidebarInset>
  );
}