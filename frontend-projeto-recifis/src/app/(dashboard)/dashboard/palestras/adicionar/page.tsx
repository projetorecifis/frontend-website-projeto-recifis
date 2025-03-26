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
import { Plus, Trash } from "lucide-react";
import NewsServices from "@/services/news.services";
import { toast } from "sonner";
import lecturesServices from "@/services/lectures.services";

const MAX_SIZE = 1000000 //1mb

const messageNomeParticipante = "O nome do participante deve ter no mínimo 4 caracteres e no máximo 50 caracteres"
const messageNomeNoticia = "O nome da palestra deve ter no máximo 250 caracteres"
const messageNomeDescription = "A descrição da palestra deve ter no máximo 550 caracteres"
const message = "Campo obrigatório"

const formSchema = z.object({
  title: z.string().min(1, message).max(250, messageNomeNoticia),
  description: z.string().min(1, message).max(550, messageNomeDescription),
  mainSpeaker: z.string().min(4, message).max(50, messageNomeParticipante),
  listSpeakers: z.array(z.string().min(4, messageNomeParticipante).max(50, messageNomeParticipante)).nullable(),
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
      { message: "Tipo de imagem inváligo, tente png, jpeg ou jpg." }),
})

export default function AddLecturesPage() {

  function CloudUploadIcon(props: any) {
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
      description: "",
      mainSpeaker: "",
      listSpeakers: undefined,
      link: "",
      image: undefined
    },
  })

  const createLectures = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const response = await lecturesServices.createLectures({
      title: values.title,
      description: values.description,
      mainSpeaker: values.mainSpeaker,
      listSpeakers: values?.listSpeakers,
      link: values?.link,
      image: values.image
    });

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    if(response?.status === 200){
      toast.success(response?.message);
      form.reset();
      return
    }
    toast.error('Erro ao criar palestra, por favor, tente novamente');
    console.log(response)
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values =>", values);
    createLectures(values);
  }
  const speakersWatch = form.watch("listSpeakers") || undefined;
  const imageWatch = form.watch("image") || undefined;
  const { fields, append, remove } = useFieldArray({ name: "listSpeakers" as never, control: form.control });
  const { errors } = form.formState;

  return (
    <SidebarInset>

      <DashboardHeader breadcrumbPage="Adicionar palestra" breadcrumbNameLink="Palestras" breadcrumbLink="/dashboard/palestras/adicionar" />
      <div className="px-8">
        <h1 className="text-2xl font-bold">Adicionar Palestra</h1>
        <p className="text-gray-400">Nessa página você pode adicionar uma nova palestra</p>
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
                      <FormLabel>Título da palestra</FormLabel>
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
                      <FormLabel>Descrição da palestra</FormLabel>
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
                      <FormLabel>Link da palestra</FormLabel>
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
                      <FormLabel>Nome dos palestrantes</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do primeiro palestrante" type="text" {...field} />
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
                            <Input placeholder={`Nome do palestrante ${index + 2}`} type="text" {...form.register(`listSpeakers.${index}`)} />
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
                  <p>Adicionar palestrante</p>
                </Button>
                <Button variant={"destructive"} onClick={() => {
                  if(speakersWatch !== undefined) {
                    remove(speakersWatch?.length-1)
                  }
                }} type="button" className="my-2 flex text-center justify-center items-center space-x-2">
                  <Trash className="size-4" />
                  <p>Remover palestrante</p>
                </Button>
              </div>
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
                                <CardTitle>Fazer o upload da imagem da palestra</CardTitle>
                                <CardDescription>Arraste e solte a imagem ou clique no botão para adicioná-la</CardDescription>
                              </CardHeader>
                              <CardContent className={`${!!errors?.image ? " border-red-600 focus-visible:ring-red-600" : "border-zinc-200"} p-10 flex flex-col items-center justify-center border-2 border-dashed dark:border-zinc-800 rounded-lg space-y-6`}>
                                <CloudUploadIcon className="w-16 h-16 text-zinc-500 dark:text-zinc-400" />
                                <Input 
                                  {...fieldProps}
                                  className="w-80 text-center"
                                  type="file"
                                  accept="image/*"
                                  onChange={(event) => {
                                    onChange(event.target.files && event.target.files[0])
                                  }}
                                /> 
                                {imageWatch && <img src={URL.createObjectURL(imageWatch)} alt="Imagem da palestra" className="w-200 h-80 object-cover rounded-lg" />}
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

