"use client"
import { Separator } from "@/components/ui/separator"
import {
  Avatar,
  AvatarFallback,
} from "@radix-ui/react-avatar"
import {
  CardContent,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import AuthServices from "@/services/auth.services"
import { IEditUserRequest, IUserDataResponse } from "@/services/interfaces/user.interface"
import { onlyCapitalLetters } from "@/utils/regex"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import { toast } from "sonner"
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
import { getCookies } from "@/utils/cookies"
import { decrypt } from "@/app/actions/auth"

export default function ShowUsersOnDashboard() {

  const [allUsers, setAllUsers] = useState<IUserDataResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [userToBeDeleted, setUserToBeDeleted] = useState<{ id: string, name: string } | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<IEditUserRequest>();

  const getUserInformation = async() => {
      const token = await getCookies("token");
      const payload = await decrypt(token);
  
      if(payload !== undefined){
        const body = {
          email: payload.email as string,
          name: payload.name as string,
          isAdmin: payload.isAdmin as boolean
        }
        setCurrentUser(body);
      }
    }

  const getAllUsers = async () => {
    const { data } = await AuthServices.getAllUsers();
    setLoading(true);

    if(data){
      setAllUsers(data);
    }
    setLoading(false);
  }

  const triggerAlertDialog = (id: string, name: string) => {
    setOpen(true);
    setUserToBeDeleted({ id, name });
  }

  const deleteUser = async () => {
    if(userToBeDeleted !== undefined){
      setLoading(true);
      const response = await AuthServices.deleteUserById(userToBeDeleted.id);

      if(response?.status !== 200){
        toast.error(response?.message);
        return;
      }
      setTimeout(() => {
        setLoading(false);  
        toast.success(response?.message);
        setUserToBeDeleted(undefined);
        setOpen(false);
        getAllUsers();
      }, 1000);
    }
  }

  useEffect(()=> {
    getAllUsers();
    getUserInformation();
  }, [])

  return (
    <CardContent>
      <Separator className="my-4" />
      <div className="space-y-4">
        
        <p className="text-lg ">Pessoas cadastradas:</p>
        <div className="grid gap-6">
          {!loading && allUsers?.length > 0 && allUsers.map((user, index) => (
            <section>
              <div key={index} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="bg-slate-200 rounded-full w-12 h-12 flex items-center justify-center dark:bg-zinc-900">
                    {/* <AvatarImage src={user.avatar} /> */}
                    <AvatarFallback className="w-full text-center rounded-full text-xl">{onlyCapitalLetters(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="">
                    <div className="space-y-1">
                      <p className="text-md font-medium leading-none">{user.name}</p>
                      <p className="text-md text-muted-foreground">{user.email}</p>
                    </div>
                    {currentUser?.isAdmin === true && (
                      <div className="flex flex-row items-center mt-0">
                        <a 
                          href={
                            "/dashboard/usuario/editar"
                            + "?id=" + user?._id 
                            + "&name=" + user?.name
                            + "&email=" + user?.email 
                            + "&isAdmin="+ user?.isAdmin 
                          }  
                          className="text-blue-500 text-sm hover:underline hover:underline-offset-4 dark:text-blue-400">
                            Editar
                        </a>
                        <Button 
                          variant={"link"} 
                          onClick={() => triggerAlertDialog(user?._id, user?.name)} 
                          className="text-red-500 dark:text-red-500"
                          disabled={currentUser?.email === user?.email ? true : false}
                        >
                          Deletar
                        </Button>
                      </div>
                    )}
                  </div>
                  
                </div>
                <div>
                    <Select defaultValue={user?.isAdmin ? "admin" : "user"} disabled>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione o tipo de usuário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="user">Usuário</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                
              </div>
              <Separator className="my-2" />
            </section>
          ))}
          {loading && (
             <div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4 py-2">
                    <Skeleton className="rounded-full h-12 w-12" />
                    <div className="space-y-2">
                      <Skeleton className="w-44 h-4" />
                      <Skeleton className="w-44 h-4" />
                    </div>
                  </div>
                <Skeleton className="rounded-md h-8 w-44" />
              </div>
              <Separator className="my-1" />
              <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4 py-2">
                    <Skeleton className="rounded-full h-12 w-12" />
                    <div className="space-y-2">
                      <Skeleton className="w-44 h-4" />
                      <Skeleton className="w-44 h-4" />
                    </div>
                  </div>
                <Skeleton className="rounded-md h-8 w-44" />
              </div>
             </div>
          )}
        </div>
        {currentUser?.isAdmin === true && (
          <div >
            <a href="/dashboard/usuario/cadastrar" className="flex items-center underline hover:opacity-60">
              <UserPlus size={18}/>
              <span className="pl-2">
                Cadastrar novo usuário
              </span>
            </a>
          </div>
        )}
      </div>
      <AlertDialog open={open} onOpenChange={setOpen} >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deseja excluir o usuário '{userToBeDeleted?.name}' ?</AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação <span className="font-bold">não</span> poderá ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => {setUserToBeDeleted(undefined)}}>Voltar</AlertDialogCancel>
              <AlertDialogAction onClick={deleteUser} className="bg-red-500">Excluir</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    </CardContent>
  );
}