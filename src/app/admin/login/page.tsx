import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import './Login.scss';

export default function Login() {
    return (
        <div className="">
            <Card>
                <CardHeader>
                    <CardTitle>Đăng nhập</CardTitle>
                </CardHeader>
                <CardContent>
                    <input type="text" name="" id="" className='border' />
                    <input type="text" name="" id="" className='border' />
                </CardContent>
                <CardFooter>
                    <Link href="/admin">
                        <Button>Đăng nhập</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
