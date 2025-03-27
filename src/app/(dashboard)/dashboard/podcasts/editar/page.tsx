"use client"
import DashboardHeader from "@/components/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar"
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import PodcastsServices from "@/services/podcasts.services";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const MAX_SIZE = 1000000 //1mb

const messageNomeNoticia = "O nome do podcast deve ter no máximo 250 caracteres"
const messageNomeDescription = "A descrição do podcast deve ter no máximo 550 caracteres"
const message = "Campo obrigatório"

const formSchema = z.object({
  title: z.string().min(1, message).max(250, messageNomeNoticia),
  description: z.string().min(1, message).max(550, messageNomeDescription),
  link: z.string().min(1, message),
  image: z
    .instanceof(File, { message } )
    .refine(
      (file) => {
        if(file.size < MAX_SIZE){
          return true
        }
        return false
      }, {
        message: `O tamanho da imagem deve ser menor que ${MAX_SIZE/1000000}mb`
      }
    ) 
    .refine(
      (file) =>
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/gif",
        ].includes(file.type),
      { message: "Tipo de imagem inválido, tente png, jpeg ou jpg." })
    .optional(),
})

function CloudUploadIcon({ ...props }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  )
}

export default function EditPodcastsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getImageFromUrl = searchParams.get("image") || "";
  const getPublicId = searchParams.get("publicId") || "";

  const speakers = searchParams.get("speakers");
  const listSpeakers =  speakers !== null ? JSON.parse(speakers) : [];
  const mainSpeaker = listSpeakers[0];
  listSpeakers.shift(mainSpeaker);

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: searchParams.get("title") || "",
      description: searchParams.get("description") || "",
      link: searchParams.get("link") || "",
      image: undefined
    },
  })


  const updatePodcasts = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const response = await PodcastsServices.updatePodcasts({
      _id: searchParams.get("id") || "",
      title: values?.title,
      description: values?.description,
      link: values?.link,
      image: values?.image ?? undefined,
      publicId: getPublicId
    });
    
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    if(response?.status === 200){
        toast.success('Podcast editada com sucesso');
        router.push("/dashboard/podcasts/gerenciar");
        return;
    }
    toast.error('Aconteceu um erro ao criar o podcast, por favor, tente novamente mais tarde');
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    updatePodcasts(values);
  }

  const imageWatch = form.watch("image") || undefined;
  const { errors } = form.formState;

  return (
    <SidebarInset>
      <DashboardHeader breadcrumbPage="Editar Podcast" breadcrumbNameLink="Podcasts" breadcrumbLink="/dashboard/podcasts/gerenciar" />
      <div className="px-8">
        <h1 className="text-2xl font-bold">Editar Podcast</h1>
        <p className="text-gray-400">Nessa página você pode adicionar um novo podcast</p>
      </div>
      <div className="p-8">
        <Separator className="mb-8" /> 
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div>
                      <FormLabel>Título do Podcast</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="text" {...field}  />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem> 
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="m-0">
                    <div>
                      <FormLabel>Descrição do Podcast</FormLabel>
                      <FormControl>
                        <Textarea placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div>
                      <FormLabel>Link do Podcast</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="text" {...field}  />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem> 
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem className="space-y-4">
                    <div>
                      <FormControl>
                        <Card>
                          <CardHeader>
                            <CardTitle>Fazer o upload da imagem do podcast</CardTitle>
                            <CardDescription>Arraste e solte a imagem ou clique no botão para adicioná-la</CardDescription>
                          </CardHeader>
                          <CardContent className={`${!!errors?.image ? " border-red-600 focus-visible:ring-red-600" : "border-zinc-200"} flex flex-col items-center justify-center border-2 border-dashed dark:border-zinc-800 rounded-lg p-10 space-y-6`}>
                            <CloudUploadIcon className="w-16 h-16 text-zinc-500 dark:text-zinc-400" />
                            <Input 
                              {...value}
                              {...fieldProps}
                              className="w-80 text-center"
                              type="file"
                              accept="image/*"
                              onChange={(event) => {
                                onChange(event.target.files && event.target.files[0])
                              }}
                            /> 
                            {imageWatch && <img src={URL.createObjectURL(imageWatch)} alt="Imagem do Podcast" className="w-200 h-80 object-cover rounded-lg" />}
                            {!imageWatch && getImageFromUrl !== null && <img src={getImageFromUrl} alt="Imagem do Podcast" className="w-200 h-80 object-cover rounded-lg" />}

                          </CardContent>
                        </Card>
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem> 
                )}
              />
              <Button loading={loading} size={"lg"} variant="primary" type="submit">Enviar</Button>
            </form>
          </Form>
        </div>
      </div>
    </SidebarInset>
  );
}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/B1sBwvjQh84
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

