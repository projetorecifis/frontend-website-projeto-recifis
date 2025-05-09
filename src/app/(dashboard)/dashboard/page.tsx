import DashboardHeader from "@/components/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ShowUsersOnDashboard from "../(components)/show-users";

export default function Dashboard() {
    return (
      <SidebarInset className="dark:bg-zinc-900">
        <DashboardHeader breadcrumbPage="Home" />
        <Card className="rounded-none dark:bg-zinc-900">
          <CardHeader>
            <CardTitle>Página inicial do dashboard</CardTitle>
            <CardDescription>
              O dashboard pode ser utilizado para gerenciar as informações do site do projeto RECIFIS, como as notícias, podcasts e palestras.
            </CardDescription>
          </CardHeader>
          <ShowUsersOnDashboard />
      </Card>
    </SidebarInset>
    );
}