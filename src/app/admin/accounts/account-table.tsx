'use client';

import * as React from 'react';
import Image from 'next/image';
import {
    ColumnDef, ColumnFiltersState, SortingState, flexRender,
    getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
    getSortedRowModel, useReactTable
} from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import envConfig from '../../../../config';
import { AccountListResType } from '@/schemaValidations/account.schema';
import { AddUser } from './add-user';


type AccountItem = AccountListResType['accounts'][0];

interface AccountTableContextType {
  setAccountDelete: (account: AccountItem | null) => void;
}

const AccountTableContext = React.createContext<AccountTableContextType>({
  setAccountDelete: () => {},
});

const useAccounts = () => {
    const [accounts, setAccounts] = React.useState<AccountItem[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const fetchAccounts = React.useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Không tìm thấy token");

            const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/get-accounts`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            
            const result: AccountListResType = await response.json();
            setAccounts(result.accounts || []);
        } catch (err) {
            if (err instanceof Error) setError(err.message);
            else setError('Đã có lỗi không mong muốn xảy ra');
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        fetchAccounts();
    }, [fetchAccounts]);
    
    const deleteAccount = async (accountId: number) => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/delete?id=${accountId}`, {
          method: "DELETE",
          headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
          throw new Error('Xóa tài khoản thất bại');
      }
      setAccounts(prev => prev.filter(acc => acc.id !== accountId));
    };

    return { accounts, loading, error, refetch: fetchAccounts, deleteAccount };
};



const AccountActionsDropdown = ({ account }: { account: AccountItem }) => {
    const { setAccountDelete } = React.useContext(AccountTableContext);
    console.log(document.activeElement);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(account.email)}>Sao chép Email</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
                if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
                }
                
                requestAnimationFrame(() => {
                setAccountDelete(account);
                });
            }}
            >
            Xóa Tài Khoản
            </DropdownMenuItem>


        </DropdownMenuContent>
      </DropdownMenu>
    );
};

function AlertDialogDeleteAccount({ account, onClose, onDelete }: {
  account: AccountItem | null;
  onClose: () => void;
  onDelete: (accountId: number) => Promise<void>;
}) {
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = async () => {
        if (!account) return;
        setIsDeleting(true);
        try {
            await onDelete(account.id);
            toast.success(`Tài khoản "${account.email}" đã được xóa.`);
        } catch (error) {
            toast.error('Xóa tài khoản thất bại.');
            console.log(error)
        } finally {
            setIsDeleting(false);
            onClose();
        }
    };

    const actionButtonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        if (account) {
            const timeout = setTimeout(() => {
                actionButtonRef.current?.focus();
            }, 10);
            return () => clearTimeout(timeout);
        }
    }, [account]);

    
    return (
        <AlertDialog open={!!account} onOpenChange={(open) => !open && onClose()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tài khoản <span className="font-bold">{account?.email}</span> sẽ bị xoá vĩnh viễn.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Hủy</AlertDialogCancel>
                    <AlertDialogAction
                        ref={actionButtonRef}
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Đang xóa...' : 'Xác nhận xóa'}
                    </AlertDialogAction>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

const columns: ColumnDef<AccountItem>[] = [
    { header: 'STT', cell: ({ row }) => row.index + 1 },
    { accessorKey: 'id', header: 'ID' },
    {
        accessorKey: 'id_user.profile_picture', header: 'Avatar',
        cell: ({ row }) => (
            <Image
                src={row.original.id_user?.profile_picture || ''}
                alt={row.original.email} width={40} height={40}
                className="w-10 h-10 rounded-full object-cover"
            />
        ),
    },
    { accessorKey: 'email', header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Email <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    )},
    { accessorKey: 'role', header: 'Quyền' },
    { id: 'actions', cell: ({ row }) => <AccountActionsDropdown account={row.original} /> },
];


export function AccountsTable() {  
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [accountToDelete, setAccountToDelete] = React.useState<AccountItem | null>(null);

    const { accounts, loading, error, deleteAccount, refetch } = useAccounts();

    const table = useReactTable({
        data: accounts,
        columns,
        state: { sorting, columnFilters },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    if (error) return <div className="text-red-500 p-4 text-center">Lỗi tải dữ liệu: {error}</div>;

    return (
        <AccountTableContext.Provider value={{ setAccountDelete: setAccountToDelete }}>
            <Toaster position="top-right" richColors />
            <AlertDialogDeleteAccount
                account={accountToDelete}
                onClose={() => setAccountToDelete(null)}
                onDelete={deleteAccount}
            />

            <div className="w-full p-4">
                <div className="flex items-center py-4 justify-between">
                    <Input
                        placeholder="Lọc theo email..."
                        value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
                        className="max-w-sm"
                    />
                    <AddUser onSubmitSuccess={refetch} />
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {/* ✅ SỬA LỖI 1: Sử dụng state `loading` */}
                            {loading ? (
                                <TableRow><TableCell colSpan={columns.length} className="h-24 text-center">Đang tải dữ liệu...</TableCell></TableRow>
                            ) : table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow><TableCell colSpan={columns.length} className="h-24 text-center">Không có tài khoản nào.</TableCell></TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* ✅ SỬA LỖI 3: Hoàn thiện phân trang */}
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button variant="outline" size="sm" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>First</Button>
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
                    <span className="text-sm">Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
                    <Button variant="outline" size="sm" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>Last</Button>
                </div>
            </div>
        </AccountTableContext.Provider>
    );
}