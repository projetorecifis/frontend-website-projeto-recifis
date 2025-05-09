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
import LecturesServices from "@/services/lectures.services";
import { useEffect, useState } from "react";
import { ILecturesDataResponse, ILecturesMetaDataResponse } from "@/services/interfaces/lectures.interface";
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
import { Link } from "lucide-react"
export default function ManagerLecturesPage() {

  const searchParams = useSearchParams();
  const page = searchParams.get('page') || "1";
  const limit = 3;

  const [allLectures, setAllLectures] = useState<ILecturesDataResponse[] | undefined>([]);
  const [metaData, setMetaData] = useState<ILecturesMetaDataResponse | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const [lecturesToBeDeleted, setLecturesToBeDeleted] = useState<{ id: string, imageId: string } | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllLectures = async() => {
    const response = await LecturesServices.getAllLectures(page, limit);
    const lecturesResponse = response?.data?.lectures;
    const metaDataResponse = response?.data?.metaData;

    setAllLectures(lecturesResponse);

    if(metaDataResponse !== undefined){
      setMetaData(metaDataResponse[0]);
    }

    if(response?.message === "No Lectures were found"){
      setAllLectures([]);
    }

    console.log(response);

    return response;
  }


  const triggerAlertDialog = (id: string, imageId: string) => {
    setOpen(true);
    setLecturesToBeDeleted({ id, imageId });
  }

  const deleteLecture = async () => {
    if(lecturesToBeDeleted !== undefined){
      setLoading(true);
      const response = await LecturesServices.deleteLecture(lecturesToBeDeleted.id, lecturesToBeDeleted.imageId);

      if(response?.status !== 200){
        toast.error("Não foi possível deletar a palestra, por favor, tente novamente mais tarde.");
        return;
      }
      setTimeout(() => {
        setLoading(false);  
        toast.success(response?.message);
        setLecturesToBeDeleted(undefined);
        setOpen(false);
        getAllLectures();
      }, 1000);
    }
  }

  useEffect(() => {
    getAllLectures();
  },[])

  useEffect(() => {
    console.log(allLectures);
  }, [allLectures])

  return (
    <SidebarInset>
    <DashboardHeader breadcrumbNameLink="Palestras" breadcrumbLink="/dashboard/palestras/gerenciar" breadcrumbPage="Gerenciar palestras" />
    <div className="px-8">
      <h1 className="text-2xl font-bold">Gerenciar Palestras</h1>
      <p className="text-gray-400">Aqui você pode gerenciar as palestras do projeto recifis. Editar, remover e visualizá-las.</p>
      <a className="pt-4 flex gap-2 items-center hover:underline" href="/conteudos/palestras">
        <Link size={12} /> 
        <p>Ir para a página de palestras</p>
      </a>
    </div>
    <div className="p-8 pt-2">
    <Separator className="mb-8" />
        <Table>
          {allLectures?.length === 0 || allLectures === undefined && (
            <TableCaption className="py-12">Nenhuma palestra foi encontrada</TableCaption>
          )}
           
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ordem</TableHead>
              <TableHead className="w-72" >Título da palestra</TableHead>
              <TableHead className="w-72">Descrição da palestra</TableHead>
              <TableHead className="w-20">Link da palestra</TableHead>
              <TableHead className="w-20">Está no carrossel</TableHead>
              <TableHead className="w-72">Palestrantes</TableHead>
              <TableHead>Editar/Deletar</TableHead>
            </TableRow>
          </TableHeader>
          {allLectures !== undefined && !loading && (
            <TableBody>
              {allLectures?.length >= 0 && allLectures?.map((lectures: ILecturesDataResponse, index: number) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{lectures?.title}</TableCell>
                  <TableCell>{lectures?.description?.length > 120 ? lectures.description.substring(0,120) + "..." : lectures?.description}</TableCell>
                  <TableCell>{lectures?.link?.length > 20 ? lectures?.link?.substring(0,20) + "..." : lectures?.link}</TableCell>
                  <TableCell>{lectures?.isInCarousel === "true" ? "Sim" : "Não"}</TableCell>
                  <TableCell>
                    {JSON.parse(lectures?.speakers).map((speaker: string, indexSpeaker: number) => (
                      <ul key={indexSpeaker}>
                        <li className="py-1" key={indexSpeaker}>{speaker}</li>
                      </ul>
                    ))}
                  </TableCell>
                  <TableCell >
                    <div className="flex flex-row items-center">
                      <a 
                        href={
                          "/dashboard/palestras/editar"+ "?id=" + lectures._id 
                          + "&title=" + lectures?.title 
                          + "&description=" + lectures?.description 
                          + "&link="+ lectures?.link 
                          + "&speakers=" + lectures?.speakers 
                          + "&image=" + lectures?.image?.path 
                          + "&publicId=" + lectures?.image?.publicId
                          + "&isInCarousel=" + lectures?.isInCarousel
                        }  
                        className="text-blue-500 dark:text-blue-400 hover:underline hover:underline-offset-4">
                          Editar
                      </a>
                      <Button 
                        variant={"link"} 
                        onClick={() => triggerAlertDialog(lectures._id, lectures.image.publicId)} 
                        className="text-red-500 dark:text-red-500"
                      >
                        Deletar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
      </Table>
      {!!allLectures !== undefined && allLectures?.length !== 0 && !!loading && (
        <div className="flex flex-col justify-center items-center space-y-4 py-2">
          <Skeleton className="h-112 w-full" />
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
          <AlertDialogTitle>Deseja excluir esta palestra?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => {setLecturesToBeDeleted(undefined)}}>Voltar</AlertDialogCancel>
          <AlertDialogAction onClick={deleteLecture} className="bg-red-500 dark:bg-red-800 dark:text-white dark:hover:bg-red-700">Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    
  </SidebarInset>
  );
}