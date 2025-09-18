"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { verifySchema } from "@/lib/types"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

type FormValues = z.infer<typeof verifySchema>

type EmailVerificationProps = {
  onSubmit: (code: string) => void
  onResend: () => void
  cooldown: number
  email: string
  isSubmitting: boolean
}

export default function EmailVerification({ onSubmit, onResend, email, isSubmitting, cooldown }: EmailVerificationProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
    mode: "onSubmit"
  })

  const handleSubmit = (values: FormValues) => {
    onSubmit(values.code)
    form.reset()
  }

  const isValidCode = form.watch("code").length === 6

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-light text-foreground tracking-tight">Verificación de Correo</h1>
          <p className="text-lg text-muted-foreground font-light leading-relaxed">Hemos enviado un código de verificación a {email}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Código de verificación</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      placeholder="Ingresa el código de 6 dígitos"
                      className="w-full h-14 text-center text-lg tracking-widest bg-white border-gray-300 focus:ring-0"
                      maxLength={6}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-14 text-base font-medium border-border rounded-xl cursor-pointer"
              disabled={isSubmitting || !isValidCode}
            >
              {isSubmitting ? "Verificando..." : "Verificar Código"} 
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <Button 
            variant="link"
            onClick={onResend}
            disabled={cooldown > 0}
            className="text-gray-700 hover:text-gray-900 font-medium text-sm underline-offset-4 hover:underline"
          >
            Reenviar Código
          </Button>
        </div>
      </div>

      <div className="fixed bottom-4 left-4">
        <span className="text-gray-400 text-sm">*</span>
      </div>

      <div className="fixed bottom-4 right-4">
        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">N</span>
        </div>
      </div>

      <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2">
        <p className="text-gray-500 text-xs">¿Necesitas ayuda?</p>
      </div>
    </div>
  )
}
