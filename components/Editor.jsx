"use client";
import { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Code from "@editorjs/code";
import Image from "@editorjs/image";

export default function Editor({ editorRef, onReady, supabase }) {
    useEffect(() => {
        if (editorRef.current) return;

        const editorInstance = new EditorJS({
            holder: "editorjs",
            tools: {
                header: Header,
                paragraph: Paragraph,
                list: List,
                quote: Quote,
                code: Code,
                image: {
                    class: Image,
                    config: {
                        uploader: {
                            uploadByFile: async (file) => {
                                const {
                                    data: { user },
                                } = await supabase.auth.getUser();
                                if (!user) throw new Error("Not authenticated");

                                const fileName = `${Date.now()}-${file.name}`;
                                const { error: uploadError } = await supabase.storage
                                    .from("blog-images")
                                    .upload(`${user.id}/${fileName}`, file);

                                if (uploadError) throw uploadError;

                                const { data } = supabase.storage
                                    .from("blog-images")
                                    .getPublicUrl(`${user.id}/${fileName}`);

                                return {
                                    success: 1,
                                    file: {
                                        url: data.publicUrl,
                                    },
                                };
                            },
                        },
                    },
                },
            },
            onReady: () => {
                onReady(editorInstance);
            },
        });

        editorRef.current = editorInstance;

        return () => {
            if (editorRef.current && editorRef.current.destroy) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);

    return (
        <div
            id="editorjs"
            className="max-w-none bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 p-4 min-h-96
      prose lg:prose-xl
      prose-headings:text-zinc-900 dark:prose-headings:text-zinc-50
      prose-p:text-zinc-700 dark:prose-p:text-zinc-300
      prose-a:text-emerald-600 dark:prose-a:text-emerald-400
      prose-strong:text-zinc-900 dark:prose-strong:text-zinc-50
      prose-code:text-zinc-900 dark:prose-code:text-zinc-50
      prose-code:bg-zinc-200 dark:prose-code:bg-zinc-700
      prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-950
      prose-blockquote:border-emerald-500 dark:prose-blockquote:border-emerald-400
      prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300
      prose-img:rounded-lg
      "
        />
    );
}
