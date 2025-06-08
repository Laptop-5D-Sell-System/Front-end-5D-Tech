'use client'

import { useState, useRef, useMemo } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import envConfig from "../../../../config"

const formSchema = z.object({
  username: z.string().min(1, "Tên không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  password_hash: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
  confirmPassword: z.string().min(6, "Xác nhận mật khẩu ít nhất 6 ký tự"),
  avatar: z.string().optional(),
}).refine(data => data.password_hash === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
})

type AddUserFormValues = z.infer<typeof formSchema>;
interface AddUserProps {

  onSubmitSuccess: () => void; 
}

export function AddUser({ onSubmitSuccess }: AddUserProps) {
  const [file, setFile] = useState<File | null>(null)
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [open, setOpen] = useState(false)

  const form = useForm<AddUserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password_hash: "",
      confirmPassword: "",
      avatar: "",
    }
  })

  const watchAvatar = form.watch("avatar")
  
  const previewAvatar = useMemo(() => {
    return file ? URL.createObjectURL(file) : watchAvatar
  }, [file, watchAvatar])

  const onSubmit: SubmitHandler<AddUserFormValues> = async (values) => {
    setLoading(true)
    setMessage("")

    try {
      const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Date.now().toString(), ...values }),
      })

      if (response.ok) {
        setMessage("Thêm tài khoản thành công ")
        form.reset()
        setTimeout(() => {
          setOpen(false)
          window.location.reload()
        }, 1000)
        onSubmitSuccess(); 
      } else {
        setMessage("Có lỗi xảy ra!")
      }
    } catch (error) {
      console.error("Error adding user:", error)
      setMessage("Có lỗi xảy ra!")
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Tạo Tài Khoản</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Tạo Tài Khoản</DialogTitle>
          <DialogDescription>Các trường như tên, email, mật khẩu là bắt buộc</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            
            {/* Ảnh đại diện */}
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={previewAvatar} />
                      <AvatarFallback>Ảnh</AvatarFallback>
                    </Avatar>
                    <input
                      type="file"
                      accept="image/*"
                      ref={avatarInputRef}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setFile(file)
                          field.onChange(URL.createObjectURL(file))
                        }
                      }}
                    />
                    <Button type="button" onClick={() => avatarInputRef.current?.click()}>
                      Chọn ảnh
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <Label>Tên</Label>
                  <FormControl>
                    <Input placeholder="Nhập tên" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label>Email</Label>
                  <FormControl>
                    <Input type="email" placeholder="Nhập email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password_hash"
              render={({ field }) => (
                <FormItem>
                  <Label>Mật khẩu</Label>
                  <FormControl>
                    <Input type="password" placeholder="Nhập mật khẩu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <Label>Xác nhận mật khẩu</Label>
                  <FormControl>
                    <Input type="password" placeholder="Nhập lại mật khẩu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {message && <p className={`text-sm ${message.includes("thành công") ? "text-green-500" : "text-red-500"}`}>{message}</p>}

            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Đang Thêm..." : "Thêm"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
