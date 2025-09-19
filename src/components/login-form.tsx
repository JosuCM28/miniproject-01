
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/lib/types"

type FormValues = z.infer<typeof loginSchema>

type LoginFormProps = {
    onSubmit: (values: FormValues) => void
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    })


    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <div className="w-full max-w-sm mx-auto space-y-12">
                <div className="text-center space-y-3">
                    <h1 className="text-3xl font-light text-foreground tracking-tight">Iniciar Sesión</h1>
                    <p className="text-muted-foreground font-light">Accede a tu cuenta</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-sm font-light text-foreground">Correo electrónico</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                id="email"
                                                type="email"
                                                placeholder="tu@email.com"
                                                className="h-12 bg-background border-border rounded-xl text-base font-light focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30"
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
                                                {...field}
                                                id="password"
                                                type="password"
                                                placeholder="••••••••"
                                                className="h-12 bg-background border-border rounded-xl text-base font-light focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-4">
                                <Button
                                    type="submit"
                                    disabled={form.formState.isSubmitting}
                                    className="w-full h-12 text-base font-medium bg-foreground text-background hover:bg-foreground/90 rounded-xl border-0 shadow-none"
                                >
                                    {form.formState.isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
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
export default LoginForm