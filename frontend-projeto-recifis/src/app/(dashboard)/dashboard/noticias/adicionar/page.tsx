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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

export default function AddNewsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <div>
                <FormLabel>Nome da notícia</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </div>

             <div>
              <FormLabel>Descrição da notícia</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
             </div>

              <div>
                <FormLabel>Nome dos Palestrantes</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </div>

              <div>
                <FormLabel>Imagem da notícia</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
            
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
        </div>
      </div>
  
    </SidebarInset>
  );
}