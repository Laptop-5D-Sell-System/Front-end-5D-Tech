'use client';

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
import { MoreHorizontal } from 'lucide-react';
import { useState, useEffect, useContext, createContext } from 'react';
import envConfig from '../../../../config';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast, Toaster } from "sonner";
import { AddCa } from './add-category';
import { CategoryResponseType } from '@/schemaValidations/category.schema';

const CategoryActionsDropdown = ({ category }: { category: CategoryItem }) => {
  const { setCategoryDelete } = useContext(CategoryTableContext);

  const copyCategoryName = () => {
    navigator.clipboard.writeText(category.name);
  };

  return (
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
      <DropdownMenuContent align="end" className="w-48 shadow-md rounded-lg bg-gray-800 border">
        <DropdownMenuItem
          onClick={copyCategoryName}
          className="hover:bg-gray-100 transition duration-200 p-2 rounded-md cursor-pointer"
        >
          Sao Chép Tên
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
        className="hover:bg-red-100 text-red-600 transition duration-200 p-2 rounded-md cursor-pointer"
        onClick={() => {
            if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
            }
            
            requestAnimationFrame(() => {
            setCategoryDelete(category); 
            });
        }}
        >
            
          Xóa Danh Mục
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type CategoryItem = CategoryResponseType['data'];

const CategoryTableContext = createContext<{
    setCategoryDelete: (value: CategoryItem | null) => void;
    categoryDelete: CategoryItem | null;
}>({
    categoryDelete: null,
    setCategoryDelete: () => {},
});

export const columns: ColumnDef<CategoryItem>[] = [
    {
        id: 'stt',
        header: 'STT',
        cell: ({ row }) => {
            return <>{row.index + 1}</>;
        },
    },
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Tên',
    },
    {
        accessorKey: 'description',
        header: 'Mô tả',
    },
    {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
        const category = row.original as CategoryItem; 

        // Render component con và truyền dữ liệu 'category' vào
        return <CategoryActionsDropdown category={category} />;
    },
    },
];

function AlertDialogDeleteCategory({
    categoryDelete,
    setCategoryDelete,
    setData,
}: {
    categoryDelete: CategoryItem | null;
    setCategoryDelete: (value: CategoryItem | null) => void;
    setData: React.Dispatch<React.SetStateAction<CategoryItem[]>>;
}) {
    
    const deleteCa = async () => {
        const token = localStorage.getItem("token");
        console.log(categoryDelete?.id);
        const id = categoryDelete?.id;
        const name = categoryDelete?.name;
        try {
            const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/category/delete?id=${categoryDelete?.id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setData(prev => prev.filter(acc => acc.id !== id));
            toast.success(`Danh mục ${name} đã bị xoá`);
            setCategoryDelete(null);
            
        } catch (error) {
            console.error('Error deleting category:', error);
        }

    }
    return (
        <AlertDialog
            open={Boolean(categoryDelete)}
            onOpenChange={(value) => {
                if (!value) {
                    setCategoryDelete(null);
                }
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Xoá danh mục</AlertDialogTitle>
                    <AlertDialogDescription>
                        Danh mục {' '}
                        <span className="font-bold">{categoryDelete?.name}</span> sẽ bị xoá vĩnh viễn. Bạn có chắc chắn muốn xoá không?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteCa}>Xóa</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function Categories_table() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [categoryDelete, setCategoryDelete] = useState<CategoryItem | null>(null);
    const [data, setData] = React.useState<CategoryItem[]>([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token found");
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/category/get-all-categories`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                console.log("data", result)
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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
        <CategoryTableContext.Provider
            value={{
                categoryDelete,
                setCategoryDelete,
            }}
        >
            <div className="w-full p-4">
                {/* <EditCategory id={categoryIdEdit} setId={setCategoryIdEdit} onSubmitSuccess={() => {}} /> */}
                <AlertDialogDeleteCategory
                    categoryDelete={categoryDelete}
                    setCategoryDelete={setCategoryDelete}
                    setData={setData}
                />
            </div>
            <div className="w-full p-4">
                <div className="flex items-center py-4 justify-between">
                    <Input
                        placeholder="Filter name..."
                        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                        className="max-w-sm"
                    />
                    <AddCa />
                    <Toaster />

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
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
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
        </CategoryTableContext.Provider>
    );
}
