'use client';

// import { format } from 'date-fns';
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
import { useUserById } from './name_user';
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
import { toast } from 'sonner';
import { OrderListResType } from '@/schemaValidations/order.schema';
import EditOrder from './edit-order';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const OrderActionsDropdown = ({ order }: { order: OrderItem }) => {
  const { setOrderIdEdit, setOrderDelete } = useContext(OrderTableContext);

  const openOrderDetail = () => setOrderIdEdit(order.id);
  const openDeleteOrder = () => setOrderDelete(order);

  

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
          onClick={() => {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
            
            requestAnimationFrame(() => {
                openOrderDetail();
            });
        }}
        >
          Xem chi tiết
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
        className="hover:bg-red-100 text-red-600 transition duration-200 p-2 rounded-md cursor-pointer"
        onClick={() => {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
            
            requestAnimationFrame(() => {
                openDeleteOrder();
            });
        }}
    >
        Xóa đơn hàng
    </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserCellDisplay = ({ userId }: { userId: number }) => {
  const { fullName, loading, error } = useUserById(userId);

  if (loading) {
    return <Skeleton className="h-4 w-[100px]" />;
  }

  if (error) {
    return <span className="text-red-500 text-sm">{error}</span>;
  }

  return <span>{fullName || `Khách hàng #${userId}`}</span>;
};

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

type OrderStatus = 'Processing' | 'Done' | 'cancelled';

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
    Processing: {
      label: 'Đang xử lý',
      className: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    },
    Done: {
      label: 'Đã giao',
      className: 'bg-green-100 text-green-800 border-green-300',
    },
    cancelled: {
      label: 'Đã hủy',
      className: 'bg-red-100 text-red-800 border-red-300',
    },
  };

  const config = statusConfig[status];

  if (!config) {
    return <span>{status}</span>;
  }

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium border ${config.className}`}
    >
      {config.label}
    </span>
  );
};
  
export const columns: ColumnDef<OrderItem>[] = [
    
    
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'user_id',
        header: 'Khách hàng',
        cell: ({ row }) => {
            const userId = row.getValue('user_id') as number;
            
            return <UserCellDisplay userId={userId} />;
        }
        },
    {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
        const status = row.getValue('status') as OrderStatus;
        return <StatusBadge status={status} />;
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
        const order = row.original as OrderItem;
        return <OrderActionsDropdown order={order} />;
        },
    },
];

interface AlertDialogDeleteOrderProps {
  orderDelete: OrderItem | null;
  setOrderDelete: (value: OrderItem | null) => void;
  setData: React.Dispatch<React.SetStateAction<OrderItem[]>>;
}

export function AlertDialogDeleteOrder({
  orderDelete,
  setOrderDelete,
  setData,
}: AlertDialogDeleteOrderProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const deleteOrder = async () => {
    if (!orderDelete) return;

    setIsDeleting(true);
    const token = localStorage.getItem("token");
    const id = orderDelete.id; 

    try {
      const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/order/delete?id=${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
      }
      
      setData(prev => prev.filter(order => order.id !== id));
      
      toast.success(`Đơn hàng #${id} đã được xóa thành công.`);
      setOrderDelete(null);

    } catch (error) {
      console.error('Lỗi khi xóa đơn hàng:', error);
      toast.error("Xóa đơn hàng thất bại.");
    } finally {
      setIsDeleting(false); 
    }
  };

  return (
    <AlertDialog
      open={!!orderDelete}
      onOpenChange={(isOpen) => {
        // Nếu người dùng đóng dialog (bằng nút hủy, nút X, hoặc click ra ngoài)
        if (!isOpen) {
          setOrderDelete(null);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
          <AlertDialogDescription>
            Đơn hàng <span className="font-bold">#{orderDelete?.id}</span> sẽ bị xoá vĩnh viễn.
            Hành động này không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={deleteOrder} disabled={isDeleting}>
            {isDeleting ? 'Đang xóa...' : 'Xóa vĩnh viễn'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}


export function Orders_table() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [orderIdEdit, setOrderIdEdit] = useState<string | undefined>();
    const [orderDelete, setOrderDelete] = useState<OrderItem | null>(null);
    const [data, setData] = React.useState<OrderItem[]>([]);
    const [loading, setLoading] = React.useState(true);


    const getStatusStats = () => {
        const stats = {
            Processing: 0,
            Done: 0,
            cancelled: 0,
        };

        table.getRowModel().rows.forEach((row) => {
            const status = row.original.status;
            if (status in stats) stats[status as keyof typeof stats]++;
        });

        return stats;
    };

    const statusLabels: Record<string, string> = {
        Processing: 'Đang xử lý',
        Done: 'Đã giao',
        cancelled: 'Đã hủy',
    };

    const fetchOrderData = async () => {
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
            console.log("Đã cập nhật danh sách đơn hàng:", result.orders);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOrderUpdated = () => {
        fetchOrderData();
        toast.success("Đã cập nhật danh sách đơn hàng");
    };

    useEffect(() => {
        fetchOrderData();
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
                <EditOrder 
                    id={orderIdEdit} 
                    setId={setOrderIdEdit} 
                    onSubmitSuccess={handleOrderUpdated} 
                />
                <AlertDialogDeleteOrder
                        orderDelete={orderDelete}
                        setOrderDelete={setOrderDelete}
                        setData={setData}
                    />
            </div>
            <div className="w-full p-4">
                
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
                            <SelectItem value="Processing">Đang xử lý</SelectItem>
                            <SelectItem value="Done">Đã giao</SelectItem>
                            <SelectItem value="cancelled">Đã hủy</SelectItem>
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