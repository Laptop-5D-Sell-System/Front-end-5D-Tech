'use client';

import { format } from 'date-fns';
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
import { ArrowUpDown, CalendarIcon, MoreHorizontal } from 'lucide-react';
import { useState, useEffect, useContext, createContext } from 'react';
import envConfig from '../../../../config';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast, Toaster } from 'sonner';
import { OrderListResType } from '@/schemaValidations/order.schema';
import EditOrder from './edit-order';
import { AddOrder } from './add-order';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useUserById } from './name_user';

type OrderItem = OrderListResType['orders'][0];

const OrderTableContext = createContext<{
    setOrderIdEdit: (value: string) => void;
    orderIdEdit: string | undefined;
    setOrderDelete: (value: OrderItem | null) => void;
    orderDelete: OrderItem | null;
}>({
    setOrderIdEdit: () => {},
    orderIdEdit: undefined,
    orderDelete: null,
    setOrderDelete: () => {},
});

  
export const columns: ColumnDef<OrderItem>[] = [
    
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'user_id',
        header: 'Khách hàng',
        cell: ({row}) => {
            
        }
            
    },
    {
        accessorKey: 'status',
        header: 'Trạng thái',
        cell: ({ row }) => {
            const status = row.getValue('status') as string;
            const map = {
                Processing: 'Chờ xác nhận',
                confirmed: 'Đã xác nhận',
                shipping: 'Đang giao',
                Done: 'Đã giao',
                cancelled: 'Đã hủy',
                returned: 'Trả hàng',
            };
            return <span>{map[status]}</span>;
        },
        enableColumnFilter: true,
        filterFn: (row, id, value) => {
            return value === '' || row.getValue(id) === value;
        },
    },
    {
        accessorKey: 'total',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Tổng tiền <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => <div className="lowercase">{row.getValue('total')}</div>,
    },
    {
        accessorKey: 'order_date',
        header: 'Ngày Tạo',
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const order = row.original;
            const { setOrderIdEdit, setOrderDelete } = useContext(OrderTableContext);

            const openEditOrder = () => {
                setOrderIdEdit(row.original.id);
            };

            const openDeleteOrder = () => {
                setOrderDelete(row.original);
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
                    <DropdownMenuContent align="end" className="w-48 shadow-md rounded-lg bg-gray-900 border">
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(order.id)}
                            className="hover:bg-gray-600 transition duration-200 p-2 rounded-md"
                        >
                            Sao Chép Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="hover:bg-red-100 text-red-600 transition duration-200 p-2 rounded-md"
                            onClick={openDeleteOrder}
                        >
                            Xóa Tài Khoản
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="hover:bg-blue-100 text-blue-600 transition duration-200 p-2 rounded-md"
                            onClick={openEditOrder}
                        >
                            Sửa Tài Khoản
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

// function AlertDialogDeleteAccount({
//     accountDelete,
//     setAccountDelete,
//     setData,
// }: {
//     accountDelete: OrderItem | null;
//     setAccountDelete: (value: OrderItem | null) => void;
//     setData: React.Dispatch<React.SetStateAction<OrderItem[]>>;
// }) {

//     // const deleteAcc = async () => {
//     //     const token = localStorage.getItem("token");
//     //     console.log(accountDelete?.id);
//     //     const id = accountDelete?.id;
//     //     const email = accountDelete?.email;
//     //     try {
//     //         const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/delete?id=${accountDelete?.id}`, {
//     //             method: "DELETE",
//     //             headers: {
//     //                 'Authorization': `Bearer ${token}`,
//     //                 'Content-Type': 'application/json',
//     //             }
//     //         })
//     //         if (!response.ok) {
//     //             throw new Error(`HTTP error! Status: ${response.status}`);
//     //         }
//     //         setData(prev => prev.filter(acc => acc.id !== id));
//     //         toast.success(`Tài khoản ${email} đã bị xoá`);
//     //         setAccountDelete(null);

//     //     } catch (error) {
//     //         console.error('Error deleting account:', error);
//     //     }

//     }
//     return (
//         <AlertDialog
//             // open={Boolean(accountDelete)}
//             // onOpenChange={(value) => {
//             //     if (!value) {
//             //         setAccountDelete(null);
//             //     }
//             // }}
//         >
//             <AlertDialogContent>
//                 <AlertDialogHeader>
//                     <AlertDialogTitle>Xoá tài khoản</AlertDialogTitle>
//                     <AlertDialogDescription>
//                         Tài khoản {' '}
//                         <span className="font-bold">{accountDelete?.email}</span> sẽ bị xoá vĩnh viễn. Bạn có chắc chắn muốn xoá không?
//                     </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                     <AlertDialogCancel>Hủy</AlertDialogCancel>
//                     <AlertDialogAction onClick={deleteAcc}>Xóa</AlertDialogAction>
//                 </AlertDialogFooter>
//             </AlertDialogContent>
//         </AlertDialog>
//     )
// }

export function Orders_table() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [orderIdEdit, setOrderIdEdit] = useState<string | undefined>();
    const [orderDelete, setOrderDelete] = useState<OrderItem | null>(null);
    const [data, setData] = React.useState<OrderItem[]>([]);
    const [loading, setLoading] = React.useState(true);

    const [fromTo, setFromTo] = useState<Date | undefined>(undefined);
    const [fromEnd, setFromEnd] = useState<Date | undefined>(undefined);


    const filterOrdersByDate = (orders: OrderItem[]) => {
        if (!fromTo || !fromEnd) return orders;
      
        return orders.filter((order) => {
          const orderDate = new Date(order.order_date);
          return orderDate >= fromTo && orderDate <= fromEnd;
        });
      };


    const getStatusStats = () => {
        const stats = {
            Processing: 0,
            confirmed: 0,
            shipping: 0,
            Done: 0,
            cancelled: 0,
            returned: 0,
        };

        table.getRowModel().rows.forEach((row) => {
            const status = row.original.status;
            if (status in stats) stats[status as keyof typeof stats]++;
        });

        return stats;
    };

    const statusLabels: Record<string, string> = {
        Processing: 'Chờ xác nhận',
        confirmed: 'Đã xác nhận',
        shipping: 'Đang giao',
        Done: 'Đã giao',
        cancelled: 'Đã hủy',
        returned: 'Trả hàng',
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
                const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/order/orders`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setData(result.orders);
                console.log(result.orders);
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
        <OrderTableContext.Provider
            value={{
                orderIdEdit,
                setOrderIdEdit,
                orderDelete,
                setOrderDelete,
            }}
        >
            <div className="w-full p-4">
                <EditOrder id={orderIdEdit} setId={setOrderIdEdit} onSubmitSuccess={() => {}} />
                {/* <AlertDialogDeleteAccount
                    accountDelete={accountDelete}
                    setAccountDelete={setAccountDelete}
                    setData={setData}
                /> */}
            </div>
            <div className="w-full p-4">
                <div className="flex items-center py-4 justify-between">
                    <div className="flex items-center justify-around gap-8 space-x-2  ">
                        <div className="flex items-center space-x-2 bg-[#0E1420] px-4 py-2 rounded-lg">

                            <label className="text-white text-sm">Từ</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={`w-[200px] justify-start text-left font-normal bg-transparent border-gray-600 text-white ${
                                            !fromTo ? 'text-muted-foreground' : ''
                                        }`}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {fromTo ? format(fromTo, 'dd/MM/yyyy, HH:mm') : <span>Chọn ngày</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-black">
                                    <Calendar mode="single" selected={fromTo} onSelect={setFromTo} initialFocus />
                                </PopoverContent>
                            </Popover>

                            <label className="text-white text-sm">Đến</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        value={(table.getColumn('order_date')?.getFilterValue() as string) ?? ''}
                                        className={`w-[200px] justify-start text-left font-normal bg-transparent border-gray-600 text-white ${
                                            !fromEnd ? 'text-muted-foreground' : ''
                                        }`}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {fromEnd ? format(fromEnd, 'dd/MM/yyyy, HH:mm') : <span>Chọn ngày</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-black">
                                    <Calendar mode="single" selected={fromEnd} onSelect={setFromEnd} initialFocus />
                                </PopoverContent>
                            </Popover>

                            <Button
                                onClick={() => {
                                    setFromTo(undefined);
                                    setFromEnd(undefined);
                                  }}
                                  variant="outline"
                                  className="text-white border-gray-600 bg-transparent hover:bg-white/10"
                            >
                                Reset
                            </Button>
                        </div>
                        <div className= 'bg-amber-50 rounded-lg text-black hover:bg-black'>
                            <AddOrder />
                        </div>
                        
                    </div>

                    <Toaster />
                </div>
                <div className="mb-4 flex gap-8">
                    <Input
                        placeholder="Tên khách"
                        value={(table.getColumn('user_id')?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn('user_id')?.setFilterValue(event.target.value)}
                        className="max-w-sm"
                    />
                    <Select
                        value={(table.getColumn('status')?.getFilterValue() as string) ?? 'all'}
                        onValueChange={(value) => {
                            if (value === 'all') {
                                table.getColumn('status')?.setFilterValue(undefined);
                            } else {
                                table.getColumn('status')?.setFilterValue(value);
                            }
                        }}
                    >
                        <SelectTrigger className="max-w-sm">
                            <SelectValue placeholder="Trạng thái đơn hàng" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Trạng Thái Đơn Hàng</SelectItem>
                            <SelectItem value="Processing">Chờ xác nhận</SelectItem>
                            <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                            <SelectItem value="shipping">Đang giao</SelectItem>
                            <SelectItem value="Done">Đã giao</SelectItem>
                            <SelectItem value="cancelled">Đã hủy</SelectItem>
                            <SelectItem value="returned">Trả hàng</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-foreground mb-4 ">
                    {Object.entries(getStatusStats()).map(([key, count]) => (
                        <div className="bg-slate-600 p-2 rounded-lg" key={key}>
                            {statusLabels[key]}: <span className="font-large text-foreground">{count}</span>
                        </div>
                    ))}
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
        </OrderTableContext.Provider>
    );
}
