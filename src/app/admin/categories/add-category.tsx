'use client'

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

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
  name: z.string().min(1, "Tên không được để trống"),
  description: z.string().min(1, "Mô tả không được để trống"),
})
type AddUserFormValues = z.infer<typeof formSchema>;

export function AddCa() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [open, setOpen] = useState(false)

  const form = useForm<AddUserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",

    }
  })

  


  const onSubmit: SubmitHandler<AddUserFormValues> = async (values) => {
    setLoading(true)
    setMessage("")

    try {
      const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/category/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
 
         },
        body: JSON.stringify({ id: Date.now().toString(), ...values }),
      })

      if (response.ok) {
        setMessage("Thêm danh mục thành công ")
        form.reset()
        setTimeout(() => {
          setOpen(false)
          window.location.reload()
        }, 1000)
      } else {
        setMessage("Có lỗi xảy ra!")
      }
    } catch (error) {
      console.error("Error adding :", error)
      setMessage("Có lỗi xảy ra!")
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Tạo Danh Mục</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Tạo Danh Mục</DialogTitle>
          <DialogDescription>Các trường như tên, description là bắt buộc</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            

            <FormField
              control={form.control}
              name="name"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label>Mô tả</Label>
                  <FormControl>
                    <Input type="text" placeholder="Nhập mô tả" {...field} />
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
