"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded) return;


    
    // Handle registration logic here
    console.log("Registration attempt:", formData)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-light text-foreground tracking-tight">Crear Cuenta</h1>
          <p className="text-muted-foreground font-light">Únete a nosotros</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-light text-foreground">
                Nombre completo
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="h-12 bg-background border-border rounded-xl text-base font-light focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-light text-foreground">
                Correo electrónico
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="h-12 bg-background border-border rounded-xl text-base font-light focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-light text-foreground">
                Contraseña
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="h-12 bg-background border-border rounded-xl text-base font-light focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-light text-foreground">
                Confirmar contraseña
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="h-12 bg-background border-border rounded-xl text-base font-light focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full h-12 text-base font-medium bg-foreground text-background hover:bg-foreground/90 rounded-xl border-0 shadow-none"
            >
              Crear Cuenta
            </Button>

            <p className="text-xs text-muted-foreground font-light text-center leading-relaxed">
              Al crear una cuenta, aceptas nuestros{" "}
              <Link href="/terms" className="underline hover:text-foreground">
                Términos de Servicio
              </Link>{" "}
              y{" "}
              <Link href="/privacy" className="underline hover:text-foreground">
                Política de Privacidad
              </Link>
            </p>
          </div>
        </form>

        <div className="text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground font-light">o</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground font-light">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-foreground hover:underline font-medium">
              Iniciar sesión
            </Link>
          </p>

          <Link
            href="/"
            className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors font-light"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
