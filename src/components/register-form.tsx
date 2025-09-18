'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/lib/types"

type FormValues = z.infer<typeof registerSchema>

type RegisterFormProps = {
  onSubmit: (values: FormValues) => void
}

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  })

  return (
  <div className="min-h-screen bg-background flex items-center justify-center p-6">
    <div className="w-full max-w-sm mx-auto space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-light text-foreground tracking-tight">Crear Cuenta</h1>
        <p className="text-muted-foreground font-light">Únete a nosotros</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-light text-foreground">Nombre completo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="name"
                      type="text"
                      placeholder="Tu nombre"
                      className="h-12 bg-background border-border rounded-xl text-base font-light focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-light text-foreground">Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="h-12 bg-background border-border rounded-xl text-base font-light focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-light text-foreground">Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="h-12 bg-background border-border rounded-xl text-base font-light focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-light text-foreground">Confirmar contraseña</FormLabel>
                  <FormControl>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="h-12 bg-background border-border rounded-xl text-base font-light focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div id="clerk-captcha"></div>

          <div className="space-y-4">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full h-12 text-base font-medium bg-foreground text-background hover:bg-foreground/90 rounded-xl border-0 shadow-none cursor-pointer"
            >
              {form.formState.isSubmitting ? "Creando..." : "Crear Cuenta"}
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
      </Form>

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

export default RegisterForm
