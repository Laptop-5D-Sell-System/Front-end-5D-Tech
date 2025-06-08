"use client"

import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { CalendarIcon } from "lucide-react"
// import { cn } from "@/lib/utils"

interface CalendarProps {
  selected: Date | null
  onChange: (date: Date | null) => void
  minDate?: Date
  placeholderText?: string
}

export function Calendar({ selected, onChange, minDate, placeholderText }: CalendarProps) {
  return (
    <div className="relative w-full">
      <DatePicker
        selected={selected}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholderText || "Chọn ngày"}
        className="w-full border border-gray-600 bg-transparent text-white text-sm rounded-md px-3 py-2 pr-9"
        minDate={minDate}
        calendarClassName="bg-[#0E1420] text-white rounded-md"
        dayClassName={() => "hover:bg-white/10 rounded-md"}
      />
      <CalendarIcon className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  )
}
