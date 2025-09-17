"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { isLoaded, signIn, setActive } = useSignIn();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isLoaded) return;
    

    // Handle login logic here
    console.log("Login attempt:", { email, password })
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-light text-foreground tracking-tight">Iniciar Sesión</h1>
          <p className="text-muted-foreground font-light">Accede a tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-light text-foreground">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              Continuar
            </Button>

            <div className="text-center">
              <Link
                href="/forgot-password"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
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
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-foreground hover:underline font-medium">
              Crear cuenta
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
