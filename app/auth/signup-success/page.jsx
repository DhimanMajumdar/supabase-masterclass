import { Card } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

const SignUpSuccessPage = () => {
    return (
        <main className='flex items-center justify-center min-h-screen bg-[#050505] text-zinc-200 selection:bg-primary/30 p-4'>
            <Card className="w-full max-w-md border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-8 shadow-2xl transition-all duration-300 hover:shadow-primary/5">
                <h1 className="text-3xl font-bold tracking-tight text-white">Check your email to confirm your account</h1>
                <p className="text-zinc-400 text-sm">We've sent a confirmation link to your email address. Please click the link to verify your account and complete the sign-up process.</p>
                <Link href="/auth/login" className="font-medium transition-colors text-right text-white">Back to Login</Link>
            </Card>
        </main>
    )
}

export default SignUpSuccessPage