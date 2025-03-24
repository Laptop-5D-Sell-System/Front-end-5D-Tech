'use client';
import { toast } from "sonner"
import { useState, useEffect } from "react";
import * as React from 'react';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Skeleton } from '@/components/ui/skeleton';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { AddProduct } from './add-products';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";

interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    product_image: string;
    stock_quantity: string;

}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Tên SP',
    },
    {
        accessorKey: 'product_image',
        header: 'Ảnh Sản Phẩm',
        cell: ({ row }) => (
            <div className="flex items-center space-x-2">
                <img src={row.getValue('product_image')} alt="avatar" className="w-14 h-14 " />
            </div>
        ),
    },
    
    {
        accessorKey: 'price',
        header: 'Giá cả',
    },
    {
        accessorKey: 'description',
        header: 'Mô Tả',
        
    },
    {
        accessorKey: 'stock_quantity',
        header: 'Số Lượng Tồn',
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const product = row.original;


          return (
            <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-1 flex items-center justify-center rounded-full hover:bg-gray-100 transition duration-200"
                >
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 shadow-md rounded-lg bg-gray-900 border">
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(product.id)}
                  className="hover:bg-gray-600 transition duration-200 p-2 rounded-md"
                >
                  📋 Sao Chép ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-gray-600 transition duration-200 p-2 rounded-md"

                >
                  👤 Xem Chi Tiết
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-red-100 text-red-600 transition duration-200 p-2 rounded-md"
                
                >
                  ❌ Xóa Sản Phẩm
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-blue-100 text-blue-600 transition duration-200 p-2 rounded-md">
                  ✏️ Sửa Sản Phẩm
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>


            
        </>
          );
          
        },
      }
];



export function Products_table() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [data, setData] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        fetch('http://localhost:4000/Products')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <>
        <div className="w-full p-4">
            <div className="flex items-center py-4 justify-between">
                <Input
                    placeholder="Nhập Tên Sản Phẩm"
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <AddProduct />
            </div>
            <div className="rounded-md border">
                {loading ? (
                    <div className="flex flex-col space-y-3">
                        <Skeleton className="h-[125px] w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    First
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <span className="text-sm">
                    Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{' '}
                    <strong>{table.getPageCount()}</strong>
                </span>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    Last
                </Button>
            </div>
        </div>
        </>
    );
}
