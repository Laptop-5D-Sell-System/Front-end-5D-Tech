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
import { AddUser } from './add-user';
import { useState, useEffect, useContext, createContext } from 'react';
import { AccountListResType } from '@/schemaValidations/account.schema';
import EditAccount from './edit-user';
import envConfig from '../../../../config';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast, Toaster } from "sonner";

type AccountItem = AccountListResType['accounts'][0];

const AccountTableContext = createContext<{
    setAccountIdEdit: (value: string) => void;
    accountIdEdit: string | undefined;
    setAccountDelete: (value: AccountItem | null) => void;
    accountDelete: AccountItem | null;
}>({
    setAccountIdEdit: () => {},
    accountIdEdit: undefined,
    accountDelete: null,
    setAccountDelete: () => {},
});

export const columns: ColumnDef<AccountItem>[] = [
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
        accessorKey: 'avatar',
        header: 'Avatar',
        cell: ({ row }) => (
            <div className="flex items-center space-x-2">
                <img src={row.original.id_user.profile_picture} alt="avatar" className="w-20 h-20" />
            </div>
        ),
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Email <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
        accessorKey: 'role',
        header: 'Quyền',
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const accounts = row.original;
            const { setAccountIdEdit, setAccountDelete } = useContext(AccountTableContext);

            const openEditAccount = () => {
                setAccountIdEdit(row.original.id);
            };

            const openDeleteAccount = () => {
                setAccountDelete(row.original);
            }

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
                            onClick={() => navigator.clipboard.writeText(accounts.email)}
                            className="hover:bg-gray-600 transition duration-200 p-2 rounded-md"
                        >
                            Sao Chép Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-red-100 text-red-600 transition duration-200 p-2 rounded-md"
                            onClick={openDeleteAccount}
                        >
                            Xóa Tài Khoản
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem
                            className="hover:bg-blue-100 text-blue-600 transition duration-200 p-2 rounded-md"
                            onClick={openEditAccount}
                        >
                            Sửa Tài Khoản
                        </DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

function AlertDialogDeleteAccount({
    accountDelete,
    setAccountDelete,
    setData,
}: {
    accountDelete: AccountItem | null;
    setAccountDelete: (value: AccountItem | null) => void;
    setData: React.Dispatch<React.SetStateAction<AccountItem[]>>;
}) {
    
    const deleteAcc = async () => {
        const token = localStorage.getItem("token");
        console.log(accountDelete?.id);
        const id = accountDelete?.id;
        const email = accountDelete?.email;
        try {
            const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/delete?id=${accountDelete?.id}`, {
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
            toast.success(`Tài khoản ${email} đã bị xoá`);
            setAccountDelete(null);
            
        } catch (error) {
            console.error('Error deleting account:', error);
        }

    }
    return (
        <AlertDialog
            open={Boolean(accountDelete)}
            onOpenChange={(value) => {
                if (!value) {
                    setAccountDelete(null);
                }
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Xoá tài khoản</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tài khoản {' '}
                        <span className="font-bold">{accountDelete?.email}</span> sẽ bị xoá vĩnh viễn. Bạn có chắc chắn muốn xoá không?
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

export function Accounts_table() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [accountIdEdit, setAccountIdEdit] = useState<string | undefined>();
    const [accountDelete, setAccountDelete] = useState<AccountItem | null>(null);
    const [data, setData] = React.useState<AccountItem[]>([]);
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
                const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/get-accounts`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setData(result.accounts);
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
        <AccountTableContext.Provider
            value={{
                accountIdEdit,
                setAccountIdEdit,
                accountDelete,
                setAccountDelete,
            }}
        >
            <div className="w-full p-4">
                <EditAccount id={accountIdEdit} setId={setAccountIdEdit} onSubmitSuccess={() => {}} />
                <AlertDialogDeleteAccount
                    accountDelete={accountDelete}
                    setAccountDelete={setAccountDelete}
                    setData={setData}
                />
            </div>
            <div className="w-full p-4">
                <div className="flex items-center py-4 justify-between">
                    <Input
                        placeholder="Filter emails..."
                        value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
                        className="max-w-sm"
                    />
                    <AddUser />
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
        </AccountTableContext.Provider>
    );
}
