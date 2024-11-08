
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";

import { useState } from "react";
import { Pencil, Trash2 } from 'lucide-react';

const Inventario = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
  const inventoryItems = Array(7).fill({
    name: "Chicken Parmesan",
    status: "Active",
    stock: "10 In Stock",
    category: "Chicken",
    price: "$55.00"
  });

  return (
    <div className="p-8 lg:max-w-screen-xl m-auto">
     <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-semibold text-foreground">Calendario de Reservas</h2>
          <p className="text-muted-foreground mt-2">  Gestiona las reservas de manera sencilla</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" className="">
                  Agregar Inventario
                </Button>
              </DialogTrigger>
              <DialogContent className="">
                <DialogHeader>
                  <DialogTitle>Nueva Reserva</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <p className="">that boy&apos;s a liar</p>
                </div>
              </DialogContent>
            </Dialog>
      </header>

      <div className="grid grid-cols-[300px_1fr] gap-6">

        <Card>
          <CardContent className="p-6">

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Product Status</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-between">
                  All
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">150</span>
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Active
                  <span className="text-muted-foreground">120</span>
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Inactive
                  <span className="text-muted-foreground">10</span>
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Draft
                  <span className="text-muted-foreground">10</span>
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Category</h3>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="chicken">Chicken</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Stock</h3>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="InStock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instock">InStock</SelectItem>
                  <SelectItem value="outofstock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Value</h3>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Litre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="litre">Litre</SelectItem>
                  <SelectItem value="kg">Kilogram</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Piece / Item / Quantity</h3>
              <Input type="number" placeholder="50" />
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Price</h3>
              <div className="space-y-2">
                <Input type="number" placeholder="50" />
                <Input type="number" placeholder="120" />
              </div>
            </div>

            <Button variant="secondary" className="w-full">
              Reset Filters
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Retail Price</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-accent rounded-lg"></div>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.stock}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventario;