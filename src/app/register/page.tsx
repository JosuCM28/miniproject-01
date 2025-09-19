'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"
import RegisterForm from "@/components/register-form"
import VerifyForm from "@/components/verify-email"

export default function RegisterPage() {
  const router = useRouter()
  const { isLoaded, signUp, setActive } = useSignUp()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [step, setStep] = useState<"register" | "verify">("register")

  const handleRegister = async (values: { firstName: string, lastName: string, email: string; password: string; }) => {
    if (!isLoaded) return
    setEmail(values.email)

    await signUp.create({
      firstName: values.firstName,
      lastName: values.lastName,
      emailAddress: values.email,
      password: values.password,
    })

    await signUp.prepareEmailAddressVerification({
      strategy: "email_code",
    })
    
    setStep("verify")
  }

  const handleVerify = async (code: string) => {
    if (!isLoaded) return
    setIsSubmitting(true)
    
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId, navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask)
              return
            }
            await router.push('/dashboard')
          },
        })

      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
        setIsSubmitting(false)
      }
    } catch (err: any) {
      console.error(err)
      setIsSubmitting(false)
    }
  }

  const handleResendCode = async () => {
    if (!isLoaded || cooldown > 0) {
      console.log("No puedes volver a enviar el código")
      return
    }

    try {
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })
      
      setCooldown(60)

      const timer = setInterval(() => {
        setCooldown((s) => {
          if (s <= 0) {
            clearInterval(timer)
            return 0
          }
          return s - 1
        })
      }, 1000)

    } catch (err: any) {
      console.error(err)
    }
  }

  return step === "register" ? (
    <RegisterForm
      onSubmit={handleRegister} 
    />
  ) : (
    <VerifyForm 
      onSubmit={handleVerify}
      onResend={handleResendCode}
      cooldown={cooldown}
      isSubmitting={isSubmitting}
      email={email}
    />
  )
}
