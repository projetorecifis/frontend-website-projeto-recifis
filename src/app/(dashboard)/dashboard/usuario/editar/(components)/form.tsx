"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import AuthServices from "@/services/auth.services"
import { Checkbox } from "@/components/ui/checkbox"

const message = "Campo obrigatório"
const messageCaracteres = "Este campo deve ter no máximo 250 caracteres"

export function EditUserForm() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const id = searchParams.get("id") || "";
    const name = searchParams.get("name") || "";
    const email = searchParams.get("email") || "";
    const isAdmin = searchParams.get("isAdmin") || "false";

    const [loading, setLoading] = useState(false);

    const formSchema = z.object({
      name: z.string().min(1, message).max(250, messageCaracteres),
      email: z.string().min(1, message).max(250, messageCaracteres),
      isAdmin: z.boolean().default(false),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name,
            email: email,
            isAdmin: isAdmin === "true" ? true : false
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);

        const response = await AuthServices.editUser(id, values);
        console.log("response =>", response);

        if(response?.status !== 200 || response === undefined){
          setLoading(false);
          if(response?.status === 401){
            form.setError("name", { message: response?.message });
            form.setError("email", { message: response?.message });
          }
          toast.error(response.message);
          return 
        }
        toast.success(response.message);
        router.push("/dashboard");
        setTimeout(() => {setLoading(false);}, 3000);

    }

  return (
    <div className={"px-8 phonlg:w-160 tabl:px-0"} >
      <Card className="overflow-hidden border-none mb-10">
        <CardContent className="p-0 gap-8">  
            <Form {...form}>
            <form  onSubmit={form.handleSubmit(onSubmit)} className="px-6">
                <p className="text-md text-muted-foreground py-4 text-gray-500 dark:text-gray-300">
                    Cadastre uma nova conta de usuário para acessar o sistema do projeto RECIFIS.
                </p>
                <div className="flex flex-col gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="space-y-8">               
                                <div className="">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Insira o nome completo"
                                        required
                                        {...field}
                                    />
                                </div>
                            </FormItem> 
                        )}
                    />  
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-8">               
                                <div className="">
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="meu-email@ufv.com"
                                        required
                                        {...field}
                                    />
                                </div>
                            </FormItem> 
                        )}
                    />        
                    <FormField
                        control={form.control}
                        name="isAdmin"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                            <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                            <FormLabel>
                                Usuário administrador
                            </FormLabel>
                            <FormDescription>
                                Se ativado, o usuário será do tipo administrador e terá permissão para criar, deletar e editar outros usuários.
                            </FormDescription>
                            </div>
                        </FormItem>
                        )}
                    />
                    <Button loading={loading} variant={"primary"} type="submit" className="w-full">
                        Enviar
                    </Button>
                </div>
            </form>
            </Form>
        </CardContent>
      </Card>
    </div>
  )
}
