"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera, Trash } from "lucide-react"
import { useUser } from "@clerk/nextjs"

import React, { useState, useEffect, useRef } from "react"

export default function UpdateAvatar() {
    const inputRef = useRef<HTMLInputElement>(null);
    const { user } = useUser();

    const initials = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase()
    function handleClick() {
        inputRef.current?.click();
    }
    const handleFile = async (file: File,) => {
        if (!file) return;
        try {
            await user?.setProfileImage({file});
        } catch (err) {
            console.error(err);
        }
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    }
    const handleRemovePhoto = async () => {
        try {
            await user?.setProfileImage({file: null});
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div>
            <div>
                <h2 className="text-lg font-medium text-foreground mb-2">Foto de Perfil</h2>
                <p className="text-sm text-muted-foreground font-light">Actualiza tu imagen</p>
            </div>
            <div className="flex flex-col items-center space-y-6 mt-4">
                <div className="relative">
                    <Avatar className="w-28 h-28 border border-border/50">
                        <AvatarImage src={user?.imageUrl} alt="Foto de perfil" />
                        <AvatarFallback className="text-xl font-light bg-muted">{initials}</AvatarFallback>
                    </Avatar>
                    <button
                        title="Eliminar foto"
                        onClick={handleRemovePhoto}
                        className="absolute -bottom-1 -right-8 rounded-full w-9 h-9 p-0 bg-transparent shadow-none border-2 border-background cursor-pointer "
                    >
                        <Trash className="w-4 h-4 text-red-500 font-bold"/>
                    </button>
                </div>
                <input id="file" ref={inputRef} type="file" accept="image/png, image/jpeg, image/jpg" className="hidden" onChange={onChange} />
                <Button
                    variant="outline"
                    className="px-6 py-2 rounded-lg border-border hover:bg-muted/50 font-light bg-transparent"
                    onClick={handleClick}
                >
                    Cambiar Imagen
                </Button>
            </div>
        </div>

    );
}