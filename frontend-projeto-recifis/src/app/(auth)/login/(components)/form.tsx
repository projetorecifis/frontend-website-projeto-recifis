"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import Image from "next/image";
import logo from "../../../../../public/img/logo-recifis-fundo-branco.png";
import AuthServices from "@/services/auth.services"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signIn } from "@/app/actions/auth"

const message = "Campo obrigatório"
const messageNomeNoticia = "O nome da notícia deve ter no máximo 250 caracteres"

export function LoginForm() {
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
        const response = await signIn(values);
        console.log("response =>", response);

        if(response?.status !== 200){
          if(response?.status === 401){
            form.setError("email", { message: response?.message });
            form.setError("password", { message: response?.message });
          }
          toast.error(response.message);
          return 
        }
  
        toast.success(response.message);
    }

  return (
    <div className={cn("flex flex-col gap-6")} >
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 gap-8 md:grid-cols-2">
        <Form {...form}>
          <form  onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Projeto RECIFIS</h1>
                <p className="text-sm text-muted-foreground text-gray-500">
                  Faça login em sua conta para ter acesso ao nosso dashboard
                </p>
              </div>
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem className="space-y-8">               
                        <div className="grid gap-2">
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
              <Button variant={"primary"} type="submit" className="w-full">
                Enviar
              </Button>
     
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </Form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src={logo}
              width={500}
              height={500}
              alt="Image"
              className="absolute inset-0 w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
      {/* <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  )
}
