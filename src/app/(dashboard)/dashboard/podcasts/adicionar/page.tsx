"use client"
import DashboardHeader from "@/components/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar"
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form";
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
import { toast } from "sonner";
import Image from "next/image";
import { Mic, Play, Plus, Trash } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const MAX_SIZE = 1000000 //1mb

const messageNomeNoticia = "O nome do podcast deve ter no máximo 250 caracteres"
const messageNomeDescription = "A descrição do podcast deve ter no máximo 550 caracteres"
const message = "Campo obrigatório"

const formSchema = z.object({
  title: z.string().min(1, message).max(250, messageNomeNoticia),
  mainSpeaker: z.string().min(1, message),
  listSpeakers: z.array(z.string().min(1, message)).nullable(),
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
      { message: "Tipo de imagem inválido, tente png, jpeg ou jpg." }),
})

export default function AddPodcastsPage() {

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

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      mainSpeaker: undefined,
      listSpeakers: [],
      description: "",
      link: "",
      image: undefined
    },
  })

  const createPodcasts = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const speakers = values?.listSpeakers !== null 
    ? [values.mainSpeaker, ...values?.listSpeakers] 
    : [values.mainSpeaker];

    const response = await PodcastsServices.createPodcasts({
      title: values.title,
      speakers: speakers,
      description: values.description,
      link: values.link,
      image: values.image
    });

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    if(response?.status === 200){
      toast.success('Podcast criado com sucesso');
      form.reset();
    }
    console.log(response)
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values =>", values);
    createPodcasts(values);
  }

  const { fields, append, remove } = useFieldArray({ name: "listSpeakers" as never, control: form.control });

  const mainSpeaker = form.watch("mainSpeaker") || undefined;
  const speakersWatch = form.watch("listSpeakers") || [];
  const imageWatch = form.watch("image") || undefined;
  const { errors } = form.formState;

  const titleWatch = form.watch("title") || "";
  const descriptionWatch = form.watch("description") || "";
  const linkWatch = form.watch("link") || "";

  return (
    <SidebarInset>

      <DashboardHeader breadcrumbPage="Adicionar Podcast" breadcrumbNameLink="Podcasts" breadcrumbLink="/dashboard/podcasts/gerenciar" />
      <div className="px-8">
        <h1 className="text-2xl font-bold">Adicionar Podcast</h1>
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
                name={"mainSpeaker"}
                render={({ field }) => (
                  <FormItem className="m-0">
                    <div>
                      <FormLabel>Nome dos participantes do podcast</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do primeiro participante" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              
              />
              {fields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`listSpeakers.${index}`}
                  render={({  }) => (
                    <div>
                        <FormItem>
                        <div>
                          <FormControl>
                            <Input placeholder={`Nome do participante ${index + 2}`} type="text" {...form.register(`listSpeakers.${index}`)} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    </div>
                  )}
                />
              ))}
              <div className="flex gap-2">
                <Button variant={"primary"} onClick={() => append(undefined)} type="button" className="my-2 flex text-center justify-center items-center space-x-2">
                  <Plus className="size-4" />
                  <p>Adicionar participante</p>
                </Button>
                <Button variant={"destructive"} onClick={() => {
                  if(speakersWatch !== undefined) {
                    remove(speakersWatch?.length-1)
                  }
                }} type="button" className="my-2 flex text-center justify-center items-center space-x-2">
                  <Trash className="size-4" />
                  <p>Remover participante</p>
                </Button>
              </div>

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
                <div className="flex w-full gap-2">
                    <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem className="space-y-4 w-full">
                        <div>
                          <FormLabel></FormLabel>
                          <FormControl>
                            <Card>
                              <CardHeader>
                                <CardTitle>Fazer o upload da imagem do podcast</CardTitle>
                                <CardDescription>Arraste e solte a imagem ou clique no botão para adicioná-la</CardDescription>
                              </CardHeader>
                              <CardContent className={`${!!errors?.image ? " border-red-600 focus-visible:ring-red-600" : "border-zinc-200"} p-10 flex flex-col items-center justify-center border-2 border-dashed dark:border-zinc-800 rounded-lg space-y-6`}>
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

                                  <p className="self-start text-sm">Veja como ficará na página de podcasts:</p>
                                  <Accordion type="single" collapsible className="w-full border-2 rounded-lg dark:text-slate-300 dark:border-none max-h-112  ">                                      
                                    <AccordionItem value={`item-1`} className=" rounded-md border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-slate-600">
                                        <AccordionTrigger 
                                            className="justify-start gap-4 no-underline px-4"
                                            // chevronDownClassName="hidden"
                                        >
                                        {imageWatch &&
                                            <Image
                                              width={80}
                                              height={80}
                                              src={URL.createObjectURL(imageWatch)} 
                                              alt="Imagem do podcast" 
                                              className="object-cover rounded-lg" 
                                            />
                                          }
                                          {!imageWatch && (
                                            <Mic className="text-center text-slate-500 rotate-0" size={80} />
                                          )}

                                        <div className="text-start space-y-1">
                                            <h1 className="font-bold text-md tabl:text-xl dark:text-slate-300">{titleWatch || "Título aqui"}</h1>
                                            <ul>
                                              {speakersWatch.length === 0 && (
                                                <li>{mainSpeaker || "Nome do participante"}</li>
                                              )}
                                             {speakersWatch.length !== 0 && (
                                               <li className="text-sm">
                                                  {mainSpeaker}, {" "}
                                                  {speakersWatch.map((speaker: string, indexSpeaker: number) => (
                                                      speakersWatch.length === indexSpeaker + 1 ? `${speaker}` : `${speaker}, `
                                                  ))}
                                              </li>
                                             )}
                                            </ul>
                                        </div>
                                        </AccordionTrigger>
                                          <AccordionContent className="px-4 flex flex-col">
                                              <p className="py-1 px-8">{descriptionWatch || "Descrição aqui"}</p>
                                              <a 
                                                  href={linkWatch}
                                                  className="flex items-center justify-center gap-2 my-1 rounded-lg bg-slate-50  hover:cursor-pointer dark:hover:bg-slate-600 dark:bg-slate-700 ">
                                                  <Play className="w-4 h-4" />
                                                  {"Ouvir podcast"}
                                                  <Image 
                                                      src={"/img/spotify-button.png"}
                                                      alt="Logo do Recifis"
                                                      width={80}
                                                      height={80}
                                                      className="rounded-lg"
                                                  />
                                              </a>
                                          </AccordionContent>
                                      </AccordionItem>
                                    </Accordion>
                          
                              </CardContent>
                            </Card>
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem> 
                    )}
                  />
                </div>
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

