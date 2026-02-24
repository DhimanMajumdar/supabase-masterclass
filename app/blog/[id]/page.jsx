
import { BlogContent } from "@/components/blog-content";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const BlogPostPage = async ({ params }) => {
    const { id: blogId } = await params;

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data: post } = await supabase.from("posts").select("*").eq("id", blogId).eq("user_id", user.id).single()

    if (!post) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-[#050505] relative overflow-hidden">
            {/* Premium Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,30,30,0.5)_0%,transparent_50%)] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
                <div className="flex justify-between items-center mb-8">
                    <Link href="/">
                        <Button variant="outline" className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-zinc-400 hover:text-white">Back</Button>
                    </Link>
                    <Link href={`/editor?id=${post.id}`}>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-900/20">Edit Post</Button>
                    </Link>
                </div>

                <Card className="p-8 bg-zinc-900/50 backdrop-blur-xl border-zinc-800 shadow-2xl">
                    <h1 className="text-4xl font-bold text-white tracking-tight mb-4">{post.title}</h1>
                    <p className="text-emerald-500/80 font-medium mb-8">
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>

                    <div className="prose prose-invert max-w-none prose-p:text-zinc-300 prose-headings:text-white prose-strong:text-white prose-code:text-emerald-400">
                        <BlogContent content={post.content} />
                    </div>
                </Card>
            </div>
        </main>
    )
};

export default BlogPostPage;
