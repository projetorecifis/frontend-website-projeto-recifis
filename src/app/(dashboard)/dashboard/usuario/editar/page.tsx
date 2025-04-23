import DashboardHeader from "@/components/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EditUserForm } from "./(components)/form";

export default function EditUser() {
    return (
      <SidebarInset>
        <DashboardHeader breadcrumbNameLink="Home" breadcrumbLink="/dashboard" breadcrumbPage="Editar usuário" />
        <Card className="rounded-none">
          <CardHeader>
            <CardTitle>Editar usuário</CardTitle>
            <CardDescription>
                A edição do usuário pode ser feito através do formulário abaixo.
            </CardDescription>
          </CardHeader>
      </Card>
      <EditUserForm />
    </SidebarInset>
    );
}