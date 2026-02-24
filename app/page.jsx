
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { ArrowUpRightIcon, Folder } from 'lucide-react';
import { DeletePostButton } from '@/components/delete-post-button';

const Page = async () => {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: "false" })

  return (
    <main className='min-h-screen bg-[#050505] relative overflow-hidden'>
      {/* Premium Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,30,30,0.5)_0%,transparent_50%)] pointer-events-none" />

      <div className='max-w-4xl mx-auto px-4 py-8 relative z-10'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-4xl font-bold text-white tracking-tight'>My Blogs</h1>

          <div className='flex gap-2'>
            <Link href={"/editor"}>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-900/20">New Post</Button>
            </Link>

            <form action="/auth/logout" method='post'>
              <Button variant="outline" type="submit" className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-zinc-400 hover:text-white transition-colors">
                Logout
              </Button>
            </form>
          </div>
        </div>
        {
          posts && posts.length > 0 ? (<>
            <div className='grid gap-4'>
              {
                posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`} className="group relative">
                    <Card className="p-6 bg-zinc-900/50 backdrop-blur-xl border-zinc-800 hover:border-emerald-600/50 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-emerald-900/10">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-2xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors line-clamp-1">{post.title}</h2>
                        <DeletePostButton postId={post.id} />
                      </div>
                      {post.excerpt && <p className="text-zinc-400 mb-4 line-clamp-2">{post.excerpt}</p>}
                      <p className="text-sm text-zinc-500">{new Date(post.created_at).toLocaleDateString()}</p>
                    </Card>
                  </Link>
                ))
              }
            </div>
          </>) : (
            <Card className="bg-zinc-900/50 backdrop-blur-xl border-zinc-800">
              <Empty className="py-12">
                <EmptyHeader>
                  <EmptyMedia variant="icon" className="text-emerald-500">
                    <Folder />
                  </EmptyMedia>
                  <EmptyTitle className="text-white">No Blogs Yet</EmptyTitle>
                  <EmptyDescription className="text-zinc-400">
                    You haven&apos;t created any Blogs yet. Get started by creating
                    your first Blog.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Link href={"/editor"} className="flex gap-2">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">Create Blog</Button>
                  </Link>
                </EmptyContent>
              </Empty>
            </Card>
          )
        }
      </div>
    </main>
  )
}

export default Page
