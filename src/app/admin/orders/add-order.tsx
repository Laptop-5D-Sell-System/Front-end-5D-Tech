'use client'

import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import envConfig from "../../../../config"
import { OrderListResType } from "@/schemaValidations/order.schema"

const orderFormSchema = z.object({
  user_id: z.number().min(1, "User ID là bắt buộc"),
  order_items: z.array(
    z.object({
      product_id: z.number().min(1, "Product ID là bắt buộc"),
      quantity: z.number().min(1, "Số lượng ít nhất là 1"),
      price: z.number().min(0, "Giá không được âm")
    })
  ).min(1, "Cần ít nhất 1 sản phẩm")
})

export function AddOrder({ onOrderAdded }: { onOrderAdded?: () => void }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      user_id: 0,
      order_items: [{
        product_id: 0,
        quantity: 1,
        price: 0
      }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "order_items"
  })

  const onSubmit = async (values: z.infer<typeof orderFormSchema>) => {
    setLoading(true)
    setMessage("")

    try {
      const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: values.user_id,
          order_date: new Date().toISOString(),
          status: "Processing",
          OrderItems: values.order_items,
          total: values.order_items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        } as OrderListResType["orders"][0])
      })

      if (response.ok) {
        setMessage("Thêm đơn hàng thành công!")
        form.reset()
        onOrderAdded?.()
        setTimeout(() => setOpen(false), 1000)
      } else {
        setMessage(await response.text() || "Có lỗi xảy ra!")
      }
    } catch (error) {
      console.error("Error adding order:", error)
      setMessage("Có lỗi xảy ra khi kết nối tới server")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Tạo Đơn Hàng</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Tạo Đơn Hàng</DialogTitle>
          <DialogDescription>Vui lòng nhập thông tin đơn hàng</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem>
                  <Label>User ID</Label>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Nhập User ID" 
                      {...field} 
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <Label>Sản phẩm</Label>
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-3 gap-4 items-end">
                  <FormField
                    control={form.control}
                    name={`order_items.${index}.product_id`}
                    render={({ field }) => (
                      <FormItem>
                        <Label>Product ID</Label>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Product ID" 
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`order_items.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <Label>Số lượng</Label>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Số lượng" 
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`order_items.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <Label>Giá</Label>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Giá" 
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      Xóa
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ product_id: 0, quantity: 1, price: 0 })}
              >
                Thêm sản phẩm
              </Button>
            </div>

            {message && (
              <p className={`text-sm ${
                message.includes("thành công") ? "text-green-500" : "text-red-500"
              }`}>
                {message}
              </p>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Đang tạo đơn hàng..." : "Tạo đơn hàng"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}