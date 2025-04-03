"use client"
import { Separator } from "@/components/ui/separator"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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
import { IUserDataResponse } from "@/services/interfaces/user.interface"
import { onlyCapitalLetters } from "@/utils/regex"
import { Skeleton } from "@/components/ui/skeleton"

export default function ShowUsersOnDashboard() {

  const [allUsers, setAllUsers] = useState<IUserDataResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllUsers = async () => {
    const { data, status, message } = await AuthServices.getAllUsers();
    setLoading(true);

    if(data){
      setAllUsers(data);
    }
    setLoading(false);
  }

  useEffect(()=> {
    getAllUsers();
  }, [])

  return (
    <CardContent>
      <Separator className="my-4" />
      <div className="space-y-4">
        <div className="text-lg ">Pessoas cadastradas:</div>
        <div className="grid gap-6">
          {allUsers?.length > 0 && allUsers.map((user, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar className="bg-slate-200 rounded-full w-12 h-12 flex items-center justify-center dark:bg-zinc-900">
                  {/* <AvatarImage src={user.avatar} /> */}
                  <AvatarFallback className="w-full text-center rounded-full text-xl">{onlyCapitalLetters(user.name)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <p className="text-md font-medium leading-none">{user.name}</p>
                  <p className="text-md text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div>
                {user?.isAdmin && (
                  <Select defaultValue="admin" disabled>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione o tipo de usuário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="user">Usuário</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                {!user?.isAdmin && (
                  <Select defaultValue="user" disabled>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione o tipo de usuário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Usuário</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex items-center space-x-4 py-2">
              <Skeleton className="rounded-full h-12 w-12" />
              <div className="space-y-2">
                <Skeleton className="w-44 h-4" />
                <Skeleton className="w-44 h-4" />
              </div>
            </div>
          )}
        </div>
      </div>
    </CardContent>
  );
}