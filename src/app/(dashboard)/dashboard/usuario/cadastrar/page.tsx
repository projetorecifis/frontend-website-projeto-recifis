import DashboardHeader from "@/components/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SignUpForm } from "./(components)/form";

export default function SignUpUser() {
    return (
      <SidebarInset className="dark:bg-zinc-900">
        <DashboardHeader breadcrumbNameLink="Home" breadcrumbLink="/dashboard" breadcrumbPage="Cadastrar novo usuário" />
        <Card className="rounded-none dark:bg-zinc-900">
          <CardHeader>
            <CardTitle>Cadastrar novo usuário</CardTitle>
            <CardDescription>
                O cadastro de novos usuários pode ser feito através do formulário abaixo.
            </CardDescription>
          </CardHeader>
      </Card>
      <SignUpForm />
    </SidebarInset>
    );
}