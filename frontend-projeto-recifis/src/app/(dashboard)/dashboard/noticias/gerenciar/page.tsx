import { Heading } from "@/components/created/Heading";
import DashboardHeader from "@/components/dashboard-header";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
} from "@/components/ui/sidebar"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


export default function ManagerNewsPage() {
    return (
      <SidebarInset>
      <DashboardHeader breadcrumbNameLink="Notícias" breadcrumbLink="/dashboard/noticias/gerenciar" breadcrumbPage="Gerenciar notícias" />
      <div className="px-8">
        <h1 className="text-2xl font-bold">Gerenciar notícias</h1>
        <p className="text-gray-400">Here you can manager your news, edit and delete them</p>
      </div>
      <div className="p-8">
      <Separator className="mb-8" />
      <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ordem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Palestrantes</TableHead>
              <TableHead className="w-[150px]">Editar/Deletar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell>$250.00</TableCell>
              <TableCell>$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      
    </SidebarInset>
    );
}