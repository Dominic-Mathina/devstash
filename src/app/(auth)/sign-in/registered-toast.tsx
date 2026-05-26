"use client"

import { useEffect } from "react"
import { toast } from "sonner"

export function RegisteredToast() {
  useEffect(() => {
    toast.success("Account created! You can now sign in.", { id: "registered" })
  }, [])

  return null
}
