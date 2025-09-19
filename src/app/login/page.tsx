"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useSignIn, useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import LoginForm from "@/components/login-form"

export default function LoginPage() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn()

  const handleSubmit = async (values: { email: string, password: string }) => {
    if (!isLoaded) return
    try {
      const signInAttempt = await signIn.create({
        identifier: values.email,
        password: values.password,
      })
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId, navigate: async ({ session }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask)
            return
          }
          await router.push('/dashboard')
        },
        })
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(err)
    }
  }

  return (
    <LoginForm onSubmit={handleSubmit} />
  )
}
