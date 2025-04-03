import DashboardHeader from "@/components/dashboard-header";
import { Separator } from "@/components/ui/separator"
import { SidebarInset } from "@/components/ui/sidebar"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@radix-ui/react-avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ShowUsersOnDashboard from "../(components)/show-users";

export default function Dashboard() {
    return (
      <SidebarInset>
        <DashboardHeader breadcrumbPage="Home" />
        <Card className="rounded-none">
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