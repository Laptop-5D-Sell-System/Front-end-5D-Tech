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
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { useState, useEffect, useContext, createContext } from 'react';
import envConfig from '../../../../config';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProductListResType } from '@/schemaValidations/product.schema';
import { AddProduct } from './add-products';
import EditProduct from './edit-product';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast, Toaster } from 'sonner';

type ProductsItem = ProductListResType['products'][0];

const ProTableContext = createContext<{
    setProductIdEdit: (value: string) => void;
    productIdEdit: string | undefined;
    setProductDelete: (value: ProductsItem | null) => void;
    productDelete: ProductsItem | null;
}>( {
    setProductIdEdit: () => {},
    productIdEdit: undefined,
    productDelete: null,
    setProductDelete: () => {},
});

export const columns: ColumnDef<ProductsItem>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'image',
        header: 'Ảnh',
        cell: ({ row }) => (
            <div className="flex items-center space-x-2">
                <img src={row.original.product_image} alt="image" className="w-14 h-14" />
            </div>
        ),
    },
    {
        accessorKey: 'name',
        header: 'Tên',
    },
    {
        accessorKey: 'price',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Giá <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => <div className="lowercase">{row.getValue('price')}</div>,
    },
    {
        accessorKey: 'description',
        header: 'Mô tả',
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const product = row.original;

            const { setProductIdEdit, setProductDelete } = useContext(ProTableContext);
            const openEditProductId = () => {
                setProductIdEdit(row.original.id);
            }

            const openDeleteProduct = () => {
                setProductDelete(row.original)
            }
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-1 flex items-center justify-center rounded-full hover:bg-gray-100 transition duration-200">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="w-5 h-5 text-gray-600" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 shadow-md rounded-lg bg-gray-900 border">
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.name)} className="hover:bg-gray-600 transition duration-200 p-2 rounded-md">
                            Sao Chép Tên Sản Phẩm
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-red-100 text-red-600 transition duration-200 p-2 rounded-md"
                            onClick={openDeleteProduct}
                        >
                            Xóa Sản Phẩm
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-blue-100 text-blue-600 transition duration-200 p-2 rounded-md"
                        onClick={openEditProductId}
                        >
                            Sửa Sản Phẩm
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];


function AlertDialogDeleteProducts({
    productDelete,
    setproductDelete,
    setData,
}: {
    productDelete: ProductsItem | null;
    setproductDelete: (value: ProductsItem | null) => void;
    setData: React.Dispatch<React.SetStateAction<ProductsItem[]>>;
}) {
    
    const deleteAcc = async () => {
        const token = localStorage.getItem("token");
        console.log(productDelete?.id);
        const id = productDelete?.id;
        const name = productDelete?.name;
        try {
            const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/product/delete?id=${productDelete?.id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            console.log('Response from server:', response.status, await response.text());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setData(prev => prev.filter(acc => acc.id !== id));
            toast.success(`Sản phẩm ${name} đã bị xoá`);
            setproductDelete(null);
            
        } catch (error) {
            console.error('Error deleting account:', error);
        }

    }
    return (
        <AlertDialog
            open={Boolean(productDelete)}
            onOpenChange={(value) => {
                if (!value) {
                    setproductDelete(null);
                }
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Xoá tài khoản</AlertDialogTitle>
                    <AlertDialogDescription>
                        Sản phẩm {' '}
                        <span className="font-bold">{productDelete?.name}</span> sẽ bị xoá vĩnh viễn. Bạn có chắc chắn muốn xoá không?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteAcc}>Xóa</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function Products_table() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [data, setData] = React.useState<ProductsItem[]>([]);
    const [loading, setLoading] = React.useState(true);

    const [productIdEdit, setProductIdEdit] = useState<string | undefined>();
    const [productDelete, setProductDelete] = useState<ProductsItem | null>(null);

    const fetchProducts = async () => {
        const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(
                    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/product/all-products?sortOrder=null`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setData(result.products);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
      };
      

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(
                    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/product/all-products?sortOrder=null`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setData(result.products);
            } catch (error) {
                console.error('Error fetching data:', error);
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
        <ProTableContext.Provider value={{ 
            productIdEdit,
            setProductIdEdit, setProductDelete, productDelete 
            }}>
            <div className="w-full p-4">
                <div className="w-full p-4">
                                <EditProduct id={productIdEdit} setId={setProductIdEdit} onSubmitSuccess={() => {}} />
                                <EditProduct
  id={productIdEdit}
  setId={setProductIdEdit}
  onSubmitSuccess={fetchProducts}
/>


                            </div>
                <div className="flex items-center py-4 justify-between">
                    <Input
                        placeholder="Lọc sản phẩm theo tên..."
                        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                        className="max-w-sm"
                    />
                    <Toaster/>
                    <AlertDialogDeleteProducts
                        productDelete={productDelete}
                        setproductDelete={setProductDelete}
                        setData={setData}
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
        </ProTableContext.Provider>
    );
}
