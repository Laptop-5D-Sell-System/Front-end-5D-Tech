import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { LogOut, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { useLogoutMutation } from '@/queries/useAuth';
// import { use } from 'react';
import { useRouter } from 'next/navigation';

export default function DropdownAvatar() {
    const route = useRouter();

    const logout = async () => {
        try {
          const res = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          const data = await res.json();
      
          if (!res.ok) {
            throw new Error(data.message || 'Lỗi khi gọi API logout');
          }
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
      
          route.push('/');
        } catch (error) {
          console.error('Logout error:', error);
        }
      };
      
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative w-10 h-10 rounded-full">
                    <Avatar>
                        <AvatarImage src="/path-to-avatar.jpg" alt="Admin Avatar" />
                        <AvatarFallback>admin</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Admin</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4"  /> Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
