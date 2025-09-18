import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  confirmPassword: z.string().min(8, "Confirma tu contraseña"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"], 
  message: "Las contraseñas no coinciden",
})

export const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
})

export const verifySchema = z.object({
  code: z.string().min(6, "Mínimo 6 caracteres"),
})