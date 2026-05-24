"use server"

import { hash } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirm = formData.get("confirm") as string

  if (!name || !email || !password || !confirm) {
    redirect("/register?error=missing")
  }
  if (password !== confirm) {
    redirect("/register?error=mismatch")
  }
  if (password.length < 8) {
    redirect("/register?error=short")
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    redirect("/register?error=exists")
  }

  const hashed = await hash(password, 12)
  await prisma.user.create({ data: { name, email, password: hashed } })

  redirect("/sign-in")
}
