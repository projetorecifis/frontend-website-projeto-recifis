"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { set, z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import Image from "next/image";
import logo from "../../../../../public/img/logo-recifis-fundo-branco.png";
import AuthServices from "@/services/auth.services"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signIn } from "@/app/actions/auth"
import { useState } from "react"
import handLogoRecifis from "../../../../../public/img/handRecifis.png"

const message = "Campo obrigatório"
const messageNomeNoticia = "O nome da notícia deve ter no máximo 250 caracteres"

export function LoginForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const formSchema = z.object({
      email: z.string().min(1, message).max(250, messageNomeNoticia),
      password: z.string().min(1, message),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        const response = await signIn(values);
        console.log("response =>", response);

        if(response?.status !== 200 || response === undefined){
          setLoading(false);
          if(response?.status === 401){
            form.setError("email", { message: response?.message });
            form.setError("password", { message: response?.message });
          }
          toast.error(response.message);
          return 
        }
        router.push("/dashboard");
        toast.success(response.message);
        setTimeout(() => {setLoading(false);}, 3000);

    }

  return (
    <div className={"mt-0 m-auto px-8 phonlg:w-160 tabl:px-0"} >
      <Card className="overflow-hidden dark:bg-zinc-900 border-none mb-10">
        <CardContent className="p-0 gap-8">
        <Form {...form}>
          <form  onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="flex flex-row-reverse items-center gap-2 mb-4">
                  <h1 className="text-2xl font-bold">Projeto RECIFIS</h1>
                  <Image 
                    height={50}
                    width={50}
                    src={handLogoRecifis}
                    alt="Logo do projeto Recifis"
                  />
                </div>
                <p className="text-md text-muted-foreground text-gray-500 dark:text-gray-300">
                  Faça login em sua conta para ter acesso ao nosso dashboard
                </p>
              </div>
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
                name="password"
                render={({ field }) => (
                    <FormItem className="space-y-4">    
                            <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Senha</Label>
                                {/* <a
                                    href="#"
                                    className="ml-auto text-sm underline-offset-2 hover:underline"
                                >
                                    Forgot your password?
                                </a> */}
                            </div>
                            <Input 
                                className="flex justify-center items-center"
                                id="password" 
                                type="password" 
                                placeholder="********" 
                                {...field}
                                required 
                            />
                        </div>
                    </FormItem> 
                )}
            />
              <Button loading={loading} variant={"primary"} type="submit" className="w-full">
                Enviar
              </Button>
     
              {/* <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div> */}
            </div>
          </form>
        </Form>
        </CardContent>
      </Card>
      
      {/* <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  )
}
