"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BarChart3, Users, TrendingUp, Activity, Settings, LogOut, User, Bell, Search, Menu } from "lucide-react"
import { useClerk } from '@clerk/nextjs'

export function Dashboard() {
  const { signOut } = useClerk()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const stats = [
    {
      title: "Usuarios Totales",
      value: "2,847",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Ventas del Mes",
      value: "€45,231",
      change: "+8%",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Actividad",
      value: "1,234",
      change: "+23%",
      icon: Activity,
      color: "text-purple-600",
    },
    {
      title: "Conversiones",
      value: "89.2%",
      change: "+5%",
      icon: BarChart3,
      color: "text-orange-600",
    },
  ]

  const recentActivity = [
    { user: "María García", action: "Completó registro", time: "Hace 2 min" },
    { user: "Carlos López", action: "Realizó compra", time: "Hace 5 min" },
    { user: "Ana Martín", action: "Actualizó perfil", time: "Hace 10 min" },
    { user: "Pedro Ruiz", action: "Inició sesión", time: "Hace 15 min" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-2 min-w-[200px]">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input placeholder="Buscar..." className="bg-transparent border-none outline-none text-sm flex-1" />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></span>
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/professional-profile.png" alt="Perfil" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Juan Pérez</p>
                    <p className="text-xs leading-none text-muted-foreground">juan.perez@email.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <button onClick={() => signOut({ redirectUrl: '/' })}>Cerrar sesión</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">¡Bienvenido de vuelta, Juan!</h2>
          <p className="text-muted-foreground">Aquí tienes un resumen de tu actividad reciente</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-green-600 font-medium">{stat.change} desde el mes pasado</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Actividad Reciente</CardTitle>
              <CardDescription>Últimas acciones de los usuarios en tu plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {activity.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{activity.user}</p>
                      <p className="text-xs text-muted-foreground">{activity.action}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
              <CardDescription>Accesos directos a funciones principales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Gestionar Usuarios
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                Ver Reportes
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Configuración
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Bell className="mr-2 h-4 w-4" />
                Notificaciones
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
