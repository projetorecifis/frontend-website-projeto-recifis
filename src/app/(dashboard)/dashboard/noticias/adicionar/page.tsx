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
import NewsServices from "@/services/news.services";
import { toast } from "sonner";
import Image from "next/image";

const MAX_SIZE = 1000000 //1mb

const messageNomeNoticia = "O nome da notícia deve ter no máximo 250 caracteres"
const messageNomeSubtitle = "A descrição da notícia deve ter no máximo 550 caracteres"
const message = "Campo obrigatório"

const formSchema = z.object({
  title: z.string().min(1, message).max(250, messageNomeNoticia),
  subtitle: z.string().min(1, message).max(550, messageNomeSubtitle),
  text: z.string().min(1, message),
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

export default function AddNewsPage() {

  function CloudUploadIcon({...props}) {
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
      subtitle: "",
      text: "",
      image: undefined
    },
  })

  const createNews = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const response = await NewsServices.createNews({
      title: values.title,
      subtitle: values.subtitle,
      text: values.text,
      image: values.image
    });

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    if(response?.status === 200){
      toast.success('Notícia criada com sucesso');
      form.reset();
      return
    }
    toast.error('Erro ao criar notícia, por favor, tente novamente');
    console.log(response)
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values =>", values);
    createNews(values);
  }
  const imageWatch = form.watch("image") || undefined;
  const { errors } = form.formState;

  return (
    <SidebarInset>
      <DashboardHeader breadcrumbPage="Adicionar Notícia" breadcrumbNameLink="Notícias" breadcrumbLink="/dashboard/noticias/adicionar" />
      <div className="px-8">
        <h1 className="text-2xl font-bold">Adicionar notícia</h1>
        <p className="text-gray-400">Nessa página você pode adicionar uma nova notícia</p>
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
                      <FormLabel>Título da notícia</FormLabel>
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
                name="subtitle"
                render={({ field }) => (
                  <FormItem className="m-0">
                    <div>
                      <FormLabel>Subtítulo da notícia</FormLabel>
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
                name="text"
                render={({ field }) => (
                  <FormItem className="m-0">
                    <div>
                      <FormLabel>Texto da notícia</FormLabel>
                      <FormControl>
                        <Textarea placeholder="" {...field} />
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
                                <CardTitle>Fazer o upload da imagem da notícia</CardTitle>
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
                                {imageWatch &&
                                  <Image
                                    width={640}
                                    height={320}
                                    src={URL.createObjectURL(imageWatch)} 
                                    alt="Imagem da noticia" 
                                    className="object-cover rounded-lg" 
                                  />
                                }
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

