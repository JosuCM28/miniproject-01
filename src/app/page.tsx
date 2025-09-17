"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"



export default function AuthWelcome() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
      <div className="w-full max-w-sm mx-auto text-center space-y-12">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-light text-foreground tracking-tight">Bienvenido</h1>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Accede a tu cuenta o crea una nueva
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Link href="/login" className="block">
            <Button className="w-full h-14 text-base font-medium bg-foreground text-background hover:bg-foreground/90 rounded-xl border-0 shadow-none cursor-pointer">
              Iniciar Sesión
            </Button>
          </Link>

          <Link href="/register" className="block">
            <Button
              variant="outline"
              className="w-full h-14 text-base font-medium  border-border  rounded-xl cursor-pointer"
            >
              Crear Cuenta Nueva
            </Button>
          </Link>
        </div>

        <div className="pt-8">
          <Link
            href="/help"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light"
          >
            ¿Necesitas ayuda?
          </Link>
        </div>
      </div>
      <div className="absolute bottom-5 left-5"><ModeToggle /></div>
    </div>
    
  )
}
