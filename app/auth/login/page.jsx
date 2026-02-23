"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"


const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const router = useRouter()
    const supabase = createClient()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                throw error
            }
            router.push("/")
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex items-center justify-center min-h-screen bg-[#050505] text-zinc-200 selection:bg-primary/30 p-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,30,30,0.5)_0%,transparent_50%)] pointer-events-none" />

            <Card className="w-full max-w-md border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-8 shadow-2xl transition-all duration-300 hover:shadow-primary/5">
                <div className="flex flex-col space-y-2 mb-8 text-center shrink-0">
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Login
                    </h1>
                    <p className="text-zinc-400 text-sm">
                        Welcome back, enter your details to access your account
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            className="bg-zinc-950 border-zinc-800 focus:border-primary/50 focus:ring-primary/20 transition-all h-11 text-white"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">
                            Password
                        </Label>
                        <Input
                            id="password"
                            className="bg-zinc-950 text-white border-zinc-800 focus:border-primary/50 focus:ring-primary/20 transition-all h-11"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs animate-in fade-in slide-in-from-top-1">
                            {error}
                        </div>
                    )}

                    <Button className="w-full h-11 font-semibold shadow-lg shadow-primary/10 transition-transform active:scale-[0.98]" type="submit" disabled={loading}>
                        {loading ? <Spinner className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
                    </Button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-zinc-800" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#0c0c0c] px-2 text-zinc-500">Or continue with</span>
                    </div>
                </div>

                <p className="text-center text-sm text-zinc-500">
                    Don't have an account?{" "}
                    <Link href="/auth/signup" className="font-medium transition-colors text-white">
                        Sign Up
                    </Link>
                </p>
            </Card>
        </main>
    )
}

export default LoginPage