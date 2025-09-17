"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, User, Mail, Phone, Lock, Globe, Moon, Sun, Bell } from "lucide-react"
import { useTheme } from "next-themes"

export function ProfileSettings() {
  const { resolvedTheme, setTheme } = useTheme();        // usa resolvedTheme
  const [mounted, setMounted] = useState(false); 
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true)
  const [formData, setFormData] = useState({
    fullName: "Juan Pérez",
    email: "juan.perez@email.com",
    username: "juanperez",
    phone: "+34 123 456 789",
    language: "es",
  })

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // solo después de montar, sincroniza el estado local con el tema real
    if (mounted) setIsDarkMode(resolvedTheme === "dark");
  }, [mounted, resolvedTheme]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log("Guardando cambios...", formData)
  }

  const handleCancel = () => {
    console.log("Cancelando cambios...")
  }

  const handleTheme = () => {
    setTheme(isDarkMode === false ? "dark" : "light")

  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/50">
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          <h1 className="text-3xl font-light text-foreground tracking-tight">Configuración</h1>
          <p className="text-muted-foreground font-light mt-2">Gestiona tu información personal y preferencias</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="grid gap-12 md:grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-foreground mb-2">Foto de Perfil</h2>
                <p className="text-sm text-muted-foreground font-light">Actualiza tu imagen</p>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <Avatar className="w-28 h-28 border border-border/50">
                    <AvatarImage src="/professional-profile.png" alt="Foto de perfil" />
                    <AvatarFallback className="text-xl font-light bg-muted">JP</AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-1 -right-1 rounded-full w-9 h-9 p-0 bg-foreground hover:bg-foreground/90 shadow-none border-2 border-background"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="px-6 py-2 rounded-lg border-border hover:bg-muted/50 font-light bg-transparent"
                >
                  Cambiar Imagen
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-12">
            {/* Personal Information */}
            <div className="space-y-6">
              <div className="pb-4 border-b border-border/30">
                <h2 className="text-lg font-medium text-foreground flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  Información Personal
                </h2>
              </div>

              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                      Nombre Completo
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="h-12 rounded-lg border-border/50 bg-background focus:border-foreground/20 font-light"
                      placeholder="Ingresa tu nombre completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium text-foreground">
                      Nombre de Usuario
                    </Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      className="h-12 rounded-lg border-border/50 bg-background focus:border-foreground/20 font-light"
                      placeholder="Ingresa tu nombre de usuario"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      Correo Electrónico
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="h-12 rounded-lg border-border/50 bg-background focus:border-foreground/20 font-light"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      Número de Teléfono
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="h-12 rounded-lg border-border/50 bg-background focus:border-foreground/20 font-light"
                      placeholder="+34 123 456 789"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="space-y-6">
              <div className="pb-4 border-b border-border/30">
                <h2 className="text-lg font-medium text-foreground flex items-center gap-3">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                  Seguridad
                </h2>
              </div>

              <div className="flex items-center justify-between p-6 bg-muted/30 rounded-xl border border-border/30">
                <div>
                  <h4 className="font-medium text-foreground">Contraseña</h4>
                  <p className="text-sm text-muted-foreground font-light mt-1">Última actualización hace 3 meses</p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-lg border-border hover:bg-muted/50 font-light bg-transparent"
                >
                  Cambiar Contraseña
                </Button>
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-6">
              <div className="pb-4 border-b border-border/30">
                <h2 className="text-lg font-medium text-foreground">Preferencias</h2>
              </div>

              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label htmlFor="language" className="text-sm font-medium text-foreground">
                        Idioma
                      </Label>
                      <p className="text-sm text-muted-foreground font-light">Selecciona tu idioma preferido</p>
                    </div>
                  </div>
                  <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                    <SelectTrigger className="w-36 h-10 rounded-lg border-border/50 font-light">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border-border/50">
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {isDarkMode ? (
                      <Moon className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Sun className="w-5 h-5 text-muted-foreground" />
                    )}
                    <div>
                      <Label htmlFor="theme" className="text-sm font-medium text-foreground">
                        Tema
                      </Label>
                      <p className="text-sm text-muted-foreground font-light">Alternar entre modo claro y oscuro</p>
                    </div>
                  </div>
                  <Switch id="theme" checked={isDarkMode} onCheckedChange={handleTheme} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label htmlFor="notifications" className="text-sm font-medium text-foreground">
                        Notificaciones
                      </Label>
                      <p className="text-sm text-muted-foreground font-light">Recibir notificaciones por email</p>
                    </div>
                  </div>
                  <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button
                onClick={handleSave}
                className="flex-1 sm:flex-none h-12 px-8 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-medium shadow-none"
              >
                Guardar Cambios
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1 sm:flex-none h-12 px-8 border-border hover:bg-muted/50 rounded-xl font-light bg-transparent"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
